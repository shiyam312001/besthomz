import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE = "bh_guest_order";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function hashGuestOrderToken(token) {
  return hashToken(token);
}

export async function issueGuestOrderToken() {
  const token = crypto.randomUUID();
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
  });
  return { token, hash: hashToken(token) };
}

export async function getGuestOrderToken() {
  const jar = await cookies();
  return jar.get(COOKIE)?.value || null;
}
