const buckets = new Map();

/**
 * In-memory rate limiter for server actions.
 * On multi-instance serverless this is best-effort, not a global lock.
 */
export function rateLimit(key, { limit = 8, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const item = buckets.get(key);
  if (!item || now > item.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (item.count >= limit) {
    return { ok: false, error: "Too many attempts. Please wait and try again." };
  }
  item.count += 1;
  return { ok: true, remaining: limit - item.count };
}

export function clientKey(prefix, extra = "") {
  return `${prefix}:${extra || "anon"}`;
}
