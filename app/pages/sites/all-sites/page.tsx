import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { getProfileData } from "@/app/api/getProfiles";
import { getAllSites } from "@/app/api/sites/getSites";
import { isModerator, isAdmin } from "@/app/api/authenticatePriviledges";
import Site from "@/app/typescript/site";

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

  const sites = await getAllSites();

  let data = await getProfileData(user?.id);
  let profile = data && data[0];

  if (profile && !profile.active) {
    return <div>Authentication failed</div>;
  }

  return (
    <div>
      {
        //@ts-ignore
      sites.allSiteData?.length > 0 && (
        <div>
          <div>
            {profile.first_name} {profile.last_name} sites
          </div>
          {profile.moderator && (
            <Link href={`/pages/moderator/site/add`}>Add site</Link>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                {
                  //@ts-ignore
                sites.allSiteData.map((site: Site) => (
                  <TableRow
                    key={site.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {site.image}
                    </TableCell>
                    <TableCell>{site.name}</TableCell>
                    <TableCell>{site.city}</TableCell>
                    <TableCell>
                      <Link href={`/pages/sites/${site.id}`}>View</Link>
                    </TableCell>
                    {profile.moderator && (
                      <TableCell>
                        <Link href={`/pages/moderator/site/${site.id}`}>
                          Edit
                        </Link>
                      </TableCell>
                    )}
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
}
