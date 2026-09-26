import Image from "next/image";
import { cn } from "@/lib/cn";

export function HomeTrustBadge({ icon, label, variant = "default" }) {
  const onHero = variant === "hero";

  return (
    <div className="flex max-w-[6rem] flex-col items-center gap-2.5 text-center md:max-w-[6.75rem] md:gap-3 lg:max-w-[7.25rem]">
      <span
        className={cn(
          "bh-icon-badge-trust",
          onHero && "border border-white/35 bg-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
        )}
      >
        <Image
          src={icon}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 object-contain md:h-8 md:w-8"
        />
      </span>
      <p
        className={cn(
          "text-xs font-medium leading-[1.35] md:text-xs",
          onHero ? "text-white" : "text-bh-text",
        )}
      >
        {label}
      </p>
    </div>
  );
}
