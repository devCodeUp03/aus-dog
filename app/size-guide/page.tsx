// app/size-guide/page.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Ruler,
  ShieldCheck,
  PawPrint,
  Dog,
} from "lucide-react";

const orange = "#E87722";

const sizes = [
  {
    size: "XS",
    neck: "20–28 cm",
    for: "Puppies & Toy Breeds",
  },
  {
    size: "S",
    neck: "28–36 cm",
    for: "Small Breeds",
  },
  {
    size: "M",
    neck: "36–46 cm",
    for: "Medium Breeds",
  },
  {
    size: "L",
    neck: "46–56 cm",
    for: "Large Breeds",
  },
  {
    size: "XL",
    neck: "56–66 cm",
    for: "Extra Large Breeds",
  },
];

const breedGuide = [
  {
    size: "XS",
    breeds: ["Chihuahua", "Pomeranian", "Toy Poodle"],
  },
  {
    size: "S",
    breeds: ["French Bulldog", "Dachshund", "Cavoodle"],
  },
  {
    size: "M",
    breeds: ["Border Collie", "Beagle", "Cocker Spaniel"],
  },
  {
    size: "L",
    breeds: ["Labrador Retriever", "Golden Retriever", "Boxer"],
  },
  {
    size: "XL",
    breeds: ["German Shepherd", "Rottweiler", "Great Dane"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function SizeGuidePage() {
  return (
    <main className="overflow-hidden bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative h-[75vh] min-h-[650px] overflow-hidden">
        <Image
          src="/images/gallery/g10.jpg" // replace image
          alt="Size Guide"
          fill
          priority
          className="object-cover scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Orange Glow */}

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
              Top Dog Australia
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-7xl xl:text-8xl">
              Size Guide
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-zinc-200 md:text-lg">
              Finding the perfect fit is important for your dog’s comfort,
              safety, and everyday wear.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative bg-white text-black">
        {/* Background Effects */}

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
              Comfortable Fit Matters
            </h2>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-orange-50">
              Our collars are designed to provide a secure and comfortable fit
              for dogs of all sizes. Use the guide below to choose the perfect
              size for your dog.
            </p>
          </motion.div>

          <div className="space-y-20">
            {/* HOW TO MEASURE */}
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
                  <Ruler size={28} />
                </div>

                <h3 className="text-3xl font-bold">
                  How to Measure Your Dog
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  "Use a soft measuring tape",
                  "Measure around the base of the neck",
                  "Keep the tape snug but not tight",
                  "Allow enough room for two fingers",
                ].map((step, i) => (
                  <motion.div
                    whileHover={{ y: -5 }}
                    key={i}
                    className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
                  >
                    <div
                      className="mb-5 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
                      style={{ backgroundColor: orange }}
                    >
                      {i + 1}
                    </div>

                    <p className="text-lg leading-8 text-zinc-700">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="mt-8 text-lg leading-8 text-zinc-700">
                If your dog falls between sizes, we recommend choosing the
                larger size for added comfort.
              </p>
            </motion.div>

            {/* SIZE TABLE */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-[2rem] border border-zinc-200 shadow-sm"
            >
              <div
                className="grid grid-cols-3 p-6 text-lg font-semibold text-white"
                style={{
                  background: `linear-gradient(135deg, ${orange}, #c95f12)`,
                }}
              >
                <div>Size</div>
                <div>Neck Size</div>
                <div>Recommended For</div>
              </div>

              {sizes.map((item, i) => (
                <motion.div
                  whileHover={{ backgroundColor: "#fff7f2" }}
                  key={i}
                  className="grid grid-cols-3 border-t border-zinc-200 bg-white p-6 transition-colors"
                >
                  <div className="font-bold">{item.size}</div>
                  <div>{item.neck}</div>
                  <div>{item.for}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* BREED GUIDE */}
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
                  <Dog size={28} />
                </div>

                <h3 className="text-3xl font-bold">
                  Breed Size Reference
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {breedGuide.map((item, i) => (
                  <motion.div
                    whileHover={{ y: -6 }}
                    key={i}
                    className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm"
                  >
                    <div
                      className="mb-6 inline-flex rounded-full px-5 py-2 text-sm font-bold text-white"
                      style={{ backgroundColor: orange }}
                    >
                      {item.size}
                    </div>

                    <div className="space-y-4">
                      {item.breeds.map((breed, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3"
                        >
                          <PawPrint
                            size={18}
                            color={orange}
                          />

                          <p className="text-lg text-zinc-700">
                            {breed}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="mt-8 text-lg leading-8 text-zinc-700">
                Please note: Breed recommendations are general guides only.
                Always measure your dog before purchasing.
              </p>
            </motion.div>

            {/* FIT TIPS */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] bg-black p-12 text-white shadow-2xl"
            >
              <div className="mb-8 flex items-center gap-4">
                <ShieldCheck size={34} color={orange} />

                <h3 className="text-3xl font-bold">
                  Fit Tips
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  "Sit comfortably around the neck",
                  "Should not slide over the dog’s head",
                  "Allow two fingers between collar and neck",
                  "Stay secure without causing discomfort",
                ].map((tip, i) => (
                  <motion.div
                    whileHover={{ x: 6 }}
                    key={i}
                    className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                  >
                    {tip}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* GROWING PUPPIES */}
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
                  Growing Puppies
                </h3>

                <p className="text-lg leading-8 text-orange-50">
                  Puppies grow quickly, so we recommend checking collar fit
                  regularly and sizing up when necessary.
                </p>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-sm">
                <h3 className="mb-6 text-3xl font-bold">
                  Need Help Choosing?
                </h3>

                <p className="text-lg leading-8 text-zinc-700">
                  If you're unsure about sizing, our support team is happy to
                  assist you in finding the perfect fit for your dog.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}