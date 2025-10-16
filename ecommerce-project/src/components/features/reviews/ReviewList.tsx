import React, { useRef, useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import reviewsData from "../../data/reviews.json";

type Review = {
    id: string;
    name: string;
    rating: number;
    description: string;
};

const reviews: Review[] = reviewsData as Review[];

const ReviewList: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<HTMLDivElement[]>([]);
    const [active, setActive] = useState(0);

    const scrollNext = (dir: 1 | -1) => {
        const c = containerRef.current;
        if (!c || itemRefs.current.length === 0) return;
        // compute target by visible item center
        const itemWidth = itemRefs.current[0].getBoundingClientRect().width + 24;
        const target = Math.max(
            0,
            Math.min(
                itemRefs.current.length - 1,
                Math.round(c.scrollLeft / itemWidth) + dir
            )
        );
        c.scrollTo({ left: target * itemWidth, behavior: "smooth" });
    };

    useEffect(() => {
        const c = containerRef.current;
        if (!c || itemRefs.current.length === 0) return;

        const onScroll = () => {
            const itemWidth = itemRefs.current[0].getBoundingClientRect().width + 24;
            const index = Math.round(c.scrollLeft / itemWidth);
            setActive(index);
        };

        c.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => c.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section className="px-6 py-8">
            <h2 className="text-2xl font-bold mb-6">User reviews</h2>

            <div className="relative">
                <button
                    aria-label="prev"
                    onClick={() => scrollNext(-1)}
                    className="hidden md:flex items-center justify-center w-10 h-10 bg-white/80 rounded-full shadow absolute left-0 top-1/2 -translate-y-1/2 z-10"
                >
                    ‹
                </button>

                <button
                    aria-label="next"
                    onClick={() => scrollNext(1)}
                    className="hidden md:flex items-center justify-center w-10 h-10 bg-white/80 rounded-full shadow absolute right-0 top-1/2 -translate-y-1/2 z-10"
                >
                    ›
                </button>

                <div
                    ref={containerRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth px-4 py-2 snap-x snap-mandatory"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    {reviews.map((r, i) => (
                        <div
                            key={r.id}
                            ref={(el) => {
                                if (!el) return;
                                itemRefs.current[i] = el;
                            }}
                            // width auto so it varies with content, fixed height so all cards match
                            className="snap-start flex-none w-auto h-[220px]"
                        >
                            <ReviewCard name={r.name} rating={r.rating} description={r.description} />
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            aria-label={`go to ${i + 1}`}
                            onClick={() => {
                                const c = containerRef.current;
                                if (!c || !itemRefs.current[i]) return;
                                const itemWidth = itemRefs.current[0].getBoundingClientRect().width + 24;
                                c.scrollTo({ left: i * itemWidth, behavior: "smooth" });
                            }}
                            className={`w-2 h-2 rounded-full ${i === active ? "bg-yellow-500" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewList;