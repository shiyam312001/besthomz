import Image from "next/image";
import { BedDouble, Headset, Layers3, MessageCircle, PackageCheck, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { productEnquiryMessage, whatsAppHref } from "@/lib/utils/whatsapp";
import { isMattressCategory } from "@/components/product/product-pdp-data";
import { getProductCategoryDetails } from "@/lib/utils/product-category-details";
import { cn } from "@/lib/cn";

const MATTRESS_BENEFITS = [
  { icon: BedDouble, title: "Superior Comfort", description: "Relaxed and restful sleep" },
  { icon: Layers3, title: "Balanced Support", description: "Helps maintain proper posture" },
  { icon: ShieldCheck, title: "Long-Lasting", description: "Durable build for everyday use" },
];

export function ProductCategoryDetails({ product, category }) {
  const { title, rows, needsConfirmation } = getProductCategoryDetails(product, category);

  return (
    <section className="mt-4 rounded-2xl border border-bh-border bg-white/80 p-4 shadow-[0_6px_18px_rgba(27,61,47,0.06)]">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bh-sage-muted text-bh-green">
          <Layers3 className="h-5 w-5" strokeWidth={1.8} aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-bh-charcoal">{title}</h2>
          <p className="mt-0.5 text-[11px] text-bh-muted">
            Product information tailored to this category
          </p>
        </div>
      </div>

      {rows.length > 0 && (
        <dl className="mt-3 grid grid-cols-2 gap-2">
          {rows.map((row) => (
            <div key={row.label} className="min-w-0 rounded-xl bg-bh-sage-muted/45 px-3 py-2">
              <dt className="text-[9px] font-semibold uppercase tracking-wide text-bh-muted">
                {row.label}
              </dt>
              <dd className="mt-1 break-words text-xs font-semibold text-bh-charcoal">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {needsConfirmation && (
        <p className="mt-3 text-xs leading-relaxed text-bh-muted">
          Confirm detailed dimensions, materials and availability with our showroom.
        </p>
      )}
    </section>
  );
}

export function ProductCategoryHighlights({ product, category }) {
  if (!isMattressCategory(category)) return null;

  const bannerImage =
    product.product_images?.find((image) => image.sort_order === 2)?.image_url ||
    product.product_images?.[0]?.image_url;

  return (
    <div className="mt-4 space-y-2.5">
      <section className="relative isolate min-h-[7rem] overflow-hidden rounded-2xl border border-white/60 bg-bh-cream shadow-[0_8px_24px_rgba(27,61,47,0.08)]">
        {bannerImage && (
          <Image
            src={bannerImage}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-bh-warm-white via-bh-warm-white/95 to-bh-warm-white/35" />
        <div className="relative max-w-[29rem] px-5 py-3 sm:px-6">
          <h2 className="border-l-2 border-bh-green pl-3 font-sans text-lg font-bold leading-tight text-bh-green md:text-xl">
            Comfort, Support and Long-Lasting Durability
          </h2>
          <p className="mt-1 pl-3 text-xs leading-tight text-bh-muted sm:text-xs">
            Designed to bring a comfortable, supportive feel to your everyday rest.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-3 divide-x divide-bh-border rounded-2xl bg-white/80 px-2 py-2 shadow-[0_6px_18px_rgba(27,61,47,0.06)]">
        {MATTRESS_BENEFITS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-center justify-center gap-2 px-2 sm:gap-3 sm:px-3">
            <Icon className="h-5 w-5 shrink-0 text-bh-green" strokeWidth={1.8} aria-hidden />
            <div className="min-w-0">
              <p className="text-[10px] font-bold leading-tight text-bh-charcoal sm:text-xs">{title}</p>
              <p className="mt-0.5 hidden text-[10px] leading-tight text-bh-muted sm:block">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductCategoryHelp({ product, category, className }) {
  if (!isMattressCategory(category)) return null;

  const href = whatsAppHref(productEnquiryMessage({ productName: product.name }));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("mt-3 flex min-h-[3.75rem] items-center justify-between gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-bh-green-dark via-bh-green to-bh-green-dark px-4 py-2 text-white shadow-[0_8px_22px_rgba(27,61,47,0.18)] bh-focus-ring sm:px-5", className)}
    >
      <span className="flex min-w-0 items-center gap-3">
        <MessageCircle className="h-6 w-6 shrink-0" strokeWidth={1.8} aria-hidden />
        <span className="min-w-0">
          <span className="block text-[11px] font-bold sm:text-xs">Need Help or a Custom Requirement?</span>
          <span className="mt-0.5 block text-[9px] leading-snug text-white/80 sm:text-[10px]">
            Chat with our product expert for the right recommendation.
          </span>
        </span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[10px] font-semibold text-bh-green shadow-sm sm:text-xs">
        <MessageCircle className="h-3 w-3" aria-hidden />
        WhatsApp
      </span>
    </a>
  );
}

export function ProductCategoryTrustIcons({ category }) {
  if (!isMattressCategory(category)) return null;

  const items = [
    { icon: Truck, label: "Free Delivery", detail: "Chennai & nearby" },
    { icon: PackageCheck, label: "Secure Packaging", detail: "Careful handling" },
    { icon: RefreshCw, label: "Easy Returns", detail: "Hassle-free support" },
    { icon: Headset, label: "Expert Support", detail: "Showroom guidance" },
  ];

  return (
    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map(({ icon: Icon, label, detail }) => (
        <div key={label} className="flex min-w-0 items-center gap-2 rounded-xl bg-white/80 p-2 shadow-[0_5px_16px_rgba(27,61,47,0.06)]">
          <Icon className="h-4 w-4 shrink-0 text-bh-green" strokeWidth={1.8} aria-hidden />
          <span className="min-w-0">
            <span className="block text-[10px] font-bold leading-tight text-bh-charcoal">{label}</span>
            <span className="mt-0.5 block text-[9px] leading-tight text-bh-muted">{detail}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
