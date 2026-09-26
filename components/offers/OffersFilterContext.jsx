"use client";

import { createContext, useContext, useMemo, useState } from "react";

const OffersFilterContext = createContext(null);

export function OffersFilterProvider({ children }) {
  const [filter, setFilter] = useState("all");
  const value = useMemo(() => ({ filter, setFilter }), [filter]);
  return <OffersFilterContext.Provider value={value}>{children}</OffersFilterContext.Provider>;
}

export function useOffersFilter() {
  const ctx = useContext(OffersFilterContext);
  if (!ctx) throw new Error("useOffersFilter must be used within OffersFilterProvider");
  return ctx;
}
