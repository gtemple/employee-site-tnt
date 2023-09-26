import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export async function getProfileData(userId: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('user_id', userId)

  if (error) {
    console.log(error);
    return 'failed to get profile';
  }

  console.log(data)
  return { profileData: data};
}

export async function getAllProfiles() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
  .from('profiles')
  .select('*')

  if (error) {
    console.log(error);
    return 'failed to get profile';
  }

  console.log(data)
  return { allProfileData: data};
}


export async function getProfileIds() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
  .from('profiles')
  .select('id')

  if (error) {
    console.log(error);
    return 'failed to get profile ids';
  }
  
  console.log(data)
  return { profileIds: data};
}