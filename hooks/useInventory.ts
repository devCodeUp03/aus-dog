'use client'
import { useEffect, useState } from "react";

export type InventoryItem = {
  productId: number;
  stock: number;
};

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

  const getStock = (productId: number) => {
    const item = inventory.find((i) => i.productId === productId);
    return item?.stock ?? null; // null = not configured yet
  };

  return { inventory, loading, getStock };
}