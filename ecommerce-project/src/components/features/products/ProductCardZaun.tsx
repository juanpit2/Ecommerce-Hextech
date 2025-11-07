import React from "react";

// Tipado de las propiedades que recibe la tarjeta de producto de Zaun
interface ProductCardZaunProps {
  name: string;        // Nombre del producto
  price: number;       // Precio numérico del producto
  currency: string;    // Moneda (ej. "GLD")
  rating: number;      // Calificación (0 a 5)
  image: string;       // Ruta o URL de la imagen del producto
  description: string; // Descripción corta del producto
}

// Componente funcional que representa una tarjeta de producto de Zaun
const ProductCardZaun: React.FC<ProductCardZaunProps> = ({
  name,
  price,
  currency,
  rating,
  image,
  description,
}) => {
  return (
    <div
      className="
        relative bg-gradient-to-b from-[#E10098] to-[#C00AA2] text-white rounded-3xl p-6 w-[300px] shadow-2xl
        flex flex-col justify-between
        transition-transform duration-300 hover:-translate-y-2
      "
    >
      {/* 
        - Contenedor principal de la tarjeta.
        - Fondo degradado magenta/rosa (#E10098 a #C4008A) con texto blanco.
        - Bordes más redondeados (rounded-3xl) para coincidir con el diseño.
        - Efecto de elevación (sombra) y animación sutil al hacer hover.
      */}

      {/* Círculo del precio (posición fija en la esquina superior derecha) */}
      <div
        className="
          absolute right-6 top-8
          bg-[#00D9CC] text-[#0C435B] font-bold
          rounded-full w-[100px] h-[100px]
          flex flex-col items-center justify-center text-center shadow-xl
        "
      >
        <span className="text-xs font-semibold">Price</span>
        <span className="text-xl font-black leading-tight">{price.toLocaleString()}</span>
        <span className="text-xs font-semibold">{currency}</span>
      </div>

      {/* 
        - Muestra el precio dentro de un círculo cyan (#00D9CC).
        - Texto magenta para contrastar con el fondo.
        - Usa `toLocaleString()` para formatear números con separadores.
      */}

      {/* Imagen del producto (centrada visualmente sobre la tarjeta) */}
      <div
        className="
          absolute -top-24 left-1/2 -translate-x-1/2
          w-[300px] h-[220px] flex items-center justify-center z-10
        "
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
        />
      </div>

      {/* 
        - Imagen colocada en posición absoluta para que sobresalga del borde superior.
        - object-contain evita que se deforme y mantiene proporción.
        - drop-shadow agrega sombra dramática a la imagen.
      */}

      {/* Contenido textual e interactivo de la tarjeta */}
      <div className="mt-28 flex flex-col gap-3">
        {/* Nombre del producto */}
        <h3 className="text-2xl font-bold leading-tight">{name}</h3>

        {/* Rating con estrellas y valor numérico con fondo blanco */}
        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 w-fit shadow-md">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-sm">
                {i < Math.floor(rating) ? "⭐" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-xs font-bold text-[#E10098]">{rating}</span>
        </div>

        {/* 
          - Genera 5 estrellas.
          - Las llenas (⭐) corresponden al número entero del rating.
          - Muestra el valor numérico en magenta al lado derecho.
          - Fondo blanco redondeado completo.
        */}

        {/* Descripción del producto */}
        <p className="text-sm text-white/90 leading-relaxed">{description}</p>

        {/* Botón de compra */}
        <button
          className="
            mt-4 w-full
            bg-gradient-to-r from-[#2B1C7D] to-[#4C1D95]
            hover:opacity-90 text-white font-bold py-2.5 rounded-lg transition-all shadow-lg shadow-purple-600
          "
        >
          Buy now
        </button>

        {/* 
          - Botón con gradiente morado oscuro.
          - Efecto hover que reduce la opacidad.
          - Bordes redondeados y sombra para profundidad.
        */}
      </div>
    </div>
  );
};

export default ProductCardZaun;