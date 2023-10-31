import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { getProfileData } from "@/app/api/getProfiles";
import { getAllSchools } from "@/app/api/schools/getSchools";
import { isModerator, isAdmin } from "@/app/api/authenticatePriviledges";
import School from "@/app/typescript/school";

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

  const schools = await getAllSchools();

  let data = await getProfileData(user?.id);
  let profile = data && data[0];

  if (profile && !profile.active) {
    return <div>Authentication failed</div>;
  }

  return (
    <div>
      {
        //@ts-ignore
        schools.allSchoolData?.length > 0 && (
          <div>
            <div>
              {profile.first_name} {profile.last_name} sites
            </div>
            {profile.moderator && (
              <Link href={`/pages/moderator/schools/add`}>Add school</Link>
            )}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {
                    //@ts-ignore
                    schools.allSchoolData.map((school: School) => (
                      <TableRow
                        key={school.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{school.name}</TableCell>
                        <TableCell>{school.boards.acronym}</TableCell>
                        <TableCell>{school.city}</TableCell>
                        <TableCell>{school.grade}</TableCell>
                        <TableCell>
                          <Link href={`/pages/moderator/schools/${school.id}`}>
                            View
                          </Link>
                        </TableCell>
                        {profile.moderator && (
                          <TableCell>
                            <Link
                              href={`/pages/moderator/schools/edit/${school.id}`}
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
