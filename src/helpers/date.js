export function isAfter(firstDate, secondDate) {
  const first = getInstanceDate(firstDate);
  const second = getInstanceDate(secondDate);

  return first.getTime() > second.getTime();
}

export function isBefore(firstDate, secondDate) {
  const first = getInstanceDate(firstDate);
  const second = getInstanceDate(secondDate);

  return first.getTime() < second.getTime();
}

export function getInstanceDate(date) {
  if (!date) {
    return null;
  }

  if (!(date instanceof Date)) {
    return new Date(date);
  }

  return date;
}
