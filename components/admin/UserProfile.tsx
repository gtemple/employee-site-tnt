"use client"

import React from 'react'
import { useState } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { prototype } from 'module';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const UserProfile = (props) => {
  const {
    first_name,
    last_name,
    user_id,
    admin,
    moderator,
    email,
    active
  } = props.profile

  return (
    <div> hey {first_name} {user_id}
      {console.log(props)}
      {/* <div>
        {console.log(props)}
        <div>
          <Button onClick={adminValidation} variant="outlined">Hello</Button>
        </div>
      </div> */}      

    </div>
  )
}

export default UserProfile