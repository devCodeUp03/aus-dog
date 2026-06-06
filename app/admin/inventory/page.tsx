"use client";
import { useEffect, useState } from "react";
import { products } from "@/data/products";
import { toast } from "sonner";

type StockMap = Record<number, number>;

export default function AdminInventoryPage() {
  const [stockMap, setStockMap] = useState<StockMap>({});
  const [editing, setEditing] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState<number | null>(null);

  const backendHost = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/$/, "");
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    fetch(`${backendHost}/api/admin/inventory`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const map: StockMap = {};
          data.inventory.forEach((i: any) => {
            map[i.productId] = i.stock;
          });
          setStockMap(map);
        }
      });
  }, []);

  const handleSave = async (productId: number) => {
    const newStock = parseInt(editing[productId]);
    if (isNaN(newStock) || newStock < 0) {
      toast.error("Enter a valid stock number");
      return;
    }

    setSaving(productId);
    try {
      const res = await fetch(`${backendHost}/api/admin/inventory/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stock: newStock }),
      });
      const data = await res.json();
      if (data.success) {
        setStockMap((prev) => ({ ...prev, [productId]: newStock }));
        setEditing((prev) => { const n = { ...prev }; delete n[productId]; return n; });
        toast.success("Stock updated!");
      }
    } finally {
      setSaving(null);
    }
  };

  const getStockStatus = (stock: number | undefined) => {
    if (stock === undefined) return { label: "Not set", color: "text-gray-400" };
    if (stock === 0) return { label: "Out of Stock", color: "text-red-600 font-bold" };
    if (stock <= 5) return { label: `Low (${stock} left)`, color: "text-orange-500 font-bold" };
    return { label: `In Stock (${stock})`, color: "text-green-600 font-bold" };
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Inventory Management</h1>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Set Stock</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => {
              const stock = stockMap[product.id];
              const status = getStockStatus(stock);
              const isEditing = editing[product.id] !== undefined;

              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className={`px-6 py-4 ${status.color}`}>{status.label}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min={0}
                      className="border border-gray-300 rounded-lg px-3 py-1.5 w-24 focus:outline-none focus:border-[#ff9167]"
                      placeholder={stock?.toString() ?? "0"}
                      value={editing[product.id] ?? ""}
                      onChange={(e) =>
                        setEditing((prev) => ({ ...prev, [product.id]: e.target.value }))
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      disabled={!isEditing || saving === product.id}
                      onClick={() => handleSave(product.id)}
                      className="bg-[#ff9167] disabled:bg-gray-200 disabled:text-gray-400 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#df6839] transition"
                    >
                      {saving === product.id ? "Saving..." : "Save"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}