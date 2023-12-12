"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteButton = ({
  id,
  path,
  name,
}: {
  id: string;
  path: string;
  name: string;
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);
  const router = useRouter();

  const remove = () => {

    fetch(`/api/${path}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: id}),
    });

    enqueueSnackbar(`${name} was successfully deleted`, {
      autoHideDuration: 3000,
      variant: "success",
    });
    router.push(`/pages/moderator/${path}/`);
  };

  return (
    <div>
      <SnackbarProvider />
      <button className='delete-btn' onClick={handleOpenConfirm}><DeleteIcon /></button>
      <Modal
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>Are you sure you want to delete {name}?</div>
          <Button
            onClick={() => {
              remove();
              handleCloseConfirm();
            }}
            variant="outlined"
          >
            Yes
          </Button>
          <Button onClick={handleCloseConfirm} variant="outlined">
            No
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteButton;
