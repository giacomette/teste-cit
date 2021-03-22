import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useSchedules from "../useSchedules";

describe("#useSchedules", () => {
  test("Deve renderizar o hook", () => {
    renderHook(() => useSchedules());
  });

  test("Deve criar um agendamento", async () => {
    const { result } = renderHook(() => useSchedules());

    const { handleSaveSchedule } = result.current;

    act(() => {
      handleSaveSchedule({
        start: "2020-02-02 10:00:00",
        end: "2020-02-02 20:00:00",
        jobs: [
          {
            id: 1,
            description: "Importação de arquivos de fundos",
            maxExecutionDate: "2021-02-03 10:20:00",
            estimatedTime: 6,
          },
        ],
      });
    });

    expect(result.current.schedules).toHaveLength(1);
  });

  test("Deve criar e listar varios agendamentos", async () => {
    const { result } = renderHook(() => useSchedules());

    const { handleSaveSchedule } = result.current;

    act(() => {
      handleSaveSchedule({
        start: "2020-02-02 10:00:00",
        end: "2020-02-02 20:00:00",
        jobs: [
          {
            id: 1,
            description: "Importação de arquivos de fundos",
            maxExecutionDate: "2021-02-03 10:20:00",
            estimatedTime: 6,
          },
        ],
      });

      handleSaveSchedule({
        start: "2020-02-03 10:00:00",
        end: "2020-02-03 20:00:00",
        jobs: [
          {
            id: 1,
            description: "Importação de arquivos de fundos",
            maxExecutionDate: "2021-02-03 10:20:00",
            estimatedTime: 6,
          },
        ],
      });

      handleSaveSchedule({
        start: "2020-02-04 10:00:00",
        end: "2020-02-04 20:00:00",
        jobs: [
          {
            id: 1,
            description: "Importação de arquivos de fundos",
            maxExecutionDate: "2021-02-03 10:20:00",
            estimatedTime: 6,
          },
        ],
      });
    });

    expect(result.current.schedules).toHaveLength(3);
  });
});
