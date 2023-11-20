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
import { Itinerary } from "@/app/typescript/itinerary";

import "@/app/styles/tours/tour.css";

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
    if (event.start > event.end || event.start === event.end) {
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
    const eventKey = event.activity.name + "_" + event.start.format("HH:mm");
    console.log('here is your event', event)

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
  };

  const deleteEvent = (event: Event) => {
    console.log(event);
  }

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
        <PrintTourDay deleteEvent={deleteEvent} itinerary={itinerary[key]} />
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
    const lastKey = keys[keys.length - 1];
    const lastKeyNumber = parseInt(lastKey, 10);

    if (!isNaN(lastKeyNumber)) {
      const updatedItinerary = { ...itinerary };
      delete updatedItinerary[lastKeyNumber];
      setItinerary(updatedItinerary);
    }

    console.log(itinerary)
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
      <div className="select-tool">
        <div className="select-title">Destination</div>
        <Select
          labelId="destination"
          id="destination"
          value={destination}
          name="destination"
          label="destination"
          className="select-options"
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
      </div>
      <div className="select-tool">
        <div className="select-title">School</div>
        <Select
          labelId="school"
          id="school"
          value={school}
          name="school"
          label="school"
          className="select-options"
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
      </div>
      {/* checks to see if there is already a start date, if so gives the option to add the following day */}
      {startDateExists() ? (
        <div>
          <button className="add-btn2" onClick={addDay}>
            Add Day
          </button>
          <button className="delete-btn2" onClick={deleteDay}>
            Delete Day
          </button>
          <button className="save-btn" onClick={postTour}>
            Save
          </button>
        </div>
      ) : !addDayWidget ? (
        <button className="add-btn2" onClick={handleOpenDayWidget}>
          Set Start Date
        </button>
      ) : (
        <div>
          {/* @ts-ignore */}
          <Calendar onChange={setDateValue} value={dateValue} />
          <button onClick={() => handleCloseDayWidget(true)}>Submit</button>
          <button onClick={() => handleCloseDayWidget(false)}>Cancel</button>
        </div>
      )}
      <div>{displayedItinerary}</div>
    </div>
  );
};
