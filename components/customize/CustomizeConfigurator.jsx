"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Share2, Bookmark } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { cn } from "@/lib/cn";
import { useQuote } from "@/components/providers/QuoteProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { saveCustomizationDraft } from "@/app/actions/customizations";
import {
  buildDesignState,
  designToSearchParams,
  formatQuoteFromDesign,
  loadDesignFromStorage,
  parseDesignFromSearchParams,
  saveDesignToStorage,
} from "@/lib/customize/design-state";
import {
  COLOUR_SWATCHES,
  CUSTOMIZE_IMAGES,
  CUSTOMIZE_STEPS,
  FINISH_OPTIONS,
  getCategoryConfig,
  MATERIAL_OPTIONS,
  PRODUCT_CATEGORIES,
} from "@/components/customize/customize-data";

function OptionPills({ label, options, value, onChange }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition bh-focus-ring",
              value === opt
                ? "bg-bh-green text-white shadow-[0_6px_16px_rgba(27,61,47,0.2)]"
                : "bg-white/90 text-bh-charcoal shadow-[0_4px_14px_rgba(27,61,47,0.08)] hover:bg-bh-sage-muted",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ColourSwatches({ value, onChange }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-bh-muted">Colour</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {COLOUR_SWATCHES.map((swatch) => {
          const selected = value === swatch.label;
          return (
            <button
              key={swatch.label}
              type="button"
              onClick={() => onChange(swatch.label)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl px-2 py-2 transition bh-focus-ring",
                selected && "bg-bh-sage/70 shadow-[0_6px_16px_rgba(27,61,47,0.1)]",
              )}
              aria-pressed={selected}
              aria-label={swatch.label}
            >
              <span
                className={cn(
                  "h-9 w-9 rounded-full shadow-[0_4px_12px_rgba(27,61,47,0.12)]",
                  selected && "ring-2 ring-bh-green/50 ring-offset-2 ring-offset-bh-warm-white",
                )}
                style={{ backgroundColor: swatch.hex }}
              />
              <span className="text-[10px] font-medium text-bh-charcoal">{swatch.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ConfiguratorFallback() {
  return (
    <section className="relative z-10 bg-bh-warm-white pb-12 md:pb-16">
      <PageContainer className="-mt-6 md:-mt-8">
        <div className="bh-glass-panel rounded-3xl p-8 text-center text-sm text-bh-muted">Loading configurator…</div>
      </PageContainer>
    </section>
  );
}

function CustomizeConfiguratorInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { openQuote } = useQuote();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [hydrated, setHydrated] = useState(false);
  const didHydrateRef = useRef(false);
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("sofa");
  const [styleId, setStyleId] = useState("3-seater");
  const [size, setSize] = useState("3 Seater");
  const [material, setMaterial] = useState(MATERIAL_OPTIONS[0]);
  const [colour, setColour] = useState(COLOUR_SWATCHES[0].label);
  const [finish, setFinish] = useState(FINISH_OPTIONS[0]);

  const categoryConfig = useMemo(() => getCategoryConfig(category), [category]);
  const styles = categoryConfig.styles;
  const sizeOptions = categoryConfig.sizes;

  const activeStyle = useMemo(
    () => styles.find((s) => s.id === styleId) ?? styles[0],
    [styles, styleId],
  );

  const productLabel = PRODUCT_CATEGORIES.find((c) => c.id === category)?.label ?? "Sofa";

  const previewImage = activeStyle?.image ?? CUSTOMIZE_IMAGES.preview;

  const summary = useMemo(
    () => [
      { label: "Product", value: productLabel },
      { label: "Style", value: activeStyle?.name ?? "" },
      { label: "Size", value: size },
      { label: "Material", value: material },
      { label: "Colour", value: colour },
      { label: "Finish", value: finish },
    ],
    [productLabel, activeStyle?.name, size, material, colour, finish],
  );

  const syncUrl = useCallback(
    (state) => {
      const params = designToSearchParams(state);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    if (didHydrateRef.current) return;
    didHydrateRef.current = true;

    const fromUrl = parseDesignFromSearchParams(searchParams);
    const fromStorage = loadDesignFromStorage();
    const seed = fromUrl || fromStorage;

    if (seed?.category) {
      const cfg = getCategoryConfig(seed.category);
      const validStyle = cfg.styles.some((s) => s.id === seed.styleId)
        ? seed.styleId
        : cfg.styles[0]?.id;
      const validSize = cfg.sizes.includes(seed.size) ? seed.size : cfg.sizes[0];

      setCategory(seed.category);
      setStyleId(validStyle);
      setSize(validSize);
      if (seed.material && MATERIAL_OPTIONS.includes(seed.material)) setMaterial(seed.material);
      if (seed.colour && COLOUR_SWATCHES.some((c) => c.label === seed.colour)) setColour(seed.colour);
      if (seed.finish && FINISH_OPTIONS.includes(seed.finish)) setFinish(seed.finish);
    }
    setHydrated(true);
  }, [searchParams]);

  useEffect(() => {
    if (!hydrated) return;
    const state = buildDesignState({ category, styleId, size, material, colour, finish });
    syncUrl(state);
  }, [hydrated, category, styleId, size, material, colour, finish, syncUrl]);

  function handleCategoryChange(nextCategory) {
    const cfg = getCategoryConfig(nextCategory);
    setCategory(nextCategory);
    setStyleId(cfg.styles[0]?.id ?? "");
    setSize(cfg.sizes[0] ?? "");
    setStep(0);
  }

  function openQuoteWithSelection() {
    setStep(5);
    const quote = formatQuoteFromDesign({
      productLabel,
      styleName: activeStyle?.name,
      size,
      material,
      colour,
      finish,
    });
    openQuote({
      furnitureRequirement: quote.furnitureRequirement,
      customizationRequirement: quote.customizationRequirement,
    });
  }

  function handleSaveDesign() {
    const state = buildDesignState({ category, styleId, size, material, colour, finish });
    const savedLocal = saveDesignToStorage(state);
    if (savedLocal) {
      toast("Design saved on this device");
    }

    startTransition(async () => {
      const res = await saveCustomizationDraft({
        category,
        styleId,
        styleName: activeStyle?.name,
        size,
        material,
        colour,
        finish,
      });
      if (res.ok) {
        toast("Design saved to your account");
      } else if (!res.needsAuth) {
        toast(res.error || "Could not save to account");
      }
    });
  }

  async function handleShare() {
    const params = designToSearchParams(buildDesignState({ category, styleId, size, material, colour, finish }));
    const url = `${window.location.origin}${pathname}?${params.toString()}`;
    const text = `My Best Homz design: ${productLabel} — ${activeStyle?.name}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Best Homz custom design", text, url });
        return;
      } catch {
        /* user cancelled */
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast("Design link copied");
    } catch {
      toast("Could not copy link");
    }
  }

  const stepTitle = CUSTOMIZE_STEPS[step] ?? CUSTOMIZE_STEPS[0];
  const maxStep = CUSTOMIZE_STEPS.length - 1;

  return (
    <section className="relative z-10 bg-bh-warm-white pb-12 md:pb-16">
      <PageContainer className="-mt-6 md:-mt-8">
        <div className="bh-glass-panel overflow-hidden rounded-3xl p-4 md:p-6 lg:p-8">
          <nav aria-label="Customization steps" className="mb-6 overflow-x-auto md:mb-8">
            <ol className="flex min-w-max gap-2 md:gap-3">
              {CUSTOMIZE_STEPS.map((label, i) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3 py-2 text-left transition bh-focus-ring md:px-4",
                      step === i
                        ? "bg-bh-green text-white shadow-[0_6px_18px_rgba(27,61,47,0.2)]"
                        : "bg-white/90 text-bh-muted shadow-[0_4px_12px_rgba(27,61,47,0.06)] hover:text-bh-charcoal",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                        step === i ? "bg-white/20 text-white" : "bg-bh-sage-muted text-bh-green",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="hidden text-xs font-semibold sm:inline md:text-sm">{label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <aside className="lg:col-span-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-bh-muted">Category</p>
              <ul className="space-y-1">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={cn(
                        "w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition bh-focus-ring",
                        category === cat.id
                          ? "bg-bh-sage text-bh-green shadow-[0_4px_14px_rgba(27,61,47,0.08)]"
                          : "text-bh-muted hover:bg-bh-sage-muted/80 hover:text-bh-charcoal",
                      )}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="lg:col-span-6">
              <h2 className="font-display text-lg font-semibold text-bh-charcoal md:text-xl">{stepTitle}</h2>
              <p className="mt-1 text-sm text-bh-muted">
                {step === 0 && categoryConfig.typeTitle}
                {step === 1 && "Pick the size that fits your room."}
                {step === 2 && "Choose your preferred material."}
                {step === 3 && "Select a colour for your piece."}
                {step === 4 && "Choose the surface finish."}
                {step === 5 && "Confirm everything before requesting a quote."}
              </p>

              <div className="mt-5 min-h-[12rem]">
                {step === 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {styles.map((item) => {
                      const selected = styleId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setStyleId(item.id);
                            setStep(0);
                          }}
                          className={cn(
                            "relative rounded-2xl p-3 text-center transition bh-focus-ring",
                            selected
                              ? "bg-bh-sage/80 shadow-[0_10px_28px_rgba(27,61,47,0.14)]"
                              : "bg-white/90 shadow-[0_6px_20px_rgba(27,61,47,0.08)] hover:shadow-[0_10px_28px_rgba(27,61,47,0.1)]",
                          )}
                        >
                          {selected && (
                            <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-bh-green text-white">
                              <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                            </span>
                          )}
                          <div className="relative mx-auto aspect-[4/3] w-full max-w-[8.5rem]">
                            <Image src={item.image} alt="" fill className="object-contain" sizes="120px" />
                          </div>
                          <p className="mt-2 text-xs font-semibold text-bh-charcoal">{item.name}</p>
                        </button>
                      );
                    })}
                  </div>
                )}

                {step === 1 && (
                  <OptionPills
                    label="Size"
                    options={sizeOptions}
                    value={size}
                    onChange={(v) => {
                      setSize(v);
                      setStep(1);
                    }}
                  />
                )}

                {step === 2 && (
                  <OptionPills
                    label="Material"
                    options={MATERIAL_OPTIONS}
                    value={material}
                    onChange={(v) => {
                      setMaterial(v);
                      setStep(2);
                    }}
                  />
                )}

                {step === 3 && (
                  <ColourSwatches
                    value={colour}
                    onChange={(v) => {
                      setColour(v);
                      setStep(3);
                    }}
                  />
                )}

                {step === 4 && (
                  <OptionPills
                    label="Finish"
                    options={FINISH_OPTIONS}
                    value={finish}
                    onChange={(v) => {
                      setFinish(v);
                      setStep(4);
                    }}
                  />
                )}

                {step === 5 && (
                  <ul className="space-y-2 rounded-2xl bg-bh-sage-muted/50 p-4 text-sm md:p-5">
                    {summary.map((row) => (
                      <li key={row.label} className="flex justify-between gap-2">
                        <span className="text-bh-muted">{row.label}</span>
                        <span className="font-medium text-bh-charcoal">{row.value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="inline-flex h-10 items-center gap-1 rounded-full px-4 text-sm font-semibold text-bh-charcoal shadow-[0_4px_14px_rgba(27,61,47,0.08)] bh-glass-panel bh-focus-ring disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Back
                </button>
                {step < maxStep ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.min(maxStep, s + 1))}
                    className="inline-flex h-10 items-center gap-1 rounded-full bg-bh-green px-5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(27,61,47,0.2)] bh-focus-ring"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={openQuoteWithSelection}
                    className="inline-flex h-10 items-center gap-1 rounded-full bg-bh-green px-5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(27,61,47,0.2)] bh-focus-ring"
                  >
                    Get Quote
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </div>
            </div>

            <aside className="flex flex-col gap-4 lg:col-span-4">
              <div className="bh-glass-panel overflow-hidden rounded-2xl md:rounded-3xl">
                <div className="relative aspect-[4/3] bg-bh-cream/50">
                  <Image src={previewImage} alt="Preview" fill className="object-contain p-4" sizes="33vw" />
                  <span className="absolute bottom-3 left-3 rounded-full px-3 py-1.5 text-[10px] font-semibold text-bh-charcoal bh-glass-panel">
                    360° View
                  </span>
                </div>
                <div className="flex gap-2 overflow-x-auto p-3">
                  {styles.slice(0, 4).map((thumb) => (
                    <button
                      key={thumb.id}
                      type="button"
                      onClick={() => {
                        setStyleId(thumb.id);
                        setStep(0);
                      }}
                      className={cn(
                        "relative h-14 w-14 shrink-0 overflow-hidden rounded-lg shadow-[0_4px_12px_rgba(27,61,47,0.08)] bh-focus-ring",
                        styleId === thumb.id && "shadow-[0_6px_18px_rgba(27,61,47,0.16)]",
                      )}
                    >
                      <Image src={thumb.image} alt="" fill className="object-contain p-1" sizes="56px" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bh-glass-panel flex flex-1 flex-col rounded-2xl p-5 md:rounded-3xl md:p-6">
                <h3 className="font-display text-lg font-semibold text-bh-charcoal">Your Selection</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {summary.map((row) => (
                    <li key={row.label} className="flex justify-between gap-2 border-b border-bh-green/6 pb-2 last:border-0">
                      <span className="text-bh-muted">{row.label}</span>
                      <span className="font-medium text-bh-charcoal">{row.value}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={openQuoteWithSelection}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-bh-green text-sm font-semibold text-white shadow-[0_10px_28px_rgba(27,61,47,0.22)] bh-focus-ring"
                >
                  Get Quote
                </button>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={handleSaveDesign}
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-white/95 text-xs font-semibold text-bh-charcoal shadow-[0_4px_14px_rgba(27,61,47,0.08)] bh-focus-ring disabled:opacity-60"
                  >
                    <Bookmark className="h-3.5 w-3.5" aria-hidden />
                    Save Design
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-white/95 text-xs font-semibold text-bh-charcoal shadow-[0_4px_14px_rgba(27,61,47,0.08)] bh-focus-ring"
                  >
                    <Share2 className="h-3.5 w-3.5" aria-hidden />
                    Share
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

export function CustomizeConfigurator() {
  return (
    <Suspense fallback={<ConfiguratorFallback />}>
      <CustomizeConfiguratorInner />
    </Suspense>
  );
}
