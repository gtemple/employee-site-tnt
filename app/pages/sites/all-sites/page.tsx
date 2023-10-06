import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { getProfileData } from '@/app/api/getProfiles'
import { getAllSites } from '@/app/api/getSites'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default async function Admin() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  const sites = await getAllSites();
  const { profileData } = await getProfileData(user?.id);

  if (profileData && !profileData[0].active) {
    return <div>Authentication failed</div>
  }

  return (
    <div>
      {console.log(sites)}
      {/* {sites.allSiteData?.length > 0 && (
        <div>
          <div>
            {profileData[0].first_name} {profileData[0].last_name} sites
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell>Site</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Moderator</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Full Profile</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {profiles.allProfileData.map((profile) => (
                    <TableRow
                      key={profile.email}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{profile.first_name}</TableCell>
                      <TableCell>{profile.last_name}</TableCell>
                      <TableCell>{profile.email}</TableCell>
                      <TableCell>{profile.active ? 'yes' : 'no'}</TableCell>
                      <TableCell>{profile.moderator ? 'yes' : 'no'}</TableCell>
                      <TableCell>{profile.admin ? 'yes' : 'no'}</TableCell>
                      <TableCell>
                        <Link href={`/pages/admin/${profile.id}`}>
                            Edit
                          </Link>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )} */}
      <Link href="/">Back</Link>

    </div>
  )
}