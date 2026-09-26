import { cn } from "@/lib/cn";

const variantClass = {
  default: "bh-glass rounded-xl",
  strong: "bh-glass-strong rounded-xl",
  subtle: "bh-glass-subtle rounded-xl",
  dark: "bh-glass-dark rounded-xl",
};

export function GlassCard({ variant = "default", className, children, as = "div", ...props }) {
  const Component = as;
  return (
    <Component className={cn(variantClass[variant] ?? variantClass.default, className)} {...props}>
      {children}
    </Component>
  );
}
