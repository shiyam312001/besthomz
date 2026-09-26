"use client";

import { useEffect } from "react";
import { pushRecentProduct } from "@/lib/commerce/client-storage";

export function RecordRecentlyViewed({ product }) {
  useEffect(() => {
    if (product) pushRecentProduct(product);
  }, [product]);
  return null;
}
