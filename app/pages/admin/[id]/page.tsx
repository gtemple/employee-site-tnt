import React from 'react'
import { getProfileIds, getProfileData } from '@/app/lib/profiles';

export async function getStaticPaths() {
  const paths = await getProfileIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const profileData = await getProfileData(params.id)
  console.log('profile data:', profileData)

  return {
    props: {
      profileData,
    },
  };
}

export default function Profile({ profileData }) {
  console.log(profileData)
  console.log('test', profileData.id)
  return (
    <div>hello profile {console.log(profileData.id)} {profileData.id}</div>
  )
}

