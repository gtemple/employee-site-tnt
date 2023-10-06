import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export async function getSiteData(id: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
  .from('sites')
  .select('*')
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


export async function getTourIds() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
  .from('tours')
  .select('id')

  if (error) {
    console.log(error);
    return 'failed to get tour ids';
  }
  
  console.log(data)
  return { tourIds: data};
}