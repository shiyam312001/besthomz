const STEPS = [
  "new",
  "contacted",
  "requirement_confirmed",
  "quote_prepared",
  "awaiting_customer",
  "approved",
];

const LABELS = {
  new: "Quote requested",
  contacted: "We contacted you",
  requirement_confirmed: "Requirement confirmed",
  quote_prepared: "Quote prepared",
  awaiting_customer: "Awaiting your response",
  approved: "Approved",
  rejected: "Closed",
  converted_to_order: "Converted to order",
  closed: "Closed",
};

export function QuoteTimeline({ history, status }) {
  const reached = new Set(history.map((h) => h.new_status));
  reached.add(status);

  return (
    <section className="rounded-2xl border border-bh-border bg-bh-cream/40 p-5">
      <h2 className="font-semibold">Progress</h2>
      <ol className="mt-4 space-y-4">
        {STEPS.map((step) => {
          const done = reached.has(step) || STEPS.indexOf(step) <= STEPS.indexOf(status);
          return (
            <li key={step} className="flex gap-3 text-sm">
              <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${done ? "bg-bh-green" : "bg-bh-border"}`} />
              <div>
                <p className={done ? "font-medium text-bh-charcoal" : "text-bh-muted"}>{LABELS[step] || step}</p>
              </div>
            </li>
          );
        })}
        {(status === "rejected" || status === "closed") && (
          <li className="text-sm text-bh-muted">{LABELS[status]}</li>
        )}
      </ol>
    </section>
  );
}
