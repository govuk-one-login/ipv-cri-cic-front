const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { EuDrivingLicenceDetailsPageInvalidFuture } = require("../pages");

  Given(/^the date entered is outside the accepted EU driving licence expiration window$/, async function () {

    const euDrivingLicence = new EuDrivingLicenceDetailsPageInvalidFuture(await this.page);
  
    await euDrivingLicence.expiryDate();

  });


  When(/^the user clicks the continue button on the EU driving licence page$/, async function () {

    const euDrivingLicence = new EuDrivingLicenceDetailsPageInvalidFuture(await this.page);
  
    expect(await euDrivingLicence.isCurrentPage()).to.be.true;

    await euDrivingLicence.continue();
  
  });
  

  Then(/^the user sees an inline error message displayed on the EU DL Page$/, async function () {
        
    const euDL = new EuDrivingLicenceDetailsPageInvalidFuture(await this.page);

    expect(await euDL.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await euDL.checkErrorText();
      
    expect(await error).to.equal(inlineError);

  });
