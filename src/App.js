import { useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Container, GlobalStyle } from "./styles";

function App() {
  const handleDateClick = useCallback(({ dateStr }) => {}, []);

  const handleEventClick = useCallback(({ event }) => {}, []);

  const events = [];

  return (
    <>
      <GlobalStyle />

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
