"use client";

import { useState, useEffect } from "react";

/**
 * Returns true when the viewport is in portrait orientation and the width
 * is in the phone/tablet range (e.g. phone or iPad in vertical orientation).
 * Uses max-width: 1024px so iPad portrait is included.
 */
export function usePortraitMobile(maxWidthPx = 1024): boolean {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const portraitQuery = window.matchMedia("(orientation: portrait)");
    const narrowQuery = window.matchMedia(`(max-width: ${maxWidthPx}px)`);

    const update = () => {
      setIsPortraitMobile(portraitQuery.matches && narrowQuery.matches);
    };

    update();
    portraitQuery.addEventListener("change", update);
    narrowQuery.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      portraitQuery.removeEventListener("change", update);
      narrowQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [maxWidthPx]);

  return isPortraitMobile;
}
