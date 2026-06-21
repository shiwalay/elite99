import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma, isDbConnected } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("gos_session_token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, session: null }, { status: 200 });
    }

    const payload = (await verifyJWT(token)) as any;
    if (!payload) {
      return NextResponse.json({ success: false, session: null }, { status: 200 });
    }

    const dbActive = await isDbConnected();
    let userProfile: any = null;

    if (dbActive) {
      userProfile = await prisma.studentProfile.findUnique({
        where: { email: payload.email.toLowerCase() },
        include: {
          completions: true,
          quizPasses: true,
          habitLogs: true,
          certificates: true,
        },
      });
      
      if (userProfile) {
        userProfile = {
          ...userProfile,
          onboardingData: userProfile.onboardingData ? JSON.parse(userProfile.onboardingData) : undefined,
          analyzedGoalCard: userProfile.analyzedGoalCard ? JSON.parse(userProfile.analyzedGoalCard) : undefined,
        };
      }
    } else {
      // Mock mode: Payload user metadata fallback
      userProfile = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        unlockedLevel: 1,
        xp: 120,
        streakDays: 3,
        rank: "Seeker",
        points: 120,
        onboarded: false,
      };
    }

    return NextResponse.json({
      success: true,
      session: payload,
      user: userProfile,
      dbMode: dbActive,
    });
  } catch (error: any) {
    console.error("Session Retrieval Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Session Error" },
      { status: 500 }
    );
  }
}
