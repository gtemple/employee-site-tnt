import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { getProfileData } from '@/app/api/getProfiles'
import { getAllSites } from '@/app/api/getSites'
import { isModerator, isAdmin } from '@/app/api/authenticatePriviledges'
import Site from '@/app/typescript/site'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default async function Admin() {
  const supabase = createServerComponentClient({ cookies })
  const moderator = await isModerator()
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
      {console.log('here -----------------', moderator)}
      {sites.allSiteData?.length > 0 && (
        <div>
          <div>
            {profileData[0].first_name} {profileData[0].last_name} sites
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                </TableRow>
              </TableHead>
              <TableBody>
                {sites.allSiteData.map((site: Site) => (
                    <TableRow
                      key={site.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{site.image}</TableCell>
                      <TableCell>{site.name}</TableCell>
                      <TableCell>{site.city}</TableCell>
                      <TableCell>
                        <Link href={`/pages/sites/${site.id}`}>
                            View
                        </Link>
                      </TableCell>
                        {profileData[0].moderator && (
                          <TableCell>
                            <Link href={`/pages/moderator/sites/${site.id}`}>
                                Edit
                            </Link>
                          </TableCell>
                        )}
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <Link href="/">Back</Link>

    </div>
  )
}
