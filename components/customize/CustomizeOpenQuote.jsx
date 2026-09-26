"use client";

import { ArrowRight } from "lucide-react";
import { useQuote } from "@/components/providers/QuoteProvider";

export function CustomizeOpenQuote({ className, children, variant = "primary" }) {
  const { openQuote } = useQuote();

  if (variant === "link") {
    return (
      <button
        type="button"
        onClick={() => openQuote({ furnitureRequirement: "Custom furniture from Customize page" })}
        className={className}
      >
        {children}
      </button>
    );
  }

  const isSecondary = variant === "secondary";

  return (
    <button
      type="button"
      onClick={() => openQuote({ furnitureRequirement: "Custom furniture from Customize page" })}
      className={className}
    >
      {children}
      {!isSecondary && <ArrowRight className="h-4 w-4" aria-hidden />}
    </button>
  );
}
