import { cn } from "@/lib/cn";

export function PageContainer({ className, as = "div", children, ...props }) {
  const Component = as;
  return (
    <Component className={cn("bh-container", className)} {...props}>
      {children}
    </Component>
  );
}
