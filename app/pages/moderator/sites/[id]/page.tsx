import Link from 'next/link';
import SiteUpdateForm from '@/app/components/moderator/SiteUpdateForm';
import { isModerator } from '@/app/api/authenticatePriviledges';
import { getSiteData } from '@/app/api/sites/getSites';
import { getAllDestinations } from '@/app/api/destinations/getDestinations';


export default async function UpdateSite({ params }) {
  const writeAccess = await isModerator();
  const destinationData = await getAllDestinations();
  const destinations = destinationData?.allDestinationData;

  if (!writeAccess) {
    return <div>Access Denied</div>
  }

  const { siteData } = await getSiteData(params.id);
  const {
    name
  } = siteData[0]

  return (
    <div>
      <div>
        <div>Update site: {name}</div>
        <div>
          <SiteUpdateForm destinations={destinations} site={siteData[0]} />
        </div>
      </div>
      <Link href="/pages/moderator/dashboard">Back</Link>
    </div>
  )
}