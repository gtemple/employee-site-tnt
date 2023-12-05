import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  const requestUrl = new URL(req.url);

  const body = await req.json();
  const id = body.id;
  const requested = body.requested
  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase
    .from("tours")
    .update({
      requested: requested,
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
