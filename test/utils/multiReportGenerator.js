const reporter = require("multiple-cucumber-html-reporter");
var date = new Date();
var currentDate =
  date.getDate() +
  "_" +
  (date.getMonth() + 1) +
  "_" +
  date.getFullYear() +
  "_" +
  date.getHours() +
  "_" +
  date.getMinutes() +
  "_" +
  date.getSeconds() +
  "_" +
  date.getMilliseconds();

var options = {
  jsonDir: "test/reports",
  reportPath:
    "test/reports/cic-reports/cri-cic-report_" + currentDate + ".html",
  metadata: {
    browser: {
      name: "chrome",
      version: "112.0.56",
    },
    device: "MacBook",
    platform: {
      name: "osx",
      version: "Ventura 13.3.1",
    },
  },
  disableLog: "true",
  openReportInBrowser: "true",
  customData: {
    title: "Run info",
    data: [
      {
        label: "Project:",
        value: "Digital Identity: Claimed Identity Collector",
      },
      { label: "Release:", value: "June 2023" },
      { label: "Environment:", value: "Local" },
      {
        label: "Execution Start Time: ",
        value: new Date().toString().substring(0, 25),
      },
    ],
  },
};
reporter.generate(options);