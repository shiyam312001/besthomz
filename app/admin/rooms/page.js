import Link from "next/link";
import { staffSelect } from "@/lib/admin/entity-list";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminRoomsPage() {
  const rows = await staffSelect("rooms", "id, name, slug, is_active, sort_order");
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Rooms</h1>
        <Link href="/admin/rooms/new" className="rounded-full bg-bh-green px-4 py-2 text-sm text-white">Add room</Link>
      </div>
      <AdminTable rows={rows} emptyMessage="No rooms." columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "is_active", label: "Active", render: (r) => (r.is_active ? "Yes" : "No") },
        { key: "id", label: "", render: (r) => <Link href={`/admin/rooms/${r.id}/edit`} className="text-bh-green underline">Edit</Link> },
      ]} />
    </div>
  );
}
