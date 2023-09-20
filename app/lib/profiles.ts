import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export async function getProfileData(userId: String) {
  const supabase = createServerComponentClient({ cookies })
  console.log('hey')

  const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('user_id', userId)

  if (error) {
    console.log(error);
    return 'failed to get profile';
  }

  return { userData: data};
}


export async function getProfileIds() {
  const supabase = createServerComponentClient({ cookies })
  console.log('heyyy')

  const { data, error } = await supabase
  .from('profiles')
  .select('id')

  if (error) {
    console.log(error);
    return 'failed to get profile ids';
  }

  return { profileIds: data};
}