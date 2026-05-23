"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

type ShippingAddress = {
  email: string;
  first_name: string;
  last_name: string;
  address_line1: string;
  suburb: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
};

type ShippingMethod =
  | "standard"
  | "express";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] =
    useState(false);

  const [processingPayment, setProcessingPayment] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("stripe");

  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>(
      "standard",
    );

  const [shakeField, setShakeField] =
    useState<string | null>(null);

  const [errors, setErrors] =
    useState<
      Record<string, string>
    >({});

  const [addr, setAddr] =
    useState<ShippingAddress>({
      email: "",
      first_name: "",
      last_name: "",
      address_line1: "",
      suburb: "",
      state: "",
      postal_code: "",
      country: "Australia",
      phone: "",
    });

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (acc, item) =>
          acc +
          item.price *
            item.quantity,
        0,
      ),
    [cart],
  );

  // SHIPPING CHARGE
  const deliveryCharge =
    shippingMethod === "express"
      ? 15
      : 12;

  const total =
    subtotal + deliveryCharge;

  // VALIDATION
  const validateField = (
    field: string,
    value: string,
  ) => {
    switch (field) {
      case "email":
        if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            value,
          )
        ) {
          return "Enter a valid email";
        }

        return "";

      case "first_name":
      case "last_name":
        if (
          value.trim().length < 2
        ) {
          return "Minimum 2 characters required";
        }

        return "";

      case "address_line1":
        if (
          value.trim().length < 5
        ) {
          return "Enter a valid address";
        }

        return "";

      case "suburb":
        if (
          value.trim().length < 2
        ) {
          return "Suburb is too short";
        }

        return "";

      case "postal_code":
        if (
          !/^[0-9]{4}$/.test(
            value,
          )
        ) {
          return "Australian postcode must be 4 digits";
        }

        return "";

      case "phone":
        if (
          !/^[0-9]{8,15}$/.test(
            value,
          )
        ) {
          return "Enter a valid phone number";
        }

        return "";

      case "state":
        if (!value) {
          return "Please select a state";
        }

        return "";

      default:
        return "";
    }
  };

  const handleValidation = (
    field: string,
    value: string,
  ) => {
    const error = validateField(
      field,
      value,
    );

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    if (error) {
      setShakeField(field);

      setTimeout(() => {
        setShakeField(null);
      }, 300);
    }
  };

  const inputClass = (
    field: string,
  ) =>
    `w-full border rounded-xl px-4 py-3 outline-none transition-all duration-200
    focus:ring-2 focus:ring-[#ee6d49]
    ${
      errors[field]
        ? "border-red-500"
        : "border-gray-300"
    }
    ${
      !errors[field] &&
      addr[
        field as keyof ShippingAddress
      ]
        ? "border-green-500"
        : ""
    }
    ${
      shakeField === field
        ? "animate-[shake_0.3s_ease-in-out]"
        : ""
    }`;

  const handlePayment =
    async () => {
      // Only Stripe is implemented — block other payment methods
      if (paymentMethod !== "stripe") {
        toast.error("Selected payment method is not available yet. Please choose Card/Stripe.");
        return;
      }

      const requiredFields = [
        "email",
        "first_name",
        "last_name",
        "address_line1",
        "suburb",
        "state",
        "postal_code",
        "phone",
      ];

      let hasError = false;

      requiredFields.forEach(
        (field) => {
          const value =
            addr[
              field as keyof ShippingAddress
            ];

          const error =
            validateField(
              field,
              value,
            );

          if (error) {
            hasError = true;

            setErrors(
              (prev) => ({
                ...prev,
                [field]:
                  error,
              }),
            );

            setShakeField(
              field,
            );

            setTimeout(() => {
              setShakeField(
                null,
              );
            }, 300);
          }
        },
      );

      if (hasError) {
        toast.error(
          "Please fix the form errors",
        );

        return;
      }

      try {
        setProcessingPayment(
          true,
        );

        const payload = {
          userId: user?.id ?? null,
          items: cart.map((it: any) => ({
            name: it.name,
            variant: it.variant ?? "",
            quantity: it.quantity,
            price: it.price,
            color: it.color ?? "",
            size: it.size ?? "",
          })),
          amount: subtotal,
          deliveryFee: deliveryCharge,
          email: addr.email,
          firstName: addr.first_name,
          lastName: addr.last_name,
          address: addr.address_line1,
          suburb: addr.suburb,
          state: addr.state,
          postcode: addr.postal_code,
          phone: addr.phone,
          country: addr.country,
        };

        const backendHost = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/$/, "");
        const endpoint = backendHost
          ? `${backendHost}/api/payments/stripe`
          : "/api/payments/stripe";

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        let data: any = null;
        try {
          data = await res.json();
        } catch (err) {
          console.error("Non-JSON response from payments endpoint", err);
        }

        if (!res.ok) {
          const msg = data?.message || data?.error || `Payment API returned ${res.status}`;
          console.error("Payment API error", res.status, data);
          toast.error(msg);
          return;
        }

        // Save order info to sessionStorage
        try {
          const orderInfo = {
            orderId: data?.orderId || data?.order_id || null,
            username: data?.username || `${addr.first_name} ${addr.last_name}`,
            items: data?.items || payload.items,
            total: total,
          };
          sessionStorage.setItem("lastOrder", JSON.stringify(orderInfo));
        } catch (err) {
          console.warn("Could not persist order info to sessionStorage", err);
        }

        const redirectUrl = data?.session_url || data?.url || data?.sessionUrl;

        if (redirectUrl) {
          // Redirect to Stripe Checkout
          window.location.href = redirectUrl;
        } else {
          // No Stripe session URL returned — go back to products page
          router.push("/products");
        }
      } catch (error) {
        toast.error(
          "Payment failed",
        );
      } finally {
        setProcessingPayment(
          false,
        );
      }
    };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Loading checkout...
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-14 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 text-center">
          <h1 className="text-2xl font-bold">
            Your cart is empty
          </h1>

          <button
            onClick={() =>
              router.push(
                "/products",
              )
            }
            className="mt-5 bg-[#ee6d49] hover:bg-[#df6839] text-white px-6 py-3 rounded-xl"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold">
              Checkout
            </h1>

            <p className="text-gray-500 mt-2">
              Complete your order
              securely
            </p>
          </div>

          {/* USER */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-green-800 text-sm">
              ✅ Logged in as{" "}
              <span className="font-semibold">
                {user?.username ||
                  "Guest"}
              </span>
            </p>
          </div>

          {/* SHIPPING DETAILS */}
          <div className="space-y-5">
            <h2 className="text-2xl font-bold">
              Shipping Details
            </h2>

            {/* EMAIL */}
            <div>
              <input
                type="email"
                className={inputClass(
                  "email",
                )}
                placeholder="Email Address *"
                value={
                  addr.email
                }
                onChange={(
                  e,
                ) => {
                  setAddr(
                    (
                      a,
                    ) => ({
                      ...a,
                      email:
                        e
                          .target
                          .value,
                    }),
                  );

                  handleValidation(
                    "email",
                    e.target
                      .value,
                  );
                }}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    errors.email
                  }
                </p>
              )}
            </div>

            {/* NAMES */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  className={inputClass(
                    "first_name",
                  )}
                  placeholder="First Name *"
                  value={
                    addr.first_name
                  }
                  onChange={(
                    e,
                  ) => {
                    setAddr(
                      (
                        a,
                      ) => ({
                        ...a,
                        first_name:
                          e
                            .target
                            .value,
                      }),
                    );

                    handleValidation(
                      "first_name",
                      e.target
                        .value,
                    );
                  }}
                />

                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {
                      errors.first_name
                    }
                  </p>
                )}
              </div>

              <div>
                <input
                  className={inputClass(
                    "last_name",
                  )}
                  placeholder="Last Name *"
                  value={
                    addr.last_name
                  }
                  onChange={(
                    e,
                  ) => {
                    setAddr(
                      (
                        a,
                      ) => ({
                        ...a,
                        last_name:
                          e
                            .target
                            .value,
                      }),
                    );

                    handleValidation(
                      "last_name",
                      e.target
                        .value,
                    );
                  }}
                />

                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {
                      errors.last_name
                    }
                  </p>
                )}
              </div>
            </div>

            {/* COUNTRY */}
            <input
              readOnly
              value={
                addr.country
              }
              className="w-full border border-gray-200 bg-gray-100 rounded-xl px-4 py-3"
            />

            {/* ADDRESS */}
            <div>
              <input
                className={inputClass(
                  "address_line1",
                )}
                placeholder="Street Address *"
                value={
                  addr.address_line1
                }
                onChange={(
                  e,
                ) => {
                  setAddr(
                    (
                      a,
                    ) => ({
                      ...a,
                      address_line1:
                        e
                          .target
                          .value,
                    }),
                  );

                  handleValidation(
                    "address_line1",
                    e.target
                      .value,
                  );
                }}
              />

              {errors.address_line1 && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    errors.address_line1
                  }
                </p>
              )}
            </div>

            {/* SUBURB */}
            <div>
              <input
                className={inputClass(
                  "suburb",
                )}
                placeholder="Suburb *"
                value={
                  addr.suburb
                }
                onChange={(
                  e,
                ) => {
                  setAddr(
                    (
                      a,
                    ) => ({
                      ...a,
                      suburb:
                        e
                          .target
                          .value,
                    }),
                  );

                  handleValidation(
                    "suburb",
                    e.target
                      .value,
                  );
                }}
              />

              {errors.suburb && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    errors.suburb
                  }
                </p>
              )}
            </div>

            {/* STATE + POSTCODE */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  className={inputClass(
                    "state",
                  )}
                  value={
                    addr.state
                  }
                  onChange={(
                    e,
                  ) => {
                    setAddr(
                      (
                        a,
                      ) => ({
                        ...a,
                        state:
                          e
                            .target
                            .value,
                      }),
                    );

                    handleValidation(
                      "state",
                      e.target
                        .value,
                    );
                  }}
                >
                  <option value="">
                    Select State *
                  </option>

                  <option value="Victoria">
                    Victoria
                  </option>

                  <option value="New South Wales">
                    New South
                    Wales
                  </option>

                  <option value="Queensland">
                    Queensland
                  </option>

                  <option value="Western Australia">
                    Western
                    Australia
                  </option>

                  <option value="South Australia">
                    South
                    Australia
                  </option>

                  <option value="Tasmania">
                    Tasmania
                  </option>

                  <option value="Australian Capital Territory">
                    ACT
                  </option>

                  <option value="Northern Territory">
                    Northern
                    Territory
                  </option>
                </select>

                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {
                      errors.state
                    }
                  </p>
                )}
              </div>

              <div>
                <input
                  maxLength={4}
                  className={inputClass(
                    "postal_code",
                  )}
                  placeholder="Postcode *"
                  value={
                    addr.postal_code
                  }
                  onChange={(
                    e,
                  ) => {
                    const value =
                      e.target.value.replace(
                        /\D/g,
                        "",
                      );

                    setAddr(
                      (
                        a,
                      ) => ({
                        ...a,
                        postal_code:
                          value,
                      }),
                    );

                    handleValidation(
                      "postal_code",
                      value,
                    );
                  }}
                />

                {errors.postal_code && (
                  <p className="text-red-500 text-sm mt-1">
                    {
                      errors.postal_code
                    }
                  </p>
                )}
              </div>
            </div>

            {/* PHONE */}
            <div>
              <input
                type="tel"
                className={inputClass(
                  "phone",
                )}
                placeholder="Phone Number *"
                value={
                  addr.phone
                }
                onChange={(
                  e,
                ) => {
                  const value =
                    e.target.value.replace(
                      /\D/g,
                      "",
                    );

                  setAddr(
                    (
                      a,
                    ) => ({
                      ...a,
                      phone:
                        value,
                    }),
                  );

                  handleValidation(
                    "phone",
                    value,
                  );
                }}
              />

              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    errors.phone
                  }
                </p>
              )}
            </div>
          </div>

          {/* DELIVERY OPTIONS */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              Delivery Method
            </h2>

            {/* STANDARD */}
            <label className="flex items-center gap-4 border rounded-2xl p-5 cursor-pointer hover:border-[#ee6d49] transition">
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={
                  shippingMethod ===
                  "standard"
                }
                onChange={() =>
                  setShippingMethod(
                    "standard",
                  )
                }
              />

              <div>
                <p className="font-semibold">
                  Standard Delivery
                </p>

                <p className="text-sm text-gray-500">
                  AUD $12.00
                </p>
              </div>
            </label>

            {/* EXPRESS */}
            <label className="flex items-center gap-4 border rounded-2xl p-5 cursor-pointer hover:border-[#ee6d49] transition">
              <input
                type="radio"
                name="shipping"
                value="express"
                checked={
                  shippingMethod ===
                  "express"
                }
                onChange={() =>
                  setShippingMethod(
                    "express",
                  )
                }
              />

              <div>
                <p className="font-semibold">
                  Express Post
                </p>

                <p className="text-sm text-gray-500">
                  AUD $15.00
                </p>
              </div>
            </label>
          </div>

          {/* PAYMENT */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              Payment Method
            </h2>

            {/* STRIPE */}
            <label className="flex items-center gap-4 border rounded-2xl p-5 cursor-pointer hover:border-[#ee6d49] transition">
              <input
                type="radio"
                name="payment"
                value="stripe"
                checked={
                  paymentMethod ===
                  "stripe"
                }
                onChange={(
                  e,
                ) =>
                  setPaymentMethod(
                    e.target
                      .value,
                  )
                }
              />

              <div>
                <p className="font-semibold">
                  Card / Google
                  Pay
                </p>

                <p className="text-sm text-gray-500">
                  Visa,
                  Mastercard,
                  Google Pay
                  via Stripe
                </p>
              </div>
            </label>

            {/* PAYPAL */}
            <label className="flex items-center gap-4 border rounded-2xl p-5 cursor-pointer hover:border-[#ee6d49] transition">
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={
                  paymentMethod ===
                  "paypal"
                }
                onChange={(
                  e,
                ) =>
                  setPaymentMethod(
                    e.target
                      .value,
                  )
                }
              />

              <div>
                <p className="font-semibold">
                  PayPal
                </p>

                <p className="text-sm text-gray-500">
                  Secure
                  checkout via
                  PayPal
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            {/* ITEMS */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cart.map(
                (item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex justify-between border-b pb-4"
                  >
                    <div>
                      <p className="font-semibold">
                        {
                          item.name
                        }
                      </p>

                      <p className="text-sm text-gray-500">
                        {
                          item.color
                        }{" "}
                        •{" "}
                        {
                          item.material
                        }{" "}
                        •{" "}
                        {
                          item.size
                        }
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty:{" "}
                        {
                          item.quantity
                        }
                      </p>
                    </div>

                    <p className="font-semibold">
                      $
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(
                        2,
                      )}
                    </p>
                  </div>
                ),
              )}
            </div>

            {/* TOTALS */}
            <div className="border-t mt-6 pt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-semibold">
                  $
                  {subtotal.toFixed(
                    2,
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">
                  Delivery
                </span>

                <span className="font-semibold">
                  AUD $
                  {deliveryCharge.toFixed(
                    2,
                  )}
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-xl font-bold">
                  Total
                </span>

                <span className="text-3xl font-extrabold text-[#ee6d49]">
                  AUD $
                  {total.toFixed(
                    2,
                  )}
                </span>
              </div>
            </div>

            {/* PAY BUTTON */}
            <button
              onClick={
                handlePayment
              }
              disabled={
                processingPayment
              }
              className={`w-full mt-8 py-4 rounded-2xl font-semibold transition-all ${
                processingPayment
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#ee6d49] hover:bg-[#df6839] text-white"
              }`}
            >
              {processingPayment ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                  Processing...
                </div>
              ) : (
                `Pay Now AUD $${total.toFixed(
                  2,
                )}`
              )}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              Secure payment
              powered by Stripe &
              PayPal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}