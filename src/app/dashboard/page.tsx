"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { fetchProducts } from "@/lib/api";

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
      <h1 className="text-2xl font-bold mb-4">Insurance Products</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.type}</p>
            <p className="text-sm">{product.coverage}</p>
            <p className="text-blue-600 font-bold mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
