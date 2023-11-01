import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { isModerator } from "../authenticatePriviledges";

export const dynamic = "force-dynamic";

/*
ALL GET REQUESTS
*/
export async function getSchoolData(id: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("schools")
    .select(`*, boards (*)`)
    .eq("id", id);

  if (error) {
    console.log(error);
    return { error: "failed to get school" };
  }

  console.log(data);
  return { schoolData: data };
}

export async function getAllSchools() {
  const supabase = createServerComponentClient({ cookies });
  const writeAccess = await isModerator();

  if (!writeAccess) {
    console.log("Access Denied - You are not an approved moderator");
    return { error: "Access Denied - You are not an approved moderator" };
  }

  const { data, error } = await supabase
    .from("schools")
    .select(`*, boards (*)`);

  if (error) {
    console.log(error);
    return { error: "failed to get schools" };
  }

  console.log(data);
  return { allSchoolData: data };
}
