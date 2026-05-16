"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function PetHeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Close modal helper
  const closeModal = () => {
    setIsVideoOpen(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const textVariant = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  }

  const paragraphVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  }

  const buttonVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4 },
    },
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 w-full overflow-hidden">

      {/* LEFT IMAGE */}
      <div className="w-full h-[280px] sm:h-[400px] md:h-[500px] lg:h-screen">
        <img
          src="/images/belts/f1.png"
          alt="Left visual"
          className="w-full h-full object-contain"
        />
      </div>

      {/* CENTER CONTENT */}
      <div className="flex items-center justify-center px-5 sm:px-8 md:px-10 py-8 md:py-10 lg:py-6">
        <div className="max-w-xl text-center lg:text-left space-y-4 md:space-y-5">

          <motion.span
            className="text-gray-600 font-medium tracking-wide text-sm sm:text-base md:text-lg"
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Why Top Dog
          </motion.span>

          <motion.h1
            className="
              font-extrabold
              text-3xl
              sm:text-4xl
              md:text-5xl
              leading-tight
              text-gray-900
            "
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Engineered Without Compromise
          </motion.h1>

          <motion.p
            className="
              text-gray-600
              text-sm
              sm:text-base
              md:text-lg
              leading-relaxed
            "
            variants={paragraphVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Every detail at Top Dog is built with intention. From precision
            stitching to carefully selected materials, our products are
            engineered to perform without compromise, balancing strength,
            comfort, and refined design in every piece. This is where durability
            meets style, created for dogs that live actively and owners who
            expect more. See the craftsmanship, feel the difference, and
            discover what truly sets Top Dog apart.
          </motion.p>

        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full h-[280px] sm:h-[400px] md:h-[500px] lg:h-screen">
        <img
          src="/images/belts/f3.png"
          alt="Right visual"
          className="w-full h-full object-contain"
        />
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="
                relative
                w-full
                max-w-3xl
                bg-black
                rounded-xl
                overflow-hidden
              "
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="
                  absolute
                  top-3
                  right-3
                  z-10
                  text-white
                  bg-red-500
                  rounded-full
                  w-8
                  h-8
                  flex
                  items-center
                  justify-center
                "
              >
                ✕
              </button>

              {/* VIDEO */}
              <div className="relative w-full aspect-video bg-black">
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/vedio/vedio1.MP4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}