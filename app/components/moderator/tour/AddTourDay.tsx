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
import Profile from "@/app/typescript/profile";

import Calendar from "react-calendar";
import dayjs, { Dayjs } from "dayjs";
import { MenuItem, Select } from "@mui/material";
import {
  Unstable_NumberInput as NumberInput,
  NumberInputProps,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from "@mui/system";
import "@/app/styles/Calendar.css";
import "@/app/styles/tours/tour.css";
import { AddTourEvent } from "./AddTourEvent";
import PrintTourDay from "./PrintTourDay";
import { Itinerary } from "@/app/typescript/itinerary";

import "@/app/styles/tours/tour.css";
import Tour from "@/app/typescript/tour";

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;
  padding: 4px;
  width: 150px;

  &.${numberInputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  width: 100px;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 19px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 0;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};

    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${theme.palette.mode === "dark" ? blue[600] : blue[500]};
      border-color: ${theme.palette.mode === "dark" ? blue[400] : blue[600]};
    }
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  }

  &:hover {
    cursor: pointer;
    color: #FFF;
    background: ${theme.palette.mode === "dark" ? blue[600] : blue[500]};
    border-color: ${theme.palette.mode === "dark" ? blue[400] : blue[600]};
  }

  & .arrow {
    transform: translateY(-1px);
  }

  & .arrow {
    transform: translateY(-1px);
  }
`
);

type Props = {
  schools: School[];
  destinations: Destination[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  sites: Site[];
  profiles: Profile[];
  tour: Tour | null;
};

type Dropdown = String | Number | null;

export const AddTourDay = ({
  schools,
  destinations,
  hotels,
  restaurants,
  sites,
  profiles,
  tour,
}: Props) => {
  const [itinerary, setItinerary] = useState<Itinerary>(
    //@ts-ignore
    tour ? tour.itinerary : {}
  );
  const [school, setSchool] = useState<Dropdown>(tour ? tour.school_id : 0);
  const [profile, setProfile] = useState<Dropdown>(tour ? tour.profile_id : null);
  const [students, setStudents] = useState<number | undefined>(tour ? tour.students : 0);
  const [destination, setDestination] = useState<Dropdown>(
    tour ? tour.destination_id : 1
  );
  const [dateValue, setDateValue] = useState(
    tour ? tour.start : dayjs().startOf("day")
  );
  const [lastDateValue, setLastDateValue] = useState(
    tour ? tour.end : dayjs().startOf("day")
  );
  const [addDayWidget, setAddDayWidget] = useState(false);
  const [displayedItinerary, setDisplayedItinerary] = useState<
    JSX.Element[] | null
  >([]);

  const router = useRouter();
  const allSchools = schools;
  const allDestinations = destinations;
  const allProfiles = profiles;


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

  // creates key name for activity to be placed in object
  const dateKeyFormatter = (eventName: string, date: Dayjs) => {
    return eventName + "_" + date.format("HH:mm");
  };

  const saveEvent = (event: Event) => {
    const itineraryDaySchedule = itinerary[Number(event.day)].schedule;
    const eventKey = dateKeyFormatter(event.activity.name, event.start);

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

  const deleteEvent = (activity: Event) => {
    const activityName = activity.activity.name;
    const startTime = activity.start;
    const day = Number(activity.day);
    const key = dateKeyFormatter(activityName, startTime);

    const updatedItinerary = { ...itinerary };
    delete updatedItinerary[day].schedule[key];
    setItinerary(updatedItinerary);
  };

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
          <AddTourEvent
            sites={sites}
            restaurants={restaurants}
            hotels={hotels}
            date={dayjs(lastDateValue)}
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

  const startDateExists = () => {
    return itinerary && Object.keys(itinerary).length > 0;
  };

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
  };

  const postTour = () => {
    const state = {
      start: dateValue,
      end: lastDateValue,
      school: school,
      profile: profile,
      students: students,
      destination: destination,
      itinerary: itinerary,
      id: tour ? tour.id : null,
    };

    const fetchPath = state.id ? 'update' : 'add'
    fetch(`/api/tours/${fetchPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    router.refresh();
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

  const handleProfileChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setProfile(value);
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
      <div className="select-row">
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
        <div>
          <span>Number of Students</span>
          <NumberInput
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={students}
            slots={{
              root: StyledInputRoot,
              input: StyledInputElement,
              incrementButton: StyledButton,
              decrementButton: StyledButton,
            }}
            slotProps={{
              incrementButton: {
                children: "▴",
              },
              decrementButton: {
                children: "▾",
              },
            }}
            onChange={(event, val) => setStudents(val)}
          />
        </div>
        <div className="select-tool">
          <div className="select-title">Profile</div>
          <Select
            labelId="profile"
            id="profile"
            value={profile}
            name="profile"
            label="profile"
            className="select-options"
            //@ts-ignore
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleProfileChange(e);
            }}
            required
          >
            {allProfiles &&
              allProfiles.map((profile: Profile) => {
                return (
                  <MenuItem key={profile.id} value={profile.id}>
                    {profile.first_name} {profile.last_name}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
      </div>
      <div>{displayedItinerary}</div>
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
    </div>
  );
};
