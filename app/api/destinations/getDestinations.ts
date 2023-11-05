import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function getDestinationData(id: String | undefined) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("id", id);

  if (error) {
    console.log(error);
    return { error: "failed to get destination" };
  }

  return data;
}

export async function getAllDestinations() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .order("name");

  if (error) {
    console.log(error);
    return { error: "failed to get destination" };
  }
  return { allDestinationData: data };
}
