import axios from "axios";

const API_BASE = "http://localhost:4000";

export async function login(username: string, password: string) {
  const res = await axios.post(`${API_BASE}/oauth/token`, {
    grant_type: "password",
    client_id: "test_client",
    client_secret: "test_secret",
    username,
    password,
  });
  return res.data.access_token;
}

export async function fetchProducts(token: string) {
  const res = await axios.get(`${API_BASE}/api/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
