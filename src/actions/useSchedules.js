import { useCallback, useState } from "react";

export default function useSchedules() {
  const [schedules, setSchedules] = useState([]);

  const handleSaveSchedule = useCallback(
    (schedule) => {
      if (!schedule.id) {
        schedule.id = +new Date();
        setSchedules((prev) => [...prev, schedule]);

        return;
      }

      const newSchedules = schedules.map((item) => {
        if (item.id === schedule.id) {
          return schedule;
        }

        return item;
      });

      setSchedules(newSchedules);
    },
    [schedules]
  );

  return {
    schedules,
    handleSaveSchedule,
  };
}
