import React, { useRef } from "react";
import ZaunProductCard from "./ZaunProductCard";
import productsData from "../data/zaunproducts.json";

type Product = { id: string; name: string; price: number; currency?: string; image: string; rating: number; description?: string; };
const products: Product[] = productsData as Product[];

const ZaunProductGrid: React.FC = () => {
const trackRef = useRef<HTMLDivElement | null>(null);

const scrollByPage = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.querySelector<HTMLElement>(".zaun-card");
    const gap = 24;
    const cardW = first ? first.getBoundingClientRect().width : 300;
    const vw = window.innerWidth;
    const visible = vw >= 1024 ? 4 : vw >= 640 ? 2 : 1;
    const scrollAmount = (cardW + gap) * visible * dir;
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
};

    return (

        <section className="px-6 py-8 overflow-visible">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-black">Recently added</h3>

            <div className="flex gap-3">
            <button onClick={() => scrollByPage(-1)} aria-label="prev" className="w-10 h-10 bg-white/10 text-white rounded-full hidden lg:flex items-center justify-center">‹</button>
            <button onClick={() => scrollByPage(1)} aria-label="next" className="w-10 h-10 bg-white/10 text-white rounded-full hidden lg:flex items-center justify-center">›</button>
            </div>
        </div>

        <div
            ref={trackRef}
            // important: allow vertical overflow so images can escape
            className="flex gap-6 overflow-x-auto overflow-y-visible scroll-smooth snap-x snap-mandatory pb-4"
            style={{ WebkitOverflowScrolling: "touch" }}
        >
            {products.map((p) => (
            <div key={p.id} className="snap-start flex-none w-full sm:w-1/2 lg:w-1/4 overflow-visible">
                <ZaunProductCard product={p} />
            </div>
            ))}
        </div>
        </section>
    );
};

export default ZaunProductGrid;