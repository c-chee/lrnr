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

    const [rows] = await db.query(
      `SELECT * FROM users 
      WHERE LOWER(username) = LOWER(?) 
      OR LOWER(email) = LOWER(?)`,
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // --- Streak logic ---
    const now = new Date();
    const lastLogin = user.last_login ? new Date(user.last_login) : null;

    let newStreak = user.streak || 0;

    if (lastLogin) {
      // Strip times, compare dates only
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const lastDay = new Date(
        lastLogin.getFullYear(),
        lastLogin.getMonth(),
        lastLogin.getDate(),
      );
      const diffDays = Math.round((today - lastDay) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        // Same day login — don't change streak
      } else if (diffDays === 1) {
        // Consecutive day — increment
        newStreak += 1;
      } else {
        // Missed a day — reset
        newStreak = 1;
      }
    } else {
      // First ever login
      newStreak = 1;
    }

    await db.execute(
      `UPDATE users SET streak = ?, last_login = ? WHERE id = ?`,
      [newStreak, now, user.id],
    );
    // --- End streak logic ---

    const token = jwt.sign(
      {
        id: user.id,
        name: user.username,
        email: user.email,
        streak: newStreak,
        points: user.points
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const response = NextResponse.json({
      message: "Sign in successful",
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
        streak: newStreak,
        points: user.points
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error signing in", error: error.message },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch fresh user data from DB
    const [rows] = await db.query(
      `SELECT id, username, email, streak, points FROM users WHERE id = ?`,
      [decoded.id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ user: null });
    }

    const user = rows[0];

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
        streak: user.streak,
        points: user.points
      }
    });

  } catch (err) {
    console.error("Session error:", err);
    return NextResponse.json({ user: null });
  }
}
