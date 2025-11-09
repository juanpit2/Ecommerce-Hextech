// src/components/CategoryIcons.tsx
import React from "react";

const icons = [
  "/public/images/CategoryIcon1.png",
    "/public/images/CategoryIcon2.png",
    "/public/images/CategoryIcon3.png",
    "/public/images/CategoryIcon4.png",
   
];

export default function CategoryIcons() {
  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto flex justify-center gap-35 flex-wrap">
        {icons.map((src, i) => (
          <img
            key={i}
            src={src}
            className="w-40 h-40 object-cover rounded-full border-4 border-[#0c2244] shadow-lg hover:scale-105 transition cursor-pointer"
          />
        ))}
      </div>
    </section>
  );
}
