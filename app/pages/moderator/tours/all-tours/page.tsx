import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { getProfileData } from '@/app/api/getProfiles'
import { getAllTours } from '@/app/api/getTours'
import Tour from '@/app/typescript/tour'

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
  
  const tours = await getAllTours();
  let data = await getProfileData(user?.id)
  let profile = data && data[0]

  if (profile && !profile.active) {
    return <div>Authentication failed</div>
  }

  return (
    <div>
      {
      //@ts-ignore
      tours.allTourData?.length > 0 && (
        <div>
          <div>
            {profile.first_name} {profile.last_name} tours
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                //@ts-ignore
                tours.allTourData.map((tour: Tour) => (
                    <TableRow
                      key={tour.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{tour.school}</TableCell>
                      <TableCell>{tour.start}</TableCell>
                      <TableCell>{tour.end}</TableCell>
                      <TableCell>
                        <Link href={`/pages/moderator/tours/${tour.id}`}>
                            View
                          </Link>
                      </TableCell>
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