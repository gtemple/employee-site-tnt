"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Destination from "@/app/typescript/destination";
import Site from "@/app/typescript/site";
import { TextField, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const SiteUpdateForm = (props: { destinations: Destination[]; site: Site }) => {
  const router = useRouter();
  const { id, name, description, address, postal, phone, destination_id } =
    props.site;
  const [field, setField] = useState("");
  const [state, setState] = useState({
    id: id,
    name: name,
    description: description,
    city: destination_id,
    address: address,
    postal: postal,
    phone: phone,
  });

  const destinations = props.destinations;

  const postUpdate = () => {
    if (state.name === "" || state.name === undefined) {
      enqueueSnackbar(`Site name can't be blank`, {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }

    fetch("/api/sites/update", {
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

    router.push(`/pages/sites/${id}`);
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
      <Select
        labelId="city"
        id="city"
        value={state.city}
        name="city"
        label="city"
        //@ts-ignore
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
        label="Description"
        name="description"
        defaultValue={description}
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

export default SiteUpdateForm;
