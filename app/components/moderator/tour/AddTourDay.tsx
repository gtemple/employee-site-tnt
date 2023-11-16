"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import School from "@/app/typescript/school";
import Destination from "@/app/typescript/destination";
import Hotel from "@/app/typescript/hotel";
import Restaurant from "@/app/typescript/restaurant";
import Site from "@/app/typescript/site";
import Event from "@/app/typescript/event";

import Calendar from "react-calendar";
import dayjs, { Dayjs } from "dayjs";
import { MenuItem, Select } from "@mui/material";
import "@/app/styles/Calendar.css";
import "@/app/styles/tours/tour.css";
import { AddTourEvent } from "./AddTourEvent";
import PrintTourDay from "./PrintTourDay";
import { Itinerary }from "@/app/typescript/itinerary";

type Props = {
  schools: School[];
  destinations: Destination[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  sites: Site[];
};

type Dropdown = String | Number;

export const AddTourDay = ({
  schools,
  destinations,
  hotels,
  restaurants,
  sites,
}: Props) => {
  const [itinerary, setItinerary] = useState<Itinerary>({});
  const [school, setSchool] = useState<Dropdown>(1);
  const [destination, setDestination] = useState<Dropdown>(1);
  const [dateValue, setDateValue] = useState(dayjs().startOf("day"));
  const [lastDateValue, setLastDateValue] = useState<Dayjs>(
    dayjs().startOf("day")
  );
  const [addDayWidget, setAddDayWidget] = useState(false);
  const [displayedItinerary, setDisplayedItinerary] = useState<
    JSX.Element[] | null
  >([]);

  const allSchools = schools;
  const allDestinations = destinations;

  const checkEventConflict = (event: Event): boolean => {
    const start = event.start;
    const end = event.end;
    //@ts-ignore
    const dayEntry = itinerary[event.day];
    const scheduleDay = dayEntry.schedule;
    const scheduleDayKeys = Object.keys(scheduleDay);

    if (scheduleDayKeys.length === 0) {
      return true;
    }

    for (const key of scheduleDayKeys) {
      const activity = scheduleDay[key];
      if (activity.start <= start && activity.end >= start) {
        enqueueSnackbar(`There is already an activity at this time`, {
          autoHideDuration: 3000,
          variant: "error",
        });
        return false;
      }
    }

    return true;
  };

  const checkifEventTimeIsValid = (event: Event): boolean => {
    if (event.start > event.end) {
      enqueueSnackbar(
        `Your activity start time must be earlier than its end time`,
        {
          autoHideDuration: 3000,
          variant: "error",
        }
      );
      return false;
    }
    return true;
  };

  const saveEvent = (event: Event) => {
    const itineraryDaySchedule = itinerary[Number(event.day)].schedule;
    const eventKey =
      event.type + "_" + event.id + "_" + event.start.format("HH:mm");

    if (!checkifEventTimeIsValid(event)) {
      return;
    }

    if (!checkEventConflict(event)) {
      return;
    }

    itineraryDaySchedule[eventKey] = event;

    setItinerary((prev) => ({
      ...prev,
      [event.day]: {
        date: itinerary[Number(event.day)].date,
        schedule: itineraryDaySchedule,
      },
    }));
    console.log("formatted date---", eventKey);
    console.log("days itinerary:", itinerary);
  };

  const displayItinerary = (itin: Itinerary | null) => {
    if (!itin) {
      return null;
    }
    const printedItems = Object.keys(itin).map((key) => (
      <div>
        <div className="tour-day" key={key}>
          <div className="tour-date">
            {/* @ts-ignore */}
            {dayjs(itin[key].date).format("dddd, MMMM D – YYYY")}
          </div>
          <AddTourEvent
            sites={sites}
            restaurants={restaurants}
            hotels={hotels}
            date={lastDateValue}
            day={key}
            saveEvent={saveEvent}
          />
        </div>
        {/* @ts-ignore */}
        <PrintTourDay itinerary={itinerary[key]} />
      </div>
    ));
    return printedItems;
  };

  const startDateExists = () => Object.keys(itinerary).length > 0;

  const startDate = () => {
    const keys = Object.keys(itinerary);
    if (keys.length === 0) {
      setItinerary({
        1: {
          date: dateValue,
          schedule: {},
        },
      });
    }
  };

  // this function adds a day to the schedule by doing the following:
  // 1. gets current amount of days
  // 2. adds the current trip length to the starting date (thus adding the next date... if start date is Nov 12th and trip length is already 3 days, 12 + 3 creates the 15th)
  const addDay = () => {
    const nextDayOnTrip = Object.keys(itinerary).length;
    const nextDate = dayjs(dateValue).add(nextDayOnTrip, "day").startOf("day");
    setLastDateValue(nextDate);
    setItinerary((prev) => ({
      ...prev,
      [nextDayOnTrip + 1]: {
        date: nextDate,
        schedule: {},
      },
    }));
  };

  const deleteDay = () => {
    const keys = Object.keys(itinerary);
    const lastKey = keys[keys.length];
    const lastKeyNumber = parseInt(lastKey, 10);

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

  const handleSchoolChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSchool(value);
  };

  const handleDestinationChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setDestination(value);
  };

  useEffect(() => {
    const result = displayItinerary(itinerary);
    setDisplayedItinerary(result);
  }, [itinerary]);

  return (
    <div>
      <SnackbarProvider />
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
