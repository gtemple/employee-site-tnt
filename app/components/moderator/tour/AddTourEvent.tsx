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

type State = {
  activity: string | Option,
  day: string,
  start: Dayjs,
  end: Dayjs,
}

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
  const [activity, setActivity] = useState<string | Option>(sites[0].name)
  const [options, setOptions] = useState<Array<Option>>(sites);
  const [state, setState] = useState<State>({
    activity: sites[0],
    day: day,
    start: date.startOf("d"),
    end: date.startOf("d"),
  });
  const [printedOptions, setPrintedOptions] = useState<React.ReactNode>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedEvent(event.target.value as string);
  };

  const handleActivityChange = (event: SelectChangeEvent<Option>) => {
    setActivity(event.target.value);
    console.log(event.target.value);
    setState((prev) => ({
      ...prev,
      activity: options[event.target.value]
    }))
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
            value={0}
            label="Selection"
            onChange={(event) => handleActivityChange(event)}
          >
            {array.map((arrayOption, i) => (
              <MenuItem
                key={`${arrayOption.id}-${arrayOption.name}`}
                value={i}
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
    console.log('state:::', state)
  }, [selectedEvent, options, activity]);

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
        </FormControl>
        <div>
        <InputLabel id="demo-simple-select-label">Start Time</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.start.format("H")}
            label=""
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
