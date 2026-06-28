// src/hooks/useProducts.ts
// Drop-in replacement for importing from @/data/products
// Fetches products from your Express backend instead of static data.

"use client";

import { useState, useEffect } from "react";

export interface Product {
  id: string;          // cuid from DB
  productId: number;   // numeric ID used in URL routes
  name: string;
  category: string;
  price: number;
  color: string;
  sizes: string[];
  material: string;
  description: string;
  features: string[];
  images: string[];
  active: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch products");
        return r.json();
      })
      .then((data) => setProducts(data.products ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

export function useProduct(productId: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;
    fetch(`${API_BASE}/api/products/${productId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Product not found");
        return r.json();
      })
      .then((data) => setProduct(data.product ?? null))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading, error };
}

// Admin hooks (JWT required)
export function useAdminProducts(token: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = () => {
    setLoading(true);
    fetch(`${API_BASE}/api/admin/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized or fetch failed");
        return r.json();
      })
      .then((data) => setProducts(data.products ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  const createProduct = async (payload: Partial<Product>) => {
    const r = await fetch(`${API_BASE}/api/admin/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    if (!r.ok) throw new Error((await r.json()).message ?? "Create failed");
    const data = await r.json();
    setProducts((prev) => [...prev, data.product]);
    return data.product as Product;
  };

  const updateProduct = async (id: string, payload: Partial<Product>) => {
    const r = await fetch(`${API_BASE}/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    if (!r.ok) throw new Error((await r.json()).message ?? "Update failed");
    const data = await r.json();
    setProducts((prev) => prev.map((p) => (p.id === id ? data.product : p)));
    return data.product as Product;
  };

  const deleteProduct = async (id: string) => {
    const r = await fetch(`${API_BASE}/api/admin/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) throw new Error((await r.json()).message ?? "Delete failed");
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return { products, loading, error, createProduct, updateProduct, deleteProduct, refetch: fetchProducts };
}