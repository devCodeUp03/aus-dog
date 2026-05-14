// app/faq/page.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const orange = "#E87722";

const faqSections = [
  {
    title: "General",
    questions: [
      {
        q: "What is Top Dog Australia?",
        a: "Top Dog Australia is a premium dog accessories brand focused on stylish, durable, and high-quality products designed for modern dog owners and their pets.",
      },
      {
        q: "What products do you sell?",
        a: "We currently offer premium dog collars and accessories designed with comfort, durability, and aesthetics in mind. More product categories may be added in the future.",
      },
      {
        q: "Are your products suitable for all dog breeds?",
        a: "Yes. Our products are designed for a wide range of breeds and sizes. Please refer to the product sizing guide before purchasing to ensure the best fit for your dog.",
      },
    ],
  },

  {
    title: "Orders & Payments",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept secure online payments through Visa, Mastercard, PayPal, and Google Pay.",
      },
      {
        q: "Can I change or cancel my order after placing it?",
        a: "If your order has not yet been processed or shipped, we may be able to modify or cancel it. Please contact us as soon as possible.",
      },
      {
        q: "Will I receive an order confirmation?",
        a: "Yes. Once your order is successfully placed, you will receive an email confirmation with your order details.",
      },
    ],
  },

  {
    title: "Shipping & Delivery",
    questions: [
      {
        q: "Do you ship Australia-wide?",
        a: "Yes. We currently ship across Australia.",
      },
      {
        q: "How long does shipping take?",
        a: "Standard shipping usually takes 3–8 business days. Regional areas may take longer, especially during holidays or peak periods.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order is shipped, you will receive a tracking number via email to monitor delivery status.",
      },
    ],
  },

  {
    title: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept eligible returns within 14 days of delivery provided the item is unused and in its original condition.",
      },
      {
        q: "What if my product arrives damaged or faulty?",
        a: "If your item arrives damaged, defective, or incorrect, contact us within 7 days with photos and order details.",
      },
      {
        q: "How long do refunds take?",
        a: "Approved refunds are generally processed within 5–10 business days depending on your payment provider.",
      },
    ],
  },

  {
    title: "Product Care",
    questions: [
      {
        q: "How do I clean the dog collars?",
        a: "We recommend gentle hand cleaning with mild soap and warm water. Avoid harsh chemicals or machine washing unless specified.",
      },
      {
        q: "Are your collars waterproof?",
        a: "Some materials may be water-resistant, but specifications vary. Please check individual product descriptions.",
      },
    ],
  },

  {
    title: "Security & Privacy",
    questions: [
      {
        q: "Is my payment information secure?",
        a: "Yes. Payments are processed through secure encrypted payment gateways. We do not store full payment card details.",
      },
      {
        q: "Do you collect personal information?",
        a: "Yes, only information necessary to process orders, improve user experience, and provide customer support.",
      },
    ],
  },

  {
    title: "Contact & Support",
    questions: [
      {
        q: "How can I contact customer support?",
        a: "You can contact us through the contact page on our website.",
      },
      {
        q: "How quickly do you respond to enquiries?",
        a: "We aim to respond to all customer enquiries within 24–48 business hours.",
      },
    ],
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 p-6 text-left md:p-8"
      >
        <h4 className="text-lg font-semibold md:text-xl">
          {question}
        </h4>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 pt-0 md:px-8 md:pb-8">
          <p className="text-lg leading-8 text-zinc-600">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <main className="overflow-hidden bg-black text-white">
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <Image
          src="/images/gallery/g16.png" // replace image
          alt="FAQ Background"
          fill
          priority
          className="object-cover scale-105"
        />

        <div className="absolute inset-0 bg-black/70" />

        {/* Glow */}

        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl"
          >
            <p className="mb-5 text-sm uppercase tracking-[0.5em] text-zinc-300">
              Top Dog Australia
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-7xl xl:text-8xl">
              Frequently Asked Questions
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-zinc-200 md:text-lg">
              Everything you need to know about our products, orders,
              shipping, returns, and customer support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="relative bg-white text-black">

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:px-10">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 rounded-[2rem] p-10 text-white shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${orange}, #c95f12)`,
            }}
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              Need Help?
            </h2>

            <p className="mt-6 text-lg leading-8 text-orange-50">
              Browse our frequently asked questions below. If you still need
              assistance, our support team is happy to help.
            </p>
          </motion.div>

          {/* FAQ Sections */}
          <div className="space-y-16">
            {faqSections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8 flex items-center gap-4">
                  <div
                    className="h-12 w-2 rounded-full"
                    style={{ backgroundColor: orange }}
                  />

                  <h3 className="text-3xl font-bold">
                    {section.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {section.questions.map((item, i) => (
                    <FAQItem
                      key={i}
                      question={item.q}
                      answer={item.a}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 rounded-[2rem] bg-black p-12 text-white shadow-2xl"
          >
            <h3 className="text-3xl font-bold">
              Still Have Questions?
            </h3>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              If you couldn’t find the answer you were looking for, feel free
              to contact our team and we’ll be happy to help.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <motion.a
                whileHover={{ y: -4 }}
                href="tel:+610461409472"
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-400">
                  Phone
                </p>

                <p className="text-2xl font-semibold">
                  +61 0461 409 472
                </p>
              </motion.a>

              <motion.a
                whileHover={{ y: -4 }}
                href="mailto:info@topdogworkingdog.com"
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-400">
                  Email
                </p>

                <p className="text-2xl font-semibold break-all">
                  info@topdogworkingdog.com
                </p>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}