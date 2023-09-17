import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'

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


  // if (!user) {
  //   redirect("/unauthenticated")
  // }

  return (
    <div>
      <div>
        <div>
          {profile ? (
            <div>
              Hey, {profile.first_name}!
              <Link href={'/update-user'}>Update Account</Link>
              <LogoutButton />
              {profile.admin && <Link href="/admin/dashboard">admin</Link>}
            </div>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
