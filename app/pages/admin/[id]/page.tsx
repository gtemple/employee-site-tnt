import React from 'react';
import Link from 'next/link';
import { getProfileData } from '@/app/api/getProfiles';
import Params from '@/app/typescript/params';
import UserProfile from '@/app/components/admin/UserProfile';


export default async function Profile({ params }: Params) {

  const profileData = await getProfileData(params.id);
  const {
    first_name,
    last_name,
    user_id,
    admin,
    moderator,
    email,
    active
  } = profileData[0]

  return (
    <div>
      <div>
        hello {first_name} {last_name}
        <div>
          <UserProfile profile={profileData[0]} />
        </div>
      </div>
      <Link href="/pages/admin/dashboard">Back</Link>
      

    </div>
  )
}


