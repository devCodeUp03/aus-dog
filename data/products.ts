// export interface ProductVariant {
//   color: string;
//   images: string[];
// }

// export interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   sizes: string[];
//   material: string;
//   description: string;
//   features: string[];
//   variants: ProductVariant[];
// }

// export const products: Product[] = [
//   {
//     id: 1,
//     name: "Top Dog Collar (Black)",
//     category: "Pet Accessories",
//     price: 40.00,
//     sizes: ["S", "M", "L"],
//     material: "Military-Grade Nylon",
//     description:
//       "Military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure. Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure. Soft Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
//     features: [
//       "1.5–2 inch military-grade nylon webbing",
//       "Resists tearing and fraying",
//       "UV damage resistant",
//       "Double-stitched at stress points",
//       "High-tensile strength construction"
//     ],
//     variants: [
//   { color: "Black", images: ["/images/products/p1.png"] },
//   { color: "Blue", images: ["/images/products/p2.png"] },       // #3b82f6
//   { color: "Pink", images: ["/images/products/p3.png"] },       // #6b7280
//   { color: "Orange", images: ["/images/products/p1.png"] },     // #f97316
//   { color: "Tan", images: ["/images/products/p1.png"] },      // #8b4513
//   { color: "Green", images: ["/images/products/p1.png"] }
// ]
//   },

//   {
//     id: 2,
//     name: "Top Dog Collar (Tan)",
//     category: "Pet Accessories",
//     price: 40.00,
//     sizes: ["S", "M", "L"],
//     material: "Aluminium & Stainless Steel",
//     description:
//       "Military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure. Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure. Soft Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
//     features: [
//       "Anodised aluminium components",
//       "Stainless steel hardware",
//       "Corrosion-resistant design",
//       "Heavy-duty D-ring",
//       "Withstands extreme pulling force without deformation"
//     ],
//     variants: [
//   { color: "Black", images: ["/images/products/p3.png"] },
//   { color: "Green", images: ["/images/products/p3.png"] },       // #6b7280
//   { color: "Blue", images: ["/images/products/p3.png"] },       // #3b82f6
//   { color: "Brown", images: ["/images/products/p3.png"] },      // #8b4513
//   { color: "Orange", images: ["/images/products/p3.png"] },     // #f97316
//   { color: "Neon Pink", images: ["/images/products/p3.png"] }
// ]
//   },

//   {
//     id: 3,
//     name: "Top Dog Collar (Blue)",
//     category: "Pet Accessories",
//     price: 40.00,
//    sizes: ["S", "M", "L"],
//     material: "Padded Mesh",
//     description:
//       "Military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure. Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure. Soft Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
//     features: [
//       "Soft padded mesh inner lining",
//       "Prevents chafing and irritation",
//       "Breathable material",
//       "Ideal for extended wear",
//       "Comfortable in outdoor and active use"
//     ],
//     variants: [
//   { color: "Black", images: ["/images/products/p4.png"] },
//   { color: "Green", images: ["/images/products/p4.png"] },       // #6b7280
//   { color: "Blue", images: ["/images/products/p4.png"] },       // #3b82f6
//   { color: "Brown", images: ["/images/products/p4.png"] },      // #8b4513
//   { color: "Orange", images: ["/images/products/p4.png"] },     // #f97316
//   { color: "Neon Pink", images: ["/images/products/p4.png"] }
// ]
//   },

//   {
//     id: 4,
//     name: "Top Dog Collar (Pink)",
//     category: "Pet Accessories",
//     price: 40.00,
//     sizes: ["S", "M", "L"],
//     material: "Reinforced Nylon",
//     description:
//       "Military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure. Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure. Soft Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
//     features: [
//       "Integrated MOLLE webbing system",
//       "Attach pouches, ID holders, or GPS trackers",
//       "Customizable functionality",
//       "Built for tactical and outdoor use",
//       "Strong and durable structure"
//     ],
//     variants: [
//   { color: "Black", images: ["/images/products/p5.png"] },
//   { color: "Green", images: ["/images/products/p5.png"] },       // #6b7280
//   { color: "Blue", images: ["/images/products/p5.png"] },       // #3b82f6
//   { color: "Brown", images: ["/images/products/p5.png"] },      // #8b4513
//   { color: "Orange", images: ["/images/products/p5.png"] },     // #f97316
//   { color: "Neon Pink", images: ["/images/products/p5.png"] }
// ]
//   },

//   {
//     id: 5,
//     name: "Top Dog Collar (Orange)",
//     category: "Pet Accessories",
//     price: 40.00,
//     sizes: ["S", "M", "L"],
//     material: "Reinforced Nylon",
//     description:
//       "Military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure. Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure. Soft Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
//     features: [
//       "Integrated reinforced control handle",
//       "Strong grip for quick restraint",
//       "Sewn directly into collar webbing",
//       "Ideal for training and control",
//       "Built for durability in active environments"
//     ],
//     variants: [
//   { color: "Black", images: ["/images/products/p6.png"] },
//   { color: "Green", images: ["/images/products/p6.png"] },       // #6b7280
//   { color: "Blue", images: ["/images/products/p6.png"] },       // #3b82f6
//   { color: "Brown", images: ["/images/products/p6.png"] },      // #8b4513
//   { color: "Orange", images: ["/images/products/p6.png"] },     // #f97316
//   { color: "Neon Pink", images: ["/images/products/p6.png"] }
// ]
//   },

//   {
//     id: 6,
//     name: "Top Dog Collar (Green)",
//     category: "Pet Accessories",
//     price: 40.00,
//     sizes: ["S", "M", "L"],
//     material: "Reflective Nylon",
//     description:
//       "Military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure. Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure. Soft Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
//     features: [
//       "Reflective stitching for visibility",
//       "Hook-and-loop patch panels",
//       "Improves safety in low light",
//       "Allows quick identification",
//       "Ideal for dawn, dusk, and night walks"
//     ],
//     variants: [
//   { color: "Black", images: ["/images/products/p7.png"] },
//   { color: "Green", images: ["/images/products/p7.png"] },       // #6b7280
//   { color: "Blue", images: ["/images/products/p7.png"] },       // #3b82f6
//   { color: "Brown", images: ["/images/products/p7.png"] },      // #8b4513
//   { color: "Orange", images: ["/images/products/p7.png"] },     // #f97316
//   { color: "Neon Pink", images: ["/images/products/p7.png"] }
// ]
//   }
// ];


export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  color:string;
  sizes: string[];
  material: string;
  description: string;
  features: string[];
  images: string[]; // 👈 ALL ANGLES + THUMBNAIL INCLUDED
}

export const products: Product[] = [
  {
    id: 1,
    name: "Top Dog Collar (Black)",
    category: "Pet Accessories",
    price: 40.0,
    color: "Black",
    sizes: ["S", "M", "L"],
    material: "Military-Grade Nylon",
    description:
      "Military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure. Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure. Soft Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
    features: [
      "1.5–2 inch military-grade nylon webbing",
      "UV resistant and weatherproof",
      "Double-stitched reinforcement",
      "High-tensile load strength",
      "Corrosion-resistant hardware"
    ],

    // ✅ IMAGE STRUCTURE (FIRST = MAIN THUMBNAIL)
    images: [
      "/images/black/b5.jpeg",     // top angle
      "/images/black/b1.jpg",        // ⭐ main thumbnail (hero image)
      "/images/black/b2.jpg",     // side angle
      "/images/black/b3.jpeg",     // top angle
      "/images/black/b4.jpeg",     // top angle
    ]
  },

  {
    id: 2,
    name: "Top Dog Collar (Tan)",
    category: "Pet Accessories",
    price: 40.0,
    color: "Tan",
    sizes: ["S", "M", "L"],
    material: "Aluminium & Stainless Steel",
    description:
      "Military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure. Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure. Soft Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
    features: [
      "Anodised aluminium components",
      "Stainless steel hardware",
      "Corrosion-resistant build",
      "Heavy-duty D-ring",
      "Extreme pull resistance"
    ],

    images: [
      "/images/tan/t3.jpeg",
      "/images/tan/t1.jpeg",
      "/images/tan/t2.jpeg",
    ]
  },

  {
    id: 3,
    name: "Top Dog Collar (Blue)",
    category: "Pet Accessories",
    price: 40.0,
    color: "Blue",
    sizes: ["S", "M", "L"],
    material: "Padded Mesh",
    description:
      "Military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure. Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure. Soft Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
    features: [
      "Soft padded mesh lining",
      "Breathable comfort design",
      "Anti-chafing material",
      "Lightweight structure",
      "Outdoor ready durability"
    ],

    images: [
      "/images/blue/bb1.JPG",
      "/images/blue/bb2.jpg",
      "/images/blue/bb3.jpg",
    ]
  },

  {
    id: 4,
    name: "Top Dog Collar (Pink)",
    category: "Pet Accessories",
    price: 40.0,
    color: "Pink",
    sizes: ["S", "M", "L"],
    material: "Reinforced Nylon",
    description:
      "Military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure. Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure. Soft Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
    features: [
      "MOLLE webbing system",
      "Attachment compatibility",
      "Reinforced nylon build",
      "Customizable utility design",
      "Heavy-duty stitching"
    ],

    images: [
      "/images/pink/p1.JPG",
      "/images/pink/p2.jpg",
      "/images/pink/p3.jpg",
    ]
  },

  {
    id: 5,
    name: "Top Dog Collar (Orange)",
    category: "Pet Accessories",
    price: 40.0,
    color: "Orange",
    sizes: ["S", "M", "L"],
    material: "Reinforced Nylon",
    description:
      "Military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure. Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure. Soft Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
    features: [
      "Reinforced control handle",
      "Strong grip support",
      "Training ready design",
      "Durable stitching",
      "Outdoor performance build"
    ],

    images: [
      "/images/orange/o1.JPG",
    ]
  },

  {
    id: 6,
    name: "Top Dog Collar (Green)",
    category: "Pet Accessories",
    price: 40.0,
    color: "Green",
    sizes: ["S", "M", "L"],
    material: "Reflective Nylon",
    description:
      "Military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure. Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure. Soft Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
    features: [
      "Reflective stitching",
      "Night visibility",
      "Hook-and-loop patch system",
      "Safety-focused design",
      "Outdoor durability"
    ],

    images: [
      "/images/green/g2 (1).jpg",
      "/images/green/g3.jpg",
      "/images/green/g1.JPG",
    ]
  }
];