import { ProductCard } from "@/components/product/ProductCard";
import { mapProductForCard } from "@/lib/utils/product-helpers";
import { cn } from "@/lib/cn";

export function ProductGrid({ products, className = "", cardVariant = "default" }) {
  if (!products?.length) return null;
  return (
    <div
      className={cn(
        "grid grid-cols-2 items-stretch gap-2.5 sm:gap-3 md:gap-4 lg:grid-cols-4",
        "[&>article]:min-w-0",
        className,
      )}
    >
      {products.map((product) => {
        const card = mapProductForCard(product);
        return <ProductCard key={card.slug} {...card} variant={cardVariant} />;
      })}
    </div>
  );
}