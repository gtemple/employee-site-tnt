import React from 'react';
import Link from 'next/link';
import { getSiteData } from '@/app/api/sites/getSites';

import Button from '@mui/material/Button';
import UserProfile from '@/app/components/admin/UserProfile';


export default async function Profile({ params }) {

  const { siteData } = await getSiteData(params.id);
  const {
    name,
    city,
    address,
    website,
    postal,
    phone,
    description
  } = siteData[0]

  return (
    <div>
      <div>
        <div>site: {name} city: {city}
          description: {description}
        </div>
        <div>
          {/* <UserProfile profile={profileData[0]} /> */}
        </div>
      </div>
      <Link href="/pages/admin/dashboard">Back</Link>
      

    </div>
  )
}