import React from "react";
import Link from "next/link";
import { getSiteData } from "@/app/api/sites/getSites";
import { isModerator } from "@/app/api/authenticatePriviledges";

import "@/app/styles/sites/site.css";

export default async function Profile({ params }) {
  const moderator = await isModerator();
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
  } = siteData[0];

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
      <div className='footer-links'>
        {moderator && <Link className='edit-btn' href={`/pages/moderator/site/${id}`}>Edit</Link>}
        <Link className='back-btn' href="/pages/sites">Back</Link>
      </div>
    </>
  );
}
