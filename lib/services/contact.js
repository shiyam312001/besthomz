export async function createContactMessage(supabase, payload) {
  return supabase.from("contact_messages").insert(payload).select("*").single();
}

export async function subscribeNewsletter(supabase, { email, name }) {
  return supabase
    .from("newsletter_subscribers")
    .upsert({ email, name, is_active: true }, { onConflict: "email" })
    .select("*")
    .single();
}
