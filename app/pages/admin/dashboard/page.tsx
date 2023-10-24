import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Profile from "@/app/typescript/profile";
import { getProfileData, getAllProfiles } from "@/app/api/getProfiles";

import "@/app/styles/admin/dashboard.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default async function Admin() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profiles = await getAllProfiles();
  console.log(user);
  const profileData = await getProfileData(user?.id);

  if (profileData && !profileData[0].admin) {
    return <div>Authentication failed</div>;
  }

  return (
    <div>
      {
        //@ts-ignore
        profiles.allProfileData?.length > 0 && (
          <div>
            <div>
              {profileData[0].first_name} {profileData[0].last_name} admin
              dashboard
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Full Profile</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    //@ts-ignore
                    profiles.allProfileData.map((profile: Profile) => (
                      <TableRow
                        key={profile.email}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {profile.first_name}
                        </TableCell>
                        <TableCell>{profile.last_name}</TableCell>
                        <TableCell>{profile.email}</TableCell>
                        <TableCell>
                          {profile.active ? (
                            <span className="active status">active</span>
                          ) : (
                            <span className="inactive status">inactive</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {profile.moderator ? (
                            <span className="moderator status">moderator</span>
                          ) : null}
                        </TableCell>
                        <TableCell>
                          {profile.admin ? (
                            <span className="admin status">admin</span>
                          ) : null}
                        </TableCell>
                        <TableCell>
                          <Link href={`/pages/admin/${profile.id}`}>Edit</Link>
                        </TableCell>
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
