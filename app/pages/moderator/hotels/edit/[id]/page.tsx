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

  const destinationData = await getAllDestinations();
  const { hotelData } = await getHotelData(params.id);
  //@ts-ignore
  const destinations = destinationData && destinationData.allDestinationData;
  const hotel = hotelData && hotelData[0];

  return (
    <div>
      <div>
        <h3>Update site: {hotel.name}</h3>
        <div>
          {destinations ? (
            <HotelUpdate hotel={hotel} destinations={destinations} />
          ) : (
            <div className='fetch-fail'>Failed to retrieve</div>
          )}
        </div>
      </div>
    </div>
  );
}
