import { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import useSchedules from "./actions/useSchedules";

import ModalSchedule from "./components/ModalSchedule";
import { Container, GlobalStyle } from "./styles";

function App() {
  const [openModalSchedule, setOpenModalSchedule] = useState(false);

  const [scheduleForm, setScheduleForm] = useState();

  const { schedules, handleSaveSchedule } = useSchedules();

  useEffect(() => {
    if (!openModalSchedule) {
      setScheduleForm();
    }
  }, [openModalSchedule]);

  const handleDateClick = useCallback(({ dateStr }) => {
    setScheduleForm({ start: moment(dateStr).format("YYYY-MM-DDTHH:mm") });
    setOpenModalSchedule(true);
  }, []);

  const handleEventClick = useCallback(
    ({ event }) => {
      const schedule = schedules.find((item) => item.id === Number(event.id));

      setScheduleForm(schedule);
      setOpenModalSchedule(true);
    },
    [schedules]
  );

  const events = useMemo(() => {
    return schedules.map((schedule) => ({
      id: schedule.id,
      title: schedule.title,
      date: moment(schedule.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(schedule.end).format("YYYY-MM-DDTHH:mm"),
    }));
  }, [schedules]);

  return (
    <>
      <GlobalStyle />

      <ModalSchedule
        open={openModalSchedule}
        value={scheduleForm}
        onCancel={() => {
          setOpenModalSchedule(false);
        }}
        onSave={(schedule) => {
          handleSaveSchedule(schedule);
          setOpenModalSchedule(false);
        }}
      />

      <Container>
        <FullCalendar
          locale="pt-br"
          plugins={[timeGridPlugin, interactionPlugin]}
          weekends={false}
          events={events}
          dateClick={(arg) => handleDateClick(arg)}
          eventClick={(arg) => handleEventClick(arg)}
        />
      </Container>
    </>
  );
}

export default App;
