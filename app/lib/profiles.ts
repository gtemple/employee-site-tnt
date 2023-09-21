import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export async function getProfileData(userId: String) {
  const supabase = createServerComponentClient({ cookies })
  console.log('get profiled data functioning')

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

export async function getAllProfiles() {
  const supabase = createServerComponentClient({ cookies })
  console.log('get all profiles')

  const { data, error } = await supabase
  .from('profiles')
  .select('*')
  
  if (error) {
    console.log(error);
    return 'failed to get profile';
  }

  return { profileData: data};
}


export async function getProfileIds() {
  const supabase = createServerComponentClient({ cookies })
  console.log('get profile ids functioning')

  const { data, error } = await supabase
  .from('profiles')
  .select('id')

  if (error) {
    console.log(error);
    return 'failed to get profile ids';
  }

  return { profileIds: data};
}