import React from "react";

// Tipado de las propiedades que recibe la tarjeta de producto
interface ProductCardProps {
  name: string;        // Nombre del producto
  price: number;       // Precio numérico del producto
  currency: string;    // Moneda (ej. "USD", "GLD")
  rating: number;      // Calificación (0 a 5)
  image: string;       // Ruta o URL de la imagen del producto
  description: string; // Descripción corta del producto
}

// Componente funcional que representa una tarjeta de producto
const ProductCard: React.FC<ProductCardProps> = ({
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
        relative bg-[#1A155A] text-white rounded-2xl p-6 w-[300px] shadow-lg
        flex flex-col justify-between
        transition-transform duration-300 hover:-translate-y-2
      "
    >
      {/* 
        - Contenedor principal de la tarjeta.
        - Fondo morado oscuro (#1A155A) con texto blanco.
        - Efecto de elevación (sombra) y animación sutil al hacer hover.
      */}

      {/* Círculo del precio (posición fija en la esquina superior derecha) */}
      <div
        className="
          absolute right-6 top-8
          bg-[#20D0C2] text-[#1A155A] font-semibold
          rounded-full w-[100px] h-[100px]
          flex flex-col items-center justify-center text-center
        "
      >
        <span className="text-sm">Price</span>
        <span className="text-xl font-bold">{price.toLocaleString()}</span>
        <span className="text-xs">{currency}</span>
      </div>

      {/* 
        - Muestra el precio dentro de un círculo turquesa.
        - Centra el texto vertical y horizontalmente.
        - Usa `toLocaleString()` para formatear números con separadores.
      */}

      {/* Imagen del producto (centrada visualmente sobre la tarjeta) */}
      <div
        className="
          absolute -top-30 left-1/3 -translate-x-1/2
          w-[200px] h-[270px] flex items-center justify-center
        "
      >
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>

      {/* 
        - Imagen colocada en posición absoluta para que sobresalga del borde superior.
        - object-contain evita que se deforme y mantiene proporción.
      */}

      {/* Contenido textual e interactivo de la tarjeta */}
      <div className="mt-40 flex flex-col min-h-[140px] justify-between gap-4">
        {/* Nombre del producto */}
        <h3 className="text-2xl font-bold truncate">{name}</h3>

        {/* Rating con estrellas y valor numérico */}
        <div className="flex items-center gap-3 bg-white/90 rounded-full px-4 py-2 w-fit">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-sm">
                {i < Math.floor(rating) ? "⭐" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-xs font-bold text-gray-800">{rating}</span>
        </div>

        {/* Descripción del producto */}
        <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">{description}</p>

        {/* Botón de compra */}
        <button
          className="
            mt-2 w-full shadow-2xl
            bg-gradient-to-b from-[#3676B7] to-[#1C6CE5]
            hover:opacity-90 text-white font-semibold py-2 rounded-lg transition
          "
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
