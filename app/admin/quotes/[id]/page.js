import { notFound } from "next/navigation";
import { getStaffSupabase } from "@/lib/auth/staff";
import { getQuoteById } from "@/lib/services/quotes";
import { QuoteAdminActions } from "@/components/admin/QuoteAdminActions";

export default async function AdminQuoteDetailPage({ params }) {
  const { id } = await params;
  const { supabase } = await getStaffSupabase();
  if (!supabase) notFound();
  const { data: quote } = await getQuoteById(supabase, id, { staff: true });
  if (!quote) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">{quote.quote_number}</h1>
        <p className="text-sm text-bh-muted">Status: {quote.status}</p>
      </div>
      <section className="grid gap-4 rounded-2xl border border-bh-border bg-white p-6 md:grid-cols-2">
        <div>
          <h2 className="font-semibold">Customer</h2>
          <p className="mt-2 text-sm">{quote.full_name}</p>
          <p className="text-sm">{quote.phone}</p>
          {quote.email && <p className="text-sm">{quote.email}</p>}
          {quote.location && <p className="text-sm text-bh-muted">{quote.location}</p>}
        </div>
        <div>
          <h2 className="font-semibold">Requirements</h2>
          <p className="mt-2 text-sm text-bh-muted">{quote.furniture_requirement || "—"}</p>
          <p className="text-sm text-bh-muted">{quote.customization_requirement || "—"}</p>
          <p className="text-sm">Room: {quote.room_size || "—"} · Budget: {quote.budget_range || "—"}</p>
        </div>
      </section>
      <section className="rounded-2xl border border-bh-border bg-white p-6">
        <h2 className="font-semibold">Items</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {(quote.quote_items || []).map((item) => (
            <li key={item.id}>
              {item.products?.name || item.customer_note || "Product"} × {item.quantity}
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl border border-bh-border bg-white p-6">
        <h2 className="font-semibold">Timeline</h2>
        <ol className="mt-4 space-y-3 border-l border-bh-border pl-4">
          {(quote.quote_status_history || []).map((h) => (
            <li key={h.id} className="text-sm">
              <span className="font-medium">{h.new_status}</span>
              <span className="text-bh-muted"> · {new Date(h.created_at).toLocaleString()}</span>
              {h.note && !h.is_internal && <p className="text-bh-muted">{h.note}</p>}
            </li>
          ))}
        </ol>
      </section>
      <QuoteAdminActions quote={quote} />
    </div>
  );
}
