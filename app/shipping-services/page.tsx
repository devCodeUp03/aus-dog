// app/shipping-services/page.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Truck,
  PackageCheck,
  MapPin,
  Clock,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

const orange = "#E87722";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ShippingServicesPage() {
  return (
    <main className="overflow-hidden bg-black text-white">
      {/* HERO */}
      <section className="relative h-[75vh] min-h-[650px] overflow-hidden">
        <Image
          src="/images/gallery/g7.jpg" // replace
          alt="Shipping Services"
          fill
          priority
          className="object-cover scale-105"
        />

        <div className="absolute inset-0 bg-black/70" />


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
              Shipping Services
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-zinc-200 md:text-lg">
              Fast, safe, and reliable delivery across Australia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative bg-white text-black">

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10">
          {/* INTRO */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-20 rounded-[2rem] p-10 text-white shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${orange}, #c95f12)`,
            }}
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              Reliable Delivery You Can Trust
            </h2>
            <p className="mt-6 text-lg leading-8 text-orange-50">
              We ensure your orders are processed quickly and delivered safely
              across Australia.
            </p>
          </motion.div>

          <div className="space-y-20">
            {/* ORDER PROCESSING */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="mb-10 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                  style={{ backgroundColor: orange }}
                >
                  <PackageCheck size={28} />
                </div>
                <h3 className="text-3xl font-bold">Order Processing</h3>
              </div>

              <p className="text-lg leading-8 text-zinc-700">
                All orders are processed within 1–3 business days after payment
                confirmation. Orders placed on weekends or public holidays will
                be processed the next business day. You will receive a
                confirmation email once your order has shipped.
              </p>
            </motion.section>

            {/* SHIPPING TIMES */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="mb-10 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                  style={{ backgroundColor: orange }}
                >
                  <Truck size={28} />
                </div>
                <h3 className="text-3xl font-bold">
                  Shipping Within Australia
                </h3>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-zinc-200">
                <div
                  className="grid grid-cols-2 p-6 text-white font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${orange}, #c95f12)`,
                  }}
                >
                  <div>Shipping Type</div>
                  <div>Estimated Delivery</div>
                </div>

                {[
                  {
                    type: "Standard Shipping",
                    time: "3–8 Business Days",
                  },
                  {
                    type: "Regional & Remote Areas",
                    time: "5–12 Business Days",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 border-t border-zinc-200 bg-white p-6"
                  >
                    <div className="font-semibold">{row.type}</div>
                    <div>{row.time}</div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-zinc-600">
                Delivery times may vary depending on location, courier
                operations, weather, and peak holiday periods.
              </p>
            </motion.section>

            {/* TRACKING */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="grid gap-10 lg:grid-cols-2"
            >
              <div className="rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-sm">
                <div className="mb-6 flex items-center gap-4">
                  <Clock size={28} style={{ color: orange }} />
                  <h3 className="text-2xl font-bold">Order Tracking</h3>
                </div>

                <ul className="space-y-4 text-lg text-zinc-700">
                  <li>• Tracking number</li>
                  <li>• Courier information</li>
                  <li>• Email delivery updates</li>
                </ul>

                <p className="mt-6 text-zinc-600">
                  Please allow up to 24 hours for tracking updates after
                  dispatch.
                </p>
              </div>

              <div
                className="rounded-[2rem] p-10 text-white shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, #111, ${orange})`,
                }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <MapPin size={28} />
                  <h3 className="text-2xl font-bold">Shipping Fees</h3>
                </div>

                <p className="text-zinc-200 leading-8">
                  Shipping costs are calculated at checkout based on location,
                  order size, weight, and shipping method.
                </p>

                <p className="mt-6 text-zinc-300">
                  Free shipping promotions (if available) will be clearly shown
                  on the website.
                </p>
              </div>
            </motion.section>

            {/* DELAYS */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-[2rem] bg-zinc-100 p-12"
            >
              <div className="mb-8 flex items-center gap-4">
                <AlertTriangle size={30} style={{ color: orange }} />
                <h3 className="text-3xl font-bold">Delays & Issues</h3>
              </div>

              <p className="text-lg leading-8 text-zinc-700">
                Delays may occur due to weather, holidays, high shipping
                volumes, or courier issues. We are not responsible for delays
                once parcels are handed to the courier, but we will assist in
                resolving any issues.
              </p>
            </motion.section>

            {/* ADDRESS ISSUES */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-[2rem] border border-zinc-200 bg-white p-10 shadow-sm"
            >
              <h3 className="mb-6 text-3xl font-bold">
                Incorrect Shipping Information
              </h3>

              <ul className="space-y-4 text-lg text-zinc-700">
                <li>• We are not responsible for incorrect addresses</li>
                <li>• Failed deliveries due to customer error</li>
                <li>• Extra shipping costs caused by incorrect info</li>
              </ul>

              <p className="mt-6 text-zinc-600">
                Please contact us immediately if you notice an error before
                dispatch.
              </p>
            </motion.section>

            {/* LOST OR DAMAGED */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-[2rem] bg-black p-12 text-white shadow-2xl"
            >
              <div className="mb-8 flex items-center gap-4">
                <ShieldCheck size={34} style={{ color: orange }} />
                <h3 className="text-3xl font-bold">
                  Lost or Damaged Packages
                </h3>
              </div>

              <div className="space-y-4 text-lg leading-8 text-zinc-300">
                <p>1. Contact us as soon as possible</p>
                <p>2. Provide your order number</p>
                <p>3. Include photos if damaged</p>
              </div>

              <p className="mt-8 text-zinc-400">
                We will work with the courier to investigate and resolve the
                issue promptly.
              </p>
            </motion.section>
          </div>
        </div>
      </section>
    </main>
  );
}