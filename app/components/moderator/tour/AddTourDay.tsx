"use client";

import { useState } from "react";
import School from "@/app/typescript/school";
import Destination from "@/app/typescript/destination";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { TextField, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import "@/app/styles/Calendar.css";

export const AddTourDay = (props: {
  schools: School[];
  destinations: Destination[];
}) => {
  const [itinerary, setItinerary] = useState({});
  const [school, setSchool] = useState(1);
  const [destination, setDestination] = useState(1)
  const [dateValue, setDateValue] = useState(dayjs());
  const [addDayWidget, setAddDayWidget] = useState(false);
  const allSchools = props.schools;
  const allDestinations = props.destinations;

  const startDateExists = () => {
    const keys = Object.keys(itinerary);
    if (keys.length > 0) {
      return true;
    }
    return false;
  };

  const startDate = () => {
    const keys = Object.keys(itinerary);
    if (keys.length > 0) {
      return;
    }
    setItinerary({
      0: {
        date: dateValue,
      },
    });
    return;
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
    const tripLength = Object.keys(itinerary).length;
    delete itinerary[tripLength - 1];
  };

  const postTour = () => {
    const state = {
      school: school,
      destination: destination,
      itinerary: itinerary,
    };

    console.log(state)

    // fetch("/api/tours/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(state),
    // });
  };

  const handleOpenDayWidget = () => setAddDayWidget(true);
  const handleCloseDayWidget = (submit: boolean) => {
    if (!submit) {
      setAddDayWidget(false);
    }
    startDate();
    setAddDayWidget(false);
  };

  const handleSchoolChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSchool(value);
  };

  const handleDestinationChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setDestination(value);
  };

  // const printDays = () => {
  //   for (const day in itinerary) {
  //     return <div>{itinerary[day].date}</div>;
  //   }
  // };

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
    </div>
  );
};
