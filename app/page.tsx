import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getProfileData } from "./api/getProfiles";
import Link from "next/link";
import Landing from "./components/Landing";
import "./styles/dashboard.css";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('here is the user:', user)
  let data = await getProfileData(user?.id);
  let profile = Array.isArray(data) && data[0];

  if (!user) {
    return (
      <>
        <Landing />
      </>
    );
  }

  if (!profile.first_name || !profile.last_name) {
    return (
      <>
      {}
        <div>
          Hi, {profile.first_name}! Please complete your account to gain full
          access:
        </div>
      </>
    );
  }

  if (!profile.active) {
    return (
      <>
        <div>Hi, {profile.first_name}! your account is waiting approval</div>
      </>
    );
  }

  return (
    <div className="dash">
      <div className="greeting">Hey, {profile.first_name}!</div>
      <div className="dash-nav">
        <Link href="/pages/tours">My Tours</Link>
        <Link href="/pages/sites">Sites</Link>
        <Link href="/pages/destinations/all-destinations">Destinations</Link>
      </div>
    </div>
  );
}
