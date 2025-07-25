import React from "react";

interface ProductCardProps {
  name: string;
  type: string;
  coverage: string;
  price: number;
}

export default function ProductCard({
  name,
  type,
  coverage,
  price,
}: ProductCardProps) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-semibold text-lg text-black">{name}</h2>
      <p className="text-sm text-blue-600">{type}</p>
      <p className="text">{coverage}</p>
      <p className="text-blue-600 font-bold mt-2">${price}</p>
    </div>
  );
}
