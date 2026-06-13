"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

type OrderInfo = {
  orderId: string | null;
  username: string;
  items: { productName: string; quantity: number; price: number; size?: string; color?: string }[];
  total: number;
};

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();

  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  useEffect(() => {
    const run = async () => {
      const orderId = searchParams.get("orderId");
      const success = searchParams.get("success");
      const isPaypal = searchParams.get("paypal") === "true";
      const paypalToken = searchParams.get("token"); // PayPal injects this

      if (isPaypal && success === "false") {
        // Still call verify to clean up the DB order
        const backendHost = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/$/, "");
        try {
          await fetch(`${backendHost}/api/payments/verify-paypal`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, success: "false" }),
          });
        } catch (_) {}
        setStatus("failed");
        return;
      }
      
      // Read order info saved by checkout page
      try {
        const saved = sessionStorage.getItem("lastOrder");
        if (saved) setOrderInfo(JSON.parse(saved));
      } catch (_) {}

      const backendHost = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/$/, "");

      // Determine which endpoint to hit
      const endpoint = isPaypal
        ? `${backendHost}/api/payments/verify-paypal`
        : `${backendHost}/api/payments/verify-stripe`;

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            success: success ?? "true",
            token: paypalToken, // only used by PayPal, Stripe ignores it
          }),
        });

        const data = await res.json();

        if (data.success) {
          clearCart();
          sessionStorage.removeItem("lastOrder");
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("failed");
      }
    };

    run();
  }, []);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#ee6d49] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 font-medium">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  // ── Failed / Cancelled ─────────────────────────────────────────────────────
  if (status === "failed") {
    return (
      <div className="min-h-screen bg-gray-50 py-14 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-10 text-center space-y-4">
          <div className="text-5xl">❌</div>
          <h1 className="text-3xl font-extrabold text-red-600">Payment Failed</h1>
          <p className="text-gray-500">
            Your payment was not completed. No charge has been made.
          </p>
          <Link
            href="/checkout"
            className="inline-block mt-4 bg-[#ee6d49] hover:bg-[#df6839] text-white px-8 py-3 rounded-xl font-semibold"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  // ── Success ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Hero card */}
        <div className="bg-white rounded-2xl shadow p-10 text-center space-y-3">
          <div className="text-6xl">🎉</div>
          <h1 className="text-3xl font-extrabold">Order Confirmed!</h1>
          {orderInfo?.username && (
            <p className="text-gray-600 text-lg">
              Thanks, <span className="font-semibold">{orderInfo.username}</span>!
            </p>
          )}
          <p className="text-gray-500 text-sm">
            A confirmation email will be sent to you shortly.
          </p>
        </div>

        {/* Order details */}
        {orderInfo && (
          <div className="bg-white rounded-2xl shadow p-8 space-y-4">
            <h2 className="text-xl font-bold border-b pb-3">Order Summary</h2>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {orderInfo.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-gray-400">
                      {[item.color, item.size].filter(Boolean).join(" • ")} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg font-bold">Total Paid</span>
              <span className="text-2xl font-extrabold text-[#ee6d49]">
                AUD ${orderInfo.total.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href="/products"
            className="flex-1 text-center bg-[#ee6d49] hover:bg-[#df6839] text-white py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex-1 text-center border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-xl font-semibold transition"
          >
            Go to Home
          </Link>
        </div>

      </div>
    </div>
  );
}