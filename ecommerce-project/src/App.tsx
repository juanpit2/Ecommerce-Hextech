import './App.css'
import Navbar from './components/layout/Header'
import ProductGrid from "./components/features/products/ProductGrid";
import LandingCarousel from './components/layout/LandingCarousel'
import ReviewList from './components/features/reviews/ReviewList';

function App() {
  return (
    <>
      <h1 className='bg-blue-500  sm:bg-red-500 hover:bg-yellow-100'>Hola Tailwind!</h1>
      <Navbar />
      
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Catálogo de Productos
      </h1>
      <ProductGrid />
    </div>

      <div className="pt-60 max-sm:pt-20 space-y-20 max-sm:space-y-8">
        <Navbar />
        <LandingCarousel />
        {/* Carousel de reviews */}
        <div className="max-w-6xl mx-auto px-4">
          <ReviewList />
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Catálogo de Productos
        </h1>
        <ProductGrid />
      </div>
    </>
  )
}

export default App
