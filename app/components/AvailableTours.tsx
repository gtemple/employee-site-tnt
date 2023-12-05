"use client";

import { useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Tour from "@/app/typescript/tour";
import Profile from "../typescript/profile";

import "@/app/styles/tours/tour.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

type Props = {
  profile: Profile;
  tours: Tour[] | undefined;
};

type RequestProfile =
  | {
      id: string;
      first_name: string;
      last_name: string;
    }
  | string;

const AvailableTours = ({ profile, tours }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  if (profile && !profile.active) {
    return <div>Authentication failed</div>;
  }

  if (!tours) {
    return (
      <div className="no-tours">
        <div>There are currently no available tours to request.</div>
      </div>
    );
  }

  const postRequest = (tourId: string, requested: RequestProfile[]) => {
    requested.push({
      id: profile.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
    });

    const postData = { id: tourId, requested: requested };

    fetch(`/api/tours/update/requested`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };

  return (
    <div>
      <SnackbarProvider />
      <div>Looking for work? Request one of the available tours below!</div>
      {tours && tours.length > 0 && (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                {tours.map((tour: Tour) => (
                  <TableRow
                    key={tour.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {tour.schools.name}
                    </TableCell>
                    <TableCell>{tour.destinations.name}</TableCell>
                    <TableCell>
                      {dayjs(tour.start).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      {dayjs(tour.end).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      <Link href={`/pages/tours/${tour.id}`}>View</Link>
                    </TableCell>
                    <TableCell>
                      <Button onClick={handleOpen}>Request</Button>
                      <Modal
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className="modal"
                      >
                        <Box className="modal-child">
                          <div>
                            By submitting your request you are confirming your
                            availability for these dates. You will not be able to cancel your request. Do you want to
                            continue?
                          </div>
                          <Button
                            onClick={() => {
                              enqueueSnackbar(
                                `${tour.schools.name} tour successfully requested.`,
                                { autoHideDuration: 3000, variant: "success" }
                              );
                              postRequest(tour.id, tour.requested);
                              handleClose();
                            }}
                            className="mui-btn"
                          >
                            Confirm
                          </Button>
                          <Button onClick={handleClose} className="mui-btn">
                            Cancel
                          </Button>
                        </Box>
                      </Modal>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default AvailableTours;
