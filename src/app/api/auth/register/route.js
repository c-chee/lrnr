import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function POST(req) {
  const { username, email, password } = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db
      .promise()
      .query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [
        username,
        email,
        hashedPassword,
      ]);

    return NextResponse.json(
      { message: "User created successfully", userId: result.insertId },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 },
    );
  }
}
