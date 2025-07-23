import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";
import axios from "axios";

const AUTH_BASE = "http://localhost:4001";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", "test_client");
  params.append("client_secret", "test_secret");
  params.append("username", body.username);
  params.append("password", body.password);

  try {
    const response = await axios.post(
      `${AUTH_BASE}/oauth/token`,
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    const token = response.data.access_token;

    // Set HTTP-only cookie
    const res = NextResponse.json({ success: true });
    res.headers.set(
      "Set-Cookie",
      cookie.serialize("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60, // 1 hour
      })
    );
    return res;
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }
}