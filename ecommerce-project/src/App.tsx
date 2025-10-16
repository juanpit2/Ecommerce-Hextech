import './App.css'
import Navbar from './components/layout/Header'
import LandingCarousel from './components/layout/LandingCarousel'
import Sections from './components/layout/Sections'

function App() {

  return (
    <>  
      <div className="pt-60 max-sm:pt-20 space-y-10 max-sm:space-y-8">
        <Navbar />
        <LandingCarousel />
        <Sections />
      </div>
    </>
  )
}

export default App
