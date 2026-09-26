import { requireAuth } from "@/lib/auth/server";
import { PageContainer } from "@/components/layout/PageContainer";
import { AccountNav } from "@/components/account/AccountNav";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AccountLayout({ children }) {
  await requireAuth("/account");
  return (
    <PageContainer className="bh-section">
      <AccountNav />
      <div className="bh-ui mt-6">{children}</div>
    </PageContainer>
  );
}
