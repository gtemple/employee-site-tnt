import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export async function getTourData(id: String) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
  .from('tours')
  .select(`*, schools (*)`)
  .eq('id', id)

  if (error) {
    console.log(error);
    return 'failed to get tours';
  }

  console.log(data)
  return { tourData: data};
}

export async function getAllTours() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
  .from('tours')
  .select('*')

  if (error) {
    console.log(error);
    return 'failed to get tour';
  }

  console.log('tour data:', data)
  return { allTourData: data};
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