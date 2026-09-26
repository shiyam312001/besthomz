import { getStaffSupabase } from "@/lib/auth/staff";

export async function fetchDashboardStats() {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return null;

  const [
    products,
    activeProducts,
    newQuotes,
    openQuotes,
    showroom,
    customizations,
    customers,
    contactNew,
  ] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("quote_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .in("status", ["new", "contacted", "requirement_confirmed", "quote_prepared", "awaiting_customer"]),
    supabase.from("showroom_visits").select("id", { count: "exact", head: true }).eq("status", "requested"),
    supabase.from("customizations").select("id", { count: "exact", head: true }).neq("status", "closed"),
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "customer"),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "new"),
  ]);

  const recentQuotes = await supabase
    .from("quote_requests")
    .select("id, quote_number, full_name, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const recentContact = await supabase
    .from("contact_messages")
    .select("id, name, email, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const recentShowroom = await supabase
    .from("showroom_visits")
    .select("id, full_name, preferred_date, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    counts: {
      products: products.count ?? 0,
      activeProducts: activeProducts.count ?? 0,
      newQuotes: newQuotes.count ?? 0,
      openQuotes: openQuotes.count ?? 0,
      showroom: showroom.count ?? 0,
      customizations: customizations.count ?? 0,
      customers: customers.count ?? 0,
      contactNew: contactNew.count ?? 0,
    },
    recentQuotes: recentQuotes.data ?? [],
    recentContact: recentContact.data ?? [],
    recentShowroom: recentShowroom.data ?? [],
  };
}
