"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  setAuth: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  setAuth: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  const setAuth = (newToken: string | null) => {
    setToken(newToken);
  };

  useEffect(() => {
    async function syncAuth() {
      const { data } = await axios.get("/api/me");
      if (data.token) setAuth(data.token);
    }
    syncAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}