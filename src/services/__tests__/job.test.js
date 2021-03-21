import {
  addSchedule,
  executeJobs,
  executeJob,
  findAllSchedules,
  clearAllSchedules,
} from "../job";

describe("#job", () => {
  beforeEach(() => {
    clearAllSchedules();
  });

  test("Deve adicionar um agendamento de jobs", () => {
    const mockSchedule = {
      id: 1,
      jobs: [
        {
          id: 1,
          descricao: "Importação de arquivos de fundos",
          dataMaximaExecucao: "2019-11-10 12:00:00",
          tempoEstimado: 2,
        },
        {
          id: 2,
          descricao: "Importação de dados da Base Legada",
          dataMaximaExecucao: "2019-11-11 18:00:00",
          tempoEstimado: 4,
        },
      ],
    };

    const result = addSchedule(mockSchedule);

    expect(result).not.toBeNull();
  });

  test("Não deve adicionar um agendamento caso não seja informado nenhum job", () => {
    const mockSchedule = {
      id: 1,
      jobs: [],
    };

    const result = addSchedule(mockSchedule);

    expect(result).toBeNull();
  });

  test("Deve retornar todos os agendamentos criados", () => {
    const mockSchedule1 = {
      id: 1,
      jobs: [
        {
          id: 1,
          descricao: "Importação de arquivos de fundos",
          dataMaximaExecucao: "2019-11-10 12:00:00",
          tempoEstimado: 2,
        },
      ],
    };

    const mockSchedule2 = {
      jobs: [
        {
          descricao: "Importação de dados da Base Legada",
          dataMaximaExecucao: "2019-11-11 18:00:00",
          tempoEstimado: 4,
        },
      ],
    };

    addSchedule(mockSchedule1);

    addSchedule(mockSchedule2);

    const result = findAllSchedules();

    expect(result).toHaveLength(2);
  });

  test("Não deve retornar agendamentos caso não tenha nenhum criado", () => {
    const mockSchedule1 = {
      jobs: [],
    };

    const mockSchedule2 = {
      jobs: [],
    };

    addSchedule(mockSchedule1);

    addSchedule(mockSchedule2);

    const result = findAllSchedules();

    expect(result).toHaveLength(0);
  });

  test("Deve executar um job que esteja dentro da janela de execução e com tempo estimado menor ou igual a 8", async () => {
    const now = new Date().getTime();

    const mockMinDate = new Date(now - 100000);
    const mockMaxDate = new Date(now + 900000);

    const mockJobExecuteDate = new Date(now);

    const mockJob = {
      id: 1,
      descricao: "Importação de dados da Base Legada",
      dataMaximaExecucao: mockJobExecuteDate.toISOString(),
      tempoEstimado: 8,
    };

    const result = await executeJob(mockJob, mockMinDate, mockMaxDate);

    expect(result.success).toBe(true);
    expect(result.id).toBe(mockJob.id);
  });

  test("Não deve executar um job caso a data de execução tiver antes da janela de execução", async () => {
    const now = new Date().getTime();

    const mockMinDate = new Date(now - 100000);
    const mockMaxDate = new Date(now + 900000);

    const mockJob = {
      id: 1,
      descricao: "Importação de dados da Base Legada",
      dataMaximaExecucao: "2020-02-10 10:00:00",
      tempoEstimado: 6,
    };

    const result = await executeJob(mockJob, mockMinDate, mockMaxDate);

    expect(result.success).toBe(false);
    expect(result.id).toBe(mockJob.id);
  });

  test("Não deve executar um job caso a data de execução tiver depois da janela de execução", async () => {
    const now = new Date().getTime();

    const mockMinDate = new Date(now - 100000);
    const mockMaxDate = new Date(now + 900000);

    const mockJobExecuteDate = new Date(now + 1000000);

    const mockJob = {
      id: 1,
      descricao: "Importação de dados da Base Legada",
      dataMaximaExecucao: mockJobExecuteDate.toISOString(),
      tempoEstimado: 6,
    };

    const result = await executeJob(mockJob, mockMinDate, mockMaxDate);

    expect(result.success).toBe(false);
    expect(result.id).toBe(mockJob.id);
  });

  test("Não deve executar um job caso o tempo estimado for maior que 8", async () => {
    const now = new Date().getTime();

    const mockMinDate = new Date(now - 100000);
    const mockMaxDate = new Date(now + 900000);

    const mockJobExecuteDate = new Date(now);

    const mockJob = {
      id: 1,
      descricao: "Importação de dados da Base Legada",
      dataMaximaExecucao: mockJobExecuteDate.toISOString(),
      tempoEstimado: 9,
    };

    const result = await executeJob(mockJob, mockMinDate, mockMaxDate);

    expect(result.success).toBe(false);
    expect(result.id).toBe(mockJob.id);
  });

  test("Deve executar os jobs de um agendamento e retornar 1 com sucesso e 2 com erro", async () => {
    const now = new Date().getTime();

    const mockMinDate = new Date(now - 100000);
    const mockMaxDate = new Date(now + 900000);

    const mockJobExecuteDate = new Date(now);

    const mockSchedule = {
      id: 1,
      dataInicio: mockMinDate.toISOString(),
      dataFim: mockMaxDate.toISOString(),
      jobs: [
        {
          id: 1,
          descricao: "Importação de arquivos de fundos",
          dataMaximaExecucao: "2020-11-10 12:00:00",
          tempoEstimado: 2,
        },
        {
          id: 2,
          descricao: "Importação de dados da Base Legada",
          dataMaximaExecucao: mockJobExecuteDate.toISOString(),
          tempoEstimado: 6,
        },
        {
          id: 3,
          descricao: "Importação de dados de integração",
          dataMaximaExecucao: "2019-11-11 08:00:00",
          tempoEstimado: 4,
        },
      ],
    };

    addSchedule(mockSchedule);

    const [result] = findAllSchedules();

    const resultJobs = await executeJobs(result);

    const expected = [
      [2], // jobs que deram certo
      [1, 3], // jobs que ultrapassaram a data de execucao
    ];

    expect(resultJobs).toEqual(expected);
  });
});
