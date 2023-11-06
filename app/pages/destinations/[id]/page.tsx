import Link from "next/link";
import { getDestinationData } from "@/app/api/destinations/getDestinations";
import { isModerator } from "@/app/api/authenticatePriviledges";
import Params from "@/app/typescript/params";
import Destination from "@/app/typescript/destination";


export default async function Profile({ params }: Params) {
  const moderator = await isModerator();
  //@ts-ignore
  const { destinationData } = await getSiteData(params.id);

  const {
    id,
    name,
    region,
    country
  } = destinationData !== undefined && destinationData[0];

  return (
    <>
      <div>
        <div className="site-header">
          <div className="site-img">Placeholder for site image</div>
          <div>
            <h2>{name}, {region}, {country}</h2>
          </div>
        </div>
      </div>
      <div className="footer-links">
        {moderator && (
          <Link className="edit-btn" href={`/pages/moderator/destinations/edit/${id}`}>
            Edit
          </Link>
        )}
        <Link className="back-btn" href="/pages/destinations">
          Back
        </Link>
      </div>
    </>
  );
}
