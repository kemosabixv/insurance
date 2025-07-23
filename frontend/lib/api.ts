import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";

const API_BASE = "http://localhost:4000";
const AUTH_BASE = "http://localhost:4001"; // Authorization server base URL

export async function login(username: string, password: string) {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("client_id", "test_client");
    params.append("client_secret", "test_secret");
    params.append("username", username);
    params.append("password", password);

    const res = await axios.post(
      `${AUTH_BASE}/oauth/token`,
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return res.data.access_token;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error("Invalid credentials");
    }
    if (err.response?.status === 400) {
      throw new Error("Malformed request");
    }
    throw new Error("Network error");
  }
}

export async function fetchProducts() {
  const res = await axios.get("/api/products");
  return res.data;
}

// Example: get token from cookie in API route
export function getTokenFromCookie(req: NextApiRequest) {
  const cookies = cookie.parse(req.headers.cookie || "");
  return cookies.access_token;
}

