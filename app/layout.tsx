import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "sonner";

import "./globals.css";

// Font setup
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://topdogworkingdog.com"),

  title: {
    default: "Top Dog Working Dog",
    template: "%s | Top Dog Working Dog",
  },

  description:
    "Premium working dog collars made for Australia's toughest dogs. Shop hunting dog collars, whippet collars, terrier collars, high visibility collars and durable collars for active dogs.",

  keywords: [
    "top dog working dog",
    "working dog collars",
    "working dog collars australia",
    "dog collars australia",
    "best dog collars",
    "high visibility dog collars",
    "hi vis dog collars",
    "hunting dog collars",
    "hunting dog collars australia",
    "running dog collars",
    "large dog collars",
    "strong dog collars",
    "strong dog collars australia",
    "whippet collars",
    "whippet dog collars",
    "terrier collars",
    "durable dog collars",
    "heavy duty dog collars",
    "reflective dog collars",
    "farm dog collars",
    "premium dog collars",
    "waterproof dog collars",
    "australian working dogs",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Top Dog Working Dog",
    description:
      "Premium working dog collars for hunting dogs, working dogs, terriers, whippets and large breeds across Australia.",
    url: "https://topdogworkingdog.com",
    siteName: "Top Dog Working Dog",
    locale: "en_AU",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Top Dog Working Dog",
    description:
      "Premium working dog collars built for Australia's toughest dogs.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="font-sans antialiased bg-white text-black">
        <AuthProvider>
          <CartProvider>
            <Header />

            <main className="min-h-screen">
              {children}
            </main>

            <Footer />
            <Toaster position="top-right" richColors />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}