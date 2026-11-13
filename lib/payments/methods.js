/** Display-only payment methods. Actual charging uses the configured gateway. */
export function getPaymentMethods() {
  const cod = process.env.NEXT_PUBLIC_COD_ENABLED === "true";
  const methods = [
    { id: "razorpay", label: "UPI / Cards / Net banking", enabled: true, provider: "razorpay" },
    { id: "emi", label: "EMI (if offered by your bank via Razorpay)", enabled: true, provider: "razorpay" },
    { id: "cod", label: "Cash on Delivery", enabled: cod, provider: "cod" },
  ];
  return methods.filter((m) => m.enabled);
}

export function isCodEnabled() {
  return process.env.NEXT_PUBLIC_COD_ENABLED === "true";
}
