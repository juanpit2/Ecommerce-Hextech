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
    <div className="min-h-screen bg-white px-8 max-sm:px-3">
      <h1 className="text-[32px] font-semibold text-[#0A0F1C] mt-14 mb-6 px-20 max-sm:text-xl max-sm:mt-8 max-sm:mb-4 max-sm:px-2">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-50 py-30 max-w-6xl mx-auto max-sm:grid-cols-2 max-sm:gap-x-2 max-sm:gap-y-24 max-sm:py-12">
        {products.map((p) => (
          <div
            key={p.id}
            className="cursor-pointer max-sm:flex max-sm:justify-center"
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
