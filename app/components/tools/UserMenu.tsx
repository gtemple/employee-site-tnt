"use client";
import { useState } from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import LogoutButton from "./LogoutButton";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Profile from "@/app/typescript/profile";

type Props = {
  profile: Profile;
};

export const UserMenu = ({ profile }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="nav-profile">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar>{profile.first_name[0]}</Avatar>
        <div className="nav-name">{profile.first_name}</div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href={"/pages/user/update"} className="nav-link">
            Update Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LogoutButton />
        </MenuItem>
      </Menu>
    </div>
  );
};
