"use client"

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';


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
  const router = useRouter();

  const [openModerator, setOpenModerator] = useState(false);
  const handleOpenModerator = () => setOpenModerator(true);
  const handleCloseModerator = () => setOpenModerator(false);

  const [openAdmin, setOpenAdmin] = useState(false);
  const handleOpenAdmin = () => setOpenAdmin(true);
  const handleCloseAdmin = () => setOpenAdmin(false);

  const adminDesc = "Assigning someone as an admin gives them full application privledges. This includes: activating/deactivating accounts, assiging Activities Directors to tours, and and adding/editing/deleting information such as schools, tours, sites, accomodation and bus companies.";
  const moderatorDesc = "Assiging someone as moderator will allow them to edit a trips details";
  const activeDesc = "Activating an account will allow a user to edit their profile and view upcoming and previous tours.";

  const {
    first_name,
    last_name,
    user_id,
    admin,
    moderator,
    email,
    active
  } = props.profile

  const dataSend = {
    'admin': admin,
    'moderator': moderator,
    'active': active,
    'user_id': user_id,
  }

  const postUpdate = (access: string) => {
    if (access === 'admin') { dataSend['admin'] = !admin}


    fetch('/api/auth/admin-update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSend),
    })
    router.refresh();
  }

  return (
    <div> hey {first_name} {user_id} admin? {admin ? 'yes' : 'no'}
       <div>
          <Button onClick={handleOpenModerator} variant="outlined">Change</Button>
        <Modal
        open={openModerator}
        onClose={handleCloseModerator}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>{adminDesc}</div>
            <div>Are you sure?</div>
            <Button onClick={()=> { postUpdate('admin'); handleCloseModerator();}} variant="outlined">Confirm</Button>
            <Button onClick={handleCloseModerator} variant="outlined">Cancel</Button>
          </Box>
        </Modal>
      </div>   

    </div>
  )
}

export default UserProfile