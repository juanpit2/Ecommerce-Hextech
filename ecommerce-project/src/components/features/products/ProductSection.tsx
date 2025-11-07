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

        {/* LEFT SECTION */}
        <div className="space-y-6">

          <h1 className="text-5xl font-bold">Atlas Gauntlets</h1>
          <p className="text-gray-300 leading-relaxed">
            Boost your strength with Hextech power.
            <br />Raw force in a single punch.
          </p>

          {/* PRICE */}
          <div className="pt-4">
            <p className="text-sm text-gray-400">Price</p>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-300">GLD</span>
              <span className="text-4xl font-extrabold text-[#F7C84B] ">
                9,800
              </span>
            </div>
          </div>

          {/* QUANTITY + ADD TO CART */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center text-[#162D42] bg-[#9EC5F1] border border-[#294351] rounded-lg overflow-hidden">
              <button
                className="px-4 py-2 hover:bg-[#16343f] transition"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                -
              </button>

              <span className="px-6 py-2">{qty}</span>

              <button
                className="px-4 py-2 hover:bg-[#16343f] transition"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>

            <button className="bg-[#dceefe] text-[#071126] px-5 py-2 rounded-md font-medium hover:shadow-[0_0_15px_#dceefe90] transition">
              Add to cart
            </button>
          </div>

          {/* BUY NOW */}
          <button className="bg-[#C7A039] hover:bg-[#b58f30] text-[#071126] font-semibold py-3 px-7 rounded-lg shadow-[0_0_18px_#c7a03990] transition">
            Buy now
          </button>

          {/* ACCORDION */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* MATERIALS */}
            <div>
              <button
                onClick={() => toggle("mat")}
                className="w-full bg-[#24323e] px-6 py-4 rounded-lg flex justify-between items-center hover:bg-[#2e4352] transition"
              >
                Materials <span className={`transition ${active === "mat" ? "rotate-180" : ""}`}>⌄</span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  active === "mat" ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
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
                className="w-full bg-[#24323e] px-6 py-4 rounded-lg flex justify-between items-center hover:bg-[#2e4352] transition"
              >
                Product feature <span className={`transition ${active === "feat" ? "rotate-180" : ""}`}>⌄</span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  active === "feat" ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <div className="p-4 bg-[#0b1a21] border border-[#22313b] rounded-md text-sm text-gray-300">
                  Sonic pulse generator. High impact reinforcement.
                </div>
              </div>
            </div>

            {/* SPEC */}
            <div>
              <button
                onClick={() => toggle("spec")}
                className="w-full bg-[#24323e] px-6 py-4 rounded-lg flex justify-between items-center hover:bg-[#2e4352] transition"
              >
                Specification <span className={`transition ${active === "spec" ? "rotate-180" : ""}`}>⌄</span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  active === "spec" ? "max-h-60 mt-3" : "max-h-0"
                }`}
              >
                <div className="p-5 bg-[#0f2530] border border-[#2b4456] text-gray-200 rounded-md text-sm shadow-lg leading-relaxed">
                  Weight: 18 kg <br />
                  Power Source: Pure Hex crystal <br />
                  Strength Amplification: x12 <br />
                  Secondary Function: Sonic pulse generator <br />
                  Safety: Requires specialized handling
                </div>
              </div>
            </div>
          </div>

        </div>

       {/* RIGHT SIDE IMAGE + THUMBNAILS */}
<div className="flex gap-6 items-center relative">

  {/* Círculo de sombra detrás */}
  <div
    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
    w-[500px] h-[500px] rounded-full 
    bg-[#F7C84B33] blur-[140px] pointer-events-none"
  />

  {/* Imagen principal */}
  <img
    src={mainImage}
    className="w-[500px] object-contain transition-all duration-500 relative z-10"
  />

  {/* Miniaturas */}
  <div className="flex flex-col gap-4 z-20">
    {images.map((img) => (
      <img
        key={img}
        src={img}
        className={`w-20 rounded-md cursor-pointer opacity-70 hover:opacity-100 hover:scale-105 transition ${
          mainImage === img ? "ring-2 ring-[#F7C84B]" : ""
        }`}
        onClick={() => setMainImage(img)}
      />
    ))}
  </div>
</div>
      </div>
    </section>
  );
};

export default ProductSection;
