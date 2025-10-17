import './App.css'
import React from "react";
import Navbar from './components/layout/Header'

import ProductCardLanding from "./components/features/products/ProductCardLanding";
import products from "./components/data/productsLanding.json";
import ProductCardLandingDark from "./components/features/products/ProductCardLandingDark";
import productsDark from "./components/data/productsLandingDark.json";
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

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
      <div className="min-h-screen bg-[#07030b] flex items-center justify-center p-10">
      <div className="grid grid-cols-4 gap-6">
        {productsDark.map((p) => (
          <ProductCardLandingDark key={p.id} product={p} />
        ))}
      </div>
    </div>
    </>

  );
};
export default App;
