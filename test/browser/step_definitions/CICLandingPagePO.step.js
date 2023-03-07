const { Given, When, Then } = require("@cucumber/cucumber");

const { LandingPage} = require("../pages");


Given(
  /^the user wants to view their nearest post office that offers ID verification$/,
   async function () {
});

When(/^the user clicks on the hyperlink$/, async function () {
  const landingPage = new LandingPage(await this.page);

   await landingPage.postOfficeLink();

});


 Then(/^they are redirected to the PO's own branch checking page$/, async function () {
 });
