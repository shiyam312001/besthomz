import { createClientOptional } from "@/lib/supabase/server";
import { getAuthUser, getProfileForUser, isStaffRole } from "@/lib/auth/server";

export async function getStaffSupabase() {
  const user = await getAuthUser();
  const supabase = await createClientOptional();
  if (!user || !supabase) return { supabase: null, user: null, profile: null };
  const profile = await getProfileForUser(user.id);
  if (!isStaffRole(profile?.role)) return { supabase: null, user, profile };
  return { supabase, user, profile };
}
