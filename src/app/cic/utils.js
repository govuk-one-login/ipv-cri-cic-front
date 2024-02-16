const moment = require("moment");

function formatDate(date, format, language) {
  const isValid = moment(date, format, true).isValid();

  if (isValid) {
    const dateTransform = new Date(date);
    let dateFormat = "en-GB";
    if (language === "cy") {
      dateFormat = "cy";
    }
    return dateTransform.toLocaleDateString(dateFormat, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } else {
    return "";
  }
}

module.exports = { formatDate };
