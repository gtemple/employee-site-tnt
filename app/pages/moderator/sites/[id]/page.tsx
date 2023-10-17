import React from 'react';
import Link from 'next/link';
import { isModerator } from '@/app/api/authenticatePriviledges';
import { getSiteData } from '@/app/api/sites/getSites';
import { TextField } from '@mui/material'


export default async function UpdateSite({ params }) {
  const writeAccess = isModerator();

  if (!writeAccess) {
    return <div>Access Denied</div>
  }

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
        <div>Update site: {name}</div>
        <div>
        <form
          action="api/sites/update"
          method="post"
          className='form'
        >
          <TextField id="outlined-basic" label="Site Name" variant="outlined" type="text" name="name" defaultValue={name} required/>
          <TextField
          id="standard-textarea"
          className='extended-field'
          label="Description"
          defaultValue={description}
          multiline
          variant="outlined"
          />
          <button>Update</button>
        </form>

        </div>
      </div>
      <Link href="/pages/moderator/dashboard">Back</Link>
    </div>
  )
}