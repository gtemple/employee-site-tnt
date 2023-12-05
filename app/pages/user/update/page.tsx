"use server";

import Link from "next/link";
import { getUser } from "@/app/api/authenticatePriviledges";
import { UserUpdate } from "@/app/components/user/UserUpdate";

export default async function UpdateUser() {
  const currentProfile = await getUser();

  if ("error" in currentProfile) {
    return <div>Failed to get profile</div>;
  }

  const postUpdate = async (state: {
    id: string;
    first_name: string;
    last_name: string;
  }) => {
    "use server";

    fetch("/api/auth/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
  };

  return (
    <div>
      <div>
        <div>
          {/* <UserUpdate profile={currentProfile} postUpdate={postUpdate} /> */}
        </div>
      </div>
      <Link href="/">Back</Link>
    </div>
  );
}
