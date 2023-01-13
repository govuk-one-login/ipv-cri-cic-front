const { Given } = require("@cucumber/cucumber");

const { RelyingPartyPage } = require("../pages");

Given(/^([A-Za-z ])+is using the system$/, async function (name) {
  // console.log(">>In details step defintion");
  // console.log(">>using the system function");
  this.user = this.allUsers[name];
  const rpPage = new RelyingPartyPage(this.page);

  await rpPage.goto();
});

Given(
  "they have provided their details",
  { timeout: 10 * 1000 },
  async function () {
    // console.log(">>In details step defintion");
    // console.log(">>In they have provided their details function");
   
  }
  
);
