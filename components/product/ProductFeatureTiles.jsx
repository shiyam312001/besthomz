import Image from "next/image";

export function ProductFeatureTiles({ features = [], image }) {
  const tiles = features
    .map((feature) => ({
      title: feature.feature || feature.title,
      description: feature.description || "",
      image,
    }))
    .filter((feature) => feature.title)
    .slice(0, 4);

  if (!tiles.length) return null;

  return (
    <section className="mt-12 md:mt-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <article key={tile.title} className="overflow-hidden rounded-2xl bh-glass-card md:rounded-3xl">
            {image && (
              <div className="relative aspect-[4/3] bg-bh-cream/50">
                <Image src={image} alt="" fill className="object-cover" sizes="25vw" />
              </div>
            )}
            <div className="p-4 md:p-5">
              <h3 className="font-display text-base font-semibold text-bh-charcoal md:text-lg">{tile.title}</h3>
              {tile.description && <p className="mt-2 text-sm leading-relaxed text-bh-muted">{tile.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
