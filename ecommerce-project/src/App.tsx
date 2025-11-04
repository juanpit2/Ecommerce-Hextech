import './App.css'

// Layout y secciones principales
import Navbar from './components/layout/Header'
import LandingCarousel from './components/layout/LandingCarousel'
import Sections from './components/layout/Sections'
import Functionalities from './components/layout/Functionalities'
import ZaunLayout from './components/layout/Zaun'
import Footer from './components/layout/Footer'

// Productos (landing)
import ProductCardLanding from './components/features/products/ProductCardLanding'
import products from "./components/data/productsLanding.json"

// Reseñas
import ReviewList from './components/features/reviews/ReviewList'

// App raíz que compone toda la landing
function App() {
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

        {/* Grid de productos (landing) — se muestran en flex-wrap y centrados */}
        <div className="flex flex-wrap justify-center gap-6 p-6">
          {products.map((product) => (
            <ProductCardLanding key={product.id} product={product} />
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

export default App;
