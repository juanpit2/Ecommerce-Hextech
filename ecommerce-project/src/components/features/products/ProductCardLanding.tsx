import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

interface ProductCardLandingProps {
  product: Product;
  theme?: "light" | "dark";
}

const ProductCardLanding: React.FC<ProductCardLandingProps> = ({ product }) => {
  return (
    <div className="relative bg-gradient-to-b from-[#1a1646] to-[#241e64] rounded-[22px] shadow-lg p-6 w-[260px] h-[320px] flex flex-col items-center justify-end overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
      {/* Glow / sombra difusa más viva */}
      <div
        className="absolute top-[50%] left-[20%] w-[200px] h-[120px] rounded-full blur-[70px] opacity-90 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,50,0.9) 0%, rgba(255,120,0,0.4) 100%)",
        }}
      ></div>
            {/* Círculo del precio */}
      <div className="absolute right-5 top-25 bg-[#1ee4cf] text-[#0a1033] font-bold text-lg rounded-full w-[95px] h-[95px] flex flex-col items-center justify-center shadow-[0_0_18px_rgba(30,228,207,0.9)]">
        <p className="text-sm font-semibold">Price</p>
        <p>
          {product.price.toLocaleString()}
          <br />
          GLD
        </p>
      </div>


      {/* Imagen del producto (más arriba y más a la izquierda) */}
      <img
  src={product.image}
  alt={product.name}
  className={`absolute object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.55)] ${
    product.id === 1
      ? "w-[260px]  h-[300px] left-[-35px] bottom-10"
      : product.id === 2
      ? "w-[500px] h-[500px]left-2 bottom-25"
      : product.id === 3
      ? "w-[250px] left-0 bottom-20"
      : "w-[500px]  left-[-10px] bottom-30 rotate-[-20deg]"
  }`}
/>


      {/* Rating dentro de rectángulo más redondeado (más a la izquierda) */}
      <div className="flex items-center justify-center gap-1 bg-white rounded-[20px] py-1.5 px-4 mt-auto mb-3 shadow-md translate-x-[-35px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg leading-none">
            ★
          </span>
        ))}
        <span className="text-gray-700 text-sm ml-1">{product.rating}</span>
      </div>

      {/* Botón con más sombra clara (más a la izquierda) */}
      <button className="bg-[#2c4de2] hover:bg-[#1e37b6] text-white text-sm font-semibold py-2.5 px-8 rounded-[10px] shadow-[0_4px_20px_rgba(80,130,255,0.7)] transition duration-300 translate-x-[-50px]">
        Buy now
      </button>
    </div>
  );
};

export default ProductCardLanding;
