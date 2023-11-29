import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function getUser() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user?.id);

  if (error) {
    console.log(error);
    return { error: "failed to check priviledges" };
  }

  return data;
}

export async function isActive() {
  const user = await getUser();
  if ("error" in user) {
    return { error: "failed to get user" };
  }
  const active = user[0].active ? true : false;
  return active;
}

export async function isModerator() {
  const user = await getUser();
  if ("error" in user) {
    return { error: "failed to get user" };
  }
  const moderator = user[0].moderator ? true : false;
  return moderator;
}

export async function isAdmin() {
  const user = await getUser();
  if ("error" in user) {
    return { error: "failed to get user" };
  }
  const admin = user[0].admin ? true : false;
  return admin;
}
