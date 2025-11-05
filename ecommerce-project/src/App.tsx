import './App.css'
import React from "react";
import Navbar from './components/layout/Header'
import LandingCarousel from './components/layout/LandingCarousel'
import Functionalities from "./components/layout/Functionalities";
import ReviewList from './components/features/reviews/ReviewList';
import Sections from './components/layout/Sections';

function App() {
  return (
    <>  
      <div className="pt-60 max-sm:pt-20 space-y-20 max-sm:space-y-8">
        <Navbar />
        <LandingCarousel />
        <Sections />
        <Functionalities/>
        <div className="max-w-6xl mx-auto px-4">
          <ReviewList />
        </div>
      </div>
    
    </>

  );
};
export default App;
