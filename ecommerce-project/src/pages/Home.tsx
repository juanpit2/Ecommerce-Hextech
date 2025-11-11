// Layout y secciones principales
import Navbar from '../components/layout/Header'
import LandingCarousel from '../components/layout/LandingCarousel'
import Sections from '../components/layout/Sections'
import Functionalities from '../components/layout/Functionalities'
import ZaunLayout from '../components/layout/Zaun'
import Footer from '../components/layout/Footer'

// Productos
import ProductCard from '../components/features/products/ProductCard'
import products from "../components/data/products.json"

// Reseñas
import ReviewList from '../components/features/reviews/ReviewList'

// Navegación
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();

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

        {/* Grid de productos — se muestran 4 tarjetas */}
        <div className="flex flex-wrap justify-center gap-6 p-6 max-sm:gap-3 max-sm:p-3 max-sm:px-2">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="cursor-pointer max-sm:w-[calc(50%-6px)] max-sm:flex max-sm:justify-center"
              onClick={() => openProduct(product.id)}
            >
              <ProductCard
                name={product.name}
                price={product.price}
                currency={product.currency}
                rating={product.rating}
                image={product.image}
                description={product.description}
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