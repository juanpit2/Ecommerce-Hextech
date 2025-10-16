import { useState } from "react"
import jinx from "../../../public/images/icons/LandingCarouselJinx.svg"
import ekko from "../../../public/images/icons/LandingCarouselEkko.svg"
import jayce from "../../../public/images/icons/LandingCarouseJayce.svg"

const IMAGES = [jinx, ekko, jayce]

export default function LandingCarousel() {
  const [index, setIndex] = useState(0)

  function prev() {
    setIndex(i => (i - 1 + IMAGES.length) % IMAGES.length)
  }
  function next() {
    setIndex(i => (i + 1) % IMAGES.length)
  }
  function goTo(i: number) {
    setIndex(i % IMAGES.length)
  }

  return (
    <div className="relative">
      <div className="relative flex items-center justify-center h-64 max-sm:h-40">
        <img
          src={IMAGES[index]}
          alt={`Slide ${index + 1}`}
          className="mx-auto block object-contain max-w-full h-auto max-sm:max-w-[320px] max-sm:max-h-[180px]"
        />

        <button
          aria-label="Anterior"
          onClick={prev}
          className="absolute left-20 max-sm:left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-1 rounded-full shadow-sm z-10"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          aria-label="Siguiente"
          onClick={next}
          className="absolute right-20 max-sm:right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-1 rounded-full shadow-sm z-10"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-[160px] max-sm:mt-[2vh]">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir a slide ${i + 1}`}  
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-shadow duration-150 focus:outline-none ${
              i === index ? "bg-black shadow-lg" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}