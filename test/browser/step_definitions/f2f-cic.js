const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { LandingPage, PhotoIdSelectionPage } = require("../pages");

When(/^they (?:have )?start(?:ed)? the CiC journey$/, async function () {});

Given(/they (?:can )?see? the landing page$/, async function () {
  console.log(">>In CIC step defintion");
  console.log(">>using the landing pages function");
  const landingPage = new LandingPage(this.page);

  expect(landingPage.isCurrentPage()).to.be.true;
});

Given(/^they (?:have )?continue(?:d)? on landing page$/, async function () {
  console.log(">>In cic step defintion");
  console.log(">>continue on photoId page");
  const landingPage = new LandingPage(this.page);

  expect(landingPage.isCurrentPage()).to.be.true;

  await landingPage.continue();
});


Then("they should be redirected to photoID page", function () {
  const photoIdPage = new PhotoIdSelectionPage(this.page);

  expect(photoIdPage.isCurrentPage()).to.be.true;

});

