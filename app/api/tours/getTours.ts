import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function getTourData(id: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("tours")
    .select(`*, schools (*)`)
    .eq("id", id);

  if (error) {
    console.log(error);
    return { error: "failed to get tours" };
  }
  console.log(data);
  return { tourData: data };
}

export async function getToursByUserId(id: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("tours")
    .select(`*, schools (*), destinations (*)`)
    .eq("id", id);

  if (error) {
    console.log(error);
    return { error: "failed to get tours" };
  }
  console.log("here:", data);
  return { tourData: data };
}

export async function getAllTours() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("tours").select(`*,  schools (*), destinations (*)`);

  if (error) {
    console.log(error);
    return { error: "failed to get tour" };
  }

  console.log("tour data:", data);
  return { allTourData: data };
}

export async function getTourIds() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("tours").select("id");

  if (error) {
    console.log(error);
    return { error: "failed to get tour ids" };
  }

  console.log(data);
  return { tourIds: data };
}
