"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, clearAdminToken } from "@/lib/adminAuth";
import { products } from "@/data/products";

// ─── Types ────────────────────────────────────────────────────────────────────
type OrderItem = {
  id: string;
  productName: string;
  variant: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};

type OrderStatus = "PENDING" | "SHIPPING" | "COMPLETED";

type Order = {
  id: string;
  orderNumber: number;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: "STRIPE" | "PAYPAL";
  status: OrderStatus;
  items: OrderItem[];
};

type Tab = "PENDING" | "SHIPPING" | "COMPLETED" | "INVENTORY";
type StockMap = Record<string, number>;
const SIZES = ["Small", "Medium", "Large"] as const;

const statusConfig: Record<OrderStatus, { label: string; cls: string; icon: string; description: string }> = {
  PENDING: { label: "Pending", icon: "🕐", description: "Order received, being prepared", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  SHIPPING: { label: "Shipping", icon: "🚚", description: "Dispatched and on its way", cls: "bg-blue-100 text-blue-700 border-blue-200" },
  COMPLETED: { label: "Completed", icon: "✅", description: "Delivered to customer", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
};

const STATUS_ORDER: OrderStatus[] = ["PENDING", "SHIPPING", "COMPLETED"];

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.cls}`}>
      <span>{cfg.icon}</span>{cfg.label}
    </span>
  );
}

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: string }) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-5">
      <p className="text-xs uppercase tracking-widest text-gray-600 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${accent || "text-gray-900"}`}>{value}</p>
      {sub && <p className="text-xs text-gray-600 mt-1">{sub}</p>}
    </div>
  );
}

