const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CheckDetailsPage }  = require("../pages");

const { getSessionById }  = require("../support/cicDBChecks")


Given(/^the user has completed the previous CIC screens$/, async function () {
    const cpdPage = new CheckDetailsPage(await this.page);

    expect(await cpdPage.isCurrentPage()).to.be.true;

});

When(/^the user clicks the Check My Answers Submit button$/, async function () {
  const cmPage = new CheckDetailsPage(await this.page);

  await cmPage.continue();

})

When(/^the details are stored in DB$/, async function () {
  const session = await getSessionById("b58b265b-7da8-4c2a-a24f-ea84dae7bd37", "session-cic-cri-ddb");
  console.log(session)
  expect(session.date_of_birth).to.be.equal("Hartley")
})
