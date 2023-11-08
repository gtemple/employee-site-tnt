"use client";

import { useState } from "react";

export const AddTourDay = () => {
  const [addDayWidget, setAddDayWidget] = useState(false);
  const handleOpenDayWidget = () => setAddDayWidget(true);

  const handleCloseDayWidget = (submit: boolean) => {
    if (!submit) {
      setAddDayWidget(false);
    }
    setAddDayWidget(false);
    console.log("post request to add date");
  };

  return (
    <div>
      {!addDayWidget ? (
        <button onClick={handleOpenDayWidget}>Add Day</button>
      ) : (
        <div>
          <button onClick={() => handleCloseDayWidget(true)}>Submit</button>
          <button onClick={() => handleCloseDayWidget(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};
