import React from 'react'
import { getProfileData, getProfileIds } from '../../lib/profiles'

export default function Profile({profileData}) {
  console.log('test')
  return (
    <div>hello profile {console.log(profileData.id)}</div>
  )
}

export async function getStaticPaths() {
  console.log('yoo')
  const paths = await getProfileIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log('yo')
  const profileData = await getProfileData(params.id)
  console.log(profileData)

  return {
    props: {
      profileData,
    },
  };
}

