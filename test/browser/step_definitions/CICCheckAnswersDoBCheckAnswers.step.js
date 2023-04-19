const { Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { CheckDetailsPage, DateOfBirthPageEdit, DateOfBirthPage }  = require("../pages");

Given(/^the user has navigated to Check my Answers page$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;

});

When(/^the DoB edit link is clicked$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    await cdPage.changeDoB();

})

Then(/^the user is navigated back to the DoB page$/, async function () {
    const doBPage = new DateOfBirthPageEdit (await this.page);

    expect(await doBPage.isCurrentPage()).to.be.true;

    await doBPage.dateOfBirth();

});

Then(/^the user clicks continue on the DoB page$/, async function () {
    const doBPage = new DateOfBirthPageEdit(await this.page);

    await doBPage.continue();

});

Then(/^the user navigates back to the Check My Answers Page from DoB page$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true;

});

When(/^the Back button is clicked on the page$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);
  
    await cdPage.back();
  
  });
  
  Then(/^the user is navigated back to the previous page/, async function () {
    const doBPage = new DateOfBirthPage(await this.page);
  
    expect(await doBPage.isCurrentPage()).to.be.true;
  });



  When(/^the user clicks the Continue or Back button$/, async function () {
    const cdPage = new CheckDetailsPage(await this.page);

    expect(await cdPage.isCurrentPage()).to.be.true

    await cdPage.continue();
  
  });


  Then(/^the appropriate error page is retrieved and shown$/, async function () {
        
    const cdPage = new CheckDetailsPage(await this.page);

   // expect(await cdPage.isCurrentPage()).to.be.true

    const inlineError = 'Sorry, there is a problem with the service';

    const error = await cdPage.pageFailure();

    console.log('>>inlineError: ', inlineError);

    console.log('>>error: ', error);
   // expect(await error).to.equal(inlineError);

});

  