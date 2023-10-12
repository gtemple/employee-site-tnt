import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

async function getUser() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('user_id', user?.id)

  if (error) {
    console.log(error);
    return 'failed to check priviledges';
  }

  return data;
}

export async function isModerator() {
  const user = await getUser();
  return user.moderator ? true : false;
}

export async function isAdmin() {
  const user = await getUser();
  return user.admin ? true : false;
}