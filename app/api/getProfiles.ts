import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function getProfileData(userId: String | undefined) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.log(error);
    return { error: "failed to get profile" };
  }

  return data;
}

export async function getAllProfiles() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    console.log(error);
    return { error: "failed to get profiles" };
  }

  console.log(data);
  return { allProfileData: data };
}

export async function getAllActiveProfiles() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("active", true);

  if (error) {
    console.log(error);
    return { error: "failed to get profiles" };
  }

  console.log(data);
  return { allProfileData: data };
}
