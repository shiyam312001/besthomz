/**
 * EMI copy. Do not invent interest rates or zero-cost EMI.
 * Plans appear in Razorpay Checkout only when the merchant account enables them.
 */
export function getEmiDisplayInfo() {
  const providerConfigured = Boolean(process.env.RAZORPAY_KEY_ID);
  return {
    provider: "razorpay",
    configured: providerConfigured,
    plans: [],
    disclaimer:
      "EMI, Pay Later, and bank offers are shown only by the payment provider at checkout if your card or UPI app is eligible. Best Homz does not advertise zero-cost EMI unless the provider confirms it for a transaction.",
  };
}
