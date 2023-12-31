import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getToursByUserId } from "@/app/api/tours/getTours";
import { getProfileData } from "@/app/api/getProfiles";
import dayjs from "dayjs";
import Link from "next/link";
import Tour from "@/app/typescript/tour";
import "@/app/styles/tours/tour.css";

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

  if ("error" in data) {
    return <div>Error: {data.error}</div>;
  }

  let profile = data && data[0];

  if (profile && !profile.active) {
    return <div>Authentication failed</div>;
  }

  const { tourData } = await getToursByUserId(profile.id);

  if (!tourData) {
    return (
      <div className="no-tours">
        <div>You do not currently have any tours scheduled.</div>
        <Link className="request" href="/">
          Request a tour
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-nav">
        <Link href="/">Back</Link>
      </div>
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
                    <TableCell>{tour.destinations.name}</TableCell>
                    <TableCell>
                      {dayjs(tour.start).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      {dayjs(tour.end).format("DD/MM/YYYY")}
                    </TableCell>
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
    </div>
  );
};

export default Tours;
