import { cn } from "@/lib/cn";

export function FormField({
  label,
  htmlFor,
  hint,
  error,
  required,
  className,
  children,
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-bh-charcoal max-lg:text-[0.9375rem] lg:text-sm">
          {label}
          {required && <span className="text-bh-green" aria-hidden> *</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-bh-muted">{hint}</p>}
      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
