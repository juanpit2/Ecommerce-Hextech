import React from "react";
import products from "../../data/productsZaunGrid.json";
import ProductCardZaun from "./ProductCardZaun";

const ProductGridZaun: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0C] py-32 px-8">
      {/* Título */}
      <h2 className="text-center text-4xl font-bold text-[#5CF1A0] mb-20 tracking-tight">
        Productos Distorsionados
      </h2>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-32 justify-items-center max-w-6xl mx-auto">
        {products.map((product) => (
          <ProductCardZaun
            key={product.id}
            name={product.name}
            price={product.price}
            currency={product.currency}
            rating={product.rating}
            image={product.image}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGridZaun;
