import Link from "next/link";
import { getStaffSupabase } from "@/lib/auth/staff";
import { AdminTable } from "@/components/admin/AdminTable";

export async function renderAdminList({ title, table, emptyMessage, newHref }) {
  const { supabase } = await getStaffSupabase();
  const { data: rows } = await supabase?.from(table).select("*").order("updated_at", { ascending: false }).limit(200);

  return { rows: rows ?? [], title, emptyMessage, newHref };
}

export function AdminListPage({ title, rows, columns, emptyMessage, newHref }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">{title}</h1>
        {newHref && (
          <Link href={newHref} className="rounded-full bg-bh-green px-4 py-2 text-sm font-medium text-white">
            Add new
          </Link>
        )}
      </div>
      <AdminTable rows={rows} columns={columns} emptyMessage={emptyMessage} />
    </div>
  );
}
