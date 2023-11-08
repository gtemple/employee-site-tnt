import Link from "next/link";
import SiteAdd from "@/app/components/moderator/SiteAdd";
import { isModerator } from "@/app/api/authenticatePriviledges";
import { getAllDestinations } from "@/app/api/destinations/getDestinations";

export default async function AddSite() {
  const writeAccess = await isModerator();
  const destinationData = await getAllDestinations();
  //@ts-ignore
  const destinations = destinationData?.allDestinationData;

  if (!writeAccess) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <div>
        <div>Add Site</div>
        <div>
          {destinations !== undefined && <SiteAdd destinations={destinations} />}
        </div>
      </div>
      <Link href="/pages/moderator/dasshboard">Back</Link>
    </div>
  );
}
