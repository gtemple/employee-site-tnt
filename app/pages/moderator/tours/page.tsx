import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getAllTours } from "@/app/api/tours/getTours";
import { getProfileData } from "@/app/api/getProfiles";
import Link from "next/link";
import Tour from "@/app/typescript/tour";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ModeratorTours = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let data = await getProfileData(user?.id);
  let profile = Array.isArray(data) && data[0];

  if (profile && !profile.active) {
    return <div>Authentication failed</div>;
  }

  const { allTourData } = await getAllTours();

  return (
    <div>
      {allTourData && allTourData.length > 0 && (
        <div>
          {profile.moderator && (
            <div className='page-nav'>
              <Link href={`/pages/moderator/tours/add`}>Add tour</Link>
              <Link href="/pages/moderator/dashboard">Back</Link>
            </div>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                {allTourData.map((tour: Tour) => (
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
                      {tour.profile_id
                        ? `${tour.profiles.first_name} ${tour.profiles.last_name}`
                        : "unassigned"}
                    </TableCell>
                    <TableCell>
                      <Link href={`/pages/tours/${tour.id}`}>View</Link>
                    </TableCell>

                    <TableCell>
                      <Link href={`/pages/moderator/tours/edit/${tour.id}`}>
                        Edit
                      </Link>
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

export default ModeratorTours;
