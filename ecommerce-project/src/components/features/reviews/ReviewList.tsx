import React, { useRef, useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import reviewsData from "../../data/reviews.json";

// Tipo para cada reseña proveniente del JSON
type Review = {
  id: string;         // Identificador único de la reseña
  name: string;       // Nombre del autor de la reseña
  rating: number;     // Calificación (0–5)
  description: string;// Texto de la reseña
};

// Normaliza el JSON tipándolo como arreglo de Review
const reviews: Review[] = reviewsData as Review[];

// Lista de reseñas con carrusel horizontal y paginación por "snap"
const ReviewList: React.FC = () => {
  // Referencia al contenedor scrollable
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Referencias a cada item para medir su ancho (incluyendo gap)
  const itemRefs = useRef<HTMLDivElement[]>([]);
  // Índice activo (para los dots/puntos indicadores)
  const [active, setActive] = useState(0);

  // Sincroniza el índice activo con la posición de scroll del contenedor
  useEffect(() => {
    const c = containerRef.current;
    if (!c || itemRefs.current.length === 0) return;

    // Calcula el índice aproximado dividiendo el scrollLeft por el ancho de un ítem
    const onScroll = () => {
      const itemWidth = itemRefs.current[0].getBoundingClientRect().width + 24; // 24px ≈ gap-6
      const index = Math.round(c.scrollLeft / itemWidth);
      setActive(index);
    };

    c.addEventListener("scroll", onScroll, { passive: true });
    // Forza el cálculo al montar para inicializar el indicador
    onScroll();
    return () => c.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="px-6 py-8">
      {/* Título de la sección */}
      <h2 className="text-2xl font-bold mb-6">User reviews</h2>

      <div className="relative">
        {/* Contenedor scroll horizontal con snap por ítem */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-4 py-2 snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {reviews.map((r, i) => (
            <div
              key={r.id}
              ref={(el) => {
                if (!el) return;
                itemRefs.current[i] = el; // Guarda la referencia del ítem para medir ancho
              }}
              className="snap-start flex-none w-auto h-[220px]"
            >
              {/* Tarjeta de reseña */}
              <ReviewCard name={r.name} rating={r.rating} description={r.description} />
            </div>
          ))}
        </div>

        {/* Indicadores/dots para móvil: permiten saltar a una tarjeta específica */}
        <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
          {reviews.map((_, i) => (
            <button
              key={i}
              aria-label={`go to ${i + 1}`}
              onClick={() => {
                const c = containerRef.current;
                if (!c || !itemRefs.current[i]) return;
                const itemWidth = itemRefs.current[0].getBoundingClientRect().width + 24; // mismo gap
                c.scrollTo({ left: i * itemWidth, behavior: "smooth" });
              }}
              className={`w-2 h-2 rounded-full ${i === active ? "bg-yellow-500" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewList;
