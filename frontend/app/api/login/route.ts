import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
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
    const token = response.data.accessToken;
    console.log("Response from auth server:", response.data);
    console.log("Login successful, token:", response.data.accessToken);


    // Set HTTP-only cookie using Next.js cookies API
    const cookieStore = await cookies();
    cookieStore.set("access_token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
    });
    console.log("Access token set in cookies");
    console.log("Cookie store after setting token:", cookieStore.get("access_token"));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }
}