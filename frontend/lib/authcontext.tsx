"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

type AuthContextType = {
  isLoggedIn: boolean;
  setAuth: (isAuthenticated: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setAuth: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    async function syncAuth() {
      try {
        const { data } = await axios.get("/api/me");
        setIsLoggedIn(!!data.token); // Update based on server response
        console.log("Auth context, isLoggedIn:", data.token ? true : false);
      } catch (error) {
        setIsLoggedIn(false);
      }
    }
    syncAuth();
  }, []);

  const setAuth = (isAuthenticated: boolean) => {
    setIsLoggedIn(isAuthenticated);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}