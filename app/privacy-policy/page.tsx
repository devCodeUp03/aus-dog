// app/privacy-policy/page.tsx

import Image from "next/image";

const orange = "#E87722";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-black font-sans">
      {/* HERO */}
      <section className="relative h-[65vh] min-h-[550px] overflow-hidden">
        <Image
          src="/images/gallery/g2.JPG"
          alt="Privacy Policy Background"
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
              Privacy Policy
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-zinc-200 md:text-xl">
              Your privacy is important to us. We protect your personal information
              in accordance with Australian privacy laws.
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
              Welcome to Top Dog Working Dog
            </h2>

            <p className="mt-4 text-lg leading-8 text-zinc-700">
              This policy explains how we collect, use, disclose, and protect your information.
            </p>
          </div>

          {/* INFORMATION */}
          <div>
            <h3 className="mb-6 text-2xl font-bold">Information We Collect</h3>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Personal */}
              <div
                className="rounded-3xl p-8 text-white"
                style={{ backgroundColor: orange }}
              >
                <h4 className="mb-5 text-xl font-semibold">
                  Personal Information
                </h4>

                <ul className="space-y-3 text-white/90">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Shipping & billing address</li>
                  <li>Payment details</li>
                  <li>Order history</li>
                </ul>
              </div>

              {/* Non Personal */}
              <div className="rounded-3xl border border-orange-200 bg-orange-50 p-8">
                <h4 className="mb-5 text-xl font-semibold">
                  Non-Personal Information
                </h4>

                <ul className="space-y-3 text-zinc-700">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Website usage data</li>
                  <li>Cookies & analytics</li>
                </ul>
              </div>
            </div>
          </div>

          {/* HOW WE USE */}
          <div>
            <h3 className="mb-6 text-2xl font-bold">
              How We Use Your Information
            </h3>

            <div
              className="rounded-3xl p-8 text-white"
              style={{ backgroundColor: orange }}
            >
              <ul className="grid gap-4 md:grid-cols-2 text-white/90">
                <li>Process and fulfil orders</li>
                <li>Customer support</li>
                <li>Improve website experience</li>
                <li>Send order updates</li>
                <li>Prevent fraud</li>
                <li>Marketing (if opted in)</li>
              </ul>
            </div>
          </div>

          {/* PAYMENT SECURITY */}
          <div>
            <h3 className="mb-6 text-2xl font-bold">Payment Security</h3>

            <div className="rounded-3xl border border-orange-200 p-8">
              <p className="text-lg leading-8 text-zinc-700">
                We do not store your full payment card details.
              </p>

              <p className="mt-5 text-lg leading-8 text-zinc-700">
                Payments are securely processed through encrypted third-party providers.
              </p>
            </div>
          </div>

          {/* SHARING */}
          <div>
            <h3 className="mb-6 text-2xl font-bold">
              Sharing Your Information
            </h3>

            <div className="rounded-3xl bg-orange-50 p-8 border border-orange-100">
              <p className="text-lg text-zinc-700 mb-4">
                We do not sell or rent your personal data.
              </p>

              <ul className="space-y-3 text-zinc-700">
                <li>Shipping providers</li>
                <li>Payment processors</li>
                <li>Analytics services</li>
                <li>Legal authorities if required</li>
              </ul>
            </div>
          </div>

          {/* DATA SECURITY */}
          <div>
            <h3 className="mb-6 text-2xl font-bold">Data Security</h3>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Unauthorized access",
                "Misuse",
                "Loss",
                "Disclosure",
                "Alteration",
                "Destruction",
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 text-white text-center font-medium"
                  style={{ backgroundColor: orange }}
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-6 text-zinc-700">
              No system is 100% secure, but we use industry-standard protection.
            </p>
          </div>

          {/* MARKETING */}
          <div className="rounded-3xl border border-orange-200 p-8">
            <h3 className="mb-4 text-2xl font-bold">
              Marketing Communications
            </h3>

            <p className="text-lg text-zinc-700">
              You may unsubscribe anytime using the link in our emails.
            </p>
          </div>

          {/* RIGHTS */}
          <div>
            <h3 className="mb-6 text-2xl font-bold">Your Rights</h3>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                "Access personal data",
                "Correct inaccurate data",
                "Withdraw consent",
                "Request deletion",
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-orange-200 p-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* OTHER */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold mb-4">Third-Party Links</h3>
              <p className="text-lg text-zinc-700">
                We are not responsible for external websites.
              </p>
            </div>

            <div className="border-l-4 pl-6" style={{ borderColor: orange }}>
              <h3 className="text-2xl font-bold mb-4">Changes to Policy</h3>
              <p className="text-lg text-zinc-700">
                We may update this policy and will post changes here.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}