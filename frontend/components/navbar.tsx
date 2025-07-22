"use client";
import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {getToken} from "@/lib/auth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };

  return (
    <header className="flex justify-between items-center p-6 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <Image
          src="/insurance-logo.svg"
          alt="Insurance App Logo"
          width={40}
          height={40}
        />
        <h1 className="text-xl font-bold text-blue-800">SecureShield Insurance</h1>
      </div>
      <nav>
        {isLoggedIn ? (
          <div className="flex gap-4 items-center">
            {/* logout and redirect to / */}
            <button
              onClick={() => {
                logout();
                window.location.href = "/";
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
