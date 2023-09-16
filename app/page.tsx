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
    .eq('user_id', '09449ff0-c92b-4eaf-8551-f99634180381')

  console.log('*');

  let metadata = user?.user_metadata

  // if (!user) {
  //   redirect("/unauthenticated")
  // }

  return (
    <div>
      <div>
        <div>
          {user ? (
            <div>
              {console.log(data)}
              Hey, {user?.email}!
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
