import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export function AdminShell({ children }) {
  return (
    <div className="flex min-h-[100dvh] bg-bh-cream">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />
        <main className="bh-ui flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
