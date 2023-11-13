"use client";

import { useState, useEffect } from "react";
import Site from "@/app/typescript/site";
import Hotel from "@/app/typescript/hotel";
import Restaurant from "@/app/typescript/restaurant";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

/*
NOTES:
 - Will start by giving the option of what kind of event with a dropdown (restaurant, site, hotel, other)
 - Next: give dropdown
 - add timestamps
    - check for conflicts with existing events
    - nice to have: have google maps calculte the distance between the 2 events to help operations understand plausability
 - option to change default text

*/

type Props = {
  sites: Site[];
  hotels: Hotel[];
  restaurants: Restaurant[];
};

type Options = Site[] | Hotel[] | Restaurant[];

export const AddTourEvent = (props: Props) => {
  const sites = props.sites;
  const hotels = props.hotels;
  const restaurants = props.restaurants;

  const [event, setEvent] = useState("Site");
  const [options, setOptions] = useState<string | Options>("");
  const [selection, setSelection] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setEvent(event.target.value as string);
  };

  const optionsCheck = (option: string) => {
    if (option === "Site") {
      setOptions(sites);
    }
    if (option === "Restaurant") {
      setOptions(restaurants);
    }
    if (option === "Hotel") {
      setOptions(hotels);
    }
  };

  const printOptions = (array: Options) => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{event}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={event}
            label="Event"
            onChange={handleChange}
          >
            2<MenuItem value="Hotel">Hotel</MenuItem>
            <MenuItem value="Restaurant">Restaurant</MenuItem>
            <MenuItem value="Site">Site</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  useEffect(() => {
    optionsCheck(event);
    let printedOptions = printOptions(options);
    console.log(options);
  }, [event]);

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Event</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={event}
            label="Event"
            onChange={handleChange}
          >
            <MenuItem value="Hotel">Hotel</MenuItem>
            <MenuItem value="Restaurant">Restaurant</MenuItem>
            <MenuItem value="Site">Site</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};
