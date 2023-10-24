"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Board from "@/app/typescript/board";
import { TextField, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const SchoolAdd = (props: {boards: Board[]}) => {
  const router = useRouter();
  const [field, setField] = useState("");
  const [state, setState] = useState({
    name: "",
    grade: "",
    teacher: "",
    city: "",
    address: "",
    postal: "",
    phone: "",
    board: 1,
    notes: "",
  });

  const boards = props.boards;

  const post = () => {
    if (state.name === "" || state.name === undefined) {
      enqueueSnackbar(`School name can't be blank`, {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }

    fetch("/api/schools/add", {
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
    router.push(`/pages/moderator/schools/all-schools`);
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
      <Select
        labelId="board"
        id="board"
        value={state.board}
        name="board"
        label="board"
        //@ts-ignore
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        required
      >
        {boards.map((board: Board) => {
          return (
            <MenuItem key={board.id} value={board.id}>
              {board.acronym}
            </MenuItem>
          );
        })}
      </Select>
      <TextField
        id="outlined-basic"
        label="Teacher"
        variant="outlined"
        type="text"
        name="teacher"
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
        required
      />
      <TextField
        id="outlined-basic"
        label="City"
        variant="outlined"
        type="city"
        name="city"
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
        className="extended-field"
        label="Notes"
        name="notes"
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

export default SchoolAdd;
