import Link from "next/link";
import { getTourData } from "@/app/api/tours/getTours";
import Params from "@/app/typescript/params";
import '@/app/styles/tours/tour.css'
import { Itinerary } from "@/app/typescript/itinerary";
import dayjs from "dayjs";
import PrintTourDay from "@/app/components/moderator/tour/PrintTourDay";

export default async function Profile({ params }: Params) {
  //@ts-ignore
  const { tourData } = await getTourData(params.id);

  const {
    name,
    itinerary,
    destinations,
    description,
  } = tourData !== undefined && tourData[0];

  const displayItinerary = (itin: Itinerary | null) => {

    if (!itin) {
      return null;
    }

    const printedItems = Object.keys(itin).map((key) => (
      <div>
        <div className="tour-day" key={key}>
          <div className="tour-date">
            <div className="current-date">
              {/* @ts-ignore */}
              {dayjs(itin[key].date).format("dddd, MMMM D – YYYY")}
            </div>
          </div>
        </div>
        {/* @ts-ignore */}
        <PrintTourDay deleteEvent={null} itinerary={itinerary[key]} />
      </div>
    ));
    return printedItems;
  };

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
        <div>{displayItinerary(itinerary)}</div>
      </div>
    </>
  );
}
