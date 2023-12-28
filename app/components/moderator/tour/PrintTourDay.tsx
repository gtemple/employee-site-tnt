"use client";

import { ItineraryDay } from "@/app/typescript/itinerary";
import Event from "@/app/typescript/event";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  itinerary: ItineraryDay;
  deleteEvent: (event: Event) => void;
  editEvent: (event: Event, description: string) => void;
};

const PrintTourDay = ({ itinerary, deleteEvent, editEvent }: Props) => {
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

    const editModule = (activity: Event) => {
      editEvent

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
    }
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
          <div className="edit-section">
            <div
                onClick={() => {
                  editModule(activity);
                }}
            >
              <EditIcon />
            </div>
          </div>
          <div className="delete-section">
            {deleteEvent !== null && (
              <div
                onClick={() => {
                  deleteEvent(activity);
                }}
              >
                <DeleteIcon />
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  return <div>{printActivities()}</div>;
};

export default PrintTourDay;
