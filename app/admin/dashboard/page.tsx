import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import UsersTable from '@/components/admin/usersTable'

export default async function Admin() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile, error: profileError } = await supabase
  .from('profiles')
  .select('*')
  .eq('user_id', user?.id)

  const { data, error } = await supabase
  .from('profiles')
  .select('*')

  if (profile && !profile[0].admin) {
    return <div>Authentication failed</div>
  }

  return (
    <div>
      {data && (
        <div>
          <UsersTable userData={{data: data, hello: 'hello'}} />
        </div>
      )}
      Admin page
      <Link href="/">Back</Link>

    </div>
  )
}
