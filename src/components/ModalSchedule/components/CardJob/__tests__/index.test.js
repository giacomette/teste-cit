import { render } from "@testing-library/react";
import CardJob from "../index";

describe("CardJob", () => {
  test("Deve renderizar o card", () => {
    const job = {
      id: 1,
      description: "Importação de arquivos de fundos",
      maxExecutionDate: "2021-02-03 10:20:00",
      estimatedTime: 6,
    };

    render(<CardJob value={job} />);
  });

  test("Deve verificar se houve mudança no card", () => {
    const job = {
      id: 1,
      description: "Importação de arquivos de fundos",
      maxExecutionDate: "2021-02-03 10:20:00",
      estimatedTime: 6,
    };

    const component = render(<CardJob value={job} />);

    expect(component).toMatchSnapshot();
  });

  test("Deve renderizar o titulo do job no card", () => {
    const job = {
      id: 1,
      description: "Importação de arquivos de fundos",
      maxExecutionDate: "2021-02-03 10:20:00",
      estimatedTime: 6,
    };

    const { queryByTestId } = render(<CardJob value={job} />);

    expect(queryByTestId("job-title-1")).not.toBeNull();
  });

  test("Deve renderizar o tempo máximo de conclusão do job no card", () => {
    const job = {
      id: 1,
      description: "Importação de arquivos de fundos",
      maxExecutionDate: "2021-02-03 10:20:00",
      estimatedTime: 6,
    };

    const { queryByTestId } = render(<CardJob value={job} />);

    expect(queryByTestId("job-max-execution-date-1")).not.toBeNull();
  });

  test("Deve renderizar o tempo estimado em horas do job no card", () => {
    const job = {
      id: 1,
      description: "Importação de arquivos de fundos",
      maxExecutionDate: "2021-02-03 10:20:00",
      estimatedTime: 6,
    };

    const { queryByTestId } = render(<CardJob value={job} />);

    expect(queryByTestId("job-estimated-time-1")).not.toBeNull();
  });
});
