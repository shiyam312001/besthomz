import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function CollectionCard({ name, description, image, href = "#", className }) {
  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden rounded-2xl border border-bh-border bg-white shadow-sm transition hover:shadow-md bh-focus-ring",
        className,
      )}
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 85vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-bh-charcoal group-hover:text-bh-green">
          {name}
        </h3>
        {description && <p className="mt-1 text-sm text-bh-muted">{description}</p>}
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-bh-green">
          Explore collection
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
