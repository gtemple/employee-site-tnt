import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import DeleteButton from "@/app/components/moderator/DeleteButton";
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
  // const router = useRouter();
  // router.refresh();
  const supabase = createServerComponentClient({ cookies });
  const moderator = await isModerator();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const schools = await getAllSchools();

  let data = await getProfileData(user?.id);
  //@ts-ignore
  let profile = data && data[0];

  if (profile && !profile.active) {
    return <div>Authentication failed</div>;
  }

  return (
    <div>
      {schools.allSchoolData && schools.allSchoolData.length > 0 && (
        <div>
          {profile.moderator && (
            <div className="page-nav">
              <Link href={`/pages/moderator/schools/add`}>Add school</Link>
              <Link href="/">Back</Link>
            </div>
          )}
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              className="Table"
            >
              <TableHead>
                <TableRow className="Table-head">
                  <TableCell>Name</TableCell>
                  <TableCell>Board</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
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
                        <>
                          <TableCell>
                            <Link
                              href={`/pages/moderator/schools/edit/${school.id}`}
                            >
                              Edit
                            </Link>
                          </TableCell>
                          <TableCell>
                            <DeleteButton
                              id={school.id}
                              path={"schools"}
                              name={school.name}
                            />
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
      )}
    </div>
  );
}
