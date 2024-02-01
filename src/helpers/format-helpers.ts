/**
 * 
 * @param {string | Date} date to format
 * @returns formatted date string similar to "Aug 12, 2023"
 */
const format_review_date = (date: string | Date): string => {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: "numeric" }
  return d.toLocaleDateString('en-us', options)
}

/**
 * checks if today is after or the day of review
 * @param {string | Date | undefined} date to check against
 * @returns number of days that today is after date
 */
const review_date_passed = (date: string | Date | undefined): number | boolean => {
  if (!date) return false;

  // create dates
  const today = new Date();
  // today.setDate(today.getDate() + 2)
  const d = new Date(date);
  // reset hours
  today.setHours(0, 0, 0, 0) 
  d.setHours(0, 0, 0, 0) 

  // number of days that today is after the date
  return (today.getTime() - d.getTime())/(24 * 60 * 60 * 1000);
}

export { format_review_date, review_date_passed }