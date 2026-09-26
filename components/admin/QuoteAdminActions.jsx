"use client";

import { useTransition } from "react";
import {
  adminUpdateQuoteStatus,
  adminSaveQuoteNotes,
  adminSetQuoteApprovedTotal,
  adminConvertQuoteToOrder,
} from "@/app/actions/admin/quotes";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { site } from "@/config/site";
import { whatsAppHref } from "@/lib/utils/whatsapp";

const ACTIONS = [
  { status: "contacted", label: "Mark contacted" },
  { status: "requirement_confirmed", label: "Confirm requirement" },
  { status: "quote_prepared", label: "Prepare quote" },
  { status: "awaiting_customer", label: "Await customer" },
  { status: "approved", label: "Approve" },
  { status: "rejected", label: "Reject" },
  { status: "closed", label: "Close" },
];

export function QuoteAdminActions({ quote }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((a) => (
          <Button
            key={a.status}
            size="sm"
            variant={quote.status === a.status ? "primary" : "outline"}
            loading={pending}
            onClick={() =>
              startTransition(async () => {
                await adminUpdateQuoteStatus(quote.id, a.status);
              })
            }
          >
            {a.label}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {quote.phone && (
          <Button href={`tel:${quote.phone.replace(/\s/g, "")}`} variant="outline" size="sm">
            Call customer
          </Button>
        )}
        {quote.email && (
          <Button href={`mailto:${quote.email}`} variant="outline" size="sm">Email customer</Button>
        )}
        {quote.phone && (
          <Button
            href={whatsAppHref(`Hello ${quote.full_name}, regarding your Best Homz quote ${quote.quote_number}.`)}
            variant="outline"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </Button>
        )}
      </div>
      <form
        className="rounded-2xl border border-bh-border bg-white/80 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(async () => {
            await adminSetQuoteApprovedTotal(quote.id, new FormData(e.currentTarget));
          });
        }}
      >
        <label className="text-sm font-medium">Approved total (INR)</label>
        <input
          name="approved_total"
          type="number"
          step="0.01"
          min="0"
          className="mt-2 w-full rounded-xl border border-bh-border px-3 py-2 text-sm"
          defaultValue={quote.approved_total ?? ""}
        />
        <Button type="submit" size="sm" className="mt-2" loading={pending}>Save approved total</Button>
      </form>
      {(quote.status === "approved" || quote.status === "converted_to_order") && (
        <div className="flex flex-wrap gap-2">
          {quote.status === "approved" && (
            <Button
              loading={pending}
              onClick={() =>
                startTransition(async () => {
                  const res = await adminConvertQuoteToOrder(quote.id);
                  if (res.ok && res.orderId) {
                    window.location.href = `/admin/orders/${res.orderId}`;
                  }
                })
              }
            >
              Convert to order
            </Button>
          )}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const notes = new FormData(e.currentTarget).get("notes")?.toString();
          startTransition(async () => {
            await adminSaveQuoteNotes(quote.id, notes);
          });
        }}
      >
        <label className="text-sm font-medium">Internal notes (staff only)</label>
        <Textarea name="notes" rows={4} className="mt-2" defaultValue={quote.internal_notes || ""} />
        <Button type="submit" size="sm" className="mt-2" loading={pending}>Save notes</Button>
      </form>
      <p className="text-xs text-bh-muted">Business line: {site.phone}</p>
    </div>
  );
}
