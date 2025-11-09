import React from "react";
import products from "../../data/products.json";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

// Muestra el catálogo y navega a /product/:id al hacer click en cada card
const ProductGrid: React.FC = () => {
  const navigate = useNavigate();

  const openProduct = (id: number) => {
    // Usa la URL con el id; si quieres, puedes enviar también el estado
    navigate(`/product/${id}`, { state: { id } });
  };

  return (
    <div className="min-h-screen bg-white pt-[-30] px-8">
      <h1 className="text-[32px] py-30 font-semibold text-[#0A0F1C] mt-14 mb-6 px-20">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28 justify-items-center py-5 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => openProduct(product.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openProduct(product.id);
            }}
          >
            <ProductCard
              name={product.name}
              price={product.price}
              currency={product.currency}
              rating={product.rating}
              image={product.image}
              description={product.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
