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