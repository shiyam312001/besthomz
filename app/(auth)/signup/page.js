import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata = { title: "Create customer account" };

export default async function SignupPage({ searchParams }) {
  const params = await searchParams;
  return (
    <AuthShell title="Create your customer account" subtitle="Save wishlists, track quotes and manage showroom visits.">
      <SignupForm next={params?.next || "/account"} />
    </AuthShell>
  );
}
