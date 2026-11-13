export function validatePasswordStrength(password) {
  const value = String(password || "");
  if (value.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }
  if (!/[A-Z]/.test(value)) {
    return { ok: false, error: "Password must include an uppercase letter." };
  }
  if (!/[a-z]/.test(value)) {
    return { ok: false, error: "Password must include a lowercase letter." };
  }
  if (!/[0-9]/.test(value)) {
    return { ok: false, error: "Password must include a number." };
  }
  return { ok: true };
}
