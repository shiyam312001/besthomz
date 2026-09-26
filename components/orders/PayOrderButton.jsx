"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { initiateOrderPayment, verifyOrderPayment } from "@/app/actions/orders";
import { markPaymentFailed } from "@/app/actions/checkout";
import { Button } from "@/components/ui/Button";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function PayOrderButton({ orderId }) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div>
      {error && <p className="mb-2 text-sm text-red-600" role="alert">{error}</p>}
      <Button
        loading={pending}
        onClick={() =>
          startTransition(async () => {
            setError("");
            const init = await initiateOrderPayment(orderId);
            if (!init.ok) {
              setError(init.error);
              return;
            }
            const loaded = await loadRazorpayScript();
            if (!loaded || !window.Razorpay) {
              setError("Could not load payment.");
              return;
            }
            const rzp = new window.Razorpay({
              key: init.keyId,
              amount: init.amountPaise,
              currency: init.currency,
              name: "Best Homz",
              description: `Order ${init.orderNumber}`,
              order_id: init.razorpayOrderId,
              prefill: init.customer,
              handler: async (response) => {
                const vfd = new FormData();
                vfd.set("order_id", init.orderId);
                vfd.set("payment_id", init.paymentId);
                vfd.set("razorpay_order_id", response.razorpay_order_id);
                vfd.set("razorpay_payment_id", response.razorpay_payment_id);
                vfd.set("razorpay_signature", response.razorpay_signature);
                const verified = await verifyOrderPayment(vfd);
                if (verified.ok) router.push(`/order/success?order=${init.orderId}`);
                else router.push(`/order/payment-failed?order=${init.orderId}`);
              },
              modal: {
                ondismiss: async () => {
                  const ffd = new FormData();
                  ffd.set("order_id", init.orderId);
                  ffd.set("payment_id", init.paymentId);
                  await markPaymentFailed(ffd);
                  setError("Payment cancelled.");
                },
              },
            });
            rzp.open();
          })
        }
      >
        Pay now
      </Button>
    </div>
  );
}
