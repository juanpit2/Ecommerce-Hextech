import React, { useState } from "react";

const images = [
  "/public/images/Card-guante.png",
  "/public/images/GUANTE2.png",
  "/public/images/GUANTE3.png",
  "/public/images/GUANTE4.png",
  "/public/images/GUANTE5.png",
];

const ProductSection = () => {
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(images[0]);

  const toggle = (section: string) => {
    setActive(active === section ? null : section);
  };

  return (
    <section className="w-full px-10 py-24 bg-[#071126] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6 px-15">

          <h1 className="text-5xl font-bold">Atlas Gauntlets</h1>
          <p className="text-gray-300 leading-relaxed">
            Boost your strength with Hextech power.
            <br />Raw force in a single punch.
          </p>

          {/* PRICE */}
          <div>
            <p className="text-sm text-gray-400">Price</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl text-gray-300 font-extrabold">GLD</span>
              <span className="text-4xl font-extrabold text-[#F7C84B]">9,800</span>
            </div>
          </div>

          {/* QUANTITY & CART BUTTON */}
            <div className="flex gap-4 items-center">
            <div className="flex items-center text-[#162D42] bg-[#dceefe] border border-[#294351] rounded-xl overflow-hidden">
              <button
                className="px-4 py-2 hover:bg-[#c5e0f7] transition"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                -
              </button>
              <span className="px-6 py-2">{qty}</span>
              <button
                className="px-4 py-2 hover:bg-[#c5e0f7] transition"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>

            <button className="w-36 bg-[#dceefe] text-[#071126] px-4 py-2 rounded-xl font-medium hover:bg-[#c5e0f7] transition">
              Add to cart
            </button>
          </div>

          {/* BUY NOW */}
          <button className="w-76 bg-[#3676B7] hover:bg-[#2c5885] text-white font-semibold py-2 rounded-xl transition-all shadow-sm hover:shadow-[0_8px_20px_rgba(54,118,183,0.35)]">
            Buy now
          </button>
        </div>

        {/* RIGHT SIDE IMAGE + THUMBNAILS */}
        <div className="flex items-center gap-8 relative">

          {/* Blur Glow Behind Product */}
          <div className="absolute left-[-80px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#6d633f] blur-[140px]"></div>

          {/* Main Image */}
          <img
            src={mainImage}
            className="w-[500px] object-contain z-10 transition-all duration-500"
          />

          {/* Thumbnails */}
          <div className="flex flex-col gap-3 z-20">
            {images.map((img) => (
              <img
                key={img}
                src={img}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer opacity-70 hover:opacity-100 hover:scale-105 transition ${
                  mainImage === img ? "ring-2 ring-[#F7C84B]" : ""
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ✅ FINAL ACCORDION BUTTONS IN 3 COLUMNS */}
  <div className="max-w-4xl mx-auto pt-20  grid grid-cols-1 sm:grid-cols-3 gap-15 text-center">

        {/* MATERIALS */}
        <div>
          <button
            onClick={() => toggle("mat")}
            className="w-full bg-[#B39738] px-6 py-3 rounded-md flex justify-between items-center mx-auto hover:bg-[#D4B544] transition-all text-sm font-medium min-w-[200px]"
          >
            Materials <span className={`ml-3 transition-transform ${active === "mat" ? "rotate-180" : ""}`}><span className="inline-flex items-center justify-center w-7 h-7 bg-white/10 rounded-full text-[#071126]">⌄</span></span>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${active === "mat" ? "max-h-40 mt-3" : "max-h-0"}`}>
            <div className="p-4 bg-[#0b1a21] border border-[#22313b] rounded-md text-sm text-gray-300">
              • Alloyed hexsteel shell <br />
              • Piltover wiring <br />
              • Stabilized pure hex crystal core
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div>
          <button
            onClick={() => toggle("feat")}
            className="w-full bg-[#B39738] px-6 py-3 rounded-md flex justify-between items-center mx-auto hover:bg-[#D4B544] transition-all text-sm font-medium min-w-[200px]"
          >
            Product feature <span className={`ml-3 transition-transform ${active === "feat" ? "rotate-180" : ""}`}><span className="inline-flex items-center justify-center w-7 h-7 bg-white/10 rounded-full text-[#071126]">⌄</span></span>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${active === "feat" ? "max-h-40 mt-3" : "max-h-0"}`}>
            <div className="p-4 bg-[#0b1a21] border border-[#22313b] rounded-md text-sm text-gray-300">
              Sonic pulse generator. High impact reinforcement.
            </div>
          </div>
        </div>

        {/* SPECIFICATION */}
        <div>
          <button
            onClick={() => toggle("spec")}
            className="w-full bg-[#B39738] px-6 py-3 rounded-md flex justify-between items-center mx-auto hover:bg-[#D4B544] transition-all text-sm font-medium min-w-[200px]"
          >
            Specification <span className={`ml-3 transition-transform ${active === "spec" ? "rotate-180" : ""}`}><span className="inline-flex items-center justify-center w-7 h-7 bg-white/10 rounded-full text-[#071126]">⌄</span></span>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${active === "spec" ? "max-h-60 mt-3" : "max-h-0"}`}>
            <div className="p-5 bg-[#0f2530] border border-[#2b4456] text-gray-200 rounded-md text-sm shadow-lg space-y-2">
              <p>Weight: 18 kg</p>
              <p>Power Source: Pure Hex crystal</p>
              <p>Strength Amplification: x12</p>
              <p>Secondary Function: Sonic pulse generator</p>
              <p>Safety: Requires specialized handling</p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default ProductSection;
