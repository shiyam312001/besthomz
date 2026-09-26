import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const COOKIE_NAME = "bh_quote_claim";
const MAX_AGE = 60 * 60 * 24 * 365;

export async function getQuoteClaimToken() {
  const store = await cookies();
  const v = store.get(COOKIE_NAME)?.value;
  return v && /^[0-9a-f-]{36}$/i.test(v) ? v : null;
}

export async function getOrCreateQuoteClaimToken() {
  const existing = await getQuoteClaimToken();
  if (existing) return existing;
  const id = randomUUID();
  const store = await cookies();
  store.set(COOKIE_NAME, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return id;
}

export async function clearQuoteClaimCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
