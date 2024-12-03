import { useEffect, useState } from "react";

type CalendarType = {
  [month: number]: Date[];
};
const Calendar = () => {
  // Since date isn't reactive, it's fine to define it like this I think.
  const date = new Date();

  function generateCalendar(year: number) {
    const data: CalendarType = [];

    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      data[month + 1] = [];

      for (let day = 1; day <= daysInMonth; day++) {
        data[month + 1].push(new Date(year, month, day));
      }
    }

    return data;
  }

  const [calendar, setCalendar] = useState<CalendarType>([]);

  const monthNames = new Map([
    [1, "January"],
    [2, "Feburary"],
    [3, "March"],
    [4, "April"],
    [5, "May"],
    [6, "June"],
    [7, "July"],
    [8, "August"],
    [9, "September"],
    [10, "October"],
    [11, "November"],
    [12, "December"],
  ]);

  useEffect(() => {
    const year = date.getFullYear();
    setCalendar(generateCalendar(year));
  }, []);

  return (
    <div className="bg-cyan-400">
      <h1 className="text-center">
        Calendar for {monthNames.get(date.getMonth())}
      </h1>
      <div className="">
        <div className="grid grid-cols-7 gap-2">
          {
            //Extract out day names and add them as the first row
            calendar[date.getMonth()] &&
              calendar[date.getMonth()]
                .slice(0, 7)
                .map((dayDP) => (
                  <p className="text-center font-bold text-white">
                    {dayDP.toDateString().split(" ")[0]}
                  </p>
                ))
          }
          {calendar[date.getMonth()] &&
            calendar[date.getMonth()].map((day) => {
              return (
                <div className="m-2 p-2 rounded text-white bg-blue-500 w-fit m-auto">
                  <p>{day.toDateString().split(" ")[2]}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
