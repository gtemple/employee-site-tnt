"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Destination from "@/app/typescript/destination";
import { TextField, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const HotelAdd = (props: { destinations: Destination[] }) => {
  const router = useRouter();
  const [field, setField] = useState("");
  const [state, setState] = useState({
    name: "",
    address: "",
    postal: "",
    phone: "",
    destination_id: 1,
    email: "",
  });

  const destinations = props.destinations;

  const post = () => {
    if (state.name === "" || state.name === undefined) {
      enqueueSnackbar(`Hotel name can't be blank`, {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }

    fetch("/api/hotels/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    enqueueSnackbar(`${state.name} was successfully added`, {
      autoHideDuration: 3000,
      variant: "success",
    });
    router.push(`/pages/moderator/hotels/`);
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
      <div className="custom-form">
        <TextField
          id="outlined-basic"
          label="Hotel Name"
          variant="outlined"
          type="text"
          name="name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
          }}
          required
        />
        <Select
          labelId="destination_id"
          id="destination_id"
          value={state.destination_id}
          name="destination_id"
          label="Destination"
          //@ts-ignore
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
          }}
          required
        >
          {destinations.map((destination: Destination) => {
            return (
              <MenuItem key={destination.id} value={destination.id}>
                {destination.name}, {destination.region}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          id="outlined-basic"
          label="Street Address"
          variant="outlined"
          type="text"
          name="address"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
          }}
          required
        />
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
          label="Email"
          name="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
          }}
          variant="outlined"
        />
        <button onClick={post}>Add</button>
      </div>
    </div>
  );
};

export default HotelAdd;
