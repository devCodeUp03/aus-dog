// app/product-care/page.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Droplets,
  Sparkles,
  AlertTriangle,
  HeartHandshake,
} from "lucide-react";

const orange = "#E87722";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductCarePage() {
  return (
    <main className="overflow-hidden bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative h-[75vh] min-h-[650px] overflow-hidden">
        <Image
          src="/images/gallery/g11.jpg" // replace with your image
          alt="Product Care Guide"
          fill
          priority
          className="object-cover scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />


        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <p className="mb-5 text-sm uppercase tracking-[0.5em] text-zinc-300">
              Top Dog Working Dog
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-7xl xl:text-8xl">
              Product Care Guide
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-zinc-200 md:text-lg">
              Proper care helps keep your dog accessories looking great and
              performing at their best for years to come.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="relative bg-white text-black">
        {/* Background Glow */}

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10">
          {/* INTRO CARD */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-20 rounded-[2rem] p-10 text-white shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${orange}, #c95f12)`,
            }}
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              Caring for Your Top Dog Products
            </h2>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-orange-50">
              Every product is designed with quality, durability, and comfort
              in mind. Routine maintenance and proper storage will maximize
              performance and extend product lifespan.
            </p>
          </motion.div>

          <div className="space-y-20">
            {/* DAILY CARE */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                  style={{ backgroundColor: orange }}
                >
                  <Sparkles size={28} />
                </div>

                <h3 className="text-3xl font-bold">
                  Daily Care
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  "Wipe away dirt, mud, or moisture after use",
                  "Avoid prolonged exposure to direct sunlight",
                  "Inspect collars and hardware regularly",
                ].map((item, i) => (
                  <motion.div
                    whileHover={{ y: -6 }}
                    key={i}
                    className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
                  >
                    <p className="text-lg leading-8 text-zinc-700">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CLEANING */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] bg-zinc-100 p-12"
            >
              <div className="mb-10 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                  style={{ backgroundColor: orange }}
                >
                  <Droplets size={28} />
                </div>

                <h3 className="text-3xl font-bold">
                  Cleaning Instructions
                </h3>
              </div>

              <div className="grid gap-10 lg:grid-cols-2">
                {/* Steps */}
                <div className="rounded-[2rem] bg-white p-10 shadow-sm">
                  <h4 className="mb-8 text-2xl font-bold">
                    Dog Collars — Hand Cleaning Recommended
                  </h4>

                  <div className="space-y-5">
                    {[
                      "Use lukewarm water",
                      "Apply mild soap or pet-safe detergent",
                      "Gently scrub using a soft cloth or sponge",
                      "Rinse thoroughly with clean water",
                      "Air dry completely before reuse",
                    ].map((step, i) => (
                      <motion.div
                        whileHover={{ x: 6 }}
                        key={i}
                        className="flex items-start gap-4 rounded-2xl border border-zinc-100 p-5"
                      >
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                          style={{ backgroundColor: orange }}
                        >
                          {i + 1}
                        </div>

                        <p className="pt-1 text-lg text-zinc-700">
                          {step}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Warning */}
                <div
                  className="rounded-[2rem] p-10 text-white shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, #111, ${orange})`,
                  }}
                >
                  <div className="mb-8 flex items-center gap-4">
                    <AlertTriangle size={34} />

                    <h4 className="text-2xl font-bold">
                      Important Care Tips
                    </h4>
                  </div>

                  <div className="space-y-5 text-zinc-200">
                    {[
                      "Do not machine wash unless stated",
                      "Avoid bleach or harsh chemicals",
                      "Do not tumble dry",
                      "Do not iron the product",
                      "Avoid soaking metal hardware",
                    ].map((tip, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
                      >
                        {tip}
                      </div>
                    ))}
                  </div>

                  <p className="mt-8 text-zinc-300">
                    Harsh cleaning methods may damage fabrics, stitching,
                    coatings, or hardware finishes.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* OUTDOOR USE */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                  style={{ backgroundColor: orange }}
                >
                  <ShieldCheck size={28} />
                </div>

                <h3 className="text-3xl font-bold">
                  Waterproof & Outdoor Use
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {[
                  "Dry products thoroughly after rain",
                  "Long-term moisture may reduce lifespan",
                ].map((item, i) => (
                  <motion.div
                    whileHover={{ y: -5 }}
                    key={i}
                    className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
                  >
                    <p className="text-lg leading-8 text-zinc-700">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* HARDWARE */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-zinc-200 bg-white p-12 shadow-sm"
            >
              <h3 className="mb-8 text-3xl font-bold">
                Metal Hardware Care
              </h3>

              <div className="grid gap-6 md:grid-cols-3">
                {[
                  "Keep hardware clean and dry",
                  "Remove dirt or sand after outdoor use",
                  "Avoid unnecessary chemical exposure",
                ].map((item, i) => (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    key={i}
                    className="rounded-3xl bg-zinc-100 p-8"
                  >
                    <p className="text-lg leading-8 text-zinc-700">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="mt-8 text-lg leading-8 text-zinc-700">
                Minor scratches and natural wear may occur over time with
                regular use.
              </p>
            </motion.div>

            {/* SAFETY */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] bg-black p-12 text-white shadow-2xl"
            >
              <div className="mb-8 flex items-center gap-4">
                <HeartHandshake size={34} color={orange} />

                <h3 className="text-3xl font-bold">
                  Proper Fit & Safety
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  "Ensure collars are not too tight or too loose",
                  "Check fit regularly for growing dogs",
                  "Do not continue using damaged collars",
                  "Supervise pets during high-activity situations",
                ].map((item, i) => (
                  <motion.div
                    whileHover={{ x: 6 }}
                    key={i}
                    className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* PRODUCT LIFESPAN */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="grid gap-10 lg:grid-cols-2"
            >
              <div
                className="rounded-[2rem] p-10 text-white"
                style={{
                  background: `linear-gradient(135deg, ${orange}, #c95f12)`,
                }}
              >
                <h3 className="mb-6 text-3xl font-bold">
                  Product Lifespan
                </h3>

                <p className="text-lg leading-8 text-orange-50">
                  All pet accessories experience natural wear over time
                  depending on frequency of use, outdoor exposure, activity
                  level, and dog size or strength.
                </p>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 p-10">
                <h3 className="mb-6 text-3xl font-bold">
                  Long-Term Performance
                </h3>

                <p className="text-lg leading-8 text-zinc-700">
                  Routine care and maintenance will help maximize durability,
                  appearance, and performance for years to come.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}