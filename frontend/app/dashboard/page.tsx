"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authcontext";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  type?: string;
  coverage?: string;
  price: number;
}



export default function DashboardPage() {
  const { isLoggedIn } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
      async function loadProducts() {
      try {
        const res = await axios.get("/api/products");
        console.log("Fetched products:", res.data);
        setProducts(res.data);
      } catch (error) {
        setProducts([]);
        console.error("Failed to fetch products:", error);
      }
    }
    loadProducts();
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
