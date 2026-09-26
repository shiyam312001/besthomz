/** Email hooks — no provider required in Phase 9. */

export async function notifyOrderConfirmed(order) {
  if (!process.env.EMAIL_PROVIDER) {
    console.info("[email stub] order confirmed", order?.order_number || order?.id);
    return;
  }
}

export async function notifyPaymentConfirmed(order, payment) {
  if (!process.env.EMAIL_PROVIDER) {
    console.info("[email stub] payment confirmed", order?.order_number, payment?.id);
    return;
  }
}

export async function notifyPaymentFailed(order) {
  if (!process.env.EMAIL_PROVIDER) {
    console.info("[email stub] payment failed", order?.order_number);
    return;
  }
}

export async function notifyOrderShipped(order) {
  if (!process.env.EMAIL_PROVIDER) {
    console.info("[email stub] order shipped", order?.order_number);
    return;
  }
}
