import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function RoomCard({ name, description, image, href = "#", className }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-bh-border bg-white shadow-sm transition hover:shadow-md bh-focus-ring",
        className,
      )}
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 70vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="font-display text-xl font-semibold">{name}</h3>
          {description && <p className="mt-1 text-sm text-white/85">{description}</p>}
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
            Explore
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
