import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Set expired session cookie to delete it
  response.cookies.set({
    name: "gos_session_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
export async function GET(request: Request) {
  // Allow GET logout links as well
  // Using request.url to ensure the redirect is relative to the current host, preventing open redirect vulnerability
  const response = NextResponse.redirect(new URL("/", request.url));
  
  response.cookies.set({
    name: "gos_session_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
