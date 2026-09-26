import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const COOKIE_NAME = "bh_cart_session";
const MAX_AGE = 60 * 60 * 24 * 90; // 90 days

/** HttpOnly guest cart session id (server-only). */
export async function getOrCreateCartSessionId() {
  const store = await cookies();
  const existing = store.get(COOKIE_NAME)?.value;
  if (existing && /^[0-9a-f-]{36}$/i.test(existing)) {
    return existing;
  }
  const id = randomUUID();
  store.set(COOKIE_NAME, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return id;
}

export async function getCartSessionId() {
  const store = await cookies();
  const v = store.get(COOKIE_NAME)?.value;
  return v && /^[0-9a-f-]{36}$/i.test(v) ? v : null;
}

export async function clearCartSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
