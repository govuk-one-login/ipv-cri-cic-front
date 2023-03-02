const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PhotoDlDetailsPageInvalid } = require("../pages");

  Given(/^the date entered is outside the accepted UKPhotoDLExpiry expiration window$/, async function () {

    const ukPhotoDl = new PhotoDlDetailsPageInvalid(await this.page);
  
    await ukPhotoDl.expiryDate();

  });


  When(/^the user clicks the continue button on the UKPhotoDLExpiry Page$/, async function () {

    const ukPhotoDl = new PhotoDlDetailsPageInvalid(await this.page);
  
    expect(await ukPhotoDl.isCurrentPage()).to.be.true;

    await ukPhotoDl.continue();
  
  });
  

  Then(/^the user sees an inline error message displayed on the UK DL Page$/, async function () {
        
    const ukDL = new PhotoDlDetailsPageInvalid(await this.page);

    expect(await ukDL.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await ukDL.checkErrorText();
      
    expect(await error).to.equal(inlineError);

  });
