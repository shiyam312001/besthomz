"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthUser } from "@/lib/auth/server";
import { getQuoteClaimToken, clearQuoteClaimCookie } from "@/lib/session/quote-claim";

/**
 * Attach guest quotes to the logged-in user when httpOnly claim cookie matches guest_claim_token.
 * Never accepts quote IDs from the client.
 */
export async function claimGuestQuotesForUser() {
  const user = await getAuthUser();
  const token = await getQuoteClaimToken();
  if (!user || !token) return { ok: true, claimed: 0 };

  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("quote_requests")
      .update({ user_id: user.id, guest_claim_token: null })
      .eq("guest_claim_token", token)
      .is("user_id", null)
      .select("id");

    if (error) return { ok: false, error: error.message };
    await clearQuoteClaimCookie();
    return { ok: true, claimed: data?.length ?? 0 };
  } catch {
    return { ok: true, claimed: 0 };
  }
}
