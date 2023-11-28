import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { isModerator } from "../authenticatePriviledges";

export const dynamic = "force-dynamic";

export async function getBoardData(id: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("boards")
    .select(`*`)
    .eq("id", id);

  if (error) {
    console.log(error);
    return { error: "failed to get board" };
  }

  return { boardData: data };
}

export async function getAllBoards() {
  const supabase = createServerComponentClient({ cookies });
  const writeAccess = await isModerator();

  if (!writeAccess) {
    console.log("Access Denied - You are not an approved moderator");
    return { error: "Access Denied - You are not an approved moderator" };
  }

  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .order("name");

  if (error) {
    console.log(error);
    return { error: "failed to get board" };
  }

  console.log(data);
  return { allBoardData: data };
}
