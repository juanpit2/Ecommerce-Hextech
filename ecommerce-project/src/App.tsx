import './App.css'
import Navbar from './components/layout/Header'
import ProductGrid from "./components/features/products/ProductGrid";

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

    </>
  )
}

export default App
