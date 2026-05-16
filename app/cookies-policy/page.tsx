// app/cookies-policy/page.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const orange = "#E87722";

export default function CookiesPolicyPage() {
  return (
    <main className="bg-white text-black overflow-hidden">
      {/* HERO */}
      <section className="relative h-[65vh] min-h-[550px] overflow-hidden">
        <Image
          src="/images/gallery/g13.png"
          alt="Cookies Policy"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/65" />

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

            <h1 className="text-5xl font-bold text-white md:text-7xl">
              Cookies Policy
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-200">
              This Cookies Policy explains how we use cookies and similar technologies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white text-black">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 space-y-16">

          {/* INTRO */}
          <div className="border-b border-zinc-200 pb-10">
            <h2 className="text-3xl font-bold md:text-4xl">
              Understanding Cookies
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-700">
              Cookies help improve your browsing experience and website functionality.
            </p>
          </div>

          {/* WHAT ARE COOKIES */}
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p
                className="mb-4 text-sm font-semibold uppercase tracking-[0.3em]"
                style={{ color: orange }}
              >
                01
              </p>

              <h3 className="text-3xl font-bold">
                What Are Cookies?
              </h3>
            </div>

            <div className="space-y-6 text-lg leading-8 text-zinc-700">
              <p>
                Cookies are small text files stored on your device to improve functionality.
              </p>

              <p>
                They may be session cookies or persistent cookies.
              </p>
            </div>
          </div>

          {/* HOW WE USE */}
          <div>
            <h3 className="mb-6 text-2xl font-bold">
              How We Use Cookies
            </h3>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                "Website functionality",
                "Shopping cart memory",
                "Analytics tracking",
                "User preferences",
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-zinc-200 p-6"
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: orange }}
                  >
                    {i + 1}
                  </div>

                  <p className="text-zinc-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TYPES */}
          <div>
            <h3 className="mb-8 text-2xl font-bold">
              Types of Cookies
            </h3>

            <div className="space-y-6">

              <div className="rounded-2xl border border-zinc-200 p-6">
                <h4 className="font-semibold mb-2">Essential Cookies</h4>
                <p className="text-zinc-700">
                  Required for website operation like checkout and security.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 p-6">
                <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                <p className="text-zinc-700">
                  Help us understand how users interact with the website.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 p-6">
                <h4 className="font-semibold mb-2">Functional Cookies</h4>
                <p className="text-zinc-700">
                  Remember preferences like language and saved items.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 p-6">
                <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                <p className="text-zinc-700">
                  Used for personalized advertising and campaigns.
                </p>
              </div>

            </div>
          </div>

          {/* THIRD PARTY */}
          <div className="rounded-2xl border border-zinc-200 p-8">
            <h3 className="mb-6 text-2xl font-bold">
              Third-Party Cookies
            </h3>

            <div className="grid gap-4 md:grid-cols-2 text-zinc-700">
              <p>Payment gateways</p>
              <p>Analytics providers</p>
              <p>Social media platforms</p>
              <p>Advertising networks</p>
            </div>
          </div>

          {/* MANAGING */}
          <div className="rounded-2xl bg-black p-8 text-white">
            <h3 className="mb-6 text-2xl font-bold">
              Managing Cookies
            </h3>

            <ul className="space-y-3 text-zinc-300">
              <li>Block cookies in browser settings</li>
              <li>Delete stored cookies</li>
              <li>Receive cookie alerts</li>
            </ul>
          </div>

          {/* FINAL */}
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 p-8">
              <h3 className="mb-4 text-2xl font-bold">Updates</h3>
              <p className="text-zinc-700">
                We may update this policy from time to time.
              </p>
            </div>

            <div className="rounded-2xl p-8 text-white" style={{ backgroundColor: orange }}>
              <h3 className="mb-4 text-2xl font-bold">Effective Date</h3>
              <p className="text-white/90">
                Changes take effect when published.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}