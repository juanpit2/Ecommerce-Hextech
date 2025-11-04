import React from "react";
import { NavLink } from "react-router-dom"

// Tipado base del producto que renderiza la tarjeta
interface Product {
  id: number;     // Identificador para ajustar tamaños/posiciones por caso
  name: string;   // Nombre del producto
  price: number;  // Precio numérico (se formatea con toLocaleString)
  image: string;  // Ruta/URL de la imagen del producto
  rating: number; // Calificación (0–5)
}

interface ProductCardLandingProps {
  product: Product;
  theme?: "light" | "dark"; // (opcional) no se usa aquí, reservado para variantes
}

// Tarjeta con dos variantes: móvil (<md) y desktop (>=md)
const ProductCardLanding: React.FC<ProductCardLandingProps> = ({ product }) => {
  return (
    <>
      {/* Variante móvil: tarjeta compacta pensada para grillas 2x2 */}
      <div className="md:hidden">
        <div
          className="
            relative bg-gradient-to-b from-[#1a1646] to-[#241e64]
            rounded-[18px] shadow-lg
            w-full h-[220px] p-3
            flex flex-col items-center justify-end overflow-hidden
          "
        >
          {/* Capa de glow cálido para profundidad */}
          <div
            className="absolute top-1/2 left-1/3 w-[140px] h-[90px] rounded-full blur-[55px] opacity-90 -translate-y-1/2 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,180,50,0.9) 0%, rgba(255,120,0,0.4) 100%)",
            }}
          />

          {/* Sello de precio (reducido para móvil) */}
          <div className="absolute right-2 top-3 bg-[#1ee4cf] text-[#0a1033] font-bold text-[11px] rounded-full w-[60px] h-[60px] flex flex-col items-center justify-center shadow-[0_0_12px_rgba(30,228,207,0.8)]">
            <p className="leading-none font-semibold text-[10px]">Price</p>
            <p className="leading-tight text-center text-[11px]">
              {product.price.toLocaleString()}
              <br />
              GLD
            </p>
          </div>

          {/* Imagen del producto con posiciones seguras según id (evita solapes en móvil) */}
          <img
            src={product.image}
            alt={product.name}
            className={`absolute object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.5)]
              ${
                product.id === 1
                  ? "w-[150px] h-[150px] left-[-6px] bottom-6"
                  : product.id === 2
                  ? "w-[160px] h-[140px] left-0 bottom-6"
                  : product.id === 3
                  ? "w-[150px] h-[140px] left-0 bottom-6"
                  : "w-[160px] h-[140px] left-[-6px] bottom-6"
              }
            `}
          />

          {/* Rating compacto en pastilla blanca para contraste */}
          <div className="flex items-center justify-center gap-1 bg-white rounded-[16px] py-1 px-2 mt-auto mb-2 shadow-md">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-[12px] leading-none">
                ★
              </span>
            ))}
            <span className="text-gray-700 text-xs ml-1">{product.rating}</span>
          </div>

          {/* Botón de acción principal */}
          <button className="bg-[#2c4de2] hover:bg-[#1e37b6] text-white text-xs font-semibold py-1.5 px-4 rounded-[8px] shadow-[0_3px_12px_rgba(80,130,255,0.6)]">
            Buy now
          </button>
        </div>
      </div>

      {/* Botón con más sombra clara (más a la izquierda) */}
      <NavLink to={"/Products"} >
      <button className="bg-[#2c4de2] hover:bg-[#1e37b6] text-white text-sm font-semibold py-2.5 px-8 rounded-[10px] shadow-[0_4px_20px_rgba(80,130,255,0.7)] transition duration-300 translate-x-[-50px]">
        Buy now
        
      </button>
      </NavLink>
    </div>
      {/* Variante desktop: tarjeta grande con halo y sombras más notorias */}
      <div className="hidden md:block">
        <div className="relative bg-gradient-to-b from-[#1a1646] to-[#241e64] rounded-[22px] shadow-lg p-6 w-[260px] h-[320px] flex flex-col items-center justify-end overflow-hidden transition-transform hover:-translate-y-1 duration-300">
          {/* Glow principal en el fondo */}
          <div
            className="absolute top-[50%] left-[20%] w-[200px] h-[120px] rounded-full blur-[70px] opacity-90 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, rgba(255,180,50,0.9) 0%, rgba(255,120,0,0.4) 100%)",
            }}
          />

          {/* Sello de precio (tamaño acorde a desktop) */}
          <div className="absolute right-5 top-25 bg-[#1ee4cf] text-[#0a1033] font-bold text-lg rounded-full w-[95px] h-[95px] flex flex-col items-center justify-center shadow-[0_0_18px_rgba(30,228,207,0.9)]">
            <p className="text-sm font-semibold">Price</p>
            <p>
              {product.price.toLocaleString()}
              <br />
              GLD
            </p>
          </div>

          {/* Imagen del producto: posiciones/tamaños diferenciados por id (mantiene tu lógica) */}
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

          {/* Rating en pastilla con tipografía mayor */}
          <div className="flex items-center justify-center gap-1 bg-white rounded-[20px] py-1.5 px-4 mt-auto mb-3 shadow-md translate-x-[-35px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg leading-none">
                ★
              </span>
            ))}
            <span className="text-gray-700 text-sm ml-1">{product.rating}</span>
          </div>

          {/* Botón principal, mayor tamaño y sombra */}
          <button className="bg-[#2c4de2] hover:bg-[#1e37b6] text-white text-sm font-semibold py-2.5 px-8 rounded-[10px] shadow-[0_4px_20px_rgba(80,130,255,0.7)] transition duration-300 translate-x-[-50px]">
            Buy now
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCardLanding;
