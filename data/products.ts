export interface ProductVariant {
  color: string;
  images: string[];
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  material: string;
  description: string;
  features: string[];
  variants: ProductVariant[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "High-Density Nylon Dog Collar",
    category: "Pet Accessories",
    price: 40.00,
    sizes: ["S", "M", "L"],
    material: "Military-Grade Nylon",
    description:
      "1.5–2 inch military-grade nylon webbing resists tearing, fraying, and UV damage. Double-stitched at every stress point with high-tensile thread for maximum durability under pressure.",
    features: [
      "1.5–2 inch military-grade nylon webbing",
      "Resists tearing and fraying",
      "UV damage resistant",
      "Double-stitched at stress points",
      "High-tensile strength construction"
    ],
    variants: [
  { color: "Black", images: ["/images/products/p1.png"] },
  { color: "Green", images: ["/images/products/p1.png"] },       // #6b7280
  { color: "Blue", images: ["/images/products/p1.png"] },       // #3b82f6
  { color: "Brown", images: ["/images/products/p1.png"] },      // #8b4513
  { color: "Orange", images: ["/images/products/p1.png"] },     // #f97316
  { color: "Neon Pink", images: ["/images/products/p1.png"] }
]
  },

  {
    id: 2,
    name: "Anodised Aluminium & Stainless Hardware",
    category: "Pet Accessories",
    price: 40.00,
    sizes: ["S", "M", "L"],
    material: "Aluminium & Stainless Steel",
    description:
      "Heavy-duty D-ring is corrosion-resistant and rated to withstand extreme pull forces, with no deformation, no rust, and no failure.",
    features: [
      "Anodised aluminium components",
      "Stainless steel hardware",
      "Corrosion-resistant design",
      "Heavy-duty D-ring",
      "Withstands extreme pulling force without deformation"
    ],
    variants: [
  { color: "Black", images: ["/images/products/p3.png"] },
  { color: "Green", images: ["/images/products/p3.png"] },       // #6b7280
  { color: "Blue", images: ["/images/products/p3.png"] },       // #3b82f6
  { color: "Brown", images: ["/images/products/p3.png"] },      // #8b4513
  { color: "Orange", images: ["/images/products/p3.png"] },     // #f97316
  { color: "Neon Pink", images: ["/images/products/p3.png"] }
]
  },

  {
    id: 3,
    name: "Breathable Mesh Comfort Dog Collar",
    category: "Pet Accessories",
    price: 40.00,
   sizes: ["S", "M", "L"],
    material: "Padded Mesh",
    description:
      "Padded mesh lining prevents chafing and improves comfort during extended wear in the bush, on trail, or in the field.",
    features: [
      "Soft padded mesh inner lining",
      "Prevents chafing and irritation",
      "Breathable material",
      "Ideal for extended wear",
      "Comfortable in outdoor and active use"
    ],
    variants: [
  { color: "Black", images: ["/images/products/p4.png"] },
  { color: "Green", images: ["/images/products/p4.png"] },       // #6b7280
  { color: "Blue", images: ["/images/products/p4.png"] },       // #3b82f6
  { color: "Brown", images: ["/images/products/p4.png"] },      // #8b4513
  { color: "Orange", images: ["/images/products/p4.png"] },     // #f97316
  { color: "Neon Pink", images: ["/images/products/p4.png"] }
]
  },

  {
    id: 4,
    name: "MOLLE Tactical Dog Collar",
    category: "Pet Accessories",
    price: 40.00,
    sizes: ["S", "M", "L"],
    material: "Reinforced Nylon",
    description:
      "Integrated MOLLE webbing allows direct attachment of pouches, ID holders, or GPS trackers. Configure the collar to your mission. (Not included with collar.)",
    features: [
      "Integrated MOLLE webbing system",
      "Attach pouches, ID holders, or GPS trackers",
      "Customizable functionality",
      "Built for tactical and outdoor use",
      "Strong and durable structure"
    ],
    variants: [
  { color: "Black", images: ["/images/products/p5.png"] },
  { color: "Green", images: ["/images/products/p5.png"] },       // #6b7280
  { color: "Blue", images: ["/images/products/p5.png"] },       // #3b82f6
  { color: "Brown", images: ["/images/products/p5.png"] },      // #8b4513
  { color: "Orange", images: ["/images/products/p5.png"] },     // #f97316
  { color: "Neon Pink", images: ["/images/products/p5.png"] }
]
  },

  {
    id: 5,
    name: "Reinforced Handle Control Dog Collar",
    category: "Pet Accessories",
    price: 40.00,
    sizes: ["S", "M", "L"],
    material: "Reinforced Nylon",
    description:
      "A sturdy control handle is sewn directly into the webbing for immediate restraint and guidance, built to hold in the field, not just the yard.",
    features: [
      "Integrated reinforced control handle",
      "Strong grip for quick restraint",
      "Sewn directly into collar webbing",
      "Ideal for training and control",
      "Built for durability in active environments"
    ],
    variants: [
  { color: "Black", images: ["/images/products/p6.png"] },
  { color: "Green", images: ["/images/products/p6.png"] },       // #6b7280
  { color: "Blue", images: ["/images/products/p6.png"] },       // #3b82f6
  { color: "Brown", images: ["/images/products/p6.png"] },      // #8b4513
  { color: "Orange", images: ["/images/products/p6.png"] },     // #f97316
  { color: "Neon Pink", images: ["/images/products/p6.png"] }
]
  },

  {
    id: 6,
    name: "Reflective Safety Dog Collar",
    category: "Pet Accessories",
    price: 40.00,
    sizes: ["S", "M", "L"],
    material: "Reflective Nylon",
    description:
      "Reflective stitching and hook-and-loop patch panels enhance visibility in low light and allow fast, clean identification at dawn or dusk.",
    features: [
      "Reflective stitching for visibility",
      "Hook-and-loop patch panels",
      "Improves safety in low light",
      "Allows quick identification",
      "Ideal for dawn, dusk, and night walks"
    ],
    variants: [
  { color: "Black", images: ["/images/products/p7.png"] },
  { color: "Green", images: ["/images/products/p7.png"] },       // #6b7280
  { color: "Blue", images: ["/images/products/p7.png"] },       // #3b82f6
  { color: "Brown", images: ["/images/products/p7.png"] },      // #8b4513
  { color: "Orange", images: ["/images/products/p7.png"] },     // #f97316
  { color: "Neon Pink", images: ["/images/products/p7.png"] }
]
  }
];
