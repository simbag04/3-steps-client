/**
 * 
 * @param {string | Date} date to format
 * @returns formatted date string similar to "Aug 12, 2023"
 */
const format_review_date = (date: string | Date): string => {
  const d = new Date(date);
  // format: Feb 1, 2024, 4:00 PM
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: "numeric", hour:"numeric", hourCycle: "h12",  minute: "numeric" }

  // format: Feb 1, 2024
  // const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: "numeric" }
  return d.toLocaleString('en-us', options)
}

/**
 * checks if today is after or the day of review
 * @param {string | Date | undefined} date to check against
 * @returns number of days that today is after date
 */
const review_date_passed = (date: string | Date | undefined): number => {
  if (!date) return -1;

  // create dates
  const today = new Date();
  // today.setDate(today.getDate() + 2)
  const d = new Date(date);

  // number of days that today is after the date
  return (today.getTime() - d.getTime())/(24 * 60 * 60 * 1000);
}

export { format_review_date, review_date_passed }