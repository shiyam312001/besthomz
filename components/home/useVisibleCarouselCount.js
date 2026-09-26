"use client";

import { useEffect, useState } from "react";

/** Slides visible in carousel: 1 phone, 2 tablet, 3 desktop (lg+). */
export function useVisibleCarouselCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    function update() {
      if (window.matchMedia("(min-width: 1024px)").matches) setCount(3);
      else if (window.matchMedia("(min-width: 768px)").matches) setCount(2);
      else setCount(1);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}
