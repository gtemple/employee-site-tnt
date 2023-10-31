import Link from "next/link";
import { getHotelData } from "@/app/api/hotels/getHotels";
import { isModerator } from "@/app/api/authenticatePriviledges";
import Params from "@/app/typescript/params";
import Hotel from "@/app/typescript/hotel";
import "@/app/styles/sites/site.css";

export default async function Hotels({ params }: Params) {
  const moderator = await isModerator();
  //@ts-ignore
  const { hotelData } = await getHotelData(params.id);

  const { id, name, address, destination_id, postal, email, destinations} = hotelData[0];

  return (
    <>
      <div>
        <div className="site-header">
          <div>
            <h2>{name}</h2>
            <h4>{address}</h4>
            <h4>{destinations.name}</h4>
          </div>
        </div>
      </div>
      <div className="footer-links">
        {moderator && (
          <Link
            className="edit-btn"
            href={`/pages/moderator/hotels/edit/${id}`}
          >
            Edit
          </Link>
        )}
        <Link className="back-btn" href="/pages/sites">
          Back
        </Link>
      </div>
    </>
  );
}
