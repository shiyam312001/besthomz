import { notFound } from "next/navigation";
import { getStaffSupabase } from "@/lib/auth/staff";
import { FaqForm } from "@/components/admin/FaqForm";

export default async function AdminEditFaqPage({ params }) {
  const { id } = await params;
  const { supabase } = await getStaffSupabase();
  if (!supabase) notFound();
  const { data: faq } = await supabase.from("faqs").select("*").eq("id", id).maybeSingle();
  if (!faq) notFound();
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Edit FAQ</h1>
      <FaqForm faq={faq} />
    </div>
  );
}
