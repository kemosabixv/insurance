import axios from "axios";
const API_BASE = "http://localhost:4000";

export async function login(username: string, password: string) {
  try {
    const res = await axios.post(`${API_BASE}/oauth/token`, {
      grant_type: "password",
      client_id: "test_client",
      client_secret: "test_secret",
      username,
      password,
    });
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

export async function fetchProducts(token: string) {
  const res = await axios.get(`${API_BASE}/api/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
