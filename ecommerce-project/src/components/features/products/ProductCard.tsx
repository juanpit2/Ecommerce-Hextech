import React from "react";

interface ProductCardProps {
  name: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  currency,
  rating,
  image,
  description,
}) => {
  return (
    <div className="relative bg-[#1A155A] text-white rounded-2xl p-6 w-[300px] shadow-lg flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2">
    
      {/* Círculo del precio */}
      <div className="absolute right-6 top-8 bg-[#20D0C2] text-[#1A155A] font-semibold rounded-full w-[100px] h-[100px] flex flex-col items-center justify-center text-center">
        <span className="text-sm">Price</span>
        <span className="text-xl font-bold">{price.toLocaleString()}</span>
        <span className="text-xs">{currency}</span>
      </div>
        {/* Imagen del producto */}
      <div className="absolute -top-30 left-1/3 -translate-x-1/2 w-[200px] h-[270px] flex items-center justify-center">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>


      {/* Contenido */}
      <div className="mt-24 flex flex-col gap-3">
        <h3 className="text-2xl font-bold">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2 bg-white/90 rounded-full px-3 py-1.5 w-fit">
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <span 
        key={i} 
        className="text-sm"
      >
        {i < Math.floor(rating) ? '⭐' : '☆'}
      </span>
    ))}
  </div>
  <span className="text-xs font-bold text-gray-800">{rating}</span>
</div>
        <p className="text-sm text-gray-300 leading-relaxed">{description}</p>

        <button className="mt-4 w-full  shadow-2xl bg-gradient-to-b from-[#3676B7] to-[#1C6CE5] hover:opacity-90 text-white font-semibold py-2 rounded-lg transition">
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;