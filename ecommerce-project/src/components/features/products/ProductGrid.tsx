import React from "react";
import products from "../../data/products.json";
import ProductCard from "./ProductCard";

const ProductGrid: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-32 px-8">
      <h1 className="text-4xl font-bold text-center mb-24 text-gray-800">
        Catálogo de Productos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28 justify-items-center max-w-6xl mx-auto">
        {products.map((product) => (
          <ProductCard
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

export default ProductGrid;

