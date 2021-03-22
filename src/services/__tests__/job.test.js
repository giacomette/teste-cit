import {
  schedule,
  sumEstimatedJobs,
  sortedJobsByDate,
  checkValidJob,
  checkExceedEstimatedJob,
  checkAvailabilityStartJob,
} from "../job";

describe("jobs", () => {
  test("Deve retornar verdadeiro caso o job exceda 8 horas", () => {
    const result = checkExceedEstimatedJob(9);

    expect(result).toBe(true);
  });

  test("Deve retornar falso caso o job não exceda 8 horas", () => {
    const result = checkExceedEstimatedJob(6);

    expect(result).toBe(false);
  });

  test("Deve iniciar um job caso a data de inicio seja maior ou igual a data disponivel na lista de execução atual", () => {
    const mockJobStartDate = "2020-02-02 12:00:00";
    const mockBatchNextStartDate = "2020-02-02 11:00:00";

    const result = checkAvailabilityStartJob(
      mockJobStartDate,
      mockBatchNextStartDate
    );

    expect(result).toBe(true);
  });

  test("Não deve iniciar um job caso tenha job em andamento", () => {
    const mockJobStartDate = "2020-02-02 10:00:00";
    const mockBatchNextStartDate = "2020-02-02 11:00:00";

    const result = checkAvailabilityStartJob(
      mockJobStartDate,
      mockBatchNextStartDate
    );

    expect(result).toBe(false);
  });

  test("Deve retornar os jobs ordenados ascendente pela data máxima de execução", () => {
    const mockJobs = [
      {
        id: 1,
        description: "Importação de arquivos de fundos",
        maxExecutionDate: "2021-02-03 10:20:00",
        estimatedTime: 6,
      },
      {
        id: 2,
        description: "Importação de dados da Base Legada",
        maxExecutionDate: "2021-02-03 04:00:00",
        estimatedTime: 4,
      },
      {
        id: 3,
        description: "Importação de dados de integração",
        maxExecutionDate: "2021-02-03 12:30:00",
        estimatedTime: 6,
      },
    ];

    const expected = [
      {
        id: 2,
        description: "Importação de dados da Base Legada",
        maxExecutionDate: "2021-02-03 04:00:00",
        estimatedTime: 4,
      },
      {
        id: 1,
        description: "Importação de arquivos de fundos",
        maxExecutionDate: "2021-02-03 10:20:00",
        estimatedTime: 6,
      },
      {
        id: 3,
        description: "Importação de dados de integração",
        maxExecutionDate: "2021-02-03 12:30:00",
        estimatedTime: 6,
      },
    ];

    const result = sortedJobsByDate(mockJobs);

    expect(result).toEqual(expected);
  });

  test("Deve somar o tempo total estimado de uma lista de jobs", () => {
    const mockJobs = [
      {
        id: 1,
        description: "Importação de arquivos de fundos",
        maxExecutionDate: "2021-02-03 10:20:00",
        estimatedTime: 6,
      },
      {
        id: 2,
        description: "Importação de dados da Base Legada",
        maxExecutionDate: "2021-02-03 04:00:00",
        estimatedTime: 4,
      },
      {
        id: 3,
        description: "Importação de dados de integração",
        maxExecutionDate: "2021-02-03 12:30:00",
        estimatedTime: 6,
      },
    ];

    const result = sumEstimatedJobs(mockJobs);

    expect(result).toEqual(16);
  });

  test("Deve criar uma lista de execução de jobs dentro de uma janela com inicio e fim", () => {
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

    const result = schedule(mockJobs, mockStartDate, mockEndDate);

    expect(result).toEqual(expected);
  });

  test("Deve criar uma janela de execução com duas listas de jobs que não ultrapassem 8 horas de execução e obedeçam a data de inicio e fim da janela", () => {
    const mockJobs = [
      {
        id: 1,
        description: "Importação de arquivos de fundos",
        maxExecutionDate: "2019-11-10 12:00:00",
        estimatedTime: 2,
      },
      {
        id: 2,
        description: "Importação de dados da Base Legada",
        maxExecutionDate: "2019-11-11 12:00:00",
        estimatedTime: 4,
      },
      {
        id: 3,
        description: "Importação de dados de integração",
        maxExecutionDate: "2019-11-11 08:00:00",
        estimatedTime: 6,
      },
      {
        id: 4,
        description: "ETL do banco legado",
        maxExecutionDate: "2019-11-11 11:00:00",
        estimatedTime: 10,
      },
    ];

    const mockStartDate = "2019-11-10 09:00:00";
    const mockEndDate = "2019-11-11 12:00:00";

    const expected = [[1, 3], [2]];

    const result = schedule(mockJobs, mockStartDate, mockEndDate);

    expect(result).toEqual(expected);
  });

  test("Não deve criar uma janela de execução com jobs que ultrapassem 8 horas de execução", () => {
    const mockJobs = [
      {
        id: 1,
        description: "Importação de arquivos de fundos",
        maxExecutionDate: "2019-11-10 12:00:00",
        estimatedTime: 12,
      },
      {
        id: 2,
        description: "Importação de dados da Base Legada",
        maxExecutionDate: "2019-11-11 12:00:00",
        estimatedTime: 24,
      },
    ];

    const mockStartDate = "2019-11-10 09:00:00";
    const mockEndDate = "2019-11-11 12:00:00";

    const expected = [];

    const result = schedule(mockJobs, mockStartDate, mockEndDate);

    expect(result).toEqual(expected);
  });

  test("Não deve adicionar jobs na janela de execução caso ultrapassem a data final da janela de execução", () => {
    const mockJobs = [
      {
        id: 1,
        description: "Importação de arquivos de fundos",
        maxExecutionDate: "2019-11-11 12:00:00",
        estimatedTime: 5,
      },
      {
        id: 2,
        description: "Importação de dados da Base Legada",
        maxExecutionDate: "2019-11-11 12:00:00",
        estimatedTime: 6,
      },
    ];

    const mockStartDate = "2019-11-11 00:00:00";
    const mockEndDate = "2019-11-11 04:00:00";

    const expected = [];

    const result = schedule(mockJobs, mockStartDate, mockEndDate);

    expect(result).toEqual(expected);
  });

  test("Não deve conter jobs que iniciem antes do anterior finalizar", () => {
    const mockJobs = [
      {
        id: 1,
        description: "Importação de arquivos de fundos",
        maxExecutionDate: "2019-11-11 03:00:00",
        estimatedTime: 3,
      },
      {
        id: 2,
        description: "Importação de dados da Base Legada",
        maxExecutionDate: "2019-11-11 04:00:00",
        estimatedTime: 2,
      },
    ];

    const mockStartDate = "2019-11-11 00:00:00";
    const mockEndDate = "2019-11-11 04:00:00";

    const expected = [[1]];

    const result = schedule(mockJobs, mockStartDate, mockEndDate);

    expect(result).toEqual(expected);
  });

  test("Não deve retornar jobs que ultrapassem 8 ou tenha data maxima anterior a data de inicio da janela", () => {
    const mockJob1 = {
      id: 1,
      description: "Importação de arquivos de fundos",
      maxExecutionDate: "2019-11-10 23:00:00",
      estimatedTime: 3,
    };

    const mockJob2 = {
      id: 2,
      description: "Importação de dados da Base Legada",
      maxExecutionDate: "2019-11-11 04:00:00",
      estimatedTime: 10,
    };

    const mockStartDate = "2019-11-11 00:00:00";
    const mockEndDate = "2019-11-11 04:00:00";

    const resultValidadedMaxExecutionDate = checkValidJob(
      mockJob1.maxExecutionDate,
      mockJob1.estimatedTime,
      mockStartDate,
      mockEndDate
    );

    expect(resultValidadedMaxExecutionDate).toBe(false);

    const resultValidadedMaxExecutionTime = checkValidJob(
      mockJob2.maxExecutionDate,
      mockJob2.estimatedTime,
      mockStartDate,
      mockEndDate
    );

    expect(resultValidadedMaxExecutionTime).toBe(false);
  });
});
