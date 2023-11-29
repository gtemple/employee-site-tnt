"use client";

import { useState } from "react";
import Profile from "@/app/typescript/profile";

import { TextField, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

type Props = {
  profile: Profile;
  postUpdate: (state: {
    id: string;
    first_name: string;
    last_name: string;
  }) => void;
};

export const UserUpdate = ({ profile, postUpdate }: Props) => {
  const { id, first_name, last_name } = profile;
  const [field, setField] = useState("");
  const [state, setState] = useState({
    id: id,
    first_name: first_name,
    last_name: last_name,
  });

  const updateValidation = () => {
    if (state.first_name === "" || state.first_name === undefined) {
      enqueueSnackbar(`First name can't be blank`, {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }
    if (state.last_name === "" || state.last_name === undefined) {
      enqueueSnackbar(`Last name can't be blank`, {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }

    postUpdate(state);

    enqueueSnackbar(`${first_name}, your info was successfully updated!`, {
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
        label="First Name"
        variant="outlined"
        type="text"
        name="first_name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        defaultValue={first_name}
        required
      />
      <TextField
        id="outlined-basic"
        label="Last name"
        variant="outlined"
        type="text"
        name="last_name"
        defaultValue={last_name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        required
      />
      <button onClick={async()=> { await updateValidation()}}>Update</button>
    </div>
  );
};
