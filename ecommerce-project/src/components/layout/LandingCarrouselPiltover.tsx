// Importación del hook useState para manejar el estado del índice del carrusel
import { useState } from "react"

// Importación de las imágenes del carrusel
import Banner1 from "../../../public/images/LandingCarrouselPiltover.png"
import Banner2 from "../../../public/images/LandingCarrouselPiltover2.png"
import Banner3 from "../../../public/images/LandingCarrouselPiltover3.png"

// Array que contiene todas las imágenes del carrusel
const IMAGES = [Banner1, Banner2, Banner3]

// Componente principal del carrusel
export default function LandingCarousel() {
  // Estado que controla qué imagen se muestra actualmente
  const [index, setIndex] = useState(0)

  // Función que muestra la imagen anterior (retrocede circularmente)
  function prev() {
    setIndex(i => (i - 1 + IMAGES.length) % IMAGES.length)
  }

  // Función que muestra la siguiente imagen (avanza circularmente)
  function next() {
    setIndex(i => (i + 1) % IMAGES.length)
  }

  // Función que permite ir a una imagen específica por índice
  function goTo(i: number) {
    setIndex(i % IMAGES.length)
  }

  return (
    <div className="relative">
      {/* Contenedor principal del carrusel */}
      <div className="relative flex items-center justify-center h-64 max-sm:h-40">
        
        {/* Imagen actual mostrada */}
        <img
          src={IMAGES[index]}
          alt={`Slide ${index + 1}`}
          className="
            mx-auto block object-contain max-w-full h-auto
            max-sm:max-w-[90%] max-sm:max-h-[180px]
          "
        />

        {/* Botón para ir a la imagen anterior */}
        <button
          aria-label="Anterior"
          onClick={prev}
          className="
            absolute left-20 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white
            p-1 rounded-full shadow-sm z-10
            max-sm:left-4 max-sm:p-1 max-sm:bg-white/80
          "
        >
          {/* Flecha izquierda (SVG) */}
          <svg
            className="w-4 h-4 max-sm:w-3.5 max-sm:h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M15 18l-6-6 6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Botón para ir a la imagen siguiente */}
        <button
          aria-label="Siguiente"
          onClick={next}
          className="
            absolute right-20 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white
            p-1 rounded-full shadow-sm z-10
            max-sm:right-4 max-sm:p-1 max-sm:bg-white/80
          "
        >
          {/* Flecha derecha (SVG) */}
          <svg
            className="w-4 h-4 max-sm:w-3.5 max-sm:h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M9 6l6 6-6 6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Indicadores inferiores (puntos que muestran la posición actual) */}
      <div
        className="
          flex justify-center gap-2 mt-[160px]
          max-sm:mt-4 max-sm:gap-1.5
        "
      >
        {IMAGES.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir a slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`
              w-2 h-2 rounded-full transition-shadow duration-150
              ${i === index ? "bg-black shadow-lg" : "bg-gray-300"}
              max-sm:w-1.5 max-sm:h-1.5
            `}
          />
        ))}
      </div>
    </div>
  )
}
