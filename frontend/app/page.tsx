"use client";
import Link from "next/link";
import { useAuth } from "@/lib/authcontext";
import ShieldIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function Home() {
const { isLoggedIn } = useAuth();

  const features = [
    {
      icon: <ShieldIcon fontSize="large" className="text-blue-600" />,
      title: "Comprehensive Coverage",
      description:
        "Protection against all major risks with customizable options",
    },
    {
      icon: <SupportAgentIcon fontSize="large" className="text-blue-600" />,
      title: "24/7 Support",
      description: "Our team is always available to assist you",
    },
    {
      icon: <AttachMoneyIcon fontSize="large" className="text-blue-600" />,
      title: "Affordable Premiums",
      description: "Competitive rates with flexible payment options",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <main className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Protect What Matters Most
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Comprehensive insurance solutions tailored to your needs. Get
            covered in minutes.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href=""
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              {feature.icon}
              <h3 className="mt-4 font-semibold text-black">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-50 py-12 mt-16">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} SecureShield Insurance. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
