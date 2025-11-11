import React from "react";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { firstImage } from "../../../utils/images";

const ProductGrid: React.FC = () => {
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.products.items);

  const openProduct = (id: number) => {
    navigate(`/product/${id}`, { state: { id } });
  };

  return (
    <div className="min-h-screen bg-white px-8">
      <h1 className="text-[32px] font-semibold text-[#0A0F1C] mt-14 mb-6 px-20">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-50 py-30 max-w-6xl mx-auto">
        {products.map((p) => (
          <div
            key={p.id}
            className="cursor-pointer"
            onClick={() => openProduct(p.id)}
          >
            <ProductCard
              name={p.name}
              price={p.price}
              currency={p.currency ?? "GLD"}
              rating={p.rating ?? 5}
              image={firstImage(p)}        
              description={p.description ?? ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
