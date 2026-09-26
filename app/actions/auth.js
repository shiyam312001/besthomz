"use server";

import { redirect } from "next/navigation";
import { createClientOptional } from "@/lib/supabase/server";
import { mergeGuestCartOnLogin } from "@/app/actions/cart";
import { mergeGuestWishlist } from "@/app/actions/wishlist";
import { claimGuestQuotesForUser } from "@/app/actions/guest-quotes";

export async function signInWithPassword(formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const next = formData.get("next")?.toString() || "/account";

  if (!email || !password) {
    return { ok: false, error: "Email and password are required." };
  }

  const supabase = await createClientOptional();
  if (!supabase) return { ok: false, error: "Auth is not configured." };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };

  await mergeGuestCartOnLogin();
  const guestSlugs = formData.get("guest_wishlist")?.toString();
  if (guestSlugs) {
    try {
      const slugs = JSON.parse(guestSlugs);
      await mergeGuestWishlist(slugs);
    } catch {
      /* ignore */
    }
  }
  await claimGuestQuotesForUser();

  redirect(next.startsWith("/") ? next : "/account");
}

export async function signUp(formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const next = formData.get("next")?.toString() || "/account";

  if (!email || !password || !fullName) {
    return { ok: false, error: "Name, email and password are required." };
  }

  const supabase = await createClientOptional();
  if (!supabase) return { ok: false, error: "Auth is not configured." };

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, phone } },
  });
  if (error) return { ok: false, error: error.message };

  if (data.user && phone) {
    await supabase.from("profiles").update({ phone, full_name: fullName }).eq("id", data.user.id);
  }

  await mergeGuestCartOnLogin();
  const guestSlugs = formData.get("guest_wishlist")?.toString();
  if (guestSlugs) {
    try {
      await mergeGuestWishlist(JSON.parse(guestSlugs));
    } catch {
      /* ignore */
    }
  }
  await claimGuestQuotesForUser();
  redirect(next.startsWith("/") ? next : "/account");
}

export async function signOut() {
  const supabase = await createClientOptional();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}

export async function requestPasswordReset(formData) {
  const email = formData.get("email")?.toString().trim();
  if (!email) return { ok: false, error: "Email is required." };

  const supabase = await createClientOptional();
  if (!supabase) return { ok: false, error: "Auth is not configured." };

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function updatePassword(formData) {
  const password = formData.get("password")?.toString();
  if (!password || password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }
  const supabase = await createClientOptional();
  if (!supabase) return { ok: false, error: "Auth is not configured." };
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
