import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { getProfileData } from '../api/getProfiles';

import Avatar from '@mui/material/Avatar';
import LogoutButton from './LogoutButton'

import '../styles/nav.css'


export const dynamic = 'force-dynamic'


export default async function Navigation() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let data = await getProfileData(user?.id)
  //@ts-ignore
  let profile = data && data[0]

  if (user) {
    return (
      <div className='nav-bar'>
        <div>
          <div className='nav-profile'>
            <Avatar>P</Avatar>
            <div className='nav-name'>{profile.first_name}</div>
          </div>
          <Link href={'/pages/user/update'} className='nav-link'>Update Profile</Link>
        </div>
          {profile && <Link href="/">Home</Link>}
        <div>
          {profile.active && <Link href="/pages/tours/user-tours">My Tours</Link>}
        </div>
        <div>
          {profile.moderator && <Link href="/pages/moderator/dashboard">Moderator</Link>}
        </div>
        <div>
          {profile.admin && <Link href="/pages/admin/dashboard">Admin</Link>}
        </div>
        <LogoutButton />
      </div>
    )
  }

  return null
}
