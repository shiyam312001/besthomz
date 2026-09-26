import { staffSelect } from "@/lib/admin/entity-list";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminContactActions } from "@/components/admin/AdminContactActions";

export default async function AdminContactMessagesPage() {
  const rows = await staffSelect("contact_messages", "id, name, email, phone, subject, status, created_at");
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Contact messages</h1>
      <AdminTable rows={rows} emptyMessage="No messages." columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "subject", label: "Subject" },
        { key: "status", label: "Status" },
        { key: "created_at", label: "Date", render: (r) => new Date(r.created_at).toLocaleDateString() },
        { key: "id", label: "", render: (r) => <AdminContactActions id={r.id} status={r.status} /> },
      ]} />
    </div>
  );
}
