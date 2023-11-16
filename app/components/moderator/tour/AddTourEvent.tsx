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

type Props = {
  sites: Site[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  date: Dayjs;
  day: string;
  saveEvent: (event: Event) => void;
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
  const [selectedEvent, setSelectedEvent] = useState("site");
  const [options, setOptions] = useState<Array<Option>>(sites);
  const [state, setState] = useState({
    type: "site",
    id: 1,
    day: day,
    start: date.startOf("d"),
    end: date.startOf("d"),
  });
  const [printedOptions, setPrintedOptions] = useState<React.ReactNode>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedEvent(event.target.value as string);
  };

  const handleTimeChange = (
    event: SelectChangeEvent,
    time: string,
    interval: string
  ) => {
    const num = Number(event.target.value as string);
    //@ts-ignore
    const newTime = state[time].set(interval, num);
    console.log(newTime);
    setState((prev) => ({
      ...prev,
      [time]: newTime,
    }));
  };

  const optionsCheck = (option: string) => {
    if (option === "site") {
      setOptions(sites);
    } else if (option === "restaurant") {
      setOptions(restaurants);
    } else if (option === "hotel") {
      setOptions(hotels);
    }
  };

  const printOptions = (array: Option[]) => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{selectedEvent}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedEvent}
            label="Selection"
            onChange={handleChange}
          >
            {array.map((arrayOption) => (
              <MenuItem key={arrayOption.id} value={arrayOption.id}>
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
  }, [selectedEvent, options]);

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Event</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedEvent}
            label="Event"
            onChange={handleChange}
          >
            <MenuItem value="hotel">Hotel</MenuItem>
            <MenuItem value="restaurant">Restaurant</MenuItem>
            <MenuItem value="site">Site</MenuItem>
          </Select>
          {printedOptions}
          <InputLabel id="demo-simple-select-label">Start Time</InputLabel>
        </FormControl>
        <div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.start.format("H")}
            onChange={(e) => handleTimeChange(e, "start", "hour")}
          >
            {displayHours()}
          </Select>
          :
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.start.format("m")}
            label=""
            onChange={(e) => {
              handleTimeChange(e, "start", "minute");
            }}
          >
            {displayMinutes()}
          </Select>
        </div>
        <div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.end.format("H")}
            onChange={(e) => handleTimeChange(e, "end", "hour")}
          >
            {displayHours()}
          </Select>
          :
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.end.format("m")}
            label=""
            onChange={(e) => {
              handleTimeChange(e, "end", "minute");
            }}
          >
            {displayMinutes()}
          </Select>
        </div>
        <button
          onClick={() => {
            saveEvent(state);
          }}
        >
          Add
        </button>
      </Box>
    </div>
  );
};
