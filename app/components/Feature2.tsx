import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex items-center justify-center p-6 bg-gray-100">
      
      {/* make grid full height */}
      <div className="grid grid-cols-3 gap-6 max-w-6xl w-full h-[60vh]">
        
        {/* LEFT BOX */}
        <div className="bg-[#ff8800] text-white rounded-2xl p-8 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-semibold mb-6">
              WHY CHOOSE US
            </h2>

          </div>
<div>
            <p className="text-lg mb-6">
              At Top Dog, our mission is to create collars that is inspired by
              the simplicity and warmth of Scandinavian design.
            </p>
          <Link
  href="/about"
  className="text-lg underline hover:no-underline transition"
>
  More About Us
</Link>
</div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="col-span-2 relative rounded-2xl overflow-hidden bg-cover bg-center h-full"
          style={{ backgroundImage: "url('/images/products/p11.png')" }}
        >
          <div className="absolute top-0 right-0 h-full w-1/3 bg-[#ff8800]/70"></div>
        </div>

      </div>
    </div>
  );
}