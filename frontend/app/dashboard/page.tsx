"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
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
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) return router.push("/login");

    fetchProducts(token)
      .then(setProducts)
      .catch(() => router.push("/login"));
  }, [router]);

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
