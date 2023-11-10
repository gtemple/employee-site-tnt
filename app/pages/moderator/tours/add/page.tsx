import React from "react";
import dayjs from "dayjs";
import { AddTourDay } from "@/app/components/moderator/tour/AddTourDay";
import { getAllDestinations } from "@/app/api/destinations/getDestinations";
import { getAllHotels } from "@/app/api/hotels/getHotels";
import { getAllRestaurants } from "@/app/api/restaurants/getRestaurants";
import { getAllSchools } from "@/app/api/schools/getSchools";
import { getAllSites } from "@/app/api/sites/getSites";

const AddTour = async () => {
  const schools = await getAllSchools();
  const destinations = await getAllDestinations();
  return (
    <div>
      {schools.allSchoolData && destinations.allDestinationData && (
        <AddTourDay
          schools={schools.allSchoolData}
          destinations={destinations.allDestinationData}
        />
      )}
    </div>
  );
};

export default AddTour;
