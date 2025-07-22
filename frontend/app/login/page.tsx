"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { saveToken } from "@/lib/auth";
import Login from "@/components/Login";
import { getToken } from "@/lib/auth";
import { useAuth } from "@/lib/authcontext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setLoggedIn } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await login(username, password);
      saveToken(token);
      setError("");
      setLoggedIn(true);
      router.push("/dashboard");
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    if (getToken()) {
      router.push("/dashboard");
    }
  }, [router]);

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
