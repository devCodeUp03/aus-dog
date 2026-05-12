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
  title: "Aus Dog - Premium Dog Accessories",
  description: "E-commerce website",
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