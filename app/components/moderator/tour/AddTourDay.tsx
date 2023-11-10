"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import School from "@/app/typescript/school";
import Destination from "@/app/typescript/destination";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { TextField, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import "@/app/styles/Calendar.css";

type Itinerary = {
  [key: number]: {
    date: Date;
  };
};

type Dropdown = String | Number;

export const AddTourDay = (props: {
  schools: School[];
  destinations: Destination[];
}) => {
  const [itinerary, setItinerary] = useState<Itinerary>({});
  const [school, setSchool] = useState<Dropdown>(1);
  const [destination, setDestination] = useState<Dropdown>(1);
  const [dateValue, setDateValue] = useState(dayjs());
  const [addDayWidget, setAddDayWidget] = useState(false);
  const [displayedItinerary, setDisplayedItinerary] = useState<JSX.Element[] | null>([]);

  const allSchools = props.schools;
  const allDestinations = props.destinations;

  const displayItinerary = (itin: Itinerary | null) => {
    if (!itin) {
      return null;
    }
    const keys = Object.keys(itin);
    const printedItems = keys.map((key) => (
      <div key={key}>Day: {itin[key].date.toString()}</div>
    ));
    return printedItems;
  };

  const startDateExists = () => {
    const keys = Object.keys(itinerary);
    return keys.length > 0;
  };

  const startDate = () => {
    const keys = Object.keys(itinerary);
    if (keys.length === 0) {
      setItinerary({
        0: {
          //@ts-ignore
          date: dateValue,
        },
      });
    }
  };

  // this function adds a day to the schedule by doing the following:
  // 1. gets current amount of days
  // 2. adds the current trip length to the starting date (thus adding the next date... if start date is Nov 12th and trip length is already 3 days, 12 + 3 creates the 15th)
  const addDay = () => {
    const nextDayOnTrip = Object.keys(itinerary).length;
    const nextDate = dayjs(dateValue).add(nextDayOnTrip, "day").toDate();
    setItinerary((prev) => ({ ...prev, [nextDayOnTrip]: { date: nextDate } }));
  };

  const deleteDay = () => {
    const keys = Object.keys(itinerary);
    const lastKey = keys[keys.length - 1];
    const lastKeyNumber = parseInt(lastKey, 10); // or const lastKeyNumber = Number(lastKey);
    
    if (!isNaN(lastKeyNumber)) {
      const updatedItinerary = { ...itinerary };
      delete updatedItinerary[lastKeyNumber];
      setItinerary(updatedItinerary);
    }
    
  };

  const postTour = () => {
    const state = {
      school: school,
      destination: destination,
      itinerary: itinerary,
    };

    console.log(state);

    // fetch("/api/tours/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(state),
    // });
    // router.push(`/pages/moderator/tours`);
  };

  const handleOpenDayWidget = () => setAddDayWidget(true);
  const handleCloseDayWidget = (submit: boolean) => {
    if (!submit) {
      setAddDayWidget(false);
    }
    startDate();
    setAddDayWidget(false);
  };

  const handleSchoolChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSchool(value);
  };

  const handleDestinationChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setDestination(value);
  };

  useEffect(() => {
    console.log(itinerary);
    const result = displayItinerary(itinerary);
    setDisplayedItinerary(result);
  }, [itinerary]);

  return (
    <div>
      <button onClick={() => console.log(itinerary, allSchools)}>
        test data
      </button>
      <Select
        labelId="destination"
        id="destination"
        value={destination}
        name="destination"
        label="destination"
        //@ts-ignore
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleDestinationChange(e);
        }}
        required
      >
        {allDestinations &&
          allDestinations.map((destination: Destination) => {
            return (
              <MenuItem key={destination.id} value={destination.id}>
                {destination.name}, {destination.region}
              </MenuItem>
            );
          })}
      </Select>
      <Select
        labelId="school"
        id="school"
        value={school}
        name="school"
        label="school"
        //@ts-ignore
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleSchoolChange(e);
        }}
        required
      >
        {allSchools &&
          allSchools.map((school: School) => {
            return (
              <MenuItem key={school.id} value={school.id}>
                {school.name}
              </MenuItem>
            );
          })}
      </Select>
      {/* checks to see if there is already a start date, if so gives the option to add the following day */}
      {startDateExists() ? (
        <div>
          <button onClick={addDay}>Add Day</button>
          <button onClick={deleteDay}>Delete Day</button>
        </div>
      ) : !addDayWidget ? (
        <button onClick={handleOpenDayWidget}>Set Start Date</button>
      ) : (
        <div>
          {/* @ts-ignore */}
          <Calendar onChange={setDateValue} value={dateValue} />
          <button onClick={() => handleCloseDayWidget(true)}>Submit</button>
          <button onClick={() => handleCloseDayWidget(false)}>Cancel</button>
        </div>
      )}
      <button onClick={postTour}>Save</button>
      <div>{displayedItinerary}</div>
    </div>
  );
};
