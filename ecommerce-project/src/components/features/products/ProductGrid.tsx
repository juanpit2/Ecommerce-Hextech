import React from "react";
import products from "../../data/products.json";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  title?: string | null;
  subtitle?: string | null;
  showSeeAll?: boolean;
  limit?: number;
}


const ProductGrid: React.FC<ProductGridProps> = ({
  title = "Products",
  subtitle,
  showSeeAll = false,
  limit,
}) => {
  // Si hay un límite, recortamos el array
  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    
      
     <div className="min-h-screen bg-white pt-[-30] px-8">
  {/* Título principal (se muestra solo si title existe) */}
  {title && (
    <h1 className="text-[32px] py-30 font-semibold text-[#0A0F1C] mt-14 mb-2 px-20">
      {title}
    </h1>
  )}

  {/* Subtítulo (solo aparece si se lo pasas) */}
  {subtitle && (
    <div className="flex items-center  justify-between px-20 mb-6">
      <h2 className="text-2xl gap-y-50 font-bold text-[#00060D] opacity-100">{subtitle}</h2>

      {/* Botón "See All" (solo aparece si showSeeAll=true) */}
      {showSeeAll && (
        <button className=" w-24 h-8 text-[#00060D] bg-[#06C3CE] rounded-xl font-semibold hover:underline shadow-xl transition">
          See all
        </button>
      )}
    </div>
  )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-40 justify-items-center py-40 max-w-6xl mx-auto">
        {displayedProducts.map((product) => (
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
