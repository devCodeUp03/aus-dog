import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (

      <div className="min-h-screen bg-gray-50 py-14 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-10 text-center">
          <h1 className="text-3xl font-extrabold">Payment submitted</h1>
          <p className="text-gray-600 mt-3">
            If your payment succeeds, you’ll receive an order confirmation email shortly.
        </p>
    <br />

      <Link href="/" className="text-blue-500 hover:text-blue-700 text-base pt-10">
        Go To Home
      </Link>
        
      </div>

    </div>
      
  )
}

