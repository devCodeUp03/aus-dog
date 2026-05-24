"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, clearAdminToken } from "@/lib/adminAuth";

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

type Tab = "PENDING" | "SHIPPING" | "COMPLETED";

const statusConfig: Record<OrderStatus, { label: string; cls: string; icon: string; description: string }> = {
  PENDING:   { label: "Pending",   icon: "🕐", description: "Order received, being prepared",  cls: "bg-amber-100 text-amber-700 border-amber-200" },
  SHIPPING:  { label: "Shipping",  icon: "🚚", description: "Dispatched and on its way",        cls: "bg-blue-100 text-blue-700 border-blue-200" },
  COMPLETED: { label: "Completed", icon: "✅", description: "Delivered to customer",            cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
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

function OrderDrawer({
  order,
  onClose,
  onStatusChange,
}: {
  order: Order;
  onClose: () => void;
  onStatusChange: (id: string, status: OrderStatus) => Promise<void>;
}) {
  const [saving, setSaving] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const currentIdx = STATUS_ORDER.indexOf(order.status);

  const handleAdvance = async () => {
    if (currentIdx >= STATUS_ORDER.length - 1) return;
    const nextStatus = STATUS_ORDER[currentIdx + 1];
    setSaving(true);
    await onStatusChange(order.id, nextStatus);
    setEmailSent(true);
    setSaving(false);
    setTimeout(() => setEmailSent(false), 4000);
  };

  const nextStatus = STATUS_ORDER[currentIdx + 1];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-xl bg-[#0f1117] border-l border-white/10 h-full overflow-y-auto flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Order Details</p>
            <h2 className="text-xl font-bold text-white font-mono">#{order.orderNumber}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition">✕</button>
        </div>

        <div className="p-6 space-y-6 flex-1">

          {/* Progress Tracker */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Fulfillment Progress</h3>
            <div className="bg-white/5 rounded-xl p-5">
              <div className="flex items-center justify-between relative">
                {/* connector line */}
                <div className="absolute top-5 left-[16.66%] right-[16.66%] h-0.5 bg-white/10 z-0" />
                <div
                  className="absolute top-5 left-[16.66%] h-0.5 bg-[#ee6d49] z-0 transition-all duration-500"
                  style={{ width: `${(currentIdx / (STATUS_ORDER.length - 1)) * 66.66}%` }}
                />

                {STATUS_ORDER.map((s, i) => {
                  const done    = i < currentIdx;
                  const active  = i === currentIdx;
                  const cfg     = statusConfig[s];
                  return (
                    <div key={s} className="flex flex-col items-center z-10 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                        done    ? "bg-[#ee6d49] shadow-lg shadow-[#ee6d49]/30" :
                        active  ? "bg-[#ee6d49]/20 border-2 border-[#ee6d49]" :
                                  "bg-white/10 border-2 border-white/10"
                      }`}>
                        {done ? "✓" : cfg.icon}
                      </div>
                      <p className={`text-xs mt-2 font-medium ${active ? "text-[#ee6d49]" : done ? "text-white" : "text-gray-600"}`}>
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
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Customer</h3>
            <div className="bg-white/5 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#ee6d49]/20 flex items-center justify-center text-[#ee6d49] font-bold text-sm">
                  {order.firstName[0]}{order.lastName[0]}
                </div>
                <div>
                  <p className="text-white font-semibold">{order.firstName} {order.lastName}</p>
                  <p className="text-gray-400 text-sm">{order.email}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 text-sm text-gray-400 space-y-1">
                <p>📱 {order.phone}</p>
                <p>📍 {order.address}, {order.suburb} {order.postcode}, {order.state}, {order.country}</p>
              </div>
            </div>
          </section>

          {/* Items */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Items</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="bg-white/5 rounded-xl p-4 flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium text-sm">{item.productName}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {[item.color, item.size, item.variant].filter(Boolean).join(" · ")}
                    </p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-white font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Totals */}
          <section className="bg-white/5 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Delivery</span><span>${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white font-bold text-base border-t border-white/10 pt-2 mt-2">
              <span>Total</span>
              <span className="text-[#ee6d49]">AUD ${order.total.toFixed(2)}</span>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Payment</h3>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                order.paymentMethod === "STRIPE" ? "bg-violet-500/20 text-violet-300" : "bg-blue-500/20 text-blue-300"
              }`}>
                {order.paymentMethod}
              </span>
              <span className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleString("en-AU")}</span>
            </div>
          </section>

          {/* Advance Status */}
          {order.status !== "COMPLETED" && (
            <section>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Advance Order</h3>
              <div className="bg-white/5 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ee6d49]/10 flex items-center justify-center text-sm flex-shrink-0">
                    📧
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed pt-1">
                    Advancing to <strong className="text-white">{nextStatus && statusConfig[nextStatus].label}</strong> will
                    automatically send a notification email to <strong className="text-white">{order.email}</strong>.
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
                  className={`w-full py-2.5 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${
                    saving
                      ? "bg-white/10 text-gray-500 cursor-not-allowed"
                      : "bg-[#ee6d49] hover:bg-[#df6839] text-white"
                  }`}
                >
                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Updating &amp; sending email…
                    </>
                  ) : (
                    <>
                      {nextStatus && statusConfig[nextStatus].icon} Mark as {nextStatus && statusConfig[nextStatus].label}
                    </>
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

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${accent || "text-white"}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders]     = useState<Order[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [tab, setTab]           = useState<Tab>("PENDING");
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState<Order | null>(null);
  const [toast, setToast]       = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogout = () => {
    clearAdminToken();
    document.cookie = "admin_token=; path=/; max-age=0";
    router.push("/admin/login");
  };

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

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    try {
      const res = await adminFetch(`/api/admin/orders/${id}/status`, {
        method: "PATCH",
        body:   JSON.stringify({ status }),
      });
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error("Update failed");

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
      if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
      showToast(`Marked as ${statusConfig[status].label} — email sent to customer 📧`);
    } catch {
      showToast("Failed to update status", "err");
    }
  };

  const counts = useMemo(
    () => ({
      PENDING:   orders.filter((o) => o.status === "PENDING").length,
      SHIPPING:  orders.filter((o) => o.status === "SHIPPING").length,
      COMPLETED: orders.filter((o) => o.status === "COMPLETED").length,
    }),
    [orders]
  );

  const revenue = useMemo(
    () => orders.filter((o) => o.status === "COMPLETED").reduce((s, o) => s + o.total, 0),
    [orders]
  );

  const filtered = useMemo(() => {
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

  const tabConfig: { key: Tab; label: string; icon: string; countKey: Tab }[] = [
    { key: "PENDING",   label: "Pending",   icon: "🕐", countKey: "PENDING"   },
    { key: "SHIPPING",  label: "Shipping",  icon: "🚚", countKey: "SHIPPING"  },
    { key: "COMPLETED", label: "Completed", icon: "✅", countKey: "COMPLETED" },
  ];

  return (
    <div
      className="min-h-screen bg-[#080a0f] text-white"
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

      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-4 py-3 rounded-xl text-sm font-medium shadow-lg fade-in max-w-xs ${
          toast.type === "ok" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
        }`}>
          {toast.msg}
        </div>
      )}

      {selected && (
        <OrderDrawer
          order={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 bg-[#0b0d13] border-r border-white/[0.07] flex flex-col py-8 px-4 sticky top-0 h-screen">
          <div className="mb-8 px-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-1">Admin</p>
            <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              Order Portal
            </h1>
          </div>

          <nav className="space-y-1">
            {tabConfig.map(({ key, label, icon, countKey }) => (
              <button
                key={key}
                onClick={() => { setTab(key); setSearch(""); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between ${
                  tab === key
                    ? "bg-[#ee6d49]/10 text-[#ee6d49] font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{icon} {label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  tab === key ? "bg-[#ee6d49]/20 text-[#ee6d49]" : "bg-white/10 text-gray-500"
                }`}>
                  {counts[countKey]}
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-6 px-2">
            <div className="bg-white/5 rounded-xl p-3 space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-gray-600">Auto Emails</p>
              <div className="space-y-1.5 text-xs text-gray-500">
                <div className="flex items-center gap-2"><span>📧</span><span>On payment</span></div>
                <div className="flex items-center gap-2"><span>🚚</span><span>On shipping</span></div>
                <div className="flex items-center gap-2"><span>✅</span><span>On completion</span></div>
              </div>
            </div>
          </div>

          <div className="mt-auto px-2 space-y-1">
            <button
              onClick={fetchOrders}
              className="w-full text-xs text-gray-500 hover:text-white transition py-2 flex items-center gap-2"
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
            <StatCard label="Total Orders"  value={orders.length} />
            <StatCard label="🕐 Pending"    value={counts.PENDING}   sub="awaiting dispatch" />
            <StatCard label="🚚 Shipping"   value={counts.SHIPPING}  sub="on the way" />
            <StatCard label="Revenue"       value={`$${revenue.toFixed(0)}`} sub="from completed orders" accent="text-[#ee6d49]" />
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search name, email, order #…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#ee6d49] transition"
            />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-base font-semibold text-white">
              {statusConfig[tab].icon} {statusConfig[tab].label} Orders
            </h2>
            <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
              {filtered.length} {filtered.length === 1 ? "order" : "orders"}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64 text-gray-500 text-sm">Loading orders…</div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <p className="text-red-400 text-sm">{error}</p>
              <button onClick={fetchOrders} className="text-sm text-[#ee6d49] hover:underline">Retry</button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-2 text-gray-600">
              <p className="text-3xl">{statusConfig[tab].icon}</p>
              <p className="text-sm">No {statusConfig[tab].label.toLowerCase()} orders</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                    {["Order", "Customer", "Items", "Total", "Payment", "Date", "Status", ""].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-gray-600 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-white/[0.04] row-hover cursor-pointer transition"
                      onClick={() => setSelected(order)}
                    >
                      <td className="px-4 py-3.5 font-mono text-[#ee6d49]">#{order.orderNumber}</td>
                      <td className="px-4 py-3.5">
                        <p className="text-white font-medium">{order.firstName} {order.lastName}</p>
                        <p className="text-gray-500 text-xs">{order.email}</p>
                      </td>
                      <td className="px-4 py-3.5 text-gray-400">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</td>
                      <td className="px-4 py-3.5 text-white font-semibold">${order.total.toFixed(2)}</td>
                      <td className="px-4 py-3.5">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                          order.paymentMethod === "STRIPE" ? "bg-violet-500/20 text-violet-300" : "bg-blue-500/20 text-blue-300"
                        }`}>
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-gray-500 text-xs">
                        {new Date(order.createdAt).toLocaleDateString("en-AU")}
                      </td>
                      <td className="px-4 py-3.5"><StatusBadge status={order.status} /></td>
                      <td className="px-4 py-3.5 text-gray-600 text-xs hover:text-white transition">View →</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}