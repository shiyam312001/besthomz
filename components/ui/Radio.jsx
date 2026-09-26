import { cn } from "@/lib/cn";

export function Radio({ className, id, label, ...props }) {
  return (
    <label htmlFor={id} className="inline-flex cursor-pointer items-center gap-2.5">
      <input
        type="radio"
        id={id}
        className={cn(
          "h-4 w-4 border-bh-border text-bh-green focus:ring-bh-green/30",
          className,
        )}
        {...props}
      />
      {label && <span className="text-sm text-bh-text">{label}</span>}
    </label>
  );
}
