// Layout y secciones principales
import Navbar from '../components/layout/Header'
import LandingCarousel from '../components/layout/LandingCarousel'
import Sections from '../components/layout/Sections'
import Functionalities from '../components/layout/Functionalities'
import ZaunLayout from '../components/layout/Zaun'
import Footer from '../components/layout/Footer'

// Productos (landing)
import ProductCard from '../components/features/products/ProductCard'
import products from "../components/data/products.json"

// Reseñas
import ReviewList from '../components/features/reviews/ReviewList'

function Home() {
  return (
    <>  
      {/* 
        Contenedor vertical con espaciado global:
        - pt-60 en desktop para compensar navbar fija alta
        - pt-20 en móvil (max-sm) para reducir espacio superior
        - space-y-* para separar secciones verticalmente
      */}
      <div className="pt-60 max-sm:pt-20 space-y-20 max-sm:space-y-8">

        {/* Navbar fija en top */}
        <Navbar />

        {/* Carrusel de portada */}
        <LandingCarousel />

        {/* Sección de imágenes Piltover/Zaun */}
        <Sections />

        {/* Cuadrícula de funcionalidades (responsive) */}
        <Functionalities />

        {/* Subtitle "Recently Added" */}
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
        </div>

        {/* Grid de productos (landing) — 3 columnas con ProductCard */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center py-15 max-w-6xl mx-auto px-4">
          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              currency={product.currency}
              rating={product.rating}
              image={product.image}
              description={product.description}
            />
          ))}
        </div>

        {/* Carrusel horizontal de reseñas con indicadores */}
        <div className="max-w-6xl mx-auto px-4">
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