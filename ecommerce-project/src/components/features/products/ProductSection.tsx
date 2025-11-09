import React, { useState } from "react";
import type { Product } from "../../../Type/ProductView";

type Props = { product: Product };

const normalizeSpec = (spec: Record<string, string | undefined>) =>
  Object.fromEntries(Object.entries(spec).map(([k, v]) => [k, v ?? ""]));

const ProductSection: React.FC<Props> = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(product.images[0]);

  const toggle = (section: string) => {
    setActive(active === section ? null : section);
  };

  const spec = normalizeSpec(product.specification);

  return (
    <section className="w-full px-10 py-24 bg-[#071126] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* LEFT */}
        <div className="space-y-6 px-15">
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <p className="text-gray-300 leading-relaxed">{product.description}</p>
      
          <div>
            <p className="text-sm text-gray-400">Price</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl text-gray-300 font-extrabold">{product.currency}</span>
              <span className="text-4xl font-extrabold text-[#F7C84B]">
                {product.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Qty + Cart */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center text-[#162D42] bg-[#dceefe] border border-[#294351] rounded-xl overflow-hidden">
              <button className="px-4 py-2 hover:bg-[#c5e0f7]" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span className="px-6 py-2">{qty}</span>
              <button className="px-4 py-2 hover:bg-[#c5e0f7]" onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <button className="w-36 bg-[#dceefe] text-[#071126] px-4 py-2 rounded-xl font-medium hover:bg-[#c5e0f7]">
              Add to cart
            </button>
          </div>

          <button className="w-36 bg-[#3676B7] hover:bg-[#2c5885] text-white font-semibold py-2 rounded-xl">
            Buy now
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-8 relative">
          <div className="absolute left-[-80px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#6d633f] blur-[140px]" />
          <img src={mainImage} className="w-[500px] object-contain z-10 transition-all duration-500" />
          <div className="flex flex-col gap-3 z-20">
            {product.images.map((img) => (
              <img
                key={img}
                src={img}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer opacity-70 hover:opacity-100 hover:scale-105 transition ${mainImage === img ? "ring-2 ring-[#F7C84B]" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Accordions */}
      <div className="max-w-6xl mx-auto pt-20 grid grid-cols-1 sm:grid-cols-3 gap-y-6 sm:gap-x-40 text-center">
        {/* Materials */}
        <div className="justify-self-start">
          <button onClick={() => toggle("mat")} className="w-full bg-[#B39738] px-6 py-3 rounded-md relative flex items-center justify-center mx-auto hover:bg-[#D4B544] text-sm font-medium min-w-[200px]">
            <span className="pointer-events-none">Materials</span>
            <span className={`absolute right-3 inline-flex items-center justify-center w-7 h-7 bg-white/10 rounded-full ${active === "mat" ? "rotate-180" : ""}`}>⌄</span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${active === "mat" ? "max-h-40 mt-3" : "max-h-0"}`}>
            <div className="p-4 bg-[#0b1a21] border border-[#22313b] rounded-md text-sm text-gray-300 space-y-1">
              {product.materials.map(m => <p key={m}>• {m}</p>)}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="justify-self-center">
          <button onClick={() => toggle("feat")} className="w-full bg-[#B39738] px-6 py-3 rounded-md relative flex items-center justify-center mx-auto hover:bg-[#D4B544] text-sm font-medium min-w-[200px]">
            <span className="pointer-events-none">Product feature</span>
            <span className={`absolute right-3 inline-flex items-center justify-center w-7 h-7 bg-white/10 rounded-full ${active === "feat" ? "rotate-180" : ""}`}>⌄</span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${active === "feat" ? "max-h-40 mt-3" : "max-h-0"}`}>
            <div className="p-4 bg-[#0b1a21] border border-[#22313b] rounded-md text-sm text-gray-300 space-y-1">
              {product.features.map(f => <p key={f}>• {f}</p>)}
            </div>
          </div>
        </div>

        {/* Specification */}
        <div className="justify-self-end">
          <button onClick={() => toggle("spec")} className="w-full bg-[#B39738] px-6 py-3 rounded-md relative flex items-center justify-center mx-auto hover:bg-[#D4B544] text-sm font-medium min-w-[200px]">
            <span className="pointer-events-none">Specification</span>
            <span className={`absolute right-3 inline-flex items-center justify-center w-7 h-7 bg-white/10 rounded-full ${active === "spec" ? "rotate-180" : ""}`}>⌄</span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${active === "spec" ? "max-h-60 mt-3" : "max-h-0"}`}>
            <div className="p-5 bg-[#0f2530] border border-[#2b4456] text-gray-200 rounded-md text-sm shadow-lg space-y-2">
              {Object.entries(spec).map(([k, v]) => (
                <p key={k}><strong>{k}:</strong> {v}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
