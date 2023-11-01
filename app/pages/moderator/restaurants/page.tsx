import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { getProfileData } from "@/app/api/getProfiles";
import { getAllRestaurants } from "@/app/api/restaurants/getRestaurants";
import { isModerator } from "@/app/api/authenticatePriviledges";
import Restaurant from "@/app/typescript/restaurant";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default async function Sites() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const restaurants = await getAllRestaurants();

  let data = await getProfileData(user?.id);
  let profile = data && data[0];

  if (profile && !profile.active) {
    return <div>Authentication failed</div>;
  }

  return (
    <div>
      {
        //@ts-ignore
        restaurants.allRestaurantData?.length > 0 && (
          <div>
            <div>
              {profile.first_name} {profile.last_name} restaurants
            </div>
            {profile.moderator && (
              <Link href={`/pages/moderator/restaurants/add`}>Add restaurant</Link>
            )}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {
                    //@ts-ignore
                    restaurants.allRestaurantData.map((restaurant: Restaurant) => (
                      <TableRow
                        key={restaurant.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{restaurant.name}</TableCell>
                        <TableCell>{restaurant.destinations.name}</TableCell>
                        <TableCell>{restaurant.phone}</TableCell>
                        <TableCell>
                          <Link href={`/pages/moderator/restaurants/${restaurant.id}`}>
                            View
                          </Link>
                        </TableCell>
                        {profile.moderator && (
                          <TableCell>
                            <Link
                              href={`/pages/moderator/hotels/edit/${restaurant.id}`}
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
