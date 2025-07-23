// /pages/api/me.ts
import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  const token = cookies.access_token || null;
  return NextResponse.json({ token });
}
