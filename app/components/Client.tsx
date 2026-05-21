'use client'
import Feature from "./Feature"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TestimonialSection from "./TestimonialSection"
import Link from "next/link"

const slides = [
  {
    title: "Built for dogs that don't slow down",
    tag: "Our durable, washable collar is designed to handle dirt, water, and every adventure, without compromising comfort or style.",
    img: "/images/b4.png"
  },
  {
    title: "Built for dogs that don't slow down",
    tag: "Our durable, washable collar is designed to handle dirt, water, and every adventure, without compromising comfort or style.",
    img: "/images/bg3.png"
  },
  {
    title: "Built for dogs that don't slow down",
    tag: "Our durable, washable collar is designed to handle dirt, water, and every adventure, without compromising comfort or style.",
    img: "/images/bg2.png"
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length)
  const slide = slides[current]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* ── OUTER WRAPPER: wave lives here, outside overflow-hidden ── */}
      <div className="relative w-full" style={{ marginBottom: "-4px" }}>

        {/* ── INNER: overflow-hidden only wraps the images ── */}
        <div className="relative w-full overflow-hidden">

          {/* ── IMAGES ── */}
          {slides.map((s, i) => (
            <div
              key={i}
              className={`
                w-full transition-opacity duration-700
                ${i === 0 ? "relative" : "absolute inset-0"}
                ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}
              `}
            >
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-auto block"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}

          {/* ── GRADIENT OVERLAY ── */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

          {/* ── HERO TEXT ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-end text-right"
              style={{
                paddingRight:  "clamp(12px, 4vw, 64px)",
                paddingLeft:   "clamp(12px, 4vw, 64px)",
                paddingBottom: "clamp(80px, 12vw, 160px)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div style={{ width: "clamp(160px, 42vw, 480px)" }}>

                <motion.h1
                  className="font-extrabold leading-tight text-white font-satoshi drop-shadow-md"
                  style={{
                    fontSize:     "clamp(11px, 2.6vw, 48px)",
                    marginBottom: "clamp(4px, 0.6vw, 12px)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 }}
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  className="font-medium text-white/90 font-satoshi leading-relaxed drop-shadow"
                  style={{
                    fontSize:     "clamp(8px, 1.3vw, 18px)",
                    marginBottom: "clamp(6px, 1vw, 20px)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 }}
                >
                  {slide.tag}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.28 }}
                >
                  <Link href="/products">
                    <button
                      className="bg-[#ff8800] rounded-full text-white font-semibold hover:scale-105 active:scale-95 transition-transform shadow-lg"
                      style={{
                        fontSize:      "clamp(7px, 1.1vw, 16px)",
                        paddingTop:    "clamp(4px, 0.55vw, 10px)",
                        paddingBottom: "clamp(4px, 0.55vw, 10px)",
                        paddingLeft:   "clamp(10px, 1.6vw, 28px)",
                        paddingRight:  "clamp(10px, 1.6vw, 28px)",
                      }}
                    >
                      SHOP NOW
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── DOT NAVIGATION ── */}
          <div
            className="absolute top-1/2 -translate-y-1/2 flex flex-col z-40"
            style={{
              right: "clamp(8px, 2vw, 40px)",
              gap:   "clamp(5px, 0.7vw, 12px)",
            }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width:  "clamp(6px, 0.8vw, 12px)",
                  height: "clamp(6px, 0.8vw, 12px)",
                }}
                className={`
                  rounded-full border border-white/80
                  transition-all duration-200
                  ${i === current ? "bg-white scale-125" : "bg-transparent hover:bg-white/40"}
                `}
              />
            ))}
          </div>

          {/* ── NEXT BUTTON ── */}
          <button
            onClick={nextSlide}
            className="absolute flex items-center gap-1 text-white/90 hover:text-white transition-colors z-40 font-semibold"
            style={{
              bottom:   "clamp(100px, 2vw, 28px)",
              left:     "clamp(12px, 3vw, 64px)",
              fontSize: "clamp(7px, 1vw, 14px)",
            }}
          >
            NEXT →
          </button>

        </div>
        {/* ── overflow-hidden div ends here ── */}

        {/* ── WAVE DIVIDER: now outside overflow-hidden, on the outer wrapper ──
            Positioned absolute on the outer div so slide repaints never touch it.
            z-index is high enough to sit above the image stack.
        ── */}
        <svg
          style={{ display: "block", marginBottom: "-4px", pointerEvents: "none" }}
          className="absolute bottom-0 left-0 w-full z-40"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="
              M0,160
              C180,40 360,240 540,120
              C720,0 900,220 1080,100
              C1260,-20 1440,180 1440,160
              L1440,202
              L0,202
              Z
            "
          />
        </svg>

      </div>
      {/* ── outer wrapper ends here ── */}

      <div className="relative z-10 -mt-[3px] bg-white">
        <Feature />
      </div>

      <section className="mb-20 mt-10 sm:mt-0 sm:mb-28">
        <TestimonialSection />
      </section>
    </>
  )
}