"use client";
import { useEffect } from "react";
import Link from "next/link";
import { getToken } from "@/lib/auth";
import ShieldIcon from "@mui/icons-material/Security";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authcontext";



const Navbar = () => {
  const { isLoggedIn, setLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(!!getToken());
  }, [setLoggedIn]);

  const logout = () => {
    localStorage.removeItem("access_token");
    setLoggedIn(false);
  };

  return (
    <header className="flex justify-between items-center p-6 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <ShieldIcon
          fontSize="large"
          style={{ color: "#6b7280" }}
          className="mr-2"
        />
        <h1 className="text-xl font-bold text-blue-800">
          SecureShield Insurance
        </h1>
      </div>
      <nav>
        {isLoggedIn ? (
          <div className="flex gap-4 items-center">
            <button
              onClick={() => {
                logout();
                router.push("/");
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
