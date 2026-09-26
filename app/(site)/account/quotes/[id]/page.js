import { notFound } from "next/navigation";
import { getAuthUser } from "@/lib/auth/server";
import { createClientOptional } from "@/lib/supabase/server";
import { getQuoteById } from "@/lib/services/quotes";
import { QuoteTimeline } from "@/components/account/QuoteTimeline";

export default async function AccountQuoteDetailPage({ params }) {
  const { id } = await params;
  const user = await getAuthUser();
  const supabase = await createClientOptional();
  if (!supabase) notFound();
  const { data: quote } = await getQuoteById(supabase, id, { staff: false });
  if (!quote || quote.user_id !== user.id) notFound();

  const history = (quote.quote_status_history || []).filter((h) => !h.is_internal);

  const nextStep =
    quote.status === "new"
      ? "Our team will contact you shortly."
      : quote.status === "awaiting_customer"
        ? "Please share your feedback when you are ready."
        : "We will keep you updated on progress.";

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">{quote.quote_number}</h1>
      <p className="text-sm text-bh-muted">
        Requested {new Date(quote.created_at).toLocaleString()} · Status:{" "}
        <strong className="text-bh-charcoal">{quote.status.replace(/_/g, " ")}</strong>
      </p>
      <p className="rounded-xl bg-bh-sage/40 px-4 py-3 text-sm text-bh-charcoal">{nextStep}</p>
      <section className="rounded-2xl border border-bh-border bg-white p-5">
        <h2 className="font-semibold">Items</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {(quote.quote_items || []).map((item) => (
            <li key={item.id}>{item.products?.name || item.customer_note || "Item"} × {item.quantity}</li>
          ))}
        </ul>
      </section>
      <QuoteTimeline history={history} status={quote.status} />
    </div>
  );
}
