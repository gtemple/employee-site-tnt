import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { isModerator } from '../authenticatePriviledges';

/*
ALL GET REQUESTS
*/
export async function getSiteData(id: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
  .from('sites')
  .select(`*, destinations (*)`)
  .eq('id', id)

  if (error) {
    console.log(error);
    return 'failed to get site';
  }

  console.log(data)
  return { siteData: data};
}

export async function getAllSites() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
  .from('sites')
  .select('*')

  if (error) {
    console.log(error);
    return 'failed to get sites';
  }

  console.log(data)
  return { allSiteData: data};
}


export async function getSiteIds() {
  const supabase = createServerComponentClient({ cookies })
  const writeAccess = isModerator();

  if (!writeAccess) {
    console.log('Access Denied - You are not an approved moderator')
    return 'Access Denied - You are not an approved moderator'
  }

  const { data, error } = await supabase
  .from('sites')
  .select('id')

  if (error) {
    console.log(error);
    return 'failed to get site ids';
  }
  
  console.log(data)
  return { siteIds: data};
}


/*
ALL UPDATE REQUESTS
*/

export async function updateSiteData(id: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
  .from('sites')
  .update({ name: 'Australia' })
  .eq('id', id)
  .select()

  if (error) {
    console.log(error);
    return 'failed to get site';
  }

  console.log(data)
}