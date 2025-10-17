import React from "react";

type Product = {
    id: string;
    name: string;
    price: number;
    currency?: string;
    image: string;
    rating: number;
    description?: string;
};

const Star: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill={filled ? "#F7CF5A" : "none"} xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 17.3L5.6 20l1.1-6.4L2.2 9.6l6.5-.9L12 3l3.3 5.7 6.5.9-4.5 3.9L18.4 20 12 17.3z" />
    </svg>
);

const ZaunProductCard: React.FC<{ product: Product }> = ({ product }) => {
const stars = Math.round(product.rating);

    return (
        <article
        className="zaun-card group relative rounded-2xl overflow-visible shadow-2xl bg-gradient-to-b from-[#c82bd0] to-[#a21bb0] p-6 flex flex-col h-[420px] min-w-[260px] transform transition-transform duration-300 hover:-translate-y-4"
        aria-label={product.name}
        >
        <div
            className="absolute -top-12 -left-8 w-80 h-80 pointer-events-none transform transition-transform duration-300 group-hover:-translate-y-2 z-50"
            style={{ willChange: "transform" }}
        >
            <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.6)]"
            draggable={false}
            />
        </div>
        
        {/* price badge */}
        <div className="absolute right-6 top-28 z-20">
            <div className="w-28 h-28 rounded-full bg-[#38e6d0] flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-xs text-black/70">Price</span>
            <span className="text-2xl font-extrabold text-black">{product.price.toLocaleString()}</span>
            <span className="text-xs text-black/70">{product.currency ?? "GLD"}</span>
            </div>
        </div>

        {/* content area */}
        <div className="mt-auto flex flex-col gap-4 pt-28">
            <h4 className="text-white text-2xl font-bold leading-tight">{product.name}</h4>

            <div className="flex items-center gap-3">
            <div className="bg-white rounded-full px-3 py-1 flex items-center gap-3 shadow-sm">
                <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="inline-flex items-center">
                    <Star filled={i < stars} />
                    </span>
                ))}
                </div>
                <span className="text-sm font-semibold text-gray-800">{product.rating.toFixed(1)}</span>
            </div>
            </div>

            <div>
            <button
                className="mt-2 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#2b2b7a] to-[#5b3bd6] text-white font-semibold rounded-xl shadow-lg transition-transform duration-200 transform hover:-translate-y-1 active:translate-y-0"
                aria-label={`Buy ${product.name}`}
            >
                Buy now
            </button>
            </div>
        </div>
        </article>
    );
};

export default ZaunProductCard;