export type StockMap = Record<string, number>;

export async function fetchPublicStock(): Promise<StockMap> {
  const map: StockMap = {};
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!base) {
    console.error("NEXT_PUBLIC_BACKEND_URL is not set");
    return map;
  }

  try {
    const res = await fetch(`${base}/api/inventory`);
    if (!res.ok) return map;
    const data = await res.json();
    if (data.success) {
      data.inventory.forEach((i: any) => {
        map[`${i.productId}-${i.size}`] = i.stock;
      });
    }
  } catch (err) {
    console.error("fetchPublicStock error:", err);
  }

  return map;
}

export function getStock(stockMap: StockMap, productId: number, size: string): number | undefined {
  return stockMap[`${productId}-${size}`];
}