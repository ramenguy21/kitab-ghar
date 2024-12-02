import { useEffect, useState } from "react";

type CalendarType = {
  [month: number]: Date[];
};
const Calendar = () => {
  function generateData(year: number) {
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

  const [calendar, setCalendar] = useState<CalendarType>({});

  function getMonthData(month: number) {
    return calendar[month];
  }

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
    const year = new Date().getFullYear();
    setCalendar(generateData(year));
  }, []);

  return (
    <div>
      <h1>Calendar for {monthNames.get(new Date().getMonth())}</h1>
      <div className="">
        <div className="grid grid-cols-7 gap-2">
          {getMonthData(new Date().getMonth()).map((day) => {
            return (
              <div className="m-2 rounded text-white bg-blue-500 w-fit m-auto">
                {day
                  .toDateString()
                  .split(" ")
                  .map((el) => (
                    <p className="text-xs text-center">{el}</p>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
