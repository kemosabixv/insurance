"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authcontext";
import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  type?: string;
  coverage?: string;
  price: number;
}

export default function DashboardPage() {
  const { token, isLoggedIn } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    fetchProducts()
      .then(setProducts)
      .catch(() => router.push("/login"));
  }, [isLoggedIn, router]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-950">
        Insurance Products
      </h1>
      <button
        onClick={() => router.push("/")}
        className="justify- mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Home
      </button>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            type={product.type || "General"}
            coverage={product.coverage || "No description"}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
