import './App.css'
import Navbar from './components/layout/Header'
import LandingCarousel from './components/layout/LandingCarousel'
import ProductGrid from "./components/features/products/ProductGrid";

function App() {

  return (
    <>  
      <div className="pt-60 max-sm:pt-20 space-y-20 max-sm:space-y-8">
        <Navbar />
        <LandingCarousel />
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
