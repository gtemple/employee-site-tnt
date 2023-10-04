import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from './components/LogoutButton'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user?.id)

  let profile = data && data[0];

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
        <Link href={'/pages/user/update'}>Update Account</Link>
        <LogoutButton />
      </>
    )
  }

  if (!profile.active) {
    return (
      <>
        <div>Hi, {profile.first_name}! your account is waiting approval</div>
        <Link href={'/pages/user/update'}>Update Account</Link>
        <LogoutButton />
      </>
    )
  }

  return (
    <div>
      Hey, {profile.first_name}!
      <Link href={'/pages/user/update'}>Update Profile</Link>
      <LogoutButton />
    </div>
  )
}
