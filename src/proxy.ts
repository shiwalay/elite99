import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/auth";

interface SessionPayload {
  role?: string;
  [key: string]: unknown;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("gos_session_token")?.value;

    // Check if accessing login page
    if (pathname === "/admin/login") {
      if (token) {
        const payload = (await verifyJWT(token)) as SessionPayload | null;
        if (
          payload &&
          (payload.role === "SuperAdmin" ||
            payload.role === "Admin" ||
            payload.role === "Editor")
        ) {
          // Already logged in, redirect to admin home
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      }
      return NextResponse.next();
    }

    // Force authentication for other /admin paths
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const payload = (await verifyJWT(token)) as SessionPayload | null;
    if (
      !payload ||
      !(
        payload.role === "SuperAdmin" ||
        payload.role === "Admin" ||
        payload.role === "Editor"
      )
    ) {
      // Invalid token or wrong permissions, redirect to login
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      // Clear invalid token
      response.cookies.delete("gos_session_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
