import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function CategoryCard({ name, image, href = "#", className, size = "default" }) {
  const isCompact = size === "compact";
  const isHome = size === "home";

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col items-center gap-2 bh-focus-ring",
        isCompact && "w-[4.5rem]",
        !isCompact && !isHome && "w-[5.5rem] sm:w-[6.5rem]",
        isHome && "min-w-[4.75rem] shrink-0 sm:min-w-0 sm:flex-1",
        className,
      )}
    >
      <div
        className={cn(
          "relative transition group-hover:scale-[1.03]",
          isCompact
            ? "h-16 w-16"
            : isHome
              ? "h-[4.25rem] w-[4.25rem] overflow-hidden rounded-full bg-white/90 p-2 shadow-[0_8px_22px_rgba(27,61,47,0.08)] sm:h-[4.75rem] sm:w-[4.75rem] lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none"
              : "h-20 w-20 overflow-hidden rounded-xl bg-bh-cream/60 sm:h-24 sm:w-24",
        )}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes={isCompact ? "72px" : "96px"}
          className={cn("object-contain", isHome ? "p-0" : "p-1.5")}
        />
      </div>
      <span className="max-w-full text-center text-[11px] font-medium leading-tight text-bh-text sm:text-xs">
        {name}
      </span>
    </Link>
  );
}