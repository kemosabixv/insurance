import React from "react";

export default function Login({
  username,
  setUsername,
  password,
  setPassword,
  error,
  handleLogin,
  isLoading,
}: {
  username: string;
  setUsername: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  error: string;
  handleLogin: (e: React.FormEvent) => void;
  isLoading: boolean;
}) {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-black">Login</h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label
            className="block text-sm font-medium mb-1 text"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full p-2 border text rounded"
            id="username"
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1 text"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full p-2 border text rounded"
            id="password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          id="login-btn"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          type="submit"
          disabled={isLoading}
        >
          Login
        </button>
        {error && (
          <div className="mt-2 text-red-600 text-sm" data-testid="login-error">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
