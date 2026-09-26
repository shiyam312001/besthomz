import { FaqForm } from "@/components/admin/FaqForm";

export default function AdminNewFaqPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">New FAQ</h1>
      <FaqForm />
    </div>
  );
}
