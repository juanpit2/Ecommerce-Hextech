import React, { useRef, useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { getReviewsByProduct } from "../../../utils/reviewsService";
import type { ReviewCard as ReviewCardType } from "../../../Type/Reviews";

type Props = { productId: number };

// Sección de reviews específicas de producto con carrusel horizontal y paginación por "snap"
const ProductReviewSection: React.FC<Props> = ({ productId }) => {
  // Estado para las reviews cargadas desde Supabase
  const [reviews, setReviews] = useState<ReviewCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Referencia al contenedor scrollable
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Referencias a cada item para medir su ancho (incluyendo gap)
  const itemRefs = useRef<HTMLDivElement[]>([]);
  // Índice activo (para los dots/puntos indicadores)
  const [active, setActive] = useState(0);

  // Cargar reviews desde Supabase al montar el componente
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const result = await getReviewsByProduct(productId);
        if (result.data) {
          setReviews(result.data);
        }
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, [productId]);

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
  }, [reviews]);

  const handleAdd = (r: ReviewCardType) => {
    setReviews((prev) => [r, ...prev]);
    setShowForm(false);
  };

  if (loading) {
    return (
      <section className="px-6 py-8 bg-white text-gray-900">
        <h2 className="text-2xl font-bold mb-6 px-8 pl-12">Product reviews</h2>
        <div className="text-center py-8 text-gray-500">Cargando reviews...</div>
      </section>
    );
  }

  return (
    <section className="px-6 py-8 bg-white text-gray-900">
      {/* Título de la sección con botón para agregar review */}
      <div className="flex items-center justify-between mb-6 px-8">
        <h2 className="text-2xl font-bold text-gray-900 pl-4">Product reviews</h2>
        <button 
          onClick={() => setShowForm(true)} 
          className="bg-[#F7C84B] text-[#071126] px-4 py-2 rounded-md font-medium hover:bg-[#e6b642] transition-colors pr-4"
        >
          Add review
        </button>
      </div>

      {/* Formulario para agregar review */}
      {showForm && (
        <div className="mb-6">
          <ReviewForm onAddReview={handleAdd} onClose={() => setShowForm(false)} productId={productId} />
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No hay reviews para este producto aún.</div>
      ) : (
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
                className={`w-2 h-2 rounded-full ${i === active ? "bg-yellow-500" : "bg-gray-400"}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductReviewSection;