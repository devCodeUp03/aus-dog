// src/app/admin/components/ProductsPanel.tsx
// Drop this into your admin panel layout. Handles create / edit / toggle / delete.
"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdminProducts, Product } from "@/hooks/useProducts";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  token: string;
}

const EMPTY_FORM = {
  name: "",
  category: "Pet Accessories",
  price: "",
  color: "",
  material: "Military-Grade Nylon",
  description: "",
  sizes: "S,M,L",
  features: "",
  images: "",
  active: true,
};

type FormData = typeof EMPTY_FORM;

export default function ProductsPanel({ token }: Props) {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } =
    useAdminProducts(token);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      color: product.color,
      material: product.material,
      description: product.description,
      sizes: product.sizes.join(","),
      features: product.features.join("\n"),
      images: product.images.join("\n"),
      active: product.active,
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.color) {
      toast.error("Name, price, and color are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        color: form.color,
        material: form.material,
        description: form.description,
        sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
        images: form.images.split("\n").map((s) => s.trim()).filter(Boolean),
        active: form.active,
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        toast.success("Product updated.");
      } else {
        await createProduct(payload);
        toast.success("Product created.");
      }
      setShowForm(false);
    } catch (e: any) {
      toast.error(e.message ?? "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      await updateProduct(product.id, { active: !product.active });
      toast.success(product.active ? "Product hidden." : "Product published.");
    } catch {
      toast.error("Failed to update visibility.");
    }
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(product.id);
      toast.success("Product deleted.");
    } catch (e: any) {
      toast.error(e.message ?? "Delete failed.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Product Catalogue</h2>
          <p className="text-sm text-gray-500">{products.length} product{products.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#ff9167] text-white px-4 py-2 rounded-lg hover:bg-[#df6839] transition font-semibold text-sm"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Error / loading */}
      {loading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Product list */}
      {!loading && !error && (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white border rounded-xl shadow-sm transition-all ${
                product.active ? "border-gray-200" : "border-dashed border-gray-300 opacity-60"
              }`}
            >
              {/* Row */}
              <div className="flex items-center gap-4 p-4">
                {/* Thumbnail */}
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {product.images?.[0] ? (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                    {!product.active && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Hidden</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    AUD ${product.price.toFixed(2)} · {product.color} · ID #{product.productId}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
                    className="p-2 text-gray-400 hover:text-gray-700 transition"
                    title="Details"
                  >
                    {expandedId === product.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <button
                    onClick={() => handleToggleActive(product)}
                    className="p-2 text-gray-400 hover:text-[#ff9167] transition"
                    title={product.active ? "Hide product" : "Show product"}
                  >
                    {product.active ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => openEdit(product)}
                    className="p-2 text-gray-400 hover:text-blue-500 transition"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="p-2 text-gray-400 hover:text-red-500 transition"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              {expandedId === product.id && (
                <div className="border-t border-gray-100 px-4 pb-4 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-1">Description</p>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold mb-1">Features</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {product.features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Sizes</p>
                      <div className="flex gap-2">
                        {product.sizes.map((s) => (
                          <span key={s} className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Images ({product.images.length})</p>
                      <div className="flex gap-2 flex-wrap">
                        {product.images.map((img, i) => (
                          <div key={i} className="relative w-12 h-12 rounded overflow-hidden bg-gray-100">
                            <Image src={img} alt={`img-${i}`} fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {products.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No products yet. Add your first product above.</p>
            </div>
          )}
        </div>
      )}

      {/* Slide-over form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="flex-1 bg-black/40" onClick={() => setShowForm(false)} />

          {/* Panel */}
          <div className="w-full max-w-lg bg-white shadow-2xl overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-bold">{editingId ? "Edit Product" : "New Product"}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:text-red-500 transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4 flex-1">
              {(
                [
                  { label: "Name *", key: "name", type: "text" },
                  { label: "Category", key: "category", type: "text" },
                  { label: "Price (AUD) *", key: "price", type: "number" },
                  { label: "Color *", key: "color", type: "text" },
                  { label: "Material", key: "material", type: "text" },
                  { label: "Sizes (comma-separated: S,M,L)", key: "sizes", type: "text" },
                ] as { label: string; key: keyof FormData; type: string }[]
              ).map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    value={String(form[key])}
                    onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ff9167]"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ff9167] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Features (one per line)
                </label>
                <textarea
                  rows={4}
                  value={form.features}
                  onChange={(e) => setForm((prev) => ({ ...prev, features: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ff9167] resize-none"
                  placeholder={"Heavy-duty D-ring\nUV resistant"}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Image paths (one per line)
                </label>
                <textarea
                  rows={3}
                  value={form.images}
                  onChange={(e) => setForm((prev) => ({ ...prev, images: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ff9167] resize-none"
                  placeholder={"/images/black/b1.jpg\n/images/black/b2.jpg"}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="active-toggle"
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
                  className="w-4 h-4 accent-[#ff9167]"
                />
                <label htmlFor="active-toggle" className="text-sm font-semibold text-gray-700">
                  Visible on storefront
                </label>
              </div>
            </div>

            <div className="p-5 border-t flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition font-semibold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex-1 bg-[#ff9167] text-white py-2 rounded-lg hover:bg-[#df6839] transition font-semibold text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {saving ? "Saving…" : editingId ? "Save Changes" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}