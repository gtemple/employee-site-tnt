import React from 'react';
import Link from 'next/link';
import { getTourData } from '@/app/api/getTours';

import Button from '@mui/material/Button';
import UserProfile from '@/app/components/admin/UserProfile';


export default async function Tour({ params }: ({params: {id: string}})) {

  const { tourData } = await getTourData(params.id);
  const {
    start,
    end,
    notes,
    school
  } = tourData[0]

  return (
    <div>
      <div>
        <div>
          {console.log('all tour data', tourData)}
          School: {school} start: {start} end: {end}
        </div>
        <div>
          {/* <UserProfile profile={profileData[0]} /> */}
        </div>
      </div>
      <Link href="/pages/admin/dashboard">Back</Link>
      

    </div>
  )
}