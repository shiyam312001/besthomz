import { staffSelect } from "@/lib/admin/entity-list";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminShowroomActions } from "@/components/admin/AdminShowroomActions";

export default async function AdminShowroomPage() {
  const rows = await staffSelect("showroom_visits", "id, full_name, phone, preferred_date, preferred_time, status, requirement");
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Showroom visits</h1>
      <AdminTable
        rows={rows}
        emptyMessage="No showroom requests."
        columns={[
          { key: "full_name", label: "Customer" },
          { key: "preferred_date", label: "Date" },
          { key: "preferred_time", label: "Time" },
          { key: "status", label: "Status" },
          { key: "id", label: "Actions", render: (r) => <AdminShowroomActions id={r.id} status={r.status} /> },
        ]}
      />
    </div>
  );
}
