import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_DURATION,
  createAdminSessionToken,
} from "@/lib/analytics/auth";

import { verifyAdminPassword } from "@/lib/analytics/password";


export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Only accept login requests from this same website.
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (!origin || !host || new URL(origin).host !== host) {
      return NextResponse.json(
        { success: false, message: "Invalid request origin." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const password = body.password;

    if (typeof password !== "string" || password.length > 500) {
      return NextResponse.json(
        { success: false, message: "Invalid password." },
        { status: 400 }
      );
    }

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, message: "Incorrect password." },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken();

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: ADMIN_SESSION_DURATION,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to log in." },
      { status: 500 }
    );
  }
}