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
    const { type, id, score } = body; // type is 'lesson' or 'quiz', id is lessonId or courseId

    if (!type || !id) {
      return NextResponse.json({ success: false, error: "Type and ID are required" }, { status: 400 });
    }

    const dbActive = await isDbConnected();

    if (dbActive) {
      const student = await prisma.studentProfile.findUnique({
        where: { email: payload.email.toLowerCase() },
      });

      if (!student) {
        return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
      }

      if (type === "lesson") {
        await prisma.lessonCompletion.upsert({
          where: {
            studentId_lessonId: {
              studentId: student.id,
              lessonId: id,
            },
          },
          create: {
            studentId: student.id,
            lessonId: id,
          },
          update: {},
        });
      } else if (type === "quiz") {
        await prisma.quizPass.upsert({
          where: {
            studentId_courseId: {
              studentId: student.id,
              courseId: id,
            },
          },
          create: {
            studentId: student.id,
            courseId: id,
            score: score || 100,
          },
          update: {
            score: score || 100,
            passedAt: new Date(),
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      dbMode: dbActive,
    });
  } catch (error: any) {
    console.error("Progress Sync Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update progress" },
      { status: 500 }
    );
  }
}
