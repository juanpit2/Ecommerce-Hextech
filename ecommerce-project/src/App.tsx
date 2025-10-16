import './App.css'
import Navbar from './components/layout/Header'
import LandingCarousel from './components/layout/LandingCarousel'

function App() {

  return (
    <>  
      <div className="pt-60 max-sm:pt-20 space-y-20 max-sm:space-y-8">
        <Navbar />
        <LandingCarousel />
      </div>
    </>
  )
}

export default App
