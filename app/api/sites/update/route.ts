import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { isModerator } from '../../authenticatePriviledges'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const writeAccess = await isModerator();

  if (!writeAccess) {
    console.log('Update failed. No moderator privledges.')
    return NextResponse.redirect(
      `${requestUrl.origin}/?error=Account does not have moderator privledges`,
      {
        status: 301,
      }
    )
  }

  const formData = await request.formData();
  const id = String(formData.get('id'));
  const name = String(formData.get('name'));
  const address = String(formData.get('address'));
  const city_id = String(formData.get('city'));
  const postal = String(formData.get('postal'));
  const phone = String(formData.get('phone'));
  const description = String(formData.get('description'));
  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase
    .from('sites')
    .update({
      name: name,
      address: address,
      destination_id: city_id,
      postal: postal,
      phone: phone,
      description: description
    })
    .eq('id', id)


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