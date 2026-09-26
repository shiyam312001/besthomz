export async function createQuoteRequest(supabase, payload) {
  return supabase.from("quote_requests").insert(payload).select("*").single();
}

export async function getQuotesForUser(supabase, userId) {
  return supabase
    .from("quote_requests")
    .select("id, quote_number, status, created_at, updated_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

const CUSTOMER_QUOTE_FIELDS =
  "id, quote_number, user_id, full_name, phone, email, location, furniture_requirement, customization_requirement, room_size, budget_range, preferred_contact_method, message, status, created_at, updated_at";

export async function getQuoteById(supabase, quoteId, { staff = false } = {}) {
  const fields = staff
    ? `*, internal_notes, quote_items(*, products(id, slug, name), product_variants(id, name)), quote_status_history(*)`
    : `${CUSTOMER_QUOTE_FIELDS}, quote_items(*, products(id, slug, name), product_variants(id, name)), quote_status_history(id, old_status, new_status, created_at, is_internal, note)`;

  return supabase.from("quote_requests").select(fields).eq("id", quoteId).maybeSingle();
}

export async function updateQuoteStatus(supabase, quoteId, status) {
  return supabase.from("quote_requests").update({ status }).eq("id", quoteId).select("*").single();
}

export async function updateQuoteInternalNotes(supabase, quoteId, internalNotes) {
  return supabase.from("quote_requests").update({ internal_notes: internalNotes }).eq("id", quoteId);
}

export async function addQuoteItems(supabase, quoteId, items) {
  const rows = items.map((item) => ({ ...item, quote_id: quoteId }));
  return supabase.from("quote_items").insert(rows).select("*");
}
