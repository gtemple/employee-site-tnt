import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, res: NextResponse) {
  const requestUrl = new URL(req.url)
  const body = await req.json();
  const admin = body.admin;
  const moderator = body.moderator;
  const active = body.active
  const user_id = body.user_id
  const supabase = createServerActionClient({ cookies });

  // const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('profiles')
    .update({ 'admin': admin, 'moderator': moderator, 'active': active })
    .eq('id', user_id)
    .select()
  console.log(data)

  if (error) {
    console.log(error)
    return NextResponse.redirect(
      `${requestUrl.origin}/?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }

  return NextResponse.redirect(requestUrl.origin, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  })
}
