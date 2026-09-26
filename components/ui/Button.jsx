"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-bh-green text-white hover:bg-bh-green-light border border-transparent shadow-sm",
  secondary:
    "bg-bh-cream text-bh-charcoal border border-bh-border hover:bg-white",
  outline:
    "bg-white text-bh-green border border-bh-green/30 hover:border-bh-green hover:bg-bh-sage-muted",
  ghost: "bg-transparent text-bh-text hover:bg-bh-sage/60 border border-transparent",
  glass: "bh-glass text-bh-charcoal hover:bg-white/90 border border-white/60",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#20bd5a] border border-transparent",
  danger:
    "bg-red-600 text-white hover:bg-red-700 border border-transparent",
};

const sizes = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
  icon: "h-10 w-10 p-0",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  type = "button",
  disabled,
  loading,
  icon,
  iconPosition = "left",
  onClick,
  ...props
}) {
  const isDisabled = disabled || loading;
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-sans font-medium transition-colors duration-200 bh-focus-ring text-[length:var(--bh-text-body)]",
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
    isDisabled && "pointer-events-none opacity-55",
    className,
  );

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {!loading && icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {!loading && icon && iconPosition === "right" && icon}
    </>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
