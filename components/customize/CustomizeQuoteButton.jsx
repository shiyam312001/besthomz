"use client";

import { Button } from "@/components/ui/Button";
import { useQuote } from "@/components/providers/QuoteProvider";

export function CustomizeQuoteButton({ className }) {
  const { openQuote } = useQuote();
  return (
    <Button className={className} onClick={() => openQuote({ furnitureRequirement: "Custom furniture" })}>
      Request a Quote
    </Button>
  );
}
