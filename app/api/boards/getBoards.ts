import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { isModerator } from "../authenticatePriviledges";

export async function getBoardData(id: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("boards")
    .select(`*`)
    .eq("id", id);

  if (error) {
    console.log(error);
    return "failed to get boards";
  }

  return { boardData: data };
}

export async function getAllBoards() {
  const supabase = createServerComponentClient({ cookies });
  const writeAccess = await isModerator();

  if (!writeAccess) {
    console.log("Access Denied - You are not an approved moderator");
    return "Access Denied - You are not an approved moderator";
  }

  const { data, error } = await supabase.from("boards").select("*");

  if (error) {
    console.log(error);
    return "failed to get boards";
  }

  console.log(data);
  return { allBoardData: data };
}
