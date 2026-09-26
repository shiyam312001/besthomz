import { getAuthUser, getProfileForUser } from "@/lib/auth/server";
import { ProfileForm } from "@/components/account/ProfileForm";
export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const user = await getAuthUser();
  const profile = await getProfileForUser(user.id);
  return (
    <>
      <h1 className="font-display text-2xl font-semibold">Profile</h1>
      <ProfileForm profile={profile} email={user.email} />
    </>
  );
}
