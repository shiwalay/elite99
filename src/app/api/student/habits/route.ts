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
    const { date, habitId, checked } = body; // date is YYYY-MM-DD, checked is boolean

    if (!date || !habitId) {
      return NextResponse.json({ success: false, error: "Date and Habit ID are required" }, { status: 400 });
    }

    const dbActive = await isDbConnected();

    if (dbActive) {
      const student = await prisma.studentProfile.findUnique({
        where: { email: payload.email.toLowerCase() },
      });

      if (!student) {
        return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
      }

      await prisma.habitLog.upsert({
        where: {
          studentId_date_habitId: {
            studentId: student.id,
            date,
            habitId,
          },
        },
        create: {
          studentId: student.id,
          date,
          habitId,
          checked: checked || false,
        },
        update: {
          checked: checked || false,
          loggedAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      dbMode: dbActive,
    });
  } catch (error: any) {
    console.error("Habit Sync Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update habit log" },
      { status: 500 }
    );
  }
}
