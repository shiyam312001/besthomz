import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata = { title: "Create account" };

export default async function SignupPage({ searchParams }) {
  const params = await searchParams;
  return (
    <AuthShell title="Join Best Homz" subtitle="Save wishlists, track quotes and manage showroom visits.">
      <SignupForm next={params?.next || "/account"} />
    </AuthShell>
  );
}
