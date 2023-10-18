import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getDestinationData(id: String | undefined) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
  .from('destinations')
  .select('*')
  .eq('id', id)

  if (error) {
    console.log(error);
    return 'failed to get destination';
  }

  return data;
}

export async function getAllDestinations() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
  .from('destinations')
  .select('*')

  if (error) {
    console.log(error);
    return 'failed to get destination';
  }

  console.log('Server side destinations:', data)
  return { allDestinationData: data };
}
