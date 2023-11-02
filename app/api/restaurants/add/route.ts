import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isModerator } from "../../authenticatePriviledges";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const requestUrl = new URL(req.url);
  const writeAccess = await isModerator();

  if (!writeAccess) {
    console.log("Update failed. No moderator priviledges.");
    return NextResponse.redirect(
      `${requestUrl.origin}/?error=Account does not have moderator privledges`,
      {
        status: 301,
      }
    );
  }

  const body = await req.json();
  const name = body.name;
  const address = body.address;
  const destination_id = body.destination_id;
  const postal = body.postal;
  const phone = body.phone;
  const email = body.email;
  const capacity = body.capacity;

  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase.from("restaurants").insert({
    name: name,
    destination_id: destination_id,
    address: address,
    postal: postal,
    phone: phone,
    capacity: capacity,
    email: email,
  });

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
