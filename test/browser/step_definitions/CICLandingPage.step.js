const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { LandingPage, PhotoIdSelectionPage} = require("../pages");


Given(/^the user wants to progress to the next step of the journey$/, async function () {
  const landingPage = new LandingPage(await this.page);

  expect(await landingPage.isCurrentPage()).to.be.true;
 
});

When(/^the user clicks the continue button on the LandingPage$/, async function () {
  const landingPage = new LandingPage(await this.page);

  await landingPage.continue();

});


Then(/^the user is routed to the next screen in the journey PhotoId Selection$/, async function () {
  const photoIdPage = new PhotoIdSelectionPage(await this.page);

  expect(await photoIdPage.isCurrentPage()).to.be.true;

});

       
// Given(/^the user wants to view their nearest post office that offers ID verification$/,
//   async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return "pending";
//   }
// );

// When(/^they click on the hyperlink$/, async function () {
//   // Write code here that turns the phrase above into concrete actions
//   return "pending";
// });

// Then(/^they are redirected to the PO's own branch checking page$/,
//   async function () {
//     // Write code here that turns the phrase above into concrete actions
//     return "pending";
//   }
// );
       