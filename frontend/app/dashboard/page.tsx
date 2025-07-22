"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

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
      <h1 className="text-2xl font-bold mb-4 text-blue-950">Insurance Products</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
        {products.map((product: any) => (
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
