import Link from "next/link";
import HotelAdd from "@/app/components/moderator/HotelAdd"
import { isModerator } from "@/app/api/authenticatePriviledges";
import { getAllDestinations } from "@/app/api/destinations/getDestinations";

export default async function AddHotel() {
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
        <div>Add Hotell</div>
        <div>
          <HotelAdd destinations={destinations} />
        </div>
      </div>
      <Link href="/pages/moderator/dashboard">Back</Link>
    </div>
  );
}
