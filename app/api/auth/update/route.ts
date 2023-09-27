import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const first_name = String(formData.get('first_name'));
  const last_name = String(formData.get('last_name'));
  const admin = false;
  const moderator = false;
  const user_id = String(formData.get('user_id'));
  const supabase = createServerActionClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase.auth.updateUser({
    password
  });

      console.log('here is the user:', user?.id)
    console.log('here is the name:', first_name)

  const { error: error2 } = await supabase
    .from('profiles')
    .update({ first_name: first_name, last_name: last_name, admin, moderator })
    .eq('id', user?.id)


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

  if (error2) {
    console.log(error2)
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
