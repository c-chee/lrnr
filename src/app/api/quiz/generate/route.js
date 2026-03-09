import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

export async function POST(req) {
  try {
    const { topic, difficulty, numQuestions, style } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const prompt = `
Generate a beginner quiz consisting of multiple choice questions.

Topic: ${topic}
Difficulty: ${difficulty || "Beginner"}
Questions: ${numQuestions || 5}
Style: ${style || "Normal"}

Return ONLY VALID JSON STRING:

{
"title": "",
"description": "",
"questions":[
{
"question":"",
"options":["","","",""],
"answer":"",
"explanation":"1-2 sentence explanation of why the answer is correct and the others are wrong"
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
    console.log(content);

    const quiz = await JSON.parse(content);

    return NextResponse.json({
      success: true,
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
