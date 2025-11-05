import React from "react";
import { NavLink } from "react-router-dom"

// Tipo base de producto usado en la tarjeta
interface Product {
  id: number;     // Identificador para variar posiciones/medidas por producto
  name: string;   // Nombre del producto
  price: number;  // Precio numérico
  image: string;  // Ruta/URL de la imagen
  rating: number; // Calificación (0–5)
}

interface Props {
  product: Product;
}

// Tarjeta de producto con dos vistas: móvil (<md) y desktop (>=md)
const ProductCardLandingDark: React.FC<Props> = ({ product }) => {
  return (
    <>
      {/* Vista móvil: tarjeta compacta con tamaño fijo para encajar 2x2 en el grid */}
      <div className="md:hidden">
        <div
          className="
            relative bg-gradient-to-b from-[#B40A9A] to-[#B40A9A]
            rounded-[18px] shadow-lg
            w-[160px] h-[220px] p-3
            flex flex-col items-center justify-end overflow-hidden
          "
        >
          {/* Capa de luz difusa que aporta profundidad al fondo */}
          <div
            className="absolute inset-0 opacity-90 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(200,60,255,0.65) 0%, rgba(100,0,150,0.2) 60%, transparent 100%)",
              filter: "blur(70px)",
              transform: "translateY(-10%)",
            }}
          />

          {/* Halo secundario para resaltar la zona central de la tarjeta */}
          <div
            className="
              absolute top-1/2 left-[28%] w-[120px] h-[80px]
              rounded-full blur-[50px] opacity-95 -translate-y-1/2
            "
            style={{
              background:
                "radial-gradient(circle, rgba(200,50,255,0.95) 0%, rgba(120,30,180,0.45) 100%)",
            }}
          />

          {/* Sello de precio, reducido para móvil y ubicado en la esquina superior derecha */}
          <div
            className="
              absolute right-2 top-3 bg-[#00d2c2] text-[#021026]
              font-bold rounded-full
              w-[60px] h-[60px] text-[11px]
              flex flex-col items-center justify-center
              shadow-[0_0_12px_rgba(0,210,194,0.8)]
            "
          >
            <p className="leading-none font-semibold text-[10px]">Price</p>
            <p className="leading-tight text-center">
              {product.price.toLocaleString()}
              <br />GLD
            </p>
          </div>

          {/* Imagen del producto: posiciones seguras por id para evitar solapamientos en móvil */}
          <img
            src={product.image}
            alt={product.name}
            className={`absolute object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.5)]
              ${
                product.id === 1
                  ? "w-[150px] h-[150px] left-[-6px] bottom-6"
                  : product.id === 2
                  ? "w-[160px] h-[140px] left-[-6px] bottom-7"
                  : product.id === 3
                  ? "w-[150px] h-[140px] left-0 bottom-6"
                  : "w-[160px] h-[140px] left-[-6px] bottom-6"
              }
            `}
          />

          {/* Rating compacto sobre pastilla blanca para contrastar con el fondo */}
          <div className="flex items-center justify-center gap-2 bg-white rounded-[16px] py-1 px-2 mt-auto mb-2 shadow-md">
            <div className="flex text-yellow-400 text-[12px] leading-none">
              {"★".repeat(5)}
            </div>
            <span className="text-gray-700 text-xs ml-1">{product.rating}</span>
          </div>

          {/* Botón principal de acción */}
          <button className="bg-[#2b0073] hover:bg-[#20005a] text-white text-xs font-semibold py-1.5 px-4 rounded-[8px] shadow-[0_3px_12px_rgba(180,100,255,0.45)]">
            Buy now
          </button>
        </div>
      </div>

      {/* Botón con glow claro */}
      <NavLink to={"/ProductsZaun"} >
      <button className="bg-[#2b0073] hover:bg-[#20005a] text-white text-sm font-semibold py-2.5 px-8 rounded-[8px] shadow-[0_6px_20px_rgba(180,100,255,0.45)] transition duration-300 translate-x-[-50px]">
        Buy now
      </button>
      </NavLink>
    </div>
      {/* Vista desktop: tarjeta completa con proporciones amplias y efectos más notorios */}
      <div className="hidden md:block">
        <div
          className="
            relative bg-gradient-to-b from-[#B40A9A] to-[#B40A9A]
            rounded-[22px] shadow-lg p-6
            w-[260px] h-[320px]
            flex flex-col items-center justify-end overflow-hidden
            transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300
          "
        >
          {/* Luz difusa principal para profundidad del fondo */}
          <div
            className="absolute inset-0 opacity-90 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(200,60,255,0.65) 0%, rgba(100,0,150,0.2) 60%, transparent 100%)",
              filter: "blur(80px)",
              transform: "translateY(-10%)",
            }}
          />

          {/* Halo adicional en la zona media-izquierda */}
          <div
            className="
              absolute top-[50%] left-[20%] w-[200px] h-[120px]
              rounded-full blur-[70px] opacity-95 -translate-y-1/2
            "
            style={{
              background:
                "radial-gradient(circle, rgba(200,50,255,0.95) 0%, rgba(120,30,180,0.45) 100%)",
            }}
          />

          {/* Sello de precio con mayor tamaño acorde a la tarjeta desktop */}
          <div
            className="
              absolute right-5 top-24 bg-[#00d2c2] text-[#021026]
              font-bold text-lg rounded-full
              w-[95px] h-[95px] flex flex-col items-center justify-center
              shadow-[0_0_18px_rgba(0,210,194,0.9)]
            "
          >
            <p className="text-sm font-semibold">Price</p>
            <p>
              {product.price.toLocaleString()}
              <br />GLD
            </p>
          </div>

          {/* Imagen del producto: clases dependientes del id para ajustar tamaño/posición */}
          <img
            src={product.image}
            alt={product.name}
            className={`absolute object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.55)]
              ${
                product.id === 1
                  ? "w-[260px] h-[300px] left-[-20px] bottom-15"
                  : product.id === 2
                  ? "w-[700px] h-[500px] left-[-20px] bottom-[-50px]"
                  : product.id === 3
                  ? "w-[400px] left-0 bottom-20"
                  : "w-[500px] left-[-45px] bottom-13"
              }
            `}
          />

          {/* Rating en pastilla con tipografía mayor que en móvil */}
          <div className="flex items-center justify-center gap-2 bg-white rounded-[22px] py-1.5 px-4 mt-auto mb-3 shadow-md translate-x-[-35px]">
            <div className="flex text-yellow-400 text-lg leading-none">
              {"★".repeat(5)}
            </div>
            <span className="text-gray-700 text-sm ml-1">{product.rating}</span>
          </div>

          {/* Botón de acción con sombra suave y transición */}
          <button className="bg-[#2b0073] hover:bg-[#20005a] text-white text-sm font-semibold py-2.5 px-8 rounded-[8px] shadow-[0_6px_20px_rgba(180,100,255,0.45)] transition duration-300 translate-x-[-50px]">
            Buy now
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCardLandingDark;