function OrderDrawer({
  order,
  onClose,
  onStatusChange,
}: {
  order: Order;
  onClose: () => void;
  onStatusChange: (id: string, status: OrderStatus, trackingNumber?: string) => Promise<void>;
}) {
  const [saving, setSaving] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingError, setTrackingError] = useState("");
  const currentIdx = STATUS_ORDER.indexOf(order.status);
  const nextStatus = STATUS_ORDER[currentIdx + 1];

  const handleAdvance = async () => {
    if (currentIdx >= STATUS_ORDER.length - 1) return;
    if (nextStatus === "SHIPPING") {
      if (!trackingNumber.trim()) {
        setTrackingError("Tracking number is required before marking as Shipped.");
        return;
      }
      if (trackingNumber.trim().length < 6) {
        setTrackingError("Please enter a valid Australian tracking number.");
        return;
      }
    }
    setTrackingError("");
    setSaving(true);
    await onStatusChange(order.id, nextStatus, trackingNumber.trim() || undefined);
    setEmailSent(true);
    setSaving(false);
    setTimeout(() => setEmailSent(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-xl bg-white border-l border-gray-200 h-full overflow-y-auto flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 shadow-sm">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Order Details</p>
            <h2 className="text-xl font-bold text-gray-900 font-mono">#{order.orderNumber}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-900 hover:bg-white/10 transition">✕</button>
        </div>

        <div className="p-6 space-y-6 flex-1">

          {/* Progress Tracker */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-4">Fulfillment Progress</h3>
            <div className="bg-white rounded-xl p-5">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-5 left-[16.66%] right-[16.66%] h-0.5 bg-white/10 z-0" />
                <div
                  className="absolute top-5 left-[16.66%] h-0.5 bg-[#ee6d49] z-0 transition-all duration-500"
                  style={{ width: `${(currentIdx / (STATUS_ORDER.length - 1)) * 66.66}%` }}
                />
                {STATUS_ORDER.map((s, i) => {
                  const done = i < currentIdx;
                  const active = i === currentIdx;
                  const cfg = statusConfig[s];
                  return (
                    <div key={s} className="flex flex-col items-center z-10 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${done ? "bg-[#ee6d49] shadow-lg shadow-[#ee6d49]/30" :
                        active ? "bg-[#ee6d49]/20 border-2 border-[#ee6d49]" :
                          "bg-white/10 border-2 border-gray-200 shadow-sm"
                        }`}>
                        {done ? "✓" : cfg.icon}
                      </div>
                      <p className={`text-xs mt-2 font-medium ${active ? "text-[#ee6d49]" : done ? "text-gray-900" : "text-gray-600"}`}>
                        {cfg.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Customer */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-3">Customer</h3>
            <div className="bg-white rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#ee6d49]/20 flex items-center justify-center text-[#ee6d49] font-bold text-sm">
                  {order.firstName[0]}{order.lastName[0]}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">{order.firstName} {order.lastName}</p>
                  <p className="text-gray-400 text-sm">{order.email}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200 shadow-sm text-sm text-gray-400 space-y-1">
                <p>📱 {order.phone}</p>
                <p>📍 {order.address}, {order.suburb} {order.postcode}, {order.state}, {order.country}</p>
              </div>
            </div>
          </section>

          {/* Items */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-3">Items</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 flex justify-between items-start">
                  <div>
                    <p className="text-gray-900 font-medium text-sm">{item.productName}</p>
                    <p className="text-gray-600 text-xs mt-0.5">
                      {[item.color, item.size, item.variant].filter(Boolean).join(" · ")}
                    </p>
                    <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-gray-900 font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Totals */}
          <section className="bg-white rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Delivery</span><span>${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-900 font-bold text-base border-t border-gray-200 shadow-sm pt-2 mt-2">
              <span>Total</span>
              <span className="text-[#ee6d49]">AUD ${order.total.toFixed(2)}</span>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-3">Payment</h3>
            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${order.paymentMethod === "STRIPE" ? "bg-violet-500/20 text-violet-300" : "bg-blue-500/20 text-blue-300"
                }`}>
                {order.paymentMethod}
              </span>
              <span className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleString("en-AU")}</span>
            </div>
          </section>

          {/* Advance Status */}
          {order.status !== "COMPLETED" && (
            <section>
              <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-3">Advance Order</h3>
              <div className="bg-white rounded-xl p-4 space-y-3">

                {nextStatus === "SHIPPING" && (
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-600">
                      📦 Australian Tracking Number <span className="text-[#ee6d49]">*</span>
                    </label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => {
                        setTrackingNumber(e.target.value);
                        if (e.target.value.trim()) setTrackingError("");
                      }}
                      placeholder="e.g. 7XX1234567890"
                      className={`w-full bg-white border rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-600 outline-none transition font-mono ${trackingError
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-gray-200 shadow-sm focus:border-[#ee6d49]"
                        }`}
                    />
                    {trackingError && (
                      <p className="text-red-400 text-xs flex items-center gap-1">
                        <span>⚠</span> {trackingError}
                      </p>
                    )}
                    <p className="text-gray-600 text-xs">
                      This will be included in the shipping email sent to the customer.
                    </p>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ee6d49]/10 flex items-center justify-center text-sm flex-shrink-0">
                    📧
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed pt-1">
                    Advancing to <strong className="text-gray-900">{nextStatus && statusConfig[nextStatus].label}</strong> will
                    automatically send a notification email to <strong className="text-gray-900">{order.email}</strong>.
                  </p>
                </div>

                {emailSent && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2.5">
                    <span className="text-emerald-400 text-sm">✓</span>
                    <p className="text-emerald-400 text-xs font-medium">Status updated &amp; email sent to customer</p>
                  </div>
                )}

                <button
                  onClick={handleAdvance}
                  disabled={saving}
                  className={`w-full py-2.5 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${saving
                    ? "bg-white/10 text-gray-600 cursor-not-allowed"
                    : "bg-[#ee6d49] hover:bg-[#df6839] text-gray-900"
                    }`}
                >
                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Updating &amp; sending email…
                    </>
                  ) : (
                    <>{nextStatus && statusConfig[nextStatus].icon} Mark as {nextStatus && statusConfig[nextStatus].label}</>
                  )}
                </button>
              </div>
            </section>
          )}

          {order.status === "COMPLETED" && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <p className="text-emerald-400 font-semibold text-sm">✅ Order Complete</p>
              <p className="text-emerald-500/70 text-xs mt-1">Customer has been notified of delivery</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();

  // ── Orders state ──
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("PENDING");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  // ── Inventory state ──
  const [stockMap, setStockMap] = useState<StockMap>({});
  const [stockEdits, setStockEdits] = useState<Record<string, string>>({});
  const [stockSaving, setStockSaving] = useState<string | null>(null);
  const [invLoading, setInvLoading] = useState(false);

  // ── Helpers ──
  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 15;
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Order | null>(null);

  useEffect(() => { setPage(1); }, [tab, search]);

  const handleLogout = () => {
    clearAdminToken();
    document.cookie = "admin_token=; path=/; max-age=0";
    router.push("/admin/login");
  };


  // ── Fetch orders ──
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch("/api/admin/orders");
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setOrders(data.orders || data);
    } catch (e: any) {
      setError(e.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // ── Fetch inventory ──
  const fetchInventory = async () => {
    setInvLoading(true);
    try {
      const res = await adminFetch("/api/admin/inventory");
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) return;
      const data = await res.json();
      if (data.success) {
        const map: StockMap = {};
      data.inventory.forEach((i: any) => { map[`${i.productId}-${i.size}`] = i.stock; });
        setStockMap(map);
      }
    } catch { }
    finally { setInvLoading(false); }
  };

  useEffect(() => {
    fetchOrders();
    fetchInventory();
  }, []);

  // ── Status change ──
  const handleStatusChange = async (id: string, status: OrderStatus, trackingNumber?: string) => {
    try {
      const res = await adminFetch(`/api/admin/orders/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status, trackingNumber }),
      });
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error("Update failed");
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
      showToast(`Marked as ${statusConfig[status].label} — email sent to customer 📧`);
    } catch {
      showToast("Failed to update status", "err");
    }
  };

  // ── Stock save ──
  const handleStockSave = async (productId: number, size: string) => {
  const key = `${productId}-${size}`;
  const newStock = parseInt(stockEdits[key]);
  if (isNaN(newStock) || newStock < 0) {
    showToast("Enter a valid stock number", "err");
    return;
  }
  setStockSaving(key);
  try {
    const res = await adminFetch(`/api/admin/inventory/${productId}/${size}`, {
      method: "PATCH",
      body: JSON.stringify({ stock: newStock }),
    });
    if (res.status === 401) { router.push("/admin/login"); return; }
    if (!res.ok) throw new Error();
    setStockMap((prev) => ({ ...prev, [key]: newStock }));
    setStockEdits((prev) => { const n = { ...prev }; delete n[key]; return n; });
    showToast("Stock updated ✓");
  } catch {
    showToast("Failed to update stock", "err");
  } finally {
    setStockSaving(null);
  }
};

  // ── Derived data ──
  const counts = useMemo(() => ({
    PENDING: orders.filter((o) => o.status === "PENDING").length,
    SHIPPING: orders.filter((o) => o.status === "SHIPPING").length,
    COMPLETED: orders.filter((o) => o.status === "COMPLETED").length,
  }), [orders]);

  const revenue = useMemo(
    () => orders.filter((o) => o.status === "COMPLETED").reduce((s, o) => s + o.total, 0),
    [orders]
  );

  const filtered = useMemo(() => {
    if (tab === "INVENTORY") return [];
    let list = orders.filter((o) => o.status === tab);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.email.toLowerCase().includes(q) ||
          `${o.firstName} ${o.lastName}`.toLowerCase().includes(q) ||
          String(o.orderNumber).includes(q)
      );
    }
    return list;
  }, [orders, tab, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  const handleDeleteOrder = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await adminFetch(`/api/admin/orders/${id}`, { method: "DELETE" });
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Delete failed");
      }
      setOrders((prev) => prev.filter((o) => o.id !== id));
      setConfirmDelete(null);
      if (selected?.id === id) setSelected(null);
      showToast("Order deleted successfully");
    } catch (e: any) {
      showToast(e.message || "Failed to delete order", "err");
    } finally {
      setDeletingId(null);
    }
  };

  const tabConfig: { key: Tab; label: string; icon: string; countKey?: keyof typeof counts }[] = [
    { key: "PENDING", label: "Pending", icon: "🕐", countKey: "PENDING" },
    { key: "SHIPPING", label: "Shipping", icon: "🚚", countKey: "SHIPPING" },
    { key: "COMPLETED", label: "Completed", icon: "✅", countKey: "COMPLETED" },
    { key: "INVENTORY", label: "Inventory", icon: "📦" },
  ];

  // ── Inventory stock helpers ──
  const allKeys = products.flatMap((p) => SIZES.map((s) => `${p.id}-${s}`));
const outOfStockCount = allKeys.filter((k) => stockMap[k] !== undefined && stockMap[k] === 0).length;
const lowStockCount = allKeys.filter((k) => stockMap[k] !== undefined && stockMap[k] > 0 && stockMap[k] <= 5).length;
const totalProducts = allKeys.length;
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{ fontFamily: "'DM Mono', 'Fira Code', monospace" }}
    >
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
      .row-hover:hover { background: rgba(255,255,255,0.04); }
      @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
      .fade-in { animation: fadeIn 0.3s ease both; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .animate-spin { animation: spin 1s linear infinite; }
    `}</style>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-4 py-3 rounded-xl text-sm font-medium shadow-lg fade-in max-w-xs ${toast.type === "ok" ? "bg-emerald-500 text-gray-900" : "bg-red-500 text-gray-900"
          }`}>
          {toast.msg}
        </div>
      )}

      {/* Order Drawer */}
      {selected && (
        <OrderDrawer
          order={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f1117] border border-gray-200 shadow-sm rounded-2xl p-6 max-w-sm w-full mx-4 fade-in">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-2xl mb-4">🗑️</div>
            <h3 className="text-gray-900 font-bold text-lg mb-2">Delete Order #{confirmDelete.orderNumber}?</h3>
            <p className="text-gray-400 text-sm mb-6">
              This will permanently delete this order and all its items. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white border border-gray-200 shadow-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteOrder(confirmDelete.id)}
                disabled={deletingId === confirmDelete.id}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-red-500 hover:bg-red-600 text-gray-900 transition flex items-center justify-center gap-2"
              >
                {deletingId === confirmDelete.id ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting…
                  </>
                ) : "Delete Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex min-h-screen">

        <aside className="w-56 shrink-0 bg-white border-r border-gray-200 flex flex-col py-8 px-4 sticky top-0 h-screen">
          <div className="mb-8 px-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-1">Admin</p>
            <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
              Order Portal
            </h1>
          </div>

          <nav className="space-y-1">
            {tabConfig.map(({ key, label, icon, countKey }) => (
              <button
                key={key}
                onClick={() => { setTab(key); setSearch(""); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between ${tab === key
                    ? "bg-orange-100 text-orange-600 font-medium"
                    : "text-gray-400 hover:text-gray-900 hover:bg-white"
                  }`}
              >
                <span>{icon} {label}</span>
                {countKey ? (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === key ? "bg-[#ee6d49]/20 text-[#ee6d49]" : "bg-white/10 text-gray-600"
                    }`}>
                    {counts[countKey]}
                  </span>
                ) : (
                  outOfStockCount > 0 ? (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400">
                      {outOfStockCount} ⚠
                    </span>
                  ) : null
                )}
              </button>
            ))}
          </nav>

          <div className="mt-6 px-2">
            <div className="bg-white rounded-xl p-3 space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-gray-600">Auto Emails</p>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex items-center gap-2"><span>📧</span><span>On payment</span></div>
                <div className="flex items-center gap-2"><span>🚚</span><span>On shipping</span></div>
                <div className="flex items-center gap-2"><span>✅</span><span>On completion</span></div>
              </div>
            </div>
          </div>

          <div className="mt-auto px-2 space-y-1">
            <button
              onClick={() => { fetchOrders(); fetchInventory(); }}
              className="w-full text-xs text-gray-600 hover:text-gray-900 transition py-2 flex items-center gap-2"
            >
              <span>↻</span> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-xs text-red-500/70 hover:text-red-400 transition py-2 flex items-center gap-2"
            >
              <span>→</span> Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-auto">

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Orders" value={orders.length} />
            <StatCard label="🕐 Pending" value={counts.PENDING} sub="awaiting dispatch" />
            <StatCard label="🚚 Shipping" value={counts.SHIPPING} sub="on the way" />
            <StatCard label="Revenue" value={`$${revenue.toFixed(0)}`} sub="from completed orders" accent="text-[#ee6d49]" />
          </div>

          {/* INVENTORY TAB */}
          {tab === "INVENTORY" ? (
            <div className="fade-in">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-base font-semibold text-gray-900">📦 Inventory Management</h2>
                <button
                  onClick={fetchInventory}
                  className="ml-auto text-xs text-gray-600 hover:text-gray-900 transition flex items-center gap-1"
                >
                  <span>↻</span> Refresh
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-widest text-gray-600 mb-1">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-widest text-red-500/70 mb-1">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-400">{outOfStockCount}</p>
                </div>
                <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-widest text-orange-500/70 mb-1">Low Stock (≤5)</p>
                  <p className="text-2xl font-bold text-orange-400">{lowStockCount}</p>
                </div>
              </div>

              {invLoading ? (
                <div className="flex items-center justify-center h-40 text-gray-600 text-sm">Loading inventory…</div>
              ) : (
                <div className="rounded-2xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-orange-50">
                        {["Product", "Status", "Current Stock", "Update Stock", ""].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-gray-600 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
  SIZES.map((size, idx) => {
    const key = `${product.id}-${size}`;
    const stock = stockMap[key];
    const isOutOfStock = stock !== undefined && stock === 0;
    const isLowStock = stock !== undefined && stock > 0 && stock <= 5;
    const isEditing = stockEdits[key] !== undefined;
    return (
      <tr key={key} className="border-b border-white/[0.04] row-hover transition">
        <td className="px-4 py-4">
          {idx === 0 && (
            <>
              <p className="text-gray-900 font-medium">{product.name}</p>
              <p className="text-gray-600 text-xs mt-0.5">{product.color} · {product.material}</p>
            </>
          )}
          <p className="text-gray-400 text-xs mt-1">{size}</p>
        </td>
        <td className="px-4 py-4">
          {stock === undefined ? (
            <span className="text-xs text-gray-600 bg-white px-2.5 py-1 rounded-lg">Not set</span>
          ) : isOutOfStock ? (
            <span className="text-xs font-bold bg-red-500/20 text-red-400 px-2.5 py-1 rounded-lg">Out of Stock</span>
          ) : isLowStock ? (
            <span className="text-xs font-bold bg-orange-500/20 text-orange-400 px-2.5 py-1 rounded-lg">Low — {stock} left</span>
          ) : (
            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg">In Stock — {stock}</span>
          )}
        </td>
        <td className="px-4 py-4 text-gray-400 font-mono">{stock ?? "—"}</td>
        <td className="px-4 py-4">
          <input
            type="number"
            min={0}
            placeholder={stock?.toString() ?? "0"}
            value={stockEdits[key] ?? ""}
            onChange={(e) => setStockEdits((prev) => ({ ...prev, [key]: e.target.value }))}
            className="bg-white border border-gray-200 shadow-sm focus:border-[#ee6d49] rounded-lg px-3 py-1.5 w-24 text-gray-900 text-sm outline-none transition font-mono"
          />
        </td>
        <td className="px-4 py-4">
          <button
            disabled={!isEditing || stockSaving === key}
            onClick={() => handleStockSave(product.id, size)}
            className="bg-[#ee6d49] disabled:bg-white/10 disabled:text-gray-600 text-gray-900 px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#df6839] transition"
          >
            {stockSaving === key ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                Saving…
              </span>
            ) : "Save"}
          </button>
        </td>
      </tr>
    );
  })
))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          ) : (
            <>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search name, email, order #…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-600 outline-none focus:border-[#ee6d49] transition"
                />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-base font-semibold text-gray-900">
                  {statusConfig[tab as OrderStatus]?.icon} {statusConfig[tab as OrderStatus]?.label} Orders
                </h2>
                <span className="text-xs text-gray-600 bg-white px-2 py-0.5 rounded-full">
                  {filtered.length} {filtered.length === 1 ? "order" : "orders"}
                </span>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-64 text-gray-600 text-sm">Loading orders…</div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <p className="text-red-400 text-sm">{error}</p>
                  <button onClick={fetchOrders} className="text-sm text-[#ee6d49] hover:underline">Retry</button>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 gap-2 text-gray-600">
                  <p className="text-3xl">{statusConfig[tab as OrderStatus]?.icon}</p>
                  <p className="text-sm">No {statusConfig[tab as OrderStatus]?.label.toLowerCase()} orders</p>
                </div>
              ) : (
                <>
                  <div className="rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 bg-orange-50">
                          {["Order", "Customer", "Items", "Total", "Payment", "Date", "Status", "", ""].map((h, i) => (
                            <th key={i} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-gray-600 font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginated.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b border-white/[0.04] row-hover cursor-pointer transition"
                          >
                            <td className="px-4 py-3.5 font-mono text-[#ee6d49]" onClick={() => setSelected(order)}>
                              #{order.orderNumber}
                            </td>
                            <td className="px-4 py-3.5" onClick={() => setSelected(order)}>
                              <p className="text-gray-900 font-medium">{order.firstName} {order.lastName}</p>
                              <p className="text-gray-600 text-xs">{order.email}</p>
                            </td>
                            <td className="px-4 py-3.5 text-gray-400" onClick={() => setSelected(order)}>
                              {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                            </td>
                            <td className="px-4 py-3.5 text-gray-900 font-semibold" onClick={() => setSelected(order)}>
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-4 py-3.5" onClick={() => setSelected(order)}>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${order.paymentMethod === "STRIPE"
                                  ? "bg-violet-500/20 text-violet-300"
                                  : "bg-blue-500/20 text-blue-300"
                                }`}>
                                {order.paymentMethod}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-gray-600 text-xs" onClick={() => setSelected(order)}>
                              {new Date(order.createdAt).toLocaleDateString("en-AU")}
                            </td>
                            <td className="px-4 py-3.5" onClick={() => setSelected(order)}>
                              <StatusBadge status={order.status} />
                            </td>
                            <td className="px-4 py-3.5 text-gray-600 text-xs hover:text-gray-900 transition" onClick={() => setSelected(order)}>
                              View →
                            </td>

                            {/* Delete — all 3 tabs, SHIPPING shows disabled */}
                            <td className="px-4 py-3.5">
                              {order.status === "SHIPPING" ? (
                                <span
                                  title="Cannot delete in-transit orders"
                                  className="text-gray-700 w-7 h-7 flex items-center justify-center cursor-not-allowed"
                                >
                                  🚫
                                </span>
                              ) : (
                                <button
                                  onClick={(e) => { e.stopPropagation(); setConfirmDelete(order); }}
                                  className="text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg w-7 h-7 flex items-center justify-center transition"
                                  title="Delete order"
                                >
                                  🗑️
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {filtered.length > PAGE_SIZE && (
                    <div className="flex items-center justify-between mt-4 px-1">
                      <p className="text-xs text-gray-600">
                        Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${page === 1 ? "text-gray-600 cursor-not-allowed" : "text-gray-300 hover:bg-white"
                            }`}
                        >
                          ← Prev
                        </button>
                        <span className="text-xs text-gray-600 px-2">
                          Page {page} of {totalPages}
                        </span>
                        <button
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${page === totalPages ? "text-gray-600 cursor-not-allowed" : "text-gray-300 hover:bg-white"
                            }`}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}