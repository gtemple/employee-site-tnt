import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Admin() {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase
  .from('profiles')
  .select('*')

  
  return (
    <div>
      {data && <div>{console.log(data)}</div>}
      Admin page
      <Link href="/">Back</Link>

    </div>
  )
}
