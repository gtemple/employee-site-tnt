import React from 'react'
import {  getProfileData } from '@/app/lib/profiles';


export default async function Profile({ params }) {
  console.log('params', params, params.id)
  const { profileData } = await getProfileData(params.id);
  console.log(profileData)

  return (
    <div>hello profile
      {profileData[0].first_name}
      </div>
  )
}

