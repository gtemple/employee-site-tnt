"use client"

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { getProfileData } from '@/app/api/getProfilesClient';

import Button from '@mui/material/Button';


export default async function Profile({ params }) {

  const { profileData } = await getProfileData(params.id);
  const {
    first_name,
    last_name,
    user_id,
    admin,
    moderator,
    email,
    active
  } = profileData[0]

  const adminValidation = () => {

    return (
      <div>
        <Button>Are you sure?</Button>
      </div>
    )
  }

  return (
    <div>
      <div>
        hello {first_name} {last_name}
        <div>
          <button onClick={adminValidation} variant="outlined">Hello</button>
        </div>
      </div>
      <Link href="/pages/admin/dashboard">Back</Link>
      

    </div>
  )
}


