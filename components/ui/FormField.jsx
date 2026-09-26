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
        <label htmlFor={htmlFor} className="bh-type-body font-medium text-bh-charcoal">
          {label}
          {required && <span className="text-bh-green" aria-hidden> *</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="bh-type-small text-bh-muted">{hint}</p>}
      {error && (
        <p className="bh-type-small text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
