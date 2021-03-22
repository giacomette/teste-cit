import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useExecuteSchedule from "../useExecuteSchedule";

describe("#useExecuteSchedule", () => {
  test("Deve renderizar o hook", () => {
    renderHook(() => useExecuteSchedule());
  });

  test("Deve executar um agendamento de jobs", async () => {
    const { result } = renderHook(() => useExecuteSchedule());

    const { handleExecuteSchedule } = result.current;

    const mockJobs = [
      {
        id: 1,
        description: "Importação de arquivos de fundos",
        maxExecutionDate: "2021-02-02 14:20:00",
        estimatedTime: 6,
      },
      {
        id: 2,
        description: "Importação de dados da Base Legada",
        maxExecutionDate: "2021-02-02 18:00:00",
        estimatedTime: 2,
      },
      {
        id: 3,
        description: "Importação de dados de integração",
        maxExecutionDate: "2021-02-02 12:30:00",
        estimatedTime: 6,
      },
    ];

    const mockStartDate = "2021-02-02 08:00:00";
    const mockEndDate = "2021-02-02 20:00:00";

    const expected = [[1, 2]];

    act(() => {
      handleExecuteSchedule({
        jobs: mockJobs,
        start: mockStartDate,
        end: mockEndDate,
      });
    });

    expect(result.current.listResult).toEqual(expected);
  });

  test("Deve limpar o resultado de uma execução", async () => {
    const { result } = renderHook(() => useExecuteSchedule());

    const { handleExecuteSchedule, clearResult } = result.current;

    const mockJobs = [
      {
        id: 1,
        description: "Importação de arquivos de fundos",
        maxExecutionDate: "2021-02-02 14:20:00",
        estimatedTime: 6,
      },
      {
        id: 2,
        description: "Importação de dados da Base Legada",
        maxExecutionDate: "2021-02-02 18:00:00",
        estimatedTime: 2,
      },
      {
        id: 3,
        description: "Importação de dados de integração",
        maxExecutionDate: "2021-02-02 12:30:00",
        estimatedTime: 6,
      },
    ];

    const mockStartDate = "2021-02-02 08:00:00";
    const mockEndDate = "2021-02-02 20:00:00";

    const expected = [[1, 2]];

    act(() => {
      handleExecuteSchedule({
        jobs: mockJobs,
        start: mockStartDate,
        end: mockEndDate,
      });
    });

    expect(result.current.listResult).toEqual(expected);

    act(() => {
      clearResult();
    });

    expect(result.current.listResult).toBeUndefined();
  });
});
