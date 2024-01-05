"use client";

import { useState } from "react";
import { ItineraryDay } from "@/app/typescript/itinerary";
import Event from "@/app/typescript/event";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  itinerary: ItineraryDay;
  deleteEvent: (event: Event) => void;
  editEvent: (event: Event, description: string) => void;
};

const PrintTourDay = ({ itinerary, deleteEvent, editEvent }: Props) => {
  const [field, setField] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const printActivities = () => {
    const activitiesKeys = Object.keys(itinerary.schedule);

    // Sort activities by start time
    const sortedActivitiesKeys = activitiesKeys.sort((a, b) => {
      const activityA = itinerary.schedule[a];
      const activityB = itinerary.schedule[b];
      return dayjs(activityA.start).diff(dayjs(activityB.start));
    });

    const activityStyle = (activity: string) => {
      if (activity === "hotel") {
        return "hotel-label";
      }
      if (activity === "restaurant") {
        return "restaurant-label";
      }
      if (activity === "site") {
        return "site-label";
      }
    };

    const handleChange = (event: SelectChangeEvent) => {
      const { value } = event.target;
      setField(value);
    };

    return sortedActivitiesKeys.map((key: string) => {
      const activity = itinerary.schedule[key];
      const activityLabel = "activity " + activityStyle(activity.type);
      return (
        <div className={activityLabel} key={key}>
          <div className="time-display">
            {dayjs(activity.start).format("HH:mm")} -{" "}
            {dayjs(activity.end).format("HH:mm")}
          </div>
          <div className="activity-text">
            <div className="activity-name">{activity.activity.name}</div>
            <div className="activity-address">
              {activity.activity.address} - {activity.activity.phone}
            </div>
            <div>{activity.activity.short_desc}</div>
          </div>
          <div className="delete-section">
            {deleteEvent !== null && (
              <div>
                <div onClick={handleOpen}>
                  <EditIcon />
                </div>
                <div
                  onClick={() => {
                    deleteEvent(activity);
                  }}
                >
                  <DeleteIcon />
                </div>
              </div>
            )}

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="edit-modal">
                <div>{activity.activity.name}</div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  defaultValue={activity.activity.short_desc}
                  className='edit-box'
                  fullWidth
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                />
                <div>
                  <button
                    onClick={() => {
                      editEvent(activity, field);
                      handleClose();
                    }}
                  >
                    Confirm
                  </button>
                  <button onClick={handleClose}>Cancel</button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      );
    });
  };

  return <div>{printActivities()}</div>;
};

export default PrintTourDay;
