import { Suspense } from "react";
import CheckoutSuccessClient from "./CheckoutSuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessClient />
    </Suspense>
  );
}