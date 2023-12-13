import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { getProfileData } from "../api/getProfiles";

import Image from "next/image";

import { UserMenu } from "./tools/UserMenu";

import "../styles/nav.css";

export const dynamic = "force-dynamic";

export default async function Navigation() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let data = await getProfileData(user?.id);
  let profile = Array.isArray(data) && data[0];

  if (user) {
    return (
      <div className="nav-bar">
        <div>
        <Image
          src="/images/temple-logo.png"
          width={300}
          height={33}
          alt="Temple and Temple Tours"
        />
        </div>
        <div className="nav-menu">
          {profile && <Link href="/">Home</Link>}
          {profile.active && <Link href="/pages/tours/">My Tours</Link>}
          {profile.admin && <Link href="/pages/admin/dashboard">Admin</Link>}
        </div>
        <div>
          <UserMenu profile={profile} />
        </div>
      </div>
    );
  }

  return null;
}
