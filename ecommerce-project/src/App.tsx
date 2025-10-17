import './App.css'
import Functionalities from './components/layout/Functionalities'
import Navbar from './components/layout/Header'
import LandingCarousel from './components/layout/LandingCarousel'
import ProductGrid from "./components/features/products/ProductGrid";
import ReviewList from './components/features/reviews/ReviewList';
import LandingCarousel from './components/layout/LandingCarousel'
import Sections from './components/layout/Sections'

function App() {
  return (
    <>  
      <div className="pt-60 max-sm:pt-20 space-y-20 max-sm:space-y-8">
        <Navbar />
        <LandingCarousel />
        <Sections />
        <Functionalities />
      </div>
    </>
  )
}

export default App
