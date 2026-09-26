/** INR amounts in paise (integer) to avoid float errors. */
export function rupeesToPaise(rupees) {
  const n = Number(rupees);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.round(n * 100);
}

export function paiseToRupees(paise) {
  const n = Number(paise);
  if (!Number.isFinite(n)) return 0;
  return n / 100;
}

export function formatInrFromPaise(paise) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paiseToRupees(paise));
}

export function formatInrFromRupees(rupees) {
  return formatInrFromPaise(rupeesToPaise(rupees));
}
