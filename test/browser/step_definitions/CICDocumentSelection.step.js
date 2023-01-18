const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, PassportDetailsPage } = require("../pages");

//AC1 - Successful redirect on ‘UK passport’ selection (Happy path)
  Given(/^the UK passport option is selected$/, async function () {
     console.log(">>In PhotoIdSelectionPage - UK passport option selected function");
     
     const photoIdPage = new PhotoIdSelectionPage(await this.page);
     
     await photoIdPage.ukPassportChoice();

     //expect(photoIdPage.isCurrentPage()).to.be.true
   
  });

  When(/^the user clicks the continue button$/, async function () {
    console.log(">>In photoIdPage - UK passport option selected function");

    const photoIdPage = new PhotoIdSelectionPage(this.page);
  
    await photoIdPage.continue();
  
  });
  
  Then(/^the user is routed to the next screen in the journey: Passport Expiry Entry Screen$/, async function () {
  
    const passportDetailsPage = new PassportDetailsPage(this.page);

    //expect(passportDetailsPage.isCurrentPage()).to.be.true;

  });


  // //AC2 - Successful redirect on ‘BRP’ selection (Happy path)
  //   Given(/^the BRP option is selected$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  
  
  //   Then(/^the user is routed to the next screen in the journey: BRP Expiry Entry Screen$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });


  
  //   //AC3 - Successful redirect on UK driving licence selection (Happy path)
  //   Given(/^the UK driving licence option is selected$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  
  
  //   Then(/^the user is routed to the next screen in the journey: UK driving Licence Expiry Entry Screen$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  

  //  //AC4 - Successful redirect on ‘Non UK passport’ selection (Happy path)
  //   Given(/^the Other passport option is selected$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  
  
  //   Then(/^the user is routed to the next screen in the journey: Other Passport Expiry Entry Screen$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  
  //  //AC5 - Redirect if none of the documents available (Happy path)
  //   Given(/^the user has none of the eligible identity documents$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  

  
  //   When(/^the user clicks the {string} hyperlink$/, async function (string) {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  

  //   Then(/^the user is routed to  async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  

  //   //AC6 - Attempt to select multiple options
  //   Given(/^an option from the list has already been selected$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  
  //   When(/^the user clicks on another option$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  
  //   Then(/^the user\'s first choice is unselected and the second choice is selected$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });

    
  //   //AC7 - No redirect without a selection
  //   Given(/^the user has not selected an option from the list$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  
  //   Then(/^the user is not routed to another screen$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  
  //   Then(/^the user is informed that must make a selection in order to continue$/, async function () {
  //     // Write code here that turns the phrase above into concrete actions
     
  //   });
  