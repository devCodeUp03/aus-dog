export default function Section() {
  return (
    <div className="h-screen grid grid-cols-3">

      {/* COLUMN 1 */}
      <div
        className="relative flex items-end p-8 text-white border-r-4 border-white/80"
        style={{
          backgroundImage: "url('/images/products/p1.png')",
          backgroundSize: "300% 100%",
          backgroundPosition: "left",
        }}
      >
        <div className="absolute inset-0 bg-orange-400/40"></div>

        <div className="relative z-10 max-w-xs">
          <h2 className="text-3xl font-semibold mb-2">QUALITY</h2>
          <p className="text-lg text-white/80">
            Built with uncompromising: craftsmanship using military-grade materials designed for durability, strength, and long-term performance in all conditions.
          </p>
        </div>
      </div>

      {/* COLUMN 2 */}
      <div
        className="relative flex items-end p-8 text-white border-r-4 border-white/80"
        style={{
          backgroundImage: "url('/images/products/p1.png')",
          backgroundSize: "300% 100%",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-orange-400/50"></div>

        <div className="relative z-10 max-w-xs">
          <h2 className="text-3xl font-semibold mb-2">SUSTAINABILITY</h2>
          <p className="text-xl text-white/80">
Luxury with conscience:Our extensive research sources materials and manufacturing processes that minimize waste and environmental impact.          </p>
        </div>
      </div>

      {/* COLUMN 3 */}
      <div
        className="relative flex items-end p-8 text-white"
        style={{
          backgroundImage: "url('/images/products/p1.png')",
          backgroundSize: "300% 100%",
          backgroundPosition: "right",
        }}
      >
        <div className="absolute inset-0 bg-orange-400/40"></div>

        <div className="relative z-10 max-w-xs">
          <h2 className="text-3xl font-semibold mb-2">DESIGN</h2>
          <p className="text-xl text-white/80">
Simple, quiet confidence:
Shapes that highlight the natural beauty of animals in their true form, combining function and elegance without excess.        </p>
        </div>
      </div>

    </div>
  );
}