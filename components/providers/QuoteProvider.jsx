"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { QuoteDrawer } from "@/components/quote/QuoteDrawer";

const QuoteContext = createContext(null);

export function QuoteProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState({});

  const openQuote = useCallback((ctx = {}) => {
    setContext(ctx);
    setOpen(true);
  }, []);

  const closeQuote = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openQuote, closeQuote }), [openQuote, closeQuote]);

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteDrawer open={open} onClose={closeQuote} context={context} />
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
}
