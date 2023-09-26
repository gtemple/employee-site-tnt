import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getProfileData(userId: String) {
  const supabase = createClientComponentClient();

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
  const supabase = createClientComponentClient()

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
  const supabase = createClientComponentClient()

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