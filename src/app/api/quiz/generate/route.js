import { NextResponse } from "next/server";
import OpenAI from "openai";
import db from "@/lib/db";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json(); // ← fixed: was shadowing `req`

    if (!body.userId) {
      return NextResponse.json(
        { error: "No User Provided, Access Forbidden" },
        { status: 403 },
      );
    }

    if (!body.topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const prompt = `
Generate a beginner quiz consisting of multiple choice questions.

Topic: ${body.topic}
Difficulty: ${body.difficulty || "Beginner"}
Questions: ${body.numQuestions || 5}
Style: ${body.style || "Normal"}

STRICT RULES:
- Return ONLY valid JSON
- Do NOT include markdown
- Do NOT include any text outside JSON
- Follow this schema EXACTLY

{
  "title": "string",
  "description": "string",
  "questions": [
    {
      "question": "string",
      "options": ["string","string","string","string"],
      "answer": "string",
      "explanation": "1-2 sentence explanation of why the answer is correct and the others are wrong"
    }
  ]
}
`;

    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-20b:cheapest",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0].message.content;
    const quiz = JSON.parse(content);

    // Insert quiz into DB, store questions as JSON
    const [result] = await db.execute(
      `INSERT INTO quizzes (user_id, topic, difficulty, style, title, description, questions, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        body.userId,
        body.topic,
        body.difficulty || "Beginner",
        body.style || "Normal",
        quiz.title,
        quiz.description,
        JSON.stringify(quiz.questions),
      ],
    );

    return NextResponse.json({
      success: true,
      quizId: result.insertId,
      quiz,
    });
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      { success: false, error: "Quiz generation failed" },
      { status: 500 },
    );
  }
}
