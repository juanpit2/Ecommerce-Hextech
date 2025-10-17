import React from "react";
import { NavLink } from "react-router-dom"

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

interface Props {
  product: Product;
}

const ProductCardLandingDark: React.FC<Props> = ({ product }) => {
  return (
    <div className="relative bg-gradient-to-b from-[#B40A9A] to-[#B40A9A] rounded-[22px] shadow-lg p-6 w-[260px] h-[320px] flex flex-col items-center justify-end overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
      {/* ✨ Sombra vertical morada central */}
      <div
        className="absolute inset-0 opacity-90 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,60,255,0.65) 0%, rgba(100,0,150,0.2) 60%, transparent 100%)",
          filter: "blur(80px)",
          transform: "translateY(-10%)",
        }}
      />

      {/* Glow / sombra secundaria (más viva para dark) */}
      <div
        className="absolute top-[50%] left-[20%] w-[200px] h-[120px] rounded-full blur-[70px] opacity-95 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(200,50,255,0.95) 0%, rgba(120,30,180,0.45) 100%)",
        }}
      />

      {/* Círculo del precio (turquesa brillante) */}
      <div className="absolute right-5 top-24 bg-[#00d2c2] text-[#021026] font-bold text-lg rounded-full w-[95px] h-[95px] flex flex-col items-center justify-center shadow-[0_0_18px_rgba(0,210,194,0.9)]">
        <p className="text-sm font-semibold">Price</p>
        <p>
          {product.price.toLocaleString()}
          <br />
          GLD
        </p>
      </div>

      {/* Imagen (posiciones individuales por id) */}
      <img
        src={product.image}
        alt={product.name}
        className={`absolute object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.55)] ${
          product.id === 1
            ? "w-[260px] h-[300px] left-[-20px] bottom-15"
            : product.id === 2
            ? "w-[700px] h-[500px] left-[-20px] right- bottom-[-50px]"
            : product.id === 3
            ? "w-[400px] left-0 bottom-20"
            : "w-[500px] left-[-45px] bottom-13 "
        }`}
      />

      {/* Reviews dentro de rectángulo blanco redondeado */}
      <div className="flex items-center justify-center gap-2 bg-white rounded-[22px] py-1.5 px-4 mt-auto mb-3 shadow-md translate-x-[-35px]">
        <div className="flex text-yellow-400 text-lg leading-none">
          {"★".repeat(5)}
        </div>
        <span className="text-gray-700 text-sm ml-1">{product.rating}</span>
      </div>

      {/* Botón con glow claro */}
      <NavLink to={"/ProductsZaun"} >
      <button className="bg-[#2b0073] hover:bg-[#20005a] text-white text-sm font-semibold py-2.5 px-8 rounded-[8px] shadow-[0_6px_20px_rgba(180,100,255,0.45)] transition duration-300 translate-x-[-50px]">
        Buy now
      </button>
      </NavLink>
    </div>
  );
};

export default ProductCardLandingDark;
