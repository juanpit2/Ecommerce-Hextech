import React from "react";
import products from "../../data/products.json";
import ProductCard from "./ProductCard";

// Componente que muestra un catálogo de productos en formato de cuadrícula
const ProductGrid: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-32 px-8">
      {/* Título principal del catálogo */}
     

      {/* 
        Contenedor en grid responsivo:
        - 1 columna en móviles
        - 2 columnas en pantallas medianas (sm)
        - 3 columnas en pantallas grandes (lg)
        - gap-x → separación horizontal
        - gap-y → separación vertical entre tarjetas
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28 justify-items-center max-w-6xl mx-auto">
        {/* Mapeo de productos (JSON) para generar una tarjeta por cada uno */}
        {products.map((product) => (
          <ProductCard
            key={product.id} // Identificador único por producto
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
