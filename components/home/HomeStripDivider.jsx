/** Vertical ash divider between strip items (desktop); centered, ~65% of strip height */
export function HomeStripDivider({ className = "", tall = false }) {
  return (
    <span
      className={`hidden w-px shrink-0 self-center bg-[rgba(27,61,47,0.09)] md:block ${className}`}
      style={{ height: tall ? "5rem" : "3.5rem" }}
      aria-hidden
    />
  );
}
