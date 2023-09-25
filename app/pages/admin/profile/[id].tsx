import React from 'react'
import { useRouter } from 'next/router'
// import { getProfileData, getProfileIds } from '../../lib/profiles'

export default function Profile() {
  const router = useRouter();
  const id = router.query.id as string
  console.log('test')
  return (
    <div>hello profile {console.log(id)} id</div>
  )
}

// export async function getStaticPaths() {
//   const paths = await getProfileIds();
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps(params) {
//   const profileData = await getProfileData(params.id)
//   console.log('profile data:', profileData)

//   return {
//     props: {
//       profileData,
//     },
//   };
// }

