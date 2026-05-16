// app/terms-conditions/page.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const orange = "#E87722";

export default function TermsConditionsPage() {
  return (
    <main className="text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] min-h-150 overflow-hidden">
        <Image
          src="/images/gallery/g14.jpeg"
          alt="Terms and Conditions"
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
              Terms & Conditions
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-zinc-200 md:text-lg">
              Please read these Terms and Conditions carefully before placing an
              order with Top Dog. By accessing our website or purchasing our
              products, you agree to be bound by these terms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="relative bg-white text-black">
        {/* Background Decorations (kept minimal, unchanged style system) */}
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-zinc-100 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-zinc-100 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10">

          {/* Intro Card (UPDATED → orange) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-20 rounded-[2rem] p-10 text-white shadow-2xl"
            style={{ backgroundColor: orange }}
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              Legal Agreement
            </h2>

            <p className="mt-6 text-lg leading-8 text-orange-50">
              These Terms and Conditions govern your use of the Top Dog website
              and the purchase of products offered through it. By browsing the
              site, creating an account, or completing a purchase, you confirm
              that you have read, understood, and agree to these Terms in full.
            </p>
          </motion.div>

          <div className="space-y-20">

            {/* Acceptance */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="grid gap-10 lg:grid-cols-2"
            >
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  01
                </p>

                <h3 className="text-3xl font-bold">
                  Acceptance of Terms
                </h3>
              </div>

              <div className="space-y-6 text-lg leading-8 text-zinc-700">
                <p>
                  Top Dog reserves the right to update these Terms at any time.
                  Continued use of the website following any update constitutes
                  your acceptance of the revised Terms.
                </p>

                <p>
                  By accessing our website or purchasing products, you agree to
                  comply with all policies and legal obligations outlined within
                  these Terms.
                </p>
              </div>
            </motion.div>

            {/* Eligibility */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] bg-zinc-100 p-10"
            >
              <h3 className="mb-8 text-3xl font-bold">Eligibility</h3>

              <div className="grid gap-6 md:grid-cols-3">
                {[
                  "Be at least 18 years of age or have guardian consent",
                  "Provide accurate billing and shipping information",
                  "Use a valid payment method accepted on our platform",
                ].map((item, i) => (
                  <motion.div
                    whileHover={{ y: -6 }}
                    key={i}
                    className="rounded-3xl bg-white p-8 shadow-sm transition-all"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                      {i + 1}
                    </div>

                    <p className="text-lg leading-7 text-zinc-700">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Products */}
            <motion.div>
              <h3 className="mb-8 text-3xl font-bold">
                Products & Descriptions
              </h3>

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-zinc-200 p-10">
                  <p className="text-lg leading-8 text-zinc-700">
                    We make every effort to display our products as accurately
                    as possible, including colour, material, and sizing.
                    However, slight colour variations may occur due to monitor
                    settings, ambient light, or manufacturing batches.
                  </p>
                </div>

                {/* UPDATED → orange */}
                <div
                  className="rounded-[2rem] p-10 text-white"
                  style={{ backgroundColor: orange }}
                >
                  <h4 className="mb-6 text-2xl font-semibold">
                    Top Dog Reserves the Right To:
                  </h4>

                  <ul className="space-y-4 text-orange-50">
                    <li>• Discontinue any product at any time without notice</li>
                    <li>• Modify specifications or materials where necessary</li>
                    <li>• Limit purchase quantities per customer or household</li>
                    <li>• Conduct quality inspections before dispatch</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Orders */}
            <motion.div className="rounded-[2rem] bg-white p-10 shadow-sm border border-zinc-200">
              <h3 className="mb-8 text-3xl font-bold">
                Orders & Payment
              </h3>

              <div className="grid gap-10 lg:grid-cols-2">
                <p className="text-lg leading-8 text-zinc-700">
                  All orders are subject to acceptance and availability.
                  Placing an order does not constitute a binding contract until
                  you receive an order confirmation email from us.
                </p>

                <div>
                  <h4 className="mb-5 text-xl font-semibold">
                    Accepted Payment Methods
                  </h4>

                  <div className="flex flex-wrap gap-4">
                    {["Visa", "Mastercard", "PayPal", "Google Pay"].map(
                      (item, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-zinc-200 px-6 py-4 font-medium shadow-sm"
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Shipping (UPDATED → orange) */}
            <motion.div
              className="rounded-[2rem] p-12 text-white"
              style={{ backgroundColor: orange }}
            >
              <h3 className="mb-8 text-3xl font-bold">
                Shipping & Delivery
              </h3>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  "Orders dispatched within 2–4 business days",
                  "Delivery estimates are not guaranteed",
                  "Risk of loss passes upon dispatch",
                  "Ensure address accuracy before checkout",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/20 bg-white/10 p-6"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Intellectual Property */}
            <div>
              <h3 className="mb-6 text-3xl font-bold">
                Intellectual Property
              </h3>

              <p className="text-lg leading-8 text-zinc-700">
                All content on this website, including photography, logos,
                branding, text, and product designs, is the exclusive property
                of Top Dog or its licensors.
              </p>
            </div>

            {/* Liability (UPDATED → orange) */}
            <motion.div
              className="rounded-[2rem] p-12 text-white"
              style={{ backgroundColor: orange }}
            >
              <h3 className="mb-8 text-3xl font-bold">
                Limitation of Liability
              </h3>

              <div className="space-y-6 text-orange-50">
                <p>
                  Top Dog shall not be liable for indirect or consequential
                  damages arising from use of products or website.
                </p>

                <p>
                  Liability shall not exceed the original purchase price.
                </p>

                <p>
                  Australian Consumer Law rights remain unaffected.
                </p>
              </div>
            </motion.div>

            {/* Changes */}
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-zinc-200 p-10">
                <h3 className="mb-6 text-3xl font-bold">
                  Changes to Terms
                </h3>

                <p className="text-lg leading-8 text-zinc-700">
                  Top Dog may update these Terms at any time without notice.
                </p>
              </div>

              {/* UPDATED → orange */}
              <div
                className="rounded-[2rem] p-10 text-white"
                style={{ backgroundColor: orange }}
              >
                <h3 className="mb-6 text-3xl font-bold">
                  Governing Law
                </h3>

                <p className="text-orange-50">
                  Victoria, Australia jurisdiction applies to all disputes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}