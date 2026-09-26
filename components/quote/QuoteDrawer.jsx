"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { QuoteForm } from "@/components/quote/QuoteForm";

export function QuoteDrawer({ open, onClose, context }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] md:flex md:justify-end" role="dialog" aria-modal="true" aria-label="Request a quote">
      <button
        type="button"
        className="absolute inset-0 bg-bh-charcoal/30 backdrop-blur-[3px]"
        onClick={onClose}
        aria-label="Close"
      />
      <div
        className="relative flex h-full w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bh-glass-panel md:h-auto md:max-h-[100dvh] md:min-h-full md:rounded-none md:rounded-l-3xl md:shadow-[0_0_80px_-8px_rgba(27,61,47,0.18)]"
      >
        <div className="shrink-0 px-5 pb-4 pt-5 md:px-7 md:pb-5 md:pt-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-bh-charcoal md:text-2xl">Get a Quote</h2>
              <p className="mt-1 max-w-sm text-xs leading-relaxed text-bh-muted md:text-sm">
                Share your requirements and our team will respond with options and personalised pricing.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-bh-charcoal bh-glass-subtle transition hover:shadow-[0_8px_24px_rgba(27,61,47,0.1)] bh-focus-ring"
              aria-label="Close quote form"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:px-7 md:pb-8">
          <QuoteForm key={JSON.stringify(context)} context={context} onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}
