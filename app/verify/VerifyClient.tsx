"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";

export default function VerifyPage() {
  const search = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "failure" | "error" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const doVerify = async () => {
      const success = search.get("success");
      const orderId = search.get("orderId");

      if (!orderId) {
        setStatus("error");
        setMessage("Missing orderId in URL.");
        setLoading(false);
        return;
      }

      try {
        const backendHost = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/$/, "");
        const tryEndpoints = [
          // primary route according to backend router: /api/payments/verify-stripe
          backendHost ? `${backendHost}/api/payments/verify-stripe` : "/api/payments/verify-stripe",
          // fallback for older naming if present
          backendHost ? `${backendHost}/api/payments/verify` : "/api/payments/verify",
        ];

        let res = null;
        let data = null;

        for (const ep of tryEndpoints) {
          try {
            res = await fetch(ep, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId, success }),
            });
            data = await (res.ok ? res.json() : res.json().catch(() => null));
            break;
          } catch (err) {
            console.warn("verify endpoint failed", ep, err);
            continue;
          }
        }

        if (!res) {
          setStatus("error");
          setMessage("Could not reach verification endpoint.");
          setLoading(false);
          return;
        }

        if (!res.ok) {
          setStatus("failure");
          setMessage(data?.message || `Verification failed (status ${res.status})`);
          setLoading(false);
          return;
        }

        setStatus("success");
        setMessage(data?.message || "Payment confirmed.");

        clearCart();
        setLoading(false);
        setTimeout(() => router.push("/orders"), 1200);
      } catch (err: any) {
        setStatus("error");
        setMessage(err?.message || String(err));
        setLoading(false);
      }
    };

    doVerify();
  }, [search, router, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow p-8 text-center">
        {loading ? (
          <div>
            <div className="w-10 h-10 border-2 border-gray-300 border-t-transparent rounded-full mx-auto animate-spin"></div>
            <p className="mt-4">Verifying payment...</p>
          </div>
        ) : (
          <div>
            {status === "success" ? (
              <>
                <h2 className="text-2xl font-bold text-green-600">Payment Successful</h2>
                <p className="mt-2 text-gray-600">{message}</p>
                <p className="mt-4">Redirecting to your orders...</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
                <p className="mt-2 text-gray-600">{message}</p>
                <div className="mt-6 flex justify-center gap-4">
                  <button onClick={() => router.push('/checkout')} className="px-4 py-2 bg-[#ee6d49] text-white rounded">Back to Checkout</button>
                  <button onClick={() => router.push('/cart')} className="px-4 py-2 border rounded">View Cart</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
