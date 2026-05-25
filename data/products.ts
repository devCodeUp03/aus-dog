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

    images: [
      "/images/black/b1.jpg",    
      "/images/black/b5.jpg",     // top angle
      "/images/black/b2.jpg",     // side angle
    ]
  },

  {
    id: 2,
    name: "Top Dog Collar (Tan)",
    category: "Pet Accessories",
    price: 40.0,
    color: "Tan",
    sizes: ["S", "M", "L"],
    material: "Military-Grade Nylon",
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
      "/images/tan/t1.jpeg",
      "/images/tan/t3.jpeg",
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
    material: "Military-Grade Nylon",
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
      "/images/blue/bb1.png",
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
    material: "Military-Grade Nylon",
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
    material: "Military-Grade Nylon",
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
      "/images/orange/o1.png",
      "/images/orange/o2.jpg",
      "/images/orange/o3.jpg",
    ]
  },

  {
    id: 6,
    name: "Top Dog Collar (Green)",
    category: "Pet Accessories",
    price: 40.0,
    color: "Green",
    sizes: ["S", "M", "L"],
    material: "Military-Grade Nylon",
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
      "/images/green/g1.png",
      "/images/green/g2.png",
      "/images/green/g3.png",
    ]
  }
];