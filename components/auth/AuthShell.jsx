import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageContainer } from "@/components/layout/PageContainer";

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-bh-cream to-bh-warm-white">
      <PageContainer className="flex min-h-[100dvh] flex-col items-center justify-center py-12">
        <Link href="/" className="mb-8">
          <Logo />
        </Link>
        <GlassCard className="w-full max-w-md p-8">
          <h1 className="font-display text-2xl font-semibold text-bh-charcoal">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-bh-muted">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </GlassCard>
      </PageContainer>
    </div>
  );
}
