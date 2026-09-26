"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

function initialsFromName(name) {
  const parts = name.replace(/\./g, " ").split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

const SIZES = {
  sm: { box: "h-9 w-9", text: "text-[11px]", ring: "ring-2" },
  md: { box: "h-11 w-11", text: "text-xs", ring: "ring-2" },
  lg: { box: "h-14 w-14", text: "text-sm", ring: "ring-[3px]" },
};

export function CustomerAvatar({ name, src, accent = "var(--bh-green)", size = "md", className }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = src && !imgFailed;
  const initials = initialsFromName(name);
  const sz = SIZES[size] || SIZES.md;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-bh-sage shadow-[0_6px_16px_rgba(27,61,47,0.12)]",
        sz.box,
        sz.ring,
        "ring-white",
        className,
      )}
      style={!showImage ? { background: `linear-gradient(145deg, ${accent} 0%, #152a22 100%)` } : undefined}
    >
      {showImage ? (
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes={size === "lg" ? "56px" : "44px"}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className={cn("font-semibold text-white", sz.text)} aria-hidden>
          {initials}
        </span>
      )}
    </span>
  );
}
