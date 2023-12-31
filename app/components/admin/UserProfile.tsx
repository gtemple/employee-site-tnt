"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/app/typescript/profile";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

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

const UserProfile = (props: { profile: Profile }) => {
  const router = useRouter();

  const [openModerator, setOpenModerator] = useState(false);
  const handleOpenModerator = () => setOpenModerator(true);
  const handleCloseModerator = () => setOpenModerator(false);

  const [openAdmin, setOpenAdmin] = useState(false);
  const handleOpenAdmin = () => setOpenAdmin(true);
  const handleCloseAdmin = () => setOpenAdmin(false);

  const adminDesc =
    "Assigning someone as an admin gives them full application privledges. This includes: activating/deactivating accounts, assiging Activities Directors to tours, and and adding/editing/deleting information such as schools, tours, sites, accomodation and bus companies.";
  const moderatorDesc =
    "Assiging someone as moderator will allow them to edit a trips details";
  const activeDesc =
    "Activating an account will allow a user to edit their profile, view sites, speeches, and view upcoming and previous tours.";

  const { first_name, last_name, user_id, admin, moderator, email, active } =
    props.profile;

  const dataSend = {
    admin: admin,
    moderator: moderator,
    active: active,
    user_id: user_id,
  };

  const postUpdate = (access: string) => {
    if (access === "admin") {
      dataSend["admin"] = !admin;
    }
    if (access === "moderator") {
      dataSend["moderator"] = !moderator;
    }
    if (access === "active") {
      dataSend["active"] = !active;
    }

    fetch("/api/auth/admin-update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSend),
    });
    router.refresh();
  };

  return (
    <div>
      <SnackbarProvider />
      {first_name} {last_name}
      <div>admin? {admin ? "yes" : "no"}</div>
      <div>moderator? {moderator ? "yes" : "no"}</div>
      <div>active? {active ? "yes" : "no"}</div>
      <div>
        <div>
          Admin
          <Button onClick={handleOpenAdmin} variant="outlined">
            Change
          </Button>
        </div>
        <div>
          Moderator
          <Button onClick={handleOpenModerator} variant="outlined">
            Change
          </Button>
        </div>
        <div>
          Active
          <Button
            onClick={() => {
              postUpdate("active");
              enqueueSnackbar(
                `Account ${active ? "deactivated" : "activated"}`,
                {
                  autoHideDuration: 3000,
                  variant: "success",
                }
              );
            }}
            variant="outlined"
          >
            {active ? "deactivate" : "activate"}
          </Button>
        </div>
        {/* admin modal */}
        <Modal
          open={openAdmin}
          onClose={handleCloseAdmin}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>{adminDesc}</div>
            <div>Are you sure?</div>
            <Button
              onClick={() => {
                enqueueSnackbar(
                  `Admin privledges ${admin ? "removed" : "added"}`,
                  { autoHideDuration: 3000, variant: "success" }
                );
                postUpdate("admin");
                handleCloseAdmin();
              }}
              variant="outlined"
            >
              Confirm
            </Button>
            <Button onClick={handleCloseAdmin} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Modal>
        {/* moderator modal */}
        <Modal
          open={openModerator}
          onClose={handleCloseModerator}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>{moderatorDesc}</div>
            <div>Are you sure?</div>
            <Button
              onClick={() => {
                enqueueSnackbar(
                  `Moderator privledges ${moderator ? "removed" : "added"}`,
                  { autoHideDuration: 3000, variant: "success" }
                );
                postUpdate("moderator");
                handleCloseModerator();
              }}
              variant="outlined"
            >
              Confirm
            </Button>
            <Button onClick={handleCloseModerator} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default UserProfile;
