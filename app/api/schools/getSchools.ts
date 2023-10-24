import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { isModerator } from '../authenticatePriviledges';

/*
ALL GET REQUESTS
*/
export async function getSchoolData(id: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
  .from('schools')
  .select(`*, boards (*)`)
  .eq('id', id)

  if (error) {
    console.log(error);
    return 'failed to get school';
  }

  console.log(data)
  return { schoolData: data};
}

export async function getAllSchools() {
  const supabase = createServerComponentClient({ cookies })
  const writeAccess = await isModerator();

  if (!writeAccess) {
    console.log('Access Denied - You are not an approved moderator')
    return 'Access Denied - You are not an approved moderator'
  }

  const { data, error } = await supabase
  .from('schools')
  .select('*')

  if (error) {
    console.log(error);
    return 'failed to get schools';
  }

  console.log(data)
  return { allSchoolData: data};
}


export async function getSchoolIds() {
  const supabase = createServerComponentClient({ cookies })
  const writeAccess = await isModerator();

  if (!writeAccess) {
    console.log('Access Denied - You are not an approved moderator')
    return 'Access Denied - You are not an approved moderator'
  }

  const { data, error } = await supabase
  .from('schools')
  .select('id')

  if (error) {
    console.log(error);
    return 'failed to get school ids';
  }
  
  console.log(data)
  return { schoolIds: data};
}

