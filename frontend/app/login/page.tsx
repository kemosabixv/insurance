"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { saveToken } from "@/lib/auth";
import Login from "@/components/Login";
import { getToken } from "@/lib/auth";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await login(username, password);
      saveToken(token);
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