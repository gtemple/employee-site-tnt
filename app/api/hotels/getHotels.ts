import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { isModerator } from "../authenticatePriviledges";

export const dynamic = "force-dynamic";

/*
ALL GET REQUESTS
*/
export async function getHotelData(id: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("hotels")
    .select(`*, destinations (*)`)
    .eq("id", id);

  if (error) {
    console.log(error);
    return { error: "failed to get hotels" };
  }

  console.log(data);
  return { hotelData: data };
}

export async function getAllHotels() {
  const supabase = createServerComponentClient({ cookies });
  const writeAccess = await isModerator();

  if (!writeAccess) {
    console.log("Access Denied - You are not an approved moderator");
    return { error: "Access denied - you are not an approved moderator" };
  }

  const { data, error } = await supabase
    .from("hotels")
    .select(`*, destinations (*)`)
    .order("name");

  if (error) {
    console.log(error);
    return { error: "failed to get hotels" };
  }

  console.log(data);
  return { allHotelData: data };
}

export async function getHotelIds() {
  const supabase = createServerComponentClient({ cookies });
  const writeAccess = await isModerator();

  if (!writeAccess) {
    console.log("Access Denied - You are not an approved moderator");
    return "Access Denied - You are not an approved moderator";
  }

  const { data, error } = await supabase.from("hotels").select("id");

  if (error) {
    console.log(error);
    return { error: "failed to get hotel ids" };
  }

  console.log(data);
  return { hotelIds: data };
}
