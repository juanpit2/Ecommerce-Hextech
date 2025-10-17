import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

interface ProductCardLandingProps {
  product: Product;
}

const ProductCardLanding: React.FC<ProductCardLandingProps> = ({ product }) => {
  const { name, price, rating, image } = product;

  return (
    <div className="relative bg-gradient-to-b from-[#1B1361] to-[#0E0F2C] text-white rounded-2xl p-6 w-[260px] shadow-xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2">
      {/* Imagen del producto */}
      <div className="flex items-center justify-center mb-4 mt-4">
        <img src={image} alt={name} className="w-44 h-44 object-contain" />
      </div>

      {/* Círculo del precio */}
      <div className="absolute right-4 top-4 bg-[#20D0C2] text-[#1A155A] font-semibold rounded-full w-[90px] h-[90px] flex flex-col items-center justify-center text-center">
        <span className="text-xs">Price</span>
        <span className="text-lg font-bold">{price.toLocaleString()}</span>
        <span className="text-[10px]">GLD</span>
      </div>

      {/* Nombre del producto */}
      <h3 className="text-lg font-bold mt-4">{name}</h3>

      {/* Rating con estrellas */}
      <div className="flex items-center gap-2 mt-2">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">
              {i < Math.floor(rating) ? "★" : "☆"}
            </span>
          ))}
        </div>
        <span className="text-sm font-medium">{rating}</span>
      </div>

      {/* Botón */}
      <button className="mt-4 w-full bg-gradient-to-b from-[#2EB7E5] to-[#1C6CE5] hover:opacity-90 text-white font-semibold py-2 rounded-lg transition">
        Buy now
      </button>
    </div>
  );
};

export default ProductCardLanding;

