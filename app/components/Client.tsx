'use client'
import Feature from "./Feature"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import TestimonialSection from "./TestimonialSection"
import Link from "next/link"

const slides = [
  {
    title: "Built for dogs that don’t slow down",
    tag: "Our durable, washable collar is designed to handle dirt, water, and every adventure, without compromising comfort or style.",
    img: "/images/b4.png"
  },
  {
    title: "Built for dogs that don’t slow down",
    tag: "Our durable, washable collar is designed to handle dirt, water, and every adventure, without compromising comfort or style.",
    img: "/images/bg3.png"
  },
  {
    title: "Built for dogs that don’t slow down",
    tag: "Our durable, washable collar is designed to handle dirt, water, and every adventure, without compromising comfort or style.",
    img: "/images/bg2.png"
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const nextSlide = () => setCurrent((current + 1) % slides.length)
  const slide = slides[current]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        className="relative min-h-screen flex items-center overflow-hidden transition-all duration-700 px-4 sm:px-6 md:px-12 lg:px-16"
        style={{
          backgroundImage: `url(${slides[current].img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better readability on mobile */}
        <div className="absolute inset-0 bg-black/20 md:bg-transparent z-0" />

        {/* Canvas Bubble */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full opacity-70"
        />

        {/* Hero Text */}
        <motion.div
          className="
            relative z-20
            w-full
            max-w-full
            sm:max-w-[85%]
            md:max-w-lg
            ml-0 md:ml-auto
            text-center md:text-right
            text-white
            space-y-4 md:space-y-5
            pt-24 sm:pt-28 md:pt-32
            pb-28 sm:pb-24
          "
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
              }
            }
          }}
        >
          {/* Title */}
          <motion.h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-extrabold
              leading-tight
              text-white
              font-satoshi
            "
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6 }
              }
            }}
          >
            {slide.title}
          </motion.h1>

          {/* Tag */}
          <motion.p
            className="
              text-base
              sm:text-lg
              md:text-xl
              font-semibold
              opacity-90
              font-satoshi
              leading-relaxed
            "
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6 }
              }
            }}
          >
            {slide.tag}
          </motion.p>

          {/* Button */}
          <Link href="/products">
            <motion.button
              className="
                bg-[#ff8800]
                px-5 sm:px-6
                py-2.5 sm:py-3
                rounded-full
                text-white
                font-semibold
                text-sm sm:text-base
                hover:scale-105
                transition-transform
              "
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.7 }
                }
              }}
            >
              SHOP NOW
            </motion.button>
          </Link>
        </motion.div>

        {/* Vertical Dots */}
        <div
          className="
            absolute
            right-3 sm:right-4 md:right-10
            top-1/2
            -translate-y-1/2
            flex flex-col gap-2 sm:gap-3
            z-20
          "
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`
                w-2.5 h-2.5 sm:w-3 sm:h-3
                rounded-full
                border border-white
                transition-transform duration-200
                ${i === current ? "bg-white scale-125" : "scale-100"}
              `}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="
            absolute
            bottom-6 sm:bottom-8
            left-4 sm:left-6 md:left-16
            text-sm sm:text-base
            font-semibold
            flex items-center gap-2
            hover:text-gray-800
            transition-colors
            z-20
            text-white md:text-black
          "
        >
          NEXT →
        </button>

        {/* Curved Waves */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            d="
              M0,160 
              C180,40 360,240 540,120 
              C720,0 900,220 1080,100 
              C1260,-20 1440,180 1440,160 
              L1440,200 
              L0,200 
              Z
            "
          />
        </svg>
      </section>

      <section>
        <Feature />
      </section>

      <section className="mb-20 sm:mb-28 md:mb-35">
        <TestimonialSection />
      </section>
    </>
  )
}