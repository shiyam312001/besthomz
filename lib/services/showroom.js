export async function createShowroomVisit(supabase, payload) {
  return supabase.from("showroom_visits").insert(payload).select("*").single();
}

export async function getShowroomVisitsForUser(supabase, userId) {
  return supabase
    .from("showroom_visits")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}
