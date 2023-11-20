import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Site from "@/app/typescript/site";
import Hotel from "@/app/typescript/hotel";
import Restaurant from "@/app/typescript/restaurant";
import Event from "@/app/typescript/event";
import Sites from "@/app/pages/sites/page";
import { SatelliteSharp } from "@mui/icons-material";

type Props = {
  sites: Site[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  date: Dayjs;
  day: string;
  saveEvent: (event: Event) => void;
};

type State = {
  activity: string | Option;
  day: string;
  start: Dayjs;
  end: Dayjs;
};

type Option = Site | Hotel | Restaurant;

export const AddTourEvent: React.FC<Props> = ({
  sites,
  hotels,
  restaurants,
  date,
  day,
  saveEvent,
}) => {
  const [selectedEvent, setSelectedEvent] = useState("Site");
  const [activity, setActivity] = useState<string>("0");
  const [options, setOptions] = useState<Array<Option>>(sites);
  const [state, setState] = useState<State>({
    activity: sites[0],
    day: day,
    start: date.startOf("d"),
    end: date.startOf("d"),
  });
  const [printedOptions, setPrintedOptions] = useState<React.ReactNode>("");

  const handleChange = async (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    const optionsArray = optionsCheck(selectedValue);
    setSelectedEvent(selectedValue);
    await optionsCheck(selectedValue);
    //@ts-ignore
    updateState(0, optionsArray);
  };

  const updateState = (index: number, optionsArray: Option[]) => {
    const selectedOption = optionsArray[index];
    console.log("here are the options:", selectedOption);
    setActivity(index.toString());
    setState((prev) => ({
      ...prev,
      activity: selectedOption,
    }));
  };

  const handleActivityChange = (event: SelectChangeEvent) => {
    const selectedIndex = Number(event.target.value);
    updateState(selectedIndex, options);
  };

  const handleTimeChange = (
    event: SelectChangeEvent,
    time: string,
    interval: string
  ) => {
    const num = Number(event.target.value as string);
    //@ts-ignore
    const newTime = state[time].set(interval, num);
    setState((prev) => ({
      ...prev,
      [time]: newTime,
    }));
  };

  const optionsCheck = (selectedEvent: string) => {
    if (selectedEvent === "Site") {
      setOptions(sites);
      return sites;
    } else if (selectedEvent === "Restaurant") {
      setOptions(restaurants);
      return restaurants;
    } else if (selectedEvent === "Hotel") {
      setOptions(hotels);
      return hotels;
    }
    console.log("broken", selectedEvent, typeof selectedEvent);
  };

  const printOptions = (array: Option[]) => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{selectedEvent}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={activity}
            label="Selection"
            onChange={(event) => handleActivityChange(event)}
            className="activity-input-b"
          >
            {array.map((arrayOption, i) => (
              <MenuItem
                key={`${arrayOption.id}-${arrayOption.name}`}
                value={i.toString()}
              >
                {arrayOption.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const displayHours = () => {
    const hoursArray = [];
    let n = 0;
    while (n <= 23) {
      hoursArray.push(
        <MenuItem key={n} value={n}>
          {n}
        </MenuItem>
      );
      n++;
    }
    return hoursArray;
  };

  const displayMinutes = () => {
    const minutesArray = [];
    let n = 0;
    while (n <= 55) {
      minutesArray.push(
        <MenuItem key={n} value={n}>
          {n}
        </MenuItem>
      );
      n += 5;
    }
    return minutesArray;
  };

  useEffect(() => {
    optionsCheck(selectedEvent);
    setPrintedOptions(printOptions(options));
  }, [selectedEvent, options, activity]);

  return (
    <div className="add-event">
      <div className="activity-title">Add an Activity</div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl>
          <div className="activity-container">
            <InputLabel id="demo-simple-select-label">Event</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedEvent}
              label="Event"
              onChange={handleChange}
              className="activity-input-a"
            >
              <MenuItem value="Hotel">Hotel</MenuItem>
              <MenuItem value="Restaurant">Restaurant</MenuItem>
              <MenuItem value="Site">Site</MenuItem>
            </Select>
            {printedOptions}
          </div>
        </FormControl>
        <div className="activity-container-bottom">
          <div className="time-container">
            <div className="time-label">Start</div>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.start.format("H")}
              label=""
              onChange={(e) => handleTimeChange(e, "start", "hour")}
              className="time-input"
            >
              {displayHours()}
            </Select>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.start.format("m")}
              onChange={(e) => {
                handleTimeChange(e, "start", "minute");
              }}
              className="time-input"
            >
              {displayMinutes()}
            </Select>
          </div>
          <div className="time-container">
            <div className="time-label">End</div>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.end.format("H")}
              onChange={(e) => handleTimeChange(e, "end", "hour")}
              className="time-input"
            >
              {displayHours()}
            </Select>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.end.format("m")}
              onChange={(e) => {
                handleTimeChange(e, "end", "minute");
              }}
              className="time-input"
            >
              {displayMinutes()}
            </Select>
          </div>
          <button
            className="add-btn"
            onClick={() => {
              // @ts-ignore
              saveEvent(state);
            }}
          >
            Add
          </button>
        </div>
      </Box>
    </div>
  );
};
