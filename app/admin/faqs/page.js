import Link from "next/link";
import { staffSelect } from "@/lib/admin/entity-list";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminFaqActions } from "@/components/admin/AdminFaqActions";

export default async function AdminFaqsPage() {
  const rows = await staffSelect("faqs", "id, question, category, is_active, sort_order");
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">FAQs</h1>
        <Link href="/admin/faqs/new" className="rounded-full bg-bh-green px-4 py-2 text-sm text-white">Add FAQ</Link>
      </div>
      <AdminTable rows={rows} emptyMessage="No FAQs." columns={[
        { key: "question", label: "Question" },
        { key: "category", label: "Category" },
        { key: "is_active", label: "Active", render: (r) => (r.is_active ? "Yes" : "No") },
        { key: "id", label: "", render: (r) => <AdminFaqActions id={r.id} /> },
      ]} />
    </div>
  );
}
