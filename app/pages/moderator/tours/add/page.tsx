import { AddTourDay } from "@/app/components/moderator/tour/AddTourDay";
import { getAllDestinations } from "@/app/api/destinations/getDestinations";
import { getAllHotels } from "@/app/api/hotels/getHotels";
import { getAllRestaurants } from "@/app/api/restaurants/getRestaurants";
import { getAllSchools } from "@/app/api/schools/getSchools";
import { getAllSites } from "@/app/api/sites/getSites";

const AddTour = async () => {
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

export default AddTour;
