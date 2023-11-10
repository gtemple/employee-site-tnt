import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getToursByUserId } from "@/app/api/tours/getTours";
import { getProfileData } from "@/app/api/getProfiles";
import Link from "next/link";
import Tour from "@/app/typescript/tour";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Tours = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let data = await getProfileData(user?.id);
  let profile = data && data[0];

  if (profile && !profile.active) {
    return <div>Authentication failed</div>;
  }

  const { tourData } = await getToursByUserId("1");

  return (
    <div>
      {tourData && tourData.length > 0 && (
        <div>
          {profile.moderator && (
            <Link href={`/pages/moderator/tours/add`}>Add site</Link>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                {tourData.map((tour: Tour) => (
                  <TableRow
                    key={tour.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {tour.schools.name}
                    </TableCell>
                    <TableCell>{tour.destination}</TableCell>
                    <TableCell>{tour.start}</TableCell>
                    <TableCell>{tour.end}</TableCell>
                    <TableCell>
                      <Link href={`/pages/tours/${tour.id}`}>View</Link>
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
  );
};

export default Tours;
