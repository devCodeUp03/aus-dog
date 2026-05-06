import React from "react";

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
            <li><a href="#" className="hover:text-[#E87722]">Contact</a></li>
            <li><a href="#" className="hover:text-[#E87722]">Product Care</a></li>
            <li><a href="#" className="hover:text-[#E87722]">Size Guide</a></li>
            <li><a href="#" className="hover:text-[#E87722]">FAQs</a></li>
            <li><a href="#" className="hover:text-[#E87722]">Shipping Services</a></li>
            <li><a href="#" className="hover:text-[#E87722]">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-[#E87722]">Return Policy</a></li>
            <li><a href="#" className="hover:text-[#E87722]">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#E87722]">Cookies Policy</a></li>
          </ul>
        </div>

        {/* Find Us On */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-white mb-4">
            Find Us On
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#E87722]">Facebook</a></li>
            <li><a href="#" className="hover:text-[#E87722]">Instagram</a></li>
            <li><a href="#" className="hover:text-[#E87722]">TikTok</a></li>
            <li><a href="#" className="hover:text-[#E87722]">Pinterest</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-white mb-4">
            Contact
          </h3>
          <p className="text-sm">+61 449 568 620</p>
          <p className="text-sm mt-3 text-[#aaa]">
            18 Grevilea Drive
          </p>
          <p className="text-sm mt-3 text-[#aaa]">
            Enfield, VIC, 3352
          </p>
          <p className="text-sm mt-3 text-[#aaa]">
            Australia
          </p>
          <br />
          <p className="text-sm mt-1">info@topdogworkingdog.com</p>
        </div>
      </div>

      {/* Payment Methods */}
<div className="flex justify-center gap-8 flex-wrap py-4 border-t border-white/10 items-center">

  <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition">
    <img src="/images/logos/paypal.png" alt="PayPal" className="h-6 w-auto" />
    <span className="text-xs text-gray-400">PayPal</span>
  </div>

  <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition">
    <img src="/images/logos/gpay.png" alt="Google Pay" className="h-6 w-auto" />
    <span className="text-xs text-gray-400">Google Pay</span>
  </div>

  <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition">
    <img src="/images/logos/nab.png" alt="NAB" className="h-6 w-auto" />
    <span className="text-xs text-gray-400">NAB</span>
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