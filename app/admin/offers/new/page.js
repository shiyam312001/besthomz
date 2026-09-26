import { OfferForm } from "@/components/admin/OfferForm";

export default function AdminNewOfferPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">New offer</h1>
      <OfferForm />
    </div>
  );
}
