import Link from "next/link";
import HotelUpdate from "@/app/components/moderator/HotelUpdate";
import { isModerator } from "@/app/api/authenticatePriviledges";
import { getAllDestinations } from "@/app/api/destinations/getDestinations";
import { getHotelData } from "@/app/api/hotels/getHotels";
import Params from "@/app/typescript/params";

export default async function UpdateHotel({ params }: Params) {
  const writeAccess = await isModerator();

  if (!writeAccess) {
    return <div>Access Denied</div>;
  }
  console.log('hello')
  const destinationData = await getAllDestinations();
  //@ts-ignore
  const { hotelData }= await getHotelData(params.id);
  //@ts-ignore
  const destinations = destinationData?.allDestinationData
  //@ts-ignore
  const { name } = hotelData[0];

  return (
    <div>
      <div>
        <div>Update site: {name}</div>
        <div>
          <HotelUpdate hotel={hotelData[0]} destinations={destinations} />
        </div>
      </div>
      <Link href="/pages/moderator/hotels">Back</Link>
    </div>
  );
}
