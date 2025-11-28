// Layout y secciones principales
import Navbar from '../components/layout/Header'
import LandingCarousel from '../components/layout/LandingCarousel'
import Sections from '../components/layout/Sections'
import Functionalities from '../components/layout/Functionalities'
import ZaunLayout from '../components/layout/Zaun'
import Footer from '../components/layout/Footer'

// Productos
import ProductCard from '../components/features/products/ProductCard'
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from 'react';

// Reseñas
import ReviewList from '../components/features/reviews/ReviewList'

// Navegación
import { useNavigate } from 'react-router-dom'

type ProductLite = {
  id: number;
  name: string;
  price: number;
  currency?: string;
  rating?: number;
  image?: string;
  description?: string;
};

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductLite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('id,name,price,currency,rating,image,description')
        .limit(4);
      if (!mounted) return;
      if (error) {
        console.error('Failed to load products for landing:', error);
        setError('Failed to load products');
        setProducts([]);
      } else {
        setProducts((data as any[]) || []);
        setError(null);
      }
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const openProduct = (id: number) => {
    navigate(`/product/${id}`, { state: { id } });
  };

  return (
    <>  
      {/* 
        Contenedor vertical con espaciado global:
        - pt-60 en desktop para compensar navbar fija alta
        - pt-16 en móvil (max-sm) para reducir espacio superior
        - space-y-* para separar secciones verticalmente
      */}
      <div className="pt-60 max-sm:pt-16 space-y-20 max-sm:space-y-6">

        {/* Navbar fija en top */}
        <Navbar />

        {/* Carrusel de portada */}
        <LandingCarousel />

        {/* Sección de imágenes Piltover/Zaun */}
        <Sections />

        {/* Cuadrícula de funcionalidades (responsive) */}
        <Functionalities />

        {/* Grid de productos — se muestran 4 tarjetas (desde Supabase) */}
        <div className="flex flex-wrap justify-center gap-6 p-6 max-sm:gap-3 max-sm:p-3 max-sm:px-2">
          {loading && (
            <p className="text-gray-500">Loading products...</p>
          )}
          {!loading && error && (
            <p className="text-red-500">{error}</p>
          )}
          {!loading && !error && products.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer max-sm:w-[calc(50%-6px)] max-sm:flex max-sm:justify-center"
              onClick={() => openProduct(product.id)}
            >
              <ProductCard
                name={product.name}
                price={product.price}
                currency={product.currency ?? 'GLD'}
                rating={product.rating ?? 4.5}
                image={product.image || '/images/placeholder.png'}
                description={product.description ?? ''}
              />
            </div>
          ))}
        </div>

        {/* Carrusel horizontal de reseñas con indicadores */}
        <div className="max-w-6xl mx-auto px-4 max-sm:px-2">
          <ReviewList />
        </div>

        {/* Sección temática Zaun con productos destacados */}
        <ZaunLayout />

        {/* Pie de página con enlaces y disclaimers */}
        <Footer />
      </div>
    </>
  );
}

export default Home;