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
        <h3>Add Hotel</h3>
        <div>
          {destinations !== undefined && <HotelAdd destinations={destinations} />}
        </div>
      </div>
    </div>
  );
}
