import './App.css'
import React from "react";
import Navbar from './components/layout/Header'
import LandingCarousel from './components/layout/LandingCarousel'
import ReviewList from './components/features/reviews/ReviewList';
import Sections from './components/layout/Sections';
import ZaunLayout from './components/layout/Zaun';
import Footer from './components/layout/Footer';
import Functionalities from './components/layout/Functionalities';
import ProductCardLanding from './components/features/products/ProductCardLanding';
import products from "./components/data/productsLanding.json";

function App() {
  return (
    <>  
      <div className="pt-60 max-sm:pt-20 space-y-20 max-sm:space-y-8">
        <Navbar />
        <LandingCarousel />
        <Sections />
        <Functionalities />
        <div className="flex flex-wrap justify-center gap-6 p-6">
        {products.map((product) => (
          <ProductCardLanding key={product.id} product={product} />
        ))}
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <ReviewList />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default App;
