import React from "react";
import products from "../../data/products.json";
import ProductCard from "./ProductCard";

const ProductGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 justify-items-center">
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
  );
};

export default ProductGrid;

