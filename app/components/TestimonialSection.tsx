"use client";

import { useEffect, useRef, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "S i m o n e",
    role: "Pet Owner",
    message:
      "Managing a high-drive hunting dog requires trust in your equipment. This collar is the perfect match for his intensity. It doesn’t just look the part; the build quality is exceptional.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    name: "S t e v e",
    role: "Happy Customer",
    message:
      "A very happy hunting dog owner. I love the collar from Top Dog, which is sturdy and matches my dog’s hyper energy.",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: 3,
    name: "A l e x i",
    role: "Animal Lover",
    message:
      "The build quality is exceptional. I finally have a collar that can keep up with his pace while keeping me firmly in command.",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
];

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          setTimeout(() => {
            setMessageVisible(true);
          }, 300);
        } else {
          setIsVisible(false);
          setMessageVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleAvatarClick = (index: number) => {
    setMessageVisible(false);

    setActiveIndex(index);

    setTimeout(() => {
      setMessageVisible(true);
    }, 200);
  };

  const active = testimonials[activeIndex];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Josefin+Sans:wght@300;400&display=swap');

        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }

        .font-josefin {
          font-family: 'Josefin Sans', sans-serif;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#0a0a0a] py-8 md:py-10"
      >
        {/* LEFT BG */}
        <div
          className="hidden md:block absolute top-0 left-0 w-1/2 h-full bg-cover bg-center opacity-20 z-0"
          style={{
            backgroundImage: 'url("/images/products/f11.png")',
            transform: "scaleX(-1)",
          }}
        />

        {/* RIGHT BG */}
        <div
          className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-cover bg-center opacity-20 z-0"
          style={{
            backgroundImage: 'url("/images/products/f12.png")',
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 z-[1] bg-black/60" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">

          {/* HEADING */}
          <div
            className={`transition-all duration-700 mb-6 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-white/50 mb-2 font-josefin">
              Testimonials
            </p>

            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              What Our Customers
              <br />
              Have to Say
            </h2>
          </div>

          {/* MESSAGE */}
          <div className="max-w-2xl mx-auto">

            <p
              className={`font-cormorant italic font-light text-white/90 text-lg md:text-2xl leading-[1.6] tracking-wide mb-7 transition-all duration-700 ${
                messageVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              {active.message}
            </p>

            {/* DIVIDER */}
            <div
              className={`flex justify-center gap-1.5 mb-6 transition-all duration-500 delay-200 ${
                isVisible
                  ? "opacity-100 scale-y-100"
                  : "opacity-0 scale-y-0"
              }`}
            >
              <span className="block w-px h-6 bg-white/40" />
              <span className="block w-px h-6 bg-white/40" />
            </div>

            {/* AVATARS */}
            <div
              className={`flex items-center justify-center mb-5 transition-all duration-500 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {testimonials.map((t, i) => {
                const isActive = activeIndex === i;
                const isCenter = i === 1;

                return (
                  <div
                    key={t.id}
                    onClick={() => handleAvatarClick(i)}
                    className={[
                      "relative cursor-pointer transition-all duration-300",
                      i === 0 ? "-mr-4" : "",
                      i === 2 ? "-ml-4" : "",
                      isActive ? "scale-105 z-10" : "hover:scale-105",
                    ].join(" ")}
                  >
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className={[
                        "rounded-full object-cover border-2 transition-all duration-300",
                        isCenter ? "w-[72px] h-[72px]" : "w-[58px] h-[58px]",
                        isActive
                          ? "border-white/60 grayscale-0"
                          : "border-white/20 grayscale brightness-75",
                      ].join(" ")}
                    />
                  </div>
                );
              })}
            </div>

            {/* AUTHOR */}
            <div
              className={`transition-all duration-500 ${
                messageVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
            >
              <p className="font-josefin text-[12px] md:text-sm text-white/90 tracking-[0.15em] uppercase mb-1">
                {active.name}
              </p>

              <p className="font-cormorant italic text-sm text-white/50">
                {active.role}
              </p>
            </div>
          </div>
        </div>

        {/* TOP BUTTON */}
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="absolute bottom-4 right-4 z-20 w-9 h-9 rounded-full bg-[#8c5050]/80 hover:bg-[#a05a5a] flex items-center justify-center transition-all duration-300"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 4l-8 8h5v8h6v-8h5z" />
          </svg>
        </button>
      </section>
    </>
  );
}