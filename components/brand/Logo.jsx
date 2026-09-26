import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

export function Logo({ className, showTagline = false, variant = "default" }) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn("inline-flex max-w-[min(100%,14rem)] shrink-0 items-center bh-focus-ring rounded-md sm:max-w-none", className)}
      aria-label={`${site.name} home`}
    >
      <Image
        src={site.logo}
        alt={site.name}
        width={220}
        height={64}
        priority
        className={cn(
          "h-auto w-auto max-w-full object-contain object-left",
          showTagline ? "max-h-11 sm:max-h-12 md:max-h-[3.25rem]" : "max-h-9 sm:max-h-10",
          isLight && "brightness-[1.05] contrast-[1.02]",
        )}
        sizes={showTagline ? "(max-width: 768px) 180px, 220px" : "(max-width: 768px) 140px, 180px"}
      />
    </Link>
  );
}
