const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { LandingPage, PhotoIdSelectionPage } = require("../pages");


  Given(/^the user wants to progress to the next step of the journey$/, async function () {
  // console.log(">>In CIC step defintion");
  // console.log(">>using the landing pages function");
  const landingPage = new LandingPage(this.page);

  expect(landingPage.isCurrentPage()).to.be.true;
});

When(/^the user clicks the continue button$/, async function () {
  // console.log(">>In cic step defintion");
  // console.log(">>continue on photoId page");
  const landingPage = new LandingPage(this.page);

  expect(landingPage.isCurrentPage()).to.be.true;

  await landingPage.continue();
});


Then("the user is routed to the next screen in the journey", function () {
  const photoIdPage = new PhotoIdSelectionPage(this.page);

  expect(photoIdPage.isCurrentPage()).to.be.true;

});

