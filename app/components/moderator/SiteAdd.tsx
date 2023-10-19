"use client";

import { useState } from "react";
import Destination from "@/app/typescript/destination";
import { TextField, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const SiteAdd = (props) => {
  const [field, setField] = useState("");
  const [state, setState] = useState({
    name: "",
    description: "",
    city: "",
    address: "",
    postal: "",
    phone: "",
  });

  const destinations = props.destinations;

  const post = () => {
    if (state.name === "" || state.name === undefined) {
      enqueueSnackbar(`Site name can't be blank`, {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }

    if (state.city === "" || state.city === undefined) {
      enqueueSnackbar(`Please select a Destination`, {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }

    fetch("/api/sites/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    console.log(state);

    enqueueSnackbar(`${state.name} was successfully added`, {
      autoHideDuration: 3000,
      variant: "success",
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setField(name); // Update the field based on the input name
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <SnackbarProvider />
      <TextField
        id="outlined-basic"
        label="Site Name"
        variant="outlined"
        type="text"
        name="name" // This should match the state property name
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        required
      />

      <TextField
        id="outlined-basic"
        label="Street Address"
        variant="outlined"
        type="text"
        name="address"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
      />
      <Select
        labelId="city"
        id="city"
        value={state.city}
        name="city"
        label="city"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        required
      >
        {destinations.map((destination: Destination) => {
          return (
            <MenuItem value={destination.id}>
              {destination.name}, {destination.region}
            </MenuItem>
          );
        })}
      </Select>
      <TextField
        id="outlined-basic"
        label="Postal Code"
        variant="outlined"
        type="text"
        name="postal"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        required
      />
      <TextField
        id="outlined-basic"
        label="Phone Number"
        variant="outlined"
        type="text"
        name="phone"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
      />

      <TextField
        id="standard-textarea"
        className="extended-field"
        label="Description"
        name="description"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        multiline
        variant="outlined"
      />
      <button onClick={post}>Add</button>
    </div>
  );
};

export default SiteAdd;
