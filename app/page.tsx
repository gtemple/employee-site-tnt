import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getProfileData } from './api/getProfiles'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let data = await getProfileData(user?.id)
  let profile = data && data[0]

  if (!user) {
    return (
      <>
        <Link href="/pages/login">Login</Link>
        <Link href="/pages/signup">Sign Up</Link>
      </>
    )
  }

  if (!profile.first_name || !profile.last_name) {
    return (
      <>
        <div>Hi, {profile.first_name}! Please complete your account to gain full access:</div>
      </>
    )
  }

  if (!profile.active) {
    return (
      <>
        <div>Hi, {profile.first_name}! your account is waiting approval</div>
      </>
    )
  }

  return (
    <div>
      <div>Hey, {profile.first_name}!</div>
      <Link href="/pages/tours/tours">My Tours</Link>
      <Link href="/pages/sites/all-sites">Sites</Link>
    </div>
  )
}
