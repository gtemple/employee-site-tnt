import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
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


  let metadata = user?.user_metadata

  // if (!user) {
  //   redirect("/unauthenticated")
  // }

  return (
    <div>
      <div>
        <div>
          {data ? (
            <div>
              Hey, {data[0].first_name}!
              <Link href={'/update-user'}>Update Account</Link>
              <LogoutButton />
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
