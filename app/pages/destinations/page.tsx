
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getProfileData } from "@/app/api/getProfiles";
import { getAllDestinations } from "@/app/api/destinations/getDestinations";
import Destination from "@/app/typescript/destination";
import DeleteButton from "@/app/components/moderator/DeleteButton";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default async function Sites() {
  const router = useRouter();
  router.refresh();
  const supabase = createServerComponentClient({cookies});
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const destinations = await getAllDestinations();

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
      {
        destinations.allDestinationData && destinations.allDestinationData.length > 0 && (
          <div>
            <div>
              {profile.first_name} {profile.last_name} sites
            </div>
            {profile.moderator && (
              <Link href={`/pages/moderator/destination/add`}>Add Destination</Link>
            )}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {
                    destinations.allDestinationData && destinations.allDestinationData.map((destination: Destination) => (
                      <TableRow
                        key={destination.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{destination.name}</TableCell>
                        <TableCell>
                          <Link href={`/pages/destinations/${destination.id}`}>View</Link>
                        </TableCell>
                        {profile.moderator && (
                          <>
                            <TableCell>
                              <Link href={`/pages/moderator/destination/${destination.id}`}>
                                Edit
                              </Link>
                            </TableCell>
                            <TableCell>
                              <DeleteButton id={destination.id} path={'destination'} name={destination.name} />
                            </TableCell>
                          </>
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
