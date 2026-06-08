import Link from "next/link";
import React from "react";
import { Facebook, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3a3a3a] text-[#d4d0cc] font-serif">

      {/* Top Dog Header */}
      <div className="text-center py-10 border-b border-white/10">
        <h1 className="text-4xl tracking-[6px] text-white">TOP DOG</h1>
        <p className="text-sm tracking-[6px] text-[#c5c0bb] mt-2">
          - WORKING DOG -
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-4">

        {/* About */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-white mb-4">
            About Top Dog
          </h3>
          <p className="text-sm text-[#b8b4af] leading-6">
            Top Dog creates functional yet luxury accessories for dogs.
            Every piece is designed with purpose, crafted to last, and made
            to celebrate the bond between you and your companion.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-white mb-4">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/contact" className="hover:text-[#E87722]">Contact</a></li>
            <li><Link href="/product-care" className="hover:text-[#E87722]">Product Care</Link></li>
            <li><Link href="/size-guide" className="hover:text-[#E87722]">Size Guide</Link></li>
            <li><a href="/faq" className="hover:text-[#E87722]">FAQs</a></li>
            <li><a href="/shipping-services" className="hover:text-[#E87722]">Shipping Services</a></li>
            <li><a href="/terms-conditions" className="hover:text-[#E87722]">Terms & Conditions</a></li>
            <li><a href="/return-refund-policy" className="hover:text-[#E87722]">Return Policy</a></li>
            <li><a href="/privacy-policy" className="hover:text-[#E87722]">Privacy Policy</a></li>
            <li><a href="/cookies-policy" className="hover:text-[#E87722]">Cookies Policy</a></li>
            <li><a href="/contact" className="hover:text-[#E87722]">Customer Support</a></li>
          </ul>
        </div>

        {/* Find Us On */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-white mb-4">
            Find Us On
          </h3>

          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/share/1FZZk7Mj5R/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E87722] transition"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>

            <a
              href="https://www.instagram.com/topdog.workingdog/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E87722] transition"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-white mb-4">
            Contact
          </h3>
          <p className="text-sm">+61 0461 409 472</p>

          <p className="text-sm mt-1">info@topdogworkingdog.com</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="flex justify-center gap-3 sm:gap-8 flex-nowrap py-4 border-t border-white/10 items-center overflow-x-auto">

        <div className="w-16 sm:w-24 h-20  flex items-center justify-center opacity-80 hover:opacity-100 transition">
          <img
            src="/images/logos/paypal.png"
            alt="PayPal"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="w-16 sm:w-24 h-8 flex items-center justify-center opacity-80 hover:opacity-100 transition">
          <img
            src="/images/logos/gpay.png"
            alt="Google Pay"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="w-16 sm:w-24 h-15  flex items-center justify-center opacity-80 hover:opacity-100 transition">
          <img
            src="/images/logos/image.png"
            alt="MasterCard "
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="w-16 sm:w-24 h-15  flex items-center justify-center opacity-80 hover:opacity-100 transition">
          <img
            src="/images/logos/image copy.png"
            alt="Visa"
            className="max-h-full max-w-full object-contain"
          />
        </div>


      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-[#888] py-5 space-y-1">
        <p>© 2026 TOP DOG. All rights reserved by Top Dog.</p>
        <p>
          Built by <span className="text-white">Idea Pixel</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;