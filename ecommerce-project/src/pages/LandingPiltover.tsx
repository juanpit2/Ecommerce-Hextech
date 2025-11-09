// Layout y secciones principales
import Navbar from '../components/layout/Header'
import LandingCarousel from '../components/layout/LandingCarrouselPiltover'



import Footer from '../components/layout/Footer'

// Productos (landing)
import ProductGrid from '../components/features/products/ProductGrid'

// Reseñas
import ReviewList from '../components/features/reviews/ReviewList'
import CategoryIcons from '../components/layout/CategoryIcons'

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

          {/*Categorias en circulos */}
        <CategoryIcons />


       

        {/* Grid de productos (landing) — se muestran en flex-wrap y centrados */}
     <ProductGrid
  title={null}       // Esto oculta "Products"
  subtitle="Recently added"
  showSeeAll={true}
  limit={3}
/>



        {/* Carrusel horizontal de reseñas con indicadores */}
        <div className="max-w-6xl mx-auto px-4">
          <ReviewList />
        </div>

      

        {/* Pie de página con enlaces y disclaimers */}
        <Footer />
      </div>
    </>
  );
}

export default Home;