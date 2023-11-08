"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "@/app/styles/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const AddTourDay = () => {
  const [data, setData] = useState({});
  const [date, setDate] = useState<Value>(new Date());
  const [addDayWidget, setAddDayWidget] = useState(false);

  const addDate = () => {
    const keys = Object.keys(data);
    if (keys.length > 0) {
      return;
    }
    setData(
      {"1": {
        date: date,
      }}
    );
    console.log(keys);
    console.log("post request to add date");
    return;
  };

  const handleOpenDayWidget = () => setAddDayWidget(true);
  const handleCloseDayWidget = (submit: boolean) => {
    if (!submit) {
      setAddDayWidget(false);
    }
    addDate();
    setAddDayWidget(false);
  };

  return (
    <div>
      <button onClick={() => console.log(data)}>test data</button>
      {!addDayWidget ? (
        <button onClick={handleOpenDayWidget}>Add Day</button>
      ) : (
        <div>
          <Calendar onChange={setDate} value={date} />
          <button onClick={() => handleCloseDayWidget(true)}>Submit</button>
          <button onClick={() => handleCloseDayWidget(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};
