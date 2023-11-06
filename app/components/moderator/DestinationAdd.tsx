"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { TextField, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const DestinationAdd = () => {
  const router = useRouter();
  const [field, setField] = useState("");
  const [state, setState] = useState({
    name: "",
    region: "",
    country: "",
  });


  const post = () => {
    if (state.name === "" || state.name === undefined) {
      enqueueSnackbar(`Hotel name can't be blank`, {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }

    fetch("/api/destinations/add", {
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
    router.push(`/pages/destinations/`);
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
        required
      />
      <TextField
        id="outlined-basic"
        label="Region"
        variant="outlined"
        type="text"
        name="region"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        required
      />
      <TextField
        id="outlined-basic"
        label="Country"
        variant="outlined"
        type="text"
        name="country"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        required
      />
      <button onClick={post}>Add</button>
    </div>
  );
};

export default DestinationAdd;
