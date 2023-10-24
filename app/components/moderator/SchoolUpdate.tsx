"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Board from "@/app/typescript/board";
import School from "@/app/typescript/school";
import { TextField, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const SchoolUpdateForm = (props: {school: School; boards: Board[]}) => {
  const router = useRouter();
  const {
    id,
    name,
    grade,
    teacher,
    address,
    city,
    postal,
    phone,
    board,
    notes,
  } = props.school;
  const [field, setField] = useState("");
  const [state, setState] = useState({
    id: id,
    name: name,
    grade: grade,
    teacher: teacher,
    city: city,
    address: address,
    postal: postal,
    phone: phone,
    board: board,
    notes: notes,
  });

  const boards = props.boards;

  const postUpdate = () => {
    if (state.name === "" || state.name === undefined) {
      enqueueSnackbar(`School name can't be blank`, {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }

    fetch("/api/schools/update", {
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

    router.push(`/pages/moderator/schools/${id}`);
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
          return <MenuItem value={board.id}>{board.acronym}</MenuItem>;
        })}
      </Select>
      <TextField
        id="outlined-basic"
        label="Teacher"
        variant="outlined"
        type="text"
        name="teacher"
        defaultValue={teacher}
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
        label="Notes"
        name="notes"
        defaultValue={notes}
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
