import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";
import { generateQuiz } from "@/lib/quizGenerator";

// Helper: get user id from JWT cookie
function getUserIdFromCookie(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload?.id ?? null;
  } catch {
    return null;
  }
}

// GET /api/quiz -> return quiz history for logged-in user
export async function GET(req) {
  try {
    const userId = getUserIdFromCookie(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [rows] = await pool.query(
      `SELECT id, topic, difficulty, style, title, description, questions, created_at
       FROM quizzes
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 50`,
      [userId]
    );

    return NextResponse.json({ quizzes: rows }, { status: 200 });
  } catch (error) {
    console.error("GET /api/quiz error:", error);
    return NextResponse.json(
      { message: "Database error" },
      { status: 500 }
    );
  }
}

// POST /api/quiz -> save prompt + generate quiz
export async function POST(req) {
  try {
    const userId = getUserIdFromCookie(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      topic,
      level = "beginner",
      numQuestions = 5,
      questionStyle = "multiple_choice",
    } = body || {};

    if (!topic || typeof topic !== "string" || topic.trim().length < 2) {
      return NextResponse.json({ message: "Invalid topic" }, { status: 400 });
    }

    const safeNum = Math.min(Math.max(Number(numQuestions) || 5, 1), 20);

    // 1) Save the prompt
    const [result] = await pool.query(
      `INSERT INTO quiz_prompts (user_id, topic, level, num_questions, question_style)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, topic.trim(), level, safeNum, questionStyle]
    );

    const promptId = result.insertId;

    // 2) Generate quiz
    const quiz = await generateQuiz({
      topic: topic.trim(),
      level,
      numQuestions: safeNum,
      questionStyle,
    });

    return NextResponse.json({ promptId, quiz }, { status: 200 });
  } catch (error) {
    console.error("POST /api/quiz error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
