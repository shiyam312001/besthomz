import { redirect } from "next/navigation";
import { createClientOptional } from "@/lib/supabase/server";

export async function getAuthUser() {
  const supabase = await createClientOptional();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}

export async function getProfileForUser(userId) {
  const supabase = await createClientOptional();
  if (!supabase || !userId) return null;
  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, phone, email, avatar_url, role, created_at")
    .eq("id", userId)
    .maybeSingle();
  return data;
}

export function isStaffRole(role) {
  return role === "staff" || role === "admin";
}

export async function requireAuth(nextPath = "/account") {
  const user = await getAuthUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return user;
}

export async function requireStaff(nextPath = "/admin/dashboard") {
  const user = await getAuthUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  const profile = await getProfileForUser(user.id);
  if (!profile || !isStaffRole(profile.role)) {
    redirect("/");
  }
  return { user, profile };
}
