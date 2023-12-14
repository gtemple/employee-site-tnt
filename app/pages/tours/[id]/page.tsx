import { useEffect, useState } from "react";
import Link from "next/link";
import { getTourData } from "@/app/api/tours/getTours";
import Params from "@/app/typescript/params";
import '@/app/styles/tours/tour.css'

export default async function Profile({ params }: Params) {
  //@ts-ignore
  const { tourData } = await getTourData(params.id);

  const {
    id,
    name,
    city,
    address,
    website,
    postal,
    phone,
    destinations,
    description,
  } = tourData !== undefined && tourData[0];

  const displayItinerary = (itin: Itinerary | null) => {
    const [displayItinerary, setDisplayedItinerary] = useState<
    JSX.Element[] | null
  >([]);
  
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
        <PrintTourDay deleteEvent={deleteEvent} itinerary={itinerary[key]} />
      </div>
    ));
    return printedItems;
  };

  useEffect(() => {
    const result = displayItinerary(itinerary);
    setDisplayedItinerary(result);
  }, [itinerary]);

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
      </div>
    </>
  );
}
