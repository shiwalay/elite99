import { NextResponse } from "next/server";
import { signJWT } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "shiwalay@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Shiwalay$9393";

    if (
      email.toLowerCase() !== adminEmail.toLowerCase() ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid administrative email address or password" },
        { status: 401 }
      );
    }

    // Sign JWT session token with admin privileges
    const token = await signJWT({
      id: "admin_shiwalay",
      name: "Swapnil Shiwalay",
      email: adminEmail.toLowerCase(),
      role: "SuperAdmin",
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: "admin_shiwalay",
        name: "Swapnil Shiwalay",
        email: adminEmail.toLowerCase(),
        role: "SuperAdmin",
        onboarded: true,
      },
    });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: "gos_session_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Admin Login Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
