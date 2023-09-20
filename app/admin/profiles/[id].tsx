import React from 'react'
import { getProfileData, getProfileIds } from '../lib/profiles'

console.log('yo')

export async function getStaticProps({ params }) {
  console.log('yo')
  const profileData = await getProfileData(params.user_id)


  console.log(profileData)

  return {
    props: {
      profileData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getProfileIds();
  return {
    paths,
    fallback: false,
  };
}

const Profile = ({profileData}) => {
  return (
    <div>hello profile {console.log(profileData)}</div>
  )
}

export default Profile