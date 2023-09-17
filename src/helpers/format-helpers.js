/**
 * 
 * @param {String/Date} date to format
 * @returns formatted date string similar to "Aug 12, 2023"
 */
function format_review_date(date) {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return d.toLocaleDateString('en-us', options)
}

/**
 * checks if today is after or the day of review
 * @param {String/Date} date to check against
 * @returns number of days that today is after date
 */
function review_date_passed(date) {
  if (!date) return false;

  // create dates
  const today = new Date();
  const d = new Date(date);
  // reset hours
  today.setHours(0, 0, 0, 0) 
  d.setHours(0, 0, 0, 0) 

  // number of days that today is after the date
  return (today.getTime() - d.getTime())/(24 * 60 * 60 * 1000);
}

export { format_review_date, review_date_passed }