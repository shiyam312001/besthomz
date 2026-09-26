import { requireStaff } from "@/lib/auth/server";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }) {
  await requireStaff("/admin/dashboard");
  return <AdminShell>{children}</AdminShell>;
}
