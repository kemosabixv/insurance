import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/authcontext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecureShield Insurance",
  description: "Comprehensive insurance solutions tailored to your needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`}>
        <div className="min-h-full flex flex-col">
          <>
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
          </>
        </div>
      </body>
    </html>
  );
}
