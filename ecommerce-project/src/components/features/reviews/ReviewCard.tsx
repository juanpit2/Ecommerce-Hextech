import React from "react";

type ReviewCardProps = {
    name: string;
    rating: number;
    description: string;
};

const Star: React.FC<{ filled?: boolean }> = ({ filled = false }) => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill={filled ? "#E6B732" : "none"} xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 17.3L5.6 20l1.1-6.4L2.2 9.6l6.5-.9L12 3l3.3 5.7 6.5.9-4.5 3.9L18.4 20 12 17.3z" />
    </svg>
);

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, description }) => {
    const initials = name
        .split(" ")
        .map((n) => n?.[0] ?? "")
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const filledStars = Math.max(0, Math.min(5, Math.round(rating)));

    return (
        <article className="relative rounded-2xl border-2 border-[#E6C84A] bg-[#FFF8C4] text-[#1f1f1f] p-8 shadow-sm h-full flex flex-col min-w-[300px] max-w-[720px]">
            {/* avatar absolute so it overlaps left padding */}
            <div className="absolute top-6 left-6">
                <div className="w-14 h-14 rounded-full bg-[#F9E58A] flex items-center justify-center text-sm font-semibold text-[#2b2b2b] shadow-sm">
                    {initials || "?"}
                </div>
            </div>

            {/* content: leave space for avatar with ml */}
            <div className="ml-20 pr-4 flex-1 flex flex-col">
                <div className="text-sm font-semibold text-[#2b2b2b] mb-3">@{name}</div>

                <p className="text-lg leading-relaxed text-[#2b2b2b] mb-4 flex-1 overflow-auto">
                    “{description}”
                </p>

                {/* footer with rating aligned to the right */}
                <div className="flex items-center justify-end gap-3 mt-2">
                    <div className="flex gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} filled={i < filledStars} />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ReviewCard;