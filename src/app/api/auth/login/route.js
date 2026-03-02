import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const { identifier, password } = await req.json();

  if (!identifier || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const [rows] = await db
    .promise()
    .query(
      `SELECT * FROM users 
      WHERE LOWER(username) = LOWER(?) 
      OR LOWER(email) = LOWER(?)`,
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const res = NextResponse.json({
      message: "Sign in successful",
      user: { id: user.id, username: user.username, email: user.email },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 3600,
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Error signing in", error: error.message },
      { status: 500 }
    );
  }
}