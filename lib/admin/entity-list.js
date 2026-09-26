import { getStaffSupabase } from "@/lib/auth/staff";

export async function staffSelect(table, select = "*", order = "updated_at", ascending = false) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from(table).select(select).order(order, { ascending }).limit(300);
  return data ?? [];
}
