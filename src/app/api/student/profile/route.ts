import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma, isDbConnected } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("gos_session_token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const payload = (await verifyJWT(token)) as any;
    if (!payload) {
      return NextResponse.json({ success: false, error: "Invalid Session" }, { status: 401 });
    }

    const body = await request.json();
    const { onboardingData, analyzedGoalCard, onboarded, xp, points, streakDays, unlockedLevel } = body;

    const dbActive = await isDbConnected();
    let updatedProfile: any = null;

    if (dbActive) {
      const updateData: any = {};
      if (onboardingData) updateData.onboardingData = JSON.stringify(onboardingData);
      if (analyzedGoalCard) updateData.analyzedGoalCard = JSON.stringify(analyzedGoalCard);
      if (onboarded !== undefined) updateData.onboarded = onboarded;
      if (xp !== undefined) updateData.xp = xp;
      if (points !== undefined) updateData.points = points;
      if (streakDays !== undefined) updateData.streakDays = streakDays;
      if (unlockedLevel !== undefined) updateData.unlockedLevel = unlockedLevel;

      updatedProfile = await prisma.studentProfile.update({
        where: { email: payload.email.toLowerCase() },
        data: updateData,
      });

      updatedProfile = {
        ...updatedProfile,
        onboardingData: updatedProfile.onboardingData ? JSON.parse(updatedProfile.onboardingData) : undefined,
        analyzedGoalCard: updatedProfile.analyzedGoalCard ? JSON.parse(updatedProfile.analyzedGoalCard) : undefined,
      };
    } else {
      // Mock echo back
      updatedProfile = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        unlockedLevel: unlockedLevel || 1,
        xp: xp || 120,
        streakDays: streakDays || 3,
        points: points || 120,
        onboarded: onboarded || false,
        onboardingData,
        analyzedGoalCard,
      };
    }

    return NextResponse.json({
      success: true,
      user: updatedProfile,
      dbMode: dbActive,
    });
  } catch (error: any) {
    console.error("Profile Sync Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
