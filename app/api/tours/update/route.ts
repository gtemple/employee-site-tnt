import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isModerator } from "../../authenticatePriviledges";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const requestUrl = new URL(req.url);
  const writeAccess = await isModerator();

  if (!writeAccess) {
    console.log("Post failed. No moderator privledges.");
    return NextResponse.redirect(
      `${requestUrl.origin}/?error=Account does not have moderator privledges`,
      {
        status: 301,
      }
    );
  }

  const body = await req.json();
  const id = body.id;
  const start = body.start;
  const end = body.end;
  const itinerary = body.itinerary;
  const school_id = body.school;
  const profile_id = body.profile
  const students = body.students;
  const destination_id = body.destination;
  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase
    .from("tours")
    .update({
      start: start,
      end: end,
      destination_id: destination_id,
      school_id: school_id,
      profile_id: profile_id,
      students: students,
      itinerary: itinerary,
    })
    .eq("id", id);

  if (error) {
    console.log(error);
    return NextResponse.redirect(
      `${requestUrl.origin}/?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(requestUrl.origin, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
