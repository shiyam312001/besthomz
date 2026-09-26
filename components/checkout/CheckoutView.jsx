"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { initiateCheckout, verifyCheckoutPayment, markPaymentFailed } from "@/app/actions/checkout";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatInrFromPaise } from "@/lib/commerce/money";
import { SHOW_PRICES } from "@/config/pricing";

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

export function CheckoutView({ preview, userEmail }) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const pricing = preview?.pricing;

  if (!preview?.ok) {
    return <p className="text-sm text-red-600">{preview?.error || "Checkout unavailable."}</p>;
  }

  if (!preview.paymentsConfigured) {
    return (
      <GlassCard className="p-6 text-sm text-bh-muted">
        Payment gateway is not configured. You can still request a quote for your cart.
      </GlassCard>
    );
  }

  return (
    <form
      className="grid gap-8 lg:grid-cols-[1fr_360px]"
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const init = await initiateCheckout(fd);
          if (!init.ok) {
            setError(init.error);
            if (init.authRequired) router.push("/login?next=/checkout");
            return;
          }
          const loaded = await loadRazorpayScript();
          if (!loaded || !window.Razorpay) {
            setError("Could not load payment. Please try again.");
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
              const verified = await verifyCheckoutPayment(vfd);
              if (verified.ok) {
                router.push(`/order/success?order=${init.orderId}`);
              } else {
                setError(verified.error || "Verification failed.");
                router.push(`/order/payment-failed?order=${init.orderId}`);
              }
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
        });
      }}
    >
      <div className="space-y-6">
        <GlassCard className="space-y-4 p-6">
          <h2 className="font-display text-xl font-semibold">Contact</h2>
          <FormField label="Full name" htmlFor="full_name" required><Input id="full_name" name="full_name" required /></FormField>
          <FormField label="Email" htmlFor="email"><Input id="email" name="email" type="email" defaultValue={userEmail || ""} /></FormField>
          <FormField label="Phone" htmlFor="phone" required><Input id="phone" name="phone" type="tel" required /></FormField>
        </GlassCard>
        <GlassCard className="space-y-4 p-6">
          <h2 className="font-display text-xl font-semibold">Billing address</h2>
          <FormField label="Address" htmlFor="billing_line1" required><Input id="billing_line1" name="billing_line1" required /></FormField>
          <FormField label="City" htmlFor="billing_city" required><Input id="billing_city" name="billing_city" required /></FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="State" htmlFor="billing_state"><Input id="billing_state" name="billing_state" /></FormField>
            <FormField label="Pincode" htmlFor="billing_pincode" required><Input id="billing_pincode" name="billing_pincode" required /></FormField>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="same_as_billing" defaultChecked className="rounded border-bh-border" />
            Shipping same as billing
          </label>
        </GlassCard>
        <GlassCard className="space-y-4 p-6">
          <h2 className="font-display text-xl font-semibold">Shipping address</h2>
          <p className="text-xs text-bh-muted">Uncheck “same as billing” above to enter a different address.</p>
          <FormField label="Address" htmlFor="shipping_line1"><Input id="shipping_line1" name="shipping_line1" /></FormField>
          <FormField label="City" htmlFor="shipping_city"><Input id="shipping_city" name="shipping_city" /></FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="State" htmlFor="shipping_state"><Input id="shipping_state" name="shipping_state" /></FormField>
            <FormField label="Pincode" htmlFor="shipping_pincode"><Input id="shipping_pincode" name="shipping_pincode" /></FormField>
          </div>
        </GlassCard>
        <FormField label="Order notes" htmlFor="customer_notes">
          <Textarea id="customer_notes" name="customer_notes" rows={2} />
        </FormField>
      </div>
      <aside>
        <GlassCard className="sticky top-24 space-y-4 p-6">
          <h2 className="font-display text-xl font-semibold">Order summary</h2>
          {SHOW_PRICES && pricing && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-bh-muted">Subtotal</span>
                <span>{formatInrFromPaise(pricing.subtotalPaise)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-bh-muted">Shipping</span>
                <span>{formatInrFromPaise(pricing.shippingPaise)}</span>
              </div>
              <div className="flex justify-between border-t border-bh-border pt-3 font-semibold">
                <span>Total</span>
                <span>{formatInrFromPaise(pricing.totalPaise)}</span>
              </div>
            </>
          )}
          {!SHOW_PRICES && pricing && (
            <p className="text-sm text-bh-muted">Total due at payment: {formatInrFromPaise(pricing.totalPaise)}</p>
          )}
          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
          <Button type="submit" className="w-full" loading={pending}>Pay securely</Button>
          <p className="text-center text-xs text-bh-muted">Secured by Razorpay. Quote requests remain available anytime.</p>
        </GlassCard>
      </aside>
    </form>
  );
}
