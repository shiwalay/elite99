import { NextResponse } from "next/server";
import { prisma, isDbConnected } from "@/lib/prisma";
import { signJWT } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, onboardingData } = body;
    const role = "Student"; // Force role to Student to prevent role escalation attacks

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address format" },
        { status: 400 }
      );
    }

    const dbActive = await isDbConnected();
    let userProfile: any = null;

    if (dbActive) {
      // DB Mode: Check if student exists. If so, block duplicate registration
      const existing = await prisma.studentProfile.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existing) {
        return NextResponse.json(
          { success: false, error: "This email address is already registered. Please log in instead." },
          { status: 400 }
        );
      }

      userProfile = await prisma.studentProfile.create({
        data: {
          name,
          email: email.toLowerCase(),
          role,
          onboarded: onboardingData ? true : false,
          onboardingData: onboardingData ? JSON.stringify(onboardingData) : null,
        },
      });
    } else {
      // Mock Fallback Mode
      userProfile = {
        id: "mock_" + email.split("@")[0],
        name,
        email: email.toLowerCase(),
        role,
        unlockedLevel: 1,
        xp: 120,
        streakDays: 3,
        rank: "Seeker",
        points: 120,
        onboarded: onboardingData ? true : false,
        onboardingData: onboardingData ? JSON.stringify(onboardingData) : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    // Sign JWT session token
    const token = await signJWT({
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
      role: userProfile.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        ...userProfile,
        onboardingData: userProfile.onboardingData ? JSON.parse(userProfile.onboardingData) : undefined,
      },
      dbMode: dbActive,
    });

    // Set HttpOnly secure session cookie (expires in 24 hours)
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
    console.error("Register Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
