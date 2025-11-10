import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import type { Product } from "../../../Type/ProductView";

type Props = { product: Product };

const normalizeSpec = (spec?: Record<string, string | undefined>) =>
  spec ? Object.fromEntries(Object.entries(spec).map(([k, v]) => [k, v ?? ""])) : {};

const fixSrc = (src: string) => {
  // Si es una imagen base64 o ya tiene protocolo, retornarla tal cual
  if (src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  // Si no, agregar la barra al inicio para rutas relativas
  return src.startsWith("/") ? src : `/${src}`;
};

const PLACEHOLDER = "/images/placeholder.png";

const ProductSection: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();

  const materials = product.materials ?? [];
  const features = product.features ?? [];
  const spec = normalizeSpec(product.specification);

  const images: string[] = (
    product.images?.length ? product.images :
    product.image ? [product.image] : [PLACEHOLDER]
  ).map(fixSrc);

  const [qty, setQty] = useState(1);
  const [active, setActive] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(images[0]);

  const toggle = (section: string) =>
    setActive((prev) => (prev === section ? null : section));

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        description: product.description ?? "No description available",
        price: product.price,
        currency: product.currency ?? "GLD",
        quantity: qty,
        image: images[0],
      })
    );
  };

  return (
    <section className="w-full px-10 py-24 bg-[#071126] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* LEFT */}
        <div className="space-y-6 px-15">
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <p className="text-gray-300 leading-relaxed">
            {product.description ?? "No description available"}
          </p>

          {/* Price */}
          <div>
            <p className="text-sm text-gray-400">Price</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl text-gray-300 font-extrabold">
                {product.currency ?? "GLD"}
              </span>
              <span className="text-4xl font-extrabold text-[#F7C84B]">
                {product.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Qty + Cart */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center text-[#162D42] bg-[#dceefe] border border-[#294351] rounded-xl overflow-hidden">
              <button
                className="px-4 py-2 hover:bg-[#c5e0f7]"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-6 py-2">{qty}</span>
              <button
                className="px-4 py-2 hover:bg-[#c5e0f7]"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>

            <button
              className="w-36 bg-[#dceefe] text-[#071126] px-4 py-2 rounded-xl font-medium hover:bg-[#c5e0f7]"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>

          <button className="w-36 bg-[#3676B7] hover:bg-[#2c5885] text-white font-semibold py-2 rounded-xl">
            Buy now
          </button>
        </div>

        {/* RIGHT (gallery) */}
        <div className="flex items-center gap-8 relative">
          <div className="absolute left-[-80px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#6d633f] blur-[140px]" />
          <img
            src={mainImage}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER; }}
            className="w-[500px] object-contain z-10 transition-all duration-500"
            alt={product.name}
          />
          <div className="flex flex-col gap-3 z-20">
            {images.map((img) => (
              <img
                key={img}
                src={img}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER; }}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer opacity-70 hover:opacity-100 hover:scale-105 transition ${
                  mainImage === img ? "ring-2 ring-[#F7C84B]" : ""
                }`}
                onClick={() => setMainImage(img)}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>

      {/* Accordions (siempre visibles) */}
      <div className="max-w-6xl mx-auto pt-20 grid grid-cols-1 sm:grid-cols-3 gap-y-6 sm:gap-x-40 text-center">
        {/* Materials */}
        <div className="justify-self-start">
          <button
            onClick={() => toggle("mat")}
            className="w-full bg-[#B39738] px-6 py-3 rounded-md relative flex items-center justify-center mx-auto hover:bg-[#D4B544] text-sm font-medium min-w-[200px]"
          >
            <span>Materials</span>
            <span className="ml-2 text-xs bg-white/10 rounded-full px-2 py-0.5">
              {materials.length}
            </span>
            <span className={`absolute right-3 inline-flex items-center justify-center w-7 h-7 bg-white/10 rounded-full ${active === "mat" ? "rotate-180" : ""}`}>
              ⌄
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${active === "mat" ? "max-h-40 mt-3" : "max-h-0"}`}>
            <div className="p-4 bg-[#0b1a21] border border-[#22313b] rounded-md text-sm text-gray-300 space-y-1">
              {materials.length
                ? materials.map((m) => <p key={m}>• {m}</p>)
                : <p className="text-gray-500 italic">No data</p>}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="justify-self-center">
          <button
            onClick={() => toggle("feat")}
            className="w-full bg-[#B39738] px-6 py-3 rounded-md relative flex items-center justify-center mx-auto hover:bg-[#D4B544] text-sm font-medium min-w-[200px]"
          >
            <span>Product feature</span>
            <span className="ml-2 text-xs bg-white/10 rounded-full px-2 py-0.5">
              {features.length}
            </span>
            <span className={`absolute right-3 inline-flex items-center justify-center w-7 h-7 bg-white/10 rounded-full ${active === "feat" ? "rotate-180" : ""}`}>
              ⌄
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${active === "feat" ? "max-h-40 mt-3" : "max-h-0"}`}>
            <div className="p-4 bg-[#0b1a21] border border-[#22313b] rounded-md text-sm text-gray-300 space-y-1">
              {features.length
                ? features.map((f) => <p key={f}>• {f}</p>)
                : <p className="text-gray-500 italic">No data</p>}
            </div>
          </div>
        </div>

        {/* Specification */}
        <div className="justify-self-end">
          <button
            onClick={() => toggle("spec")}
            className="w-full bg-[#B39738] px-6 py-3 rounded-md relative flex items-center justify-center mx-auto hover:bg-[#D4B544] text-sm font-medium min-w-[200px]"
          >
            <span>Specification</span>
            <span className="ml-2 text-xs bg-white/10 rounded-full px-2 py-0.5">
              {Object.keys(spec).length}
            </span>
            <span className={`absolute right-3 inline-flex items-center justify-center w-7 h-7 bg-white/10 rounded-full ${active === "spec" ? "rotate-180" : ""}`}>
              ⌄
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${active === "spec" ? "max-h-60 mt-3" : "max-h-0"}`}>
            <div className="p-5 bg-[#0f2530] border border-[#2b4456] text-gray-200 rounded-md text-sm shadow-lg space-y-2">
              {Object.keys(spec).length
                ? Object.entries(spec).map(([k, v]) => (
                    <p key={k}>
                      <strong>{k}:</strong> {v}
                    </p>
                  ))
                : <p className="text-gray-500 italic">No data</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
