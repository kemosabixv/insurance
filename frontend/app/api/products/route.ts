import { NextRequest, NextResponse } from "next/server";
import {cookies} from "next/headers";
import axios from "axios";


const API_BASE = "http://localhost:4000";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  console.log("cookieStore:", cookieStore);
  const token = cookieStore.get("access_token")?.value || null;
  console.log("Token from cookies:", token);

  if (!token) {
    console.error("No access token found in cookies")
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