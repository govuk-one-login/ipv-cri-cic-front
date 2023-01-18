function formatDate(date) {
  const datePart = date.match(/\d+/g),
  year = datePart[0].substring(0,4),
  month = datePart[1], day = datePart[2];

  return day + ' ' + month + ' ' + year
}

module.exports = { formatDate };