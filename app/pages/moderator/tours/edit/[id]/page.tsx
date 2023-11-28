import Params from "@/app/typescript/params";
import { getAllSchools } from "@/app/api/schools/getSchools";
import { getAllDestinations } from "@/app/api/destinations/getDestinations";
import { getAllHotels } from "@/app/api/hotels/getHotels";
import { getAllRestaurants } from "@/app/api/restaurants/getRestaurants";
import { getAllSites } from "@/app/api/sites/getSites";
import { getTourData } from "@/app/api/tours/getTours";
import { getAllActiveProfiles } from "@/app/api/getProfiles";

import { AddTourDay } from "@/app/components/moderator/tour/AddTourDay";

export default async function ({ params }: Params) {
  try {
    // Make all async calls concurrently using Promise.all
    const [schools, destinations, hotels, restaurants, sites, profiles] =
      await Promise.all([
        getAllSchools(),
        getAllDestinations(),
        getAllHotels(),
        getAllRestaurants(),
        getAllSites(),
        getAllActiveProfiles(),
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
              profiles={profiles.allProfileData}
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
}
