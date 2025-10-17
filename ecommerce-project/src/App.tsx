import './App.css'
import Navbar from './components/layout/Header'
import Footer from "./components/layout/Footer";

function App() {

  return (
    <>
      <h1 className='bg-blue-500  sm:bg-red-500 hover:bg-yellow-100'>Hola Tailwind!</h1>
      <Navbar />
         <Footer />
    </>
  )
}

export default App
