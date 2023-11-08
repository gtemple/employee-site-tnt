import Link from "next/link";
import SiteUpdate from "@/app/components/moderator/SiteUpdate";
import { isModerator } from "@/app/api/authenticatePriviledges";
import { getSiteData } from "@/app/api/sites/getSites";
import { getAllDestinations } from "@/app/api/destinations/getDestinations";
import Params from "@/app/typescript/params";

export default async function UpdateSite({ params }: Params) {
  const writeAccess = await isModerator();
  const destinationData = await getAllDestinations();
  //@ts-ignore
  const destinations = destinationData?.allDestinationData;

  if (!writeAccess) {
    return <div>Access Denied</div>;
  }

  //@ts-ignore
  const { siteData } = await getSiteData(params.id);
  const site = siteData && siteData[0];

  return (
    <div>
      <div>
        <div>Update site: {site.name}</div>
        <div>
          {destinations ? (
            <SiteUpdate destinations={destinations} site={site} />
          ) : (
            <div className="fetch-fail">Failed to retrieve</div>
          )}
        </div>
      </div>
      <Link href="/pages/moderator/dashboard">Back</Link>
    </div>
  );
}
