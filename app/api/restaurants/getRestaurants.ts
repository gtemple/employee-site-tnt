import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { isModerator } from "../authenticatePriviledges";

export const dynamic = "force-dynamic";

export async function getRestaurantData(id: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("restaurants")
    .select(`*, destinations (*)`)
    .eq("id", id);

  if (error) {
    console.log(error);
    return null;
  }

  console.log(data);
  return { restaurantData: data };
}

export async function getAllRestaurants() {
  const supabase = createServerComponentClient({ cookies });
  const writeAccess = await isModerator();

  if (!writeAccess) {
    console.log("Access Denied - You are not an approved moderator");
    return { error: "Access Denied - You are not an approved moderator" };
  }

  const { data, error } = await supabase
    .from("restaurants")
    .select(`*, destinations (*)`)
    .order("name");

  if (error) {
    console.log(error);
    return { error: "failed to get restaurants" };
  }

  console.log(data);
  return { allRestaurantData: data };
}
