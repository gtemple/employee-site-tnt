import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { getProfileData } from "@/app/api/getProfiles";
import { getAllHotels } from "@/app/api/hotels/getHotels";
import { isModerator, isAdmin } from "@/app/api/authenticatePriviledges";
import Hotel from "@/app/typescript/hotel";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default async function Sites() {
  const supabase = createServerComponentClient({ cookies });
  const moderator = await isModerator();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const hotels = await getAllHotels();

  let data = await getProfileData(user?.id);
  let profile = data && data[0];

  if (profile && !profile.active) {
    return <div>Authentication failed</div>;
  }

  return (
    <div>
      {
        //@ts-ignore
        hotels.allHotelData?.length > 0 && (
          <div>
            <div>
              {profile.first_name} {profile.last_name} hotels
            </div>
            {profile.moderator && (
              <Link href={`/pages/moderator/hotels/add`}>Add Hotel</Link>
            )}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {
                    //@ts-ignore
                    hotels.allHotelData.map((hotel: Hotel) => (
                      <TableRow
                        key={hotel.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{hotel.name}</TableCell>
                        <TableCell>{hotel.destinations.name}</TableCell>
                        <TableCell>{hotel.phone}</TableCell>
                        <TableCell>
                          <Link href={`/pages/moderator/hotels/${hotel.id}`}>
                            View
                          </Link>
                        </TableCell>
                        {profile.moderator && (
                          <TableCell>
                            <Link
                              href={`/pages/moderator/hotels/edit/${hotel.id}`}
                            >
                              Edit
                            </Link>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )
      }
      <Link href="/">Back</Link>
    </div>
  );
}
