import { isAfter, isBefore } from "../helpers/date";

const KEY = "@schedules";

export function addSchedule(schedule) {
  if (!schedule?.jobs?.length) {
    return null;
  }

  const schedules = findAllSchedules();

  schedules.push(schedule);

  localStorage.setItem(KEY, JSON.stringify(schedules));

  return true;
}

export function findAllSchedules() {
  const schedules = localStorage.getItem(KEY);

  if (!schedules) {
    return [];
  }

  try {
    return JSON.parse(schedules);
  } catch (error) {
    return [];
  }
}

export async function executeJobs(schedule) {
  const jobsSuccess = [];
  const jobsError = [];

  const promises = schedule.jobs.map((job) =>
    executeJob(job, schedule.dataInicio, schedule.dataFim)
  );

  const results = await Promise.all(promises);

  for (const result of results) {
    if (result.success) {
      jobsSuccess.push(result.id);
    } else {
      jobsError.push(result.id);
    }
  }

  return [jobsSuccess, jobsError];
}

export async function executeJob(job, minDate, maxDate) {
  return new Promise((resolve) => {
    if (job.tempoEstimado > 8) {
      return resolve({ success: false, id: job.id });
    }

    if (isAfter(job.dataMaximaExecucao, maxDate)) {
      return resolve({ success: false, id: job.id });
    }

    if (isBefore(job.dataMaximaExecucao, minDate)) {
      return resolve({ success: false, id: job.id });
    }

    return resolve({ success: true, id: job.id });
  });
}

export function clearAllSchedules() {
  localStorage.removeItem(KEY);
}
