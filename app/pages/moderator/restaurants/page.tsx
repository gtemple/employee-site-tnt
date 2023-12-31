import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import DeleteButton from "@/app/components/moderator/DeleteButton";
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

  if ("error" in data) {
    return <div>Error: {data.error}</div>;
  }

  let profile = data && data[0];

  if (profile && !profile.active) {
    return <div>Authentication failed</div>;
  }

  return (
    <div>
      {restaurants.allRestaurantData &&
        restaurants.allRestaurantData.length > 0 && (
          <div>
            {profile.moderator && (
              <div className="page-nav">
                <Link href={`/pages/moderator/restaurants/add`}>
                  Add restaurant
                </Link>
                <Link href="/">Back</Link>
              </div>
            )}
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="a dense table"
                className="Table"
              >
                <TableHead>
                  <TableRow className='Table-head'>
                    <TableCell>Name</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restaurants.allRestaurantData.map(
                    (restaurant: Restaurant) => (
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
                          <Link
                            href={`/pages/moderator/restaurants/${restaurant.id}`}
                          >
                            View
                          </Link>
                        </TableCell>
                        {profile.moderator && (
                          <>
                            <TableCell>
                              <Link
                                href={`/pages/moderator/hotels/edit/${restaurant.id}`}
                              >
                                Edit
                              </Link>
                            </TableCell>
                            <TableCell>
                              <DeleteButton
                                id={restaurant.id}
                                path={"restaurants"}
                                name={restaurant.name}
                              />
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
    </div>
  );
}
