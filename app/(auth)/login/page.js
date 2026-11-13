import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Customer sign in" };

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const next = params?.next || "/account";
  return (
    <AuthShell title="Customer sign in" subtitle="Sign in to manage your quotes, wishlist, cart and saved designs.">
      <LoginForm next={next} />
    </AuthShell>
  );
}
