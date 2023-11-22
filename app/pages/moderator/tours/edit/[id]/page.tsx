import Params from "@/app/typescript/params";
import { getAllSchools } from "@/app/api/schools/getSchools";
import { getAllDestinations } from "@/app/api/destinations/getDestinations";
import { getAllHotels } from "@/app/api/hotels/getHotels";
import { getAllRestaurants } from "@/app/api/restaurants/getRestaurants";
import { getAllSites } from "@/app/api/sites/getSites";
import { getTourData } from "@/app/api/tours/getTours";

import { AddTourDay } from "@/app/components/moderator/tour/AddTourDay";

export const EditTour = async ({ params }: Params) => {
  console.log('hi')
  try {
    // Make all async calls concurrently using Promise.all
    const [schools, destinations, hotels, restaurants, sites] =
      await Promise.all([
        getAllSchools(),
        getAllDestinations(),
        getAllHotels(),
        getAllRestaurants(),
        getAllSites(),
      ]);
    const response = await getTourData(params.id);
    const tour = response.tourData !== undefined && response.tourData[0];

    return (
      <div>
        {schools.allSchoolData &&
          destinations.allDestinationData &&
          hotels.allHotelData &&
          restaurants.allRestaurantData &&
          sites.allSiteData && (
            <AddTourDay
              schools={schools.allSchoolData}
              destinations={destinations.allDestinationData}
              hotels={hotels.allHotelData}
              restaurants={restaurants.allRestaurantData}
              sites={sites.allSiteData}
              tour={tour}
            />
          )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors appropriately
    return <div>Error fetching data</div>;
  }
};

export default EditTour;

/*

{
  id: 2,
  created_at: '2023-11-21T15:20:57.152237+00:00',
  itinerary: {
    '1': { date: '2023-11-21T05:00:00.000Z', schedule: [Object] },
    '2': { date: '2023-11-22T05:00:00.000Z', schedule: [Object] }
  },
  start: '2023-11-21',
  end: '2023-11-23',
  school_id: 1,
  notes: null,
  info: null,
  students: 20,
  destination_id: 1,
  schools: {
    id: 1,
    created_at: '2023-10-04T18:25:32.332452+00:00',
    name: 'Northlea Public School',
    grade: '8',
    address: '305 Rumsey Rd',
    city: 'Toronto',
    postal: 'ON M4G 1R4',
    teacher: 'G. Temple',
    notes: null,
    phone: '(416) 555-5555',
    board: 1
  }
}

*/
