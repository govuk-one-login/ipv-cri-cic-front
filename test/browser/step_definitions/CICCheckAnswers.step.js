const { Given, When, Then} = require("@cucumber/cucumber");

const { expect, assert } = require("chai");

const { CheckDetailsPage }  = require("../pages");

const DynoDBConnection = require("../support/DynmoDBConnection")


Given(/^the user has completed the previous CIC screens$/, async function () {
    const cpdPage = new CheckDetailsPage(await this.page);

    expect(await cpdPage.isCurrentPage()).to.be.true;

});

When(/^the user clicks the Check My Answers Submit button$/, async function () {
  const cmPage = new CheckDetailsPage(await this.page);

  await cmPage.continue();

})

When(/^details are stored in DB$/, async function () {
  const dbConnection = new DynoDBConnection("b58b265b-7da8-4c2a-a24f-ea84dae7bd37","session-cic-cri-ddb");
  const dbData = await dbConnection.getDBDetails();
  console.log("Test data in DB is --------" + dbData);
})
