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


type Props = {
  sites: Site[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  date: Dayjs;
};

type Option = Site | Hotel | Restaurant;

export const AddTourEvent: React.FC<Props> = ({ sites, hotels, restaurants, date }) => {
  const [selectedEvent, setSelectedEvent] = useState("Site");
  const [options, setOptions] = useState<Array<Option>>(sites);
  const [printedOptions, setPrintedOptions] = useState<React.ReactNode>('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedEvent(event.target.value as string);
  };

  const optionsCheck = (option: string) => {
    if (option === "Site") {
      setOptions(sites);
    } else if (option === "Restaurant") {
      setOptions(restaurants);
    } else if (option === "Hotel") {
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
            <MenuItem value="Hotel">Hotel</MenuItem>
            <MenuItem value="Restaurant">Restaurant</MenuItem>
            <MenuItem value="Site">Site</MenuItem>
          </Select>
          {printedOptions}
        </FormControl>
      </Box>
    </div>
  );
};