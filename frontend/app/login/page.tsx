"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import Login from "@/components/Login";
import { useAuth } from "@/lib/authcontext";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/login", { username, password });
      const { data } = await axios.get("/api/me");
      auth.setAuth(data.token);
      setError("");
      router.push("/dashboard");
    } catch (err: any) {
      if (err.message === "Invalid credentials") {
        setError("invalid credentials");
      } else if (err.message === "Malformed request") {
        setError("Please check your request format");
      } else {
        setError("Network error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (auth && auth.token) {
      router.push("/dashboard");
    }
  }, [router, auth]);

  return (
    <Login
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      error={error}
      handleLogin={handleLogin}
      isLoading={isLoading}
    />
  );
}
