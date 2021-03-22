import moment from "moment";

const MAX_HOUR_EXECUTION = 8;

export function schedule(jobs, startSchedule, endSchedule) {
  const sortedJobs = sortedJobsByDate(jobs);

  const batchs = [];

  let batch = [];
  let nextStartDate = moment(startSchedule);

  for (const job of sortedJobs) {
    const { estimatedTime, maxExecutionDate } = job;

    const isValidJob = checkValidJob(
      maxExecutionDate,
      estimatedTime,
      nextStartDate,
      endSchedule
    );

    if (isValidJob === false) {
      continue;
    }

    if (batchs.length === 0) {
      batchs.push(batch);
    }

    const batchEstimated = sumEstimatedJobs(batch);

    if (batchEstimated + estimatedTime > MAX_HOUR_EXECUTION) {
      batch = [];
      batchs.push(batch);
    }

    nextStartDate = nextStartDate.add(estimatedTime, "hour");

    batch.push(job);
  }

  const result = batchs.map((batch) => batch.map((job) => job.id));

  return result;
}

export function sumEstimatedJobs(jobs) {
  const result = jobs.reduce((prev, item) => prev + item.estimatedTime, 0);

  return result;
}

export function checkValidJob(
  maxExecutionDate,
  estimatedTime,
  nextStartDate,
  maxEndSchedule
) {
  const maxStartDate = moment(maxExecutionDate).subtract(estimatedTime, "hour");

  if (checkAvailabilityStartJob(maxStartDate, nextStartDate) === false) {
    return false;
  }

  if (checkExceedEstimatedJob(estimatedTime)) {
    return false;
  }

  if (moment(nextStartDate).isAfter(maxEndSchedule)) {
    return false;
  }

  if (
    moment(nextStartDate).add(estimatedTime, "hour").isAfter(maxEndSchedule)
  ) {
    return false;
  }

  return true;
}

export function checkAvailabilityStartJob(startDate, nextStartDate) {
  const result = moment(startDate).isSameOrAfter(nextStartDate);

  return result;
}

export function checkExceedEstimatedJob(estimatedTime) {
  const result = estimatedTime > MAX_HOUR_EXECUTION;

  return result;
}

export function sortedJobsByDate(jobs) {
  return jobs.sort((a, b) => {
    const condition = moment(a.maxExecutionDate).isAfter(b.maxExecutionDate)
      ? 1
      : -1;

    return condition;
  });
}
