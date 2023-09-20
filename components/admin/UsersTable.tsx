import React from 'react'
import Link from 'next/link'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function UsersTable({userData}) {
  const profiles = userData['data']

  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Moderator</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Full Profile</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {profiles.map((profile) => (
              <TableRow
                key={profile.email}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >{console.log(profile)}
                <TableCell component="th" scope="row">{profile.first_name}</TableCell>
                <TableCell>{profile.last_name}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>{profile.active ? 'yes' : 'no'}</TableCell>
                <TableCell>{profile.moderator ? 'yes' : 'no'}</TableCell>
                <TableCell>{profile.admin ? 'yes' : 'no'}</TableCell>
                <TableCell>
                  <Link href={`/admin/profiles/${profile.user_id}`}>Edit</Link>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
};