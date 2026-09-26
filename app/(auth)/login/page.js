import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const next = params?.next || "/account";
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage quotes, wishlist and cart.">
      <LoginForm next={next} />
    </AuthShell>
  );
}
