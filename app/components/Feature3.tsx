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
          <h2 className="text-xl font-semibold mb-2">QUALITY</h2>
          <p className="text-sm text-white/80">
            Built with uncompromising craftsmanship using military-grade materials designed for durability, strength, and long-term performance in all conditions.
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
          <h2 className="text-xl font-semibold mb-2">CONTROL</h2>
          <p className="text-sm text-white/80">
            Engineered with reinforced hardware and a strong control handle for reliable handling, training, and safety in high-intensity environments.
          </p>
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
          <h2 className="text-xl font-semibold mb-2">DESIGN</h2>
          <p className="text-sm text-white/80">
            Tactical yet refined design combining functionality, comfort, and modern aesthetics for working and companion dogs.
          </p>
        </div>
      </div>

    </div>
  );
}