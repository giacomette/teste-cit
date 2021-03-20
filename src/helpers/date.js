export function isAfter(firstDate, secondDate) {
  let first = firstDate;
  let second = secondDate;

  if (!(first instanceof Date)) {
    first = new Date(first);
  }

  if (!(second instanceof Date)) {
    second = new Date(second);
  }

  return first.getTime() > second.getTime();
}
