import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from 'react'

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
  })


export default async function Unauthenticated() {
  const supabase = createServerSupabaseClient()
  // const { data: {session}} = await supabase.auth.getSession();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      redirect('/pages/login')
    }
    return user
  } catch (error) {
    console.log('Error --', error)
    return null
  }
}