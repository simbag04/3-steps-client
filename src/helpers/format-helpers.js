function format_review_date(date) {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return d.toLocaleDateString('en-us', options)
}

function review_date_passed(date) {
  if (!date) return false;
  const today = new Date();
  const d = new Date(date);

  today.setHours(0, 0, 0, 0)
  d.setHours(0, 0, 0, 0)

  return today.getTime() > d.getTime();
}

export { format_review_date, review_date_passed }