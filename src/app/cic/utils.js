function formatDate(date) {
  if (!date) {
    return ""
  }
  else {
    const datePart = date.match(/\d+/g);
    const year = datePart[0].substring(0,4);
    const month = datePart[1], day = datePart[2];
    return day + ' ' + month + ' ' + year
  }
}

module.exports = { formatDate };
