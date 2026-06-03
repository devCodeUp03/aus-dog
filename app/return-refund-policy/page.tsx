// app/return-refund-policy/page.tsx

import Image from "next/image";

const orange = "#E87722";

export default function ReturnRefundPolicyPage() {
  return (
    <main className="bg-white text-black">
      {/* HERO */}
      <section className="relative h-[65vh] min-h-[550px] overflow-hidden">
        <Image
          src="/images/gallery/g8.JPG"
          alt="Return & Refund Policy Background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/65" />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm uppercase tracking-[0.45em] text-orange-200">
              Top Dog Working Dog
            </p>

            <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
              Return & Refund Policy
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-zinc-200 md:text-lg">
              Customer satisfaction is important to us. We take pride in
              delivering premium-quality dog accessories designed with durability,
              comfort, and style in mind.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 space-y-14">

          {/* INTRO */}
          <div className="border-l-4 pl-6" style={{ borderColor: orange }}>
            <h2 className="text-3xl font-bold md:text-4xl">
              Returns & Refund Information
            </h2>

            <p className="mt-4 text-lg leading-8 text-zinc-700">
              If you are not completely satisfied with your purchase, we’re here to help.
            </p>
          </div>

          {/* RETURNS */}
          <div className="rounded-3xl border p-8" style={{ borderColor: orange }}>
            <h3 className="mb-6 text-2xl font-bold">Returns & Refunds</h3>
            <p className="mb-6 text-lg text-zinc-700">
              A refund or return is only eligible if your item meets <strong>all</strong> of the
              following conditions. Refunds will <strong>not</strong> be issued for any of the
              reasons listed below:
            </p>

            {/* Non-refundable reasons */}
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              {[
                "Change of mind or you no longer have a use for the product",
                "You dislike the product after purchase or it doesn't meet personal preference",
                "Incorrect size ordered — please check our size guide before purchasing",
                "Clearance or sale items — all discounted items are final sale and non-refundable",
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 text-white font-medium"
                  style={{ backgroundColor: orange }}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Shipping note */}
            <div className="rounded-2xl bg-zinc-100 p-5 mb-4 text-zinc-700 text-sm leading-relaxed">
              <p className="font-semibold text-zinc-900 mb-1">📦 Return Shipping</p>
              <p>
                Customers are responsible for all return shipping costs unless the item is faulty
                or damaged upon arrival. Original shipping costs are non-refundable under any
                circumstances.
              </p>
            </div>

            {/* Tracking note */}
            <div className="rounded-2xl bg-zinc-100 p-5 text-zinc-700 text-sm leading-relaxed">
              <p className="font-semibold text-zinc-900 mb-1">⚠️ Important Notice</p>
              <p>
                We strongly recommend using a trackable shipping service or purchasing shipping
                insurance when sending your return. Please retain your tracking number until you
                receive written confirmation of your refund. We cannot guarantee receipt of returned
                items and accept no responsibility for parcels lost in transit.
              </p>
            </div>

            <p className="mt-6 text-sm text-zinc-500">
              For return requests, please send a text message with your reason and tracking number,
              or email us at{" "}
              <a
                href="mailto:info@topdogworkingdog.com"
                style={{ color: orange }}
                className="font-medium"
              >
                info@topdogworkingdog.com
              </a>
            </p>
          </div>

          {/* FAULTY */}
          <div className="rounded-3xl border border-zinc-200 p-8">
            <h3 className="mb-6 text-2xl font-bold">Faulty or Damaged Items</h3>

            <div className="space-y-4 text-zinc-700">
              <p>
                If your item arrives damaged or incorrect, contact us within 7 days.
              </p>

              <div className="space-y-3">
                {[
                  "Order number",
                  "Description of issue",
                  "Clear photos",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl px-4 py-3 border-l-4 bg-orange-50"
                    style={{ borderColor: orange }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* REFUNDS */}
          <div className="rounded-3xl p-8 text-white" style={{ backgroundColor: orange }}>
            <h3 className="mb-6 text-2xl font-bold">Refunds</h3>

            <ul className="space-y-4 text-white/90">
              <li>• Approved refunds processed in 5–10 business days</li>
              <li>• Sent back to original payment method</li>
              <li>• Shipping fees are non-refundable unless faulty</li>
            </ul>
          </div>

          {/* SHIPPING */}
          <div className="rounded-3xl bg-orange-50 p-8 border" style={{ borderColor: orange }}>
            <h3 className="mb-6 text-2xl font-bold">Return Shipping</h3>

            <div className="grid gap-4 md:grid-cols-3">
              {["Faulty item", "Wrong item sent", "Damaged arrival"].map(
                (item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white p-5 text-center font-medium border"
                    style={{ borderColor: orange }}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* LAW */}
          <div className="rounded-3xl p-8 border-l-4 bg-white"
            style={{ borderColor: orange }}
          >
            <h3 className="mb-4 text-2xl font-bold">
              Australian Consumer Law
            </h3>

            <p className="text-lg text-zinc-700">
              You are entitled to a replacement or refund for major failures under Australian Consumer Law.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}