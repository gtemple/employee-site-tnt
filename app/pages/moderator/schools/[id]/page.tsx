import Link from "next/link";
import { getSchoolData } from "@/app/api/schools/getSchools";
import { isModerator } from "@/app/api/authenticatePriviledges";
import Params from "@/app/typescript/params";
import School from "@/app/typescript/school";

import "@/app/styles/sites/site.css";

export default async function School({ params }: Params) {
  const moderator = await isModerator();
  //@ts-ignore
  const { schoolData } = await getSchoolData(params.id);

  const { id, name, grade, address, city, teacher, notes } = schoolData !== undefined && schoolData[0];

  return (
    <>
      <div>
        <div className="site-header">
          <div>
            <h2>{name}</h2>
            <h4>{address}</h4>
            <h4>{city}</h4>
          </div>
        </div>
      </div>
      <div className="footer-links">
        {moderator && (
          <Link
            className="edit-btn"
            href={`/pages/moderator/schools/edit/${id}`}
          >
            Edit
          </Link>
        )}
        <Link className="back-btn" href="/pages/sites">
          Back
        </Link>
      </div>
    </>
  );
}
