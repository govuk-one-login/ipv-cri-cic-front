const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, LandingPage, } = require("../pages");

  Given(/^the user has navigated to the Document Selection page$/, async function () {
     const photoIdPage = new PhotoIdSelectionPage(await this.page);
     
     //await photoIdPage.brpChoice();

     expect(await photoIdPage.isCurrentPage()).to.be.true
   
  });

  

  When(/^the Back link is clicked on the Document Selection page$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);
  
    await photoIdPage.back();
  
  });
  
  Then(/^the user is navigated back to the previous screen - the Landing page$/, async function () {
     const landingPage = new LandingPage(await this.page);

     expect(await landingPage.isCurrentPage()).to.be.true;

   });

