"use client";

import { Button } from "@/components/ui/Button";
import { useQuote } from "@/components/providers/QuoteProvider";

export function HomeQuoteActions({ primary }) {
  const { openQuote } = useQuote();
  if (primary) {
    return (
      <Button onClick={() => openQuote()} className="bg-bh-green text-white">
        Get a Quote
      </Button>
    );
  }
  return null;
}
