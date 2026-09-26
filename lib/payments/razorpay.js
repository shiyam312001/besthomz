import crypto from "crypto";

function getCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return { keyId, keySecret };
}

export function isRazorpayConfigured() {
  return Boolean(getCredentials());
}

/** Create Razorpay order via REST API (no extra dependency). */
export async function createRazorpayOrder({ amountPaise, currency = "INR", receipt, notes = {} }) {
  const creds = getCredentials();
  if (!creds) return { ok: false, error: "Payment gateway is not configured." };

  const body = {
    amount: amountPaise,
    currency,
    receipt: receipt?.slice(0, 40),
    notes,
  };

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString("base64")}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    return { ok: false, error: data?.error?.description || "Could not create payment order." };
  }
  return { ok: true, order: data };
}

export function verifyPaymentSignature({ orderId, paymentId, signature }) {
  const creds = getCredentials();
  if (!creds || !orderId || !paymentId || !signature) return false;
  const payload = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac("sha256", creds.keySecret).update(payload).digest("hex");
  return expected === signature;
}

export function verifyWebhookSignature(rawBody, signature) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return expected === signature;
}

export function getPublicKeyId() {
  return getCredentials()?.keyId || "";
}
