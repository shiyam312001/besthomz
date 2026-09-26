import { notFound } from "next/navigation";
import { getStaffSupabase } from "@/lib/auth/staff";
import { OfferForm } from "@/components/admin/OfferForm";

export default async function AdminEditOfferPage({ params }) {
  const { id } = await params;
  const { supabase } = await getStaffSupabase();
  if (!supabase) notFound();
  const { data: offer } = await supabase.from("offers").select("*").eq("id", id).maybeSingle();
  if (!offer) notFound();
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Edit offer</h1>
      <OfferForm offer={offer} />
    </div>
  );
}
