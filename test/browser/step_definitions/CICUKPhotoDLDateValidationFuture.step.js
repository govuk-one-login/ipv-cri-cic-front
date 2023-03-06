const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PhotoDlDetailsPageInvalidFuture } = require("../pages");

  Given(/^the date entered is beyond the accepted UKPhotoDLExpiry expiration window$/, async function () {

    const ukPhotoDl = new PhotoDlDetailsPageInvalidFuture(await this.page);
  
    await ukPhotoDl.expiryDate();

  });


  When(/^the user clicks the continue button on the UKPhotoDLExpiryFuture page$/, async function () {

    const ukPhotoDl = new PhotoDlDetailsPageInvalidFuture(await this.page);
  
    expect(await ukPhotoDl.isCurrentPage()).to.be.true;

    await ukPhotoDl.continue();
  
  });
  

  Then(/^the user sees an inline error message displayed on the UK DL Page$/, async function () {
        
    const ukDL = new PhotoDlDetailsPageInvalidFuture(await this.page);

    expect(await ukDL.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await ukDL.checkErrorText();
      
    expect(await error).to.equal(inlineError);

  });
