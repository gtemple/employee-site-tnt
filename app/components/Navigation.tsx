import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

import '../styles/nav.css'


export const dynamic = 'force-dynamic'


export default async function Navigation() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user?.id)

  let profile = data && data[0];
  if (user) {
    return (
      <div className='nav-bar'>
        <div>
          <div>Hi, {profile.first_name}</div>
          <Link href={'/pages/user/update'} className='nav-link'>Update Profile</Link>
        </div>
        <div>My Tours</div>
        <div>Profile</div>
        <div> 
          {profile.moderator && <Link href="/pages/moderator/dashboard">moderator</Link>}
        </div>
        <div>
          {profile.admin && <Link href="/pages/admin/dashboard">admin</Link>}
        </div>
        <LogoutButton />
      </div>
    )
  }
}
