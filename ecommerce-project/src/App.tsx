import './App.css'
import React from "react";
import Navbar from './components/layout/Header'

import ProductCardLanding from "./components/features/products/ProductCardLanding";
import products from "./components/data/productsLanding.json";
const App: React.FC = () => {

 

  return (
    <>
    <h1 className='bg-blue-500  sm:bg-red-500 hover:bg-yellow-100'>Hola Tailwind!</h1>
      <Navbar />

    <div className="min-h-screen bg-[#ffffff] flex justify-center items-center">
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {products.map((product) => (
          <ProductCardLanding key={product.id} product={product} />
        ))}
      </div>
    </div>
    </>

  );
};
export default App;
