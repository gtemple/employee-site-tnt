import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, res: NextResponse) {
  const requestUrl = new URL(req.url)
  const body = await req.json();

  console.log('request body:', body)
  // const supabase = createServerActionClient({ cookies });

  // const { data: { user } } = await supabase.auth.getUser()


  // console.log(formData)

  // const adminBool = (admin === 'true')
  // const moderatorBool = (moderator === 'true')
  // const activeBool = (active === 'true')

  // const { error } = await supabase
  //   .from('profiles')
  //   .update({ 'admin': adminBool, 'moderator': moderatorBool, 'active': activeBool })
  //   .eq('id', user_id)


  // if (error) {
  //   console.log(error)
  //   return NextResponse.redirect(
  //     `${requestUrl.origin}/?error=Could not authenticate user`,
  //     {
  //       // a 301 status is required to redirect from a POST to a GET route
  //       status: 301,
  //     }
  //   )
  // }

  return NextResponse.redirect(requestUrl.origin, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  })
}
