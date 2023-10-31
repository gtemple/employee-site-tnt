"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Hotel from "@/app/typescript/hotel";
import Destination from "@/app/typescript/destination";
import { TextField, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const SchoolUpdateForm = (props: { hotel: Hotel; destinations: Destination[] }) => {
  const router = useRouter();
  const {
    id,
    name,
    address,
    destination_id,
    postal,
    phone,
    email
  } = props.hotel;
  const [field, setField] = useState("");
  const [state, setState] = useState({
    id: id,
    name: name,
    address: address,
    postal: postal,
    phone: phone,
    destination_id: destination_id,
    email: email
  });

  const destinations = props.destinations;

  const postUpdate = () => {
    if (state.name === "" || state.name === undefined) {
      enqueueSnackbar(`Hotel name can't be blank`, {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }

    fetch("/api/hotels/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    enqueueSnackbar(`${state.name} successfully updated`, {
      autoHideDuration: 3000,
      variant: "success",
    });

    router.push(`/pages/moderator/hotels/${id}`);
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
        name="name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        defaultValue={name}
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
          return <MenuItem value={destination.id}>{destination.name}</MenuItem>;
        })}
      </Select>

      <TextField
        id="outlined-basic"
        label="Street Address"
        variant="outlined"
        type="text"
        name="address"
        defaultValue={address}
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
        defaultValue={postal}
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
        defaultValue={phone}
      />

      <TextField
        id="standard-textarea"
        className="extended-field"
        label="Email"
        name="email"
        defaultValue={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        multiline
        variant="outlined"
      />
      <button onClick={postUpdate}>Update</button>
    </div>
  );
};

export default SchoolUpdateForm;
