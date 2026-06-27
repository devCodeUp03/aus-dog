'use client'
import { useEffect, useState } from "react";

export type InventoryItem = {
  productId: number;
  size: string;
  stock: number;
};

const SIZES = ["Small", "Medium", "Large"];

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BaseAPI= (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/$/, "");
    fetch(`${BaseAPI}/api/inventory`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setInventory(data.inventory);
      })
      .finally(() => setLoading(false));
  }, []);

   const getStockForSize = (productId: number, size: string): number | null => {
    const item = inventory.find((i) => i.productId === productId && i.size === size);
    return item?.stock ?? null;
  };

  const isProductOutOfStock = (productId: number): boolean => {
    return SIZES.every((size) => {
      const item = inventory.find((i) => i.productId === productId && i.size === size);
      return item !== undefined && item.stock === 0;
    });
  };

  const getLowestStock = (productId: number): number | null => {
    const values = inventory
      .filter((i) => i.productId === productId)
      .map((i) => i.stock);
    if (values.length === 0) return null;
    return Math.min(...values);
  };

  return { inventory, loading, getStockForSize, isProductOutOfStock, getLowestStock };
}