const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { LandingPage, PhotoIdSelectionPage} = require("../pages");


Given(/^the user wants to progress to the next step of the journey$/, async function () {
  // console.log(">>In CIC step defintion");
  // console.log(">>using the landing pages function");
  const landingPage = new LandingPage(this.page);

  expect(landingPage.isCurrentPage()).to.be.true;
});

When(/^the user clicks the continue button on the LandingPage$/, async function () {
  // console.log(">>In cic step defintion");
  //  console.log(">>continue on photoId page");
  const landingPage = new LandingPage(this.page);

 // expect(landingPage.isCurrentPage()).to.be.true;

  await landingPage.continue();

});


Then(/^the user is routed to the next screen in the journey PhotoId Selection$/, async function () {
  const photoIdPage = new PhotoIdSelectionPage(this.page);

  expect(photoIdPage.isCurrentPage()).to.be.true;

});

       
// Given(/^the user wants to view their nearest post office that offers ID verification$/,
//   function () {
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
       