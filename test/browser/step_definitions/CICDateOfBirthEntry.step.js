const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { DateOfBirthPage, CheckDetailsPage }  = require("../pages");
       

Given(/^the DOB fields are populated with valid values$/, async function () {
   const dobPage = new DateOfBirthPage(await this.page);

    await dobPage.dateOfBirthDay();
    await dobPage.dateOfBirthMonth();
    await dobPage.dateOfBirthYear();

});


  When(/^the user clicks the DoB continue button$/, async function () {
    const dobPage = new DateOfBirthPage(await this.page);

    await dobPage.continue();

  });


  Then(/^they are routed to the Check My Answers Screen$/, async function () {
    console.log(">>In DateOfBirthPage - next screen function");
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;
  });
