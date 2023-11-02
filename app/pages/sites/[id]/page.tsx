import Link from "next/link";
import { getSiteData } from "@/app/api/sites/getSites";
import { isModerator } from "@/app/api/authenticatePriviledges";
import Params from "@/app/typescript/params";
import Site from "@/app/typescript/site";

import "@/app/styles/sites/site.css";

export default async function Profile({ params }: Params) {
  const moderator = await isModerator();
  //@ts-ignore
  const { siteData } = await getSiteData(params.id);

  const {
    id,
    name,
    city,
    address,
    website,
    postal,
    phone,
    destinations,
    description,
  } = siteData !== undefined && siteData[0];

  return (
    <>
      <div>
        <div className="site-header">
          <div className="site-img">Placeholder for site image</div>
          <div>
            <h2>{name}</h2>
            <h4>
              {destinations.name}, {destinations.region}
            </h4>
          </div>
        </div>
        <h4>About</h4>
        <div>{description}</div>
      </div>
      <div className="footer-links">
        {moderator && (
          <Link className="edit-btn" href={`/pages/moderator/site/${id}`}>
            Edit
          </Link>
        )}
        <Link className="back-btn" href="/pages/sites/all-sites">
          Back
        </Link>
      </div>
    </>
  );
}
