import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";
import axios from "axios";

const API_BASE = "http://localhost:4000";

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  const token = cookies.access_token;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await axios.get(`${API_BASE}/api/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}