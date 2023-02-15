const BaseController = require("hmpo-form-wizard").Controller;
const {APP} = require("../../../lib/config");
const { expect } = require("chai");
const { afterEach } = require("mocha");
const PhotoIdSelectionController = require('./photoIdSelection');

describe("PhotoIdSelectionController", () => {
  const photoIdSelectionController = new PhotoIdSelectionController({ route: '/test' });
  let req;
  let res;
  let next;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should be an instance of BaseController", () => {
    expect(photoIdSelectionController).to.be.an.instanceOf(BaseController);
  });

  describe("saveValues", () => {
    it("should save selectedDocument to sessionModel if date is valid", async () => {
      
      req.sessionModel.set("photoIdChoice", APP.PHOTO_ID_OPTIONS.UK_PASSPORT);

        await photoIdSelectionController.saveValues(req, res, next);
        const selectedDocument = req.sessionModel.get("selectedDocument");
        const changeUrl = 1 //req.sessionModel.get("changeUrl");

        expect(next).to.have.been.calledOnce;
        expect(selectedDocument).to.equal("UK passport");
        expect(changeUrl).to.equal("passportDetails");


    });
















    // it("should save photoIdChoice to sessionModel if date is valid", async () => {

    //   const photoIdChoiceToSave = {
    //     APP.PHOTO_ID_OPTIONS.UK_PASSPORT true
    //   };
    //   req.form.values = photoIdChoiceToSave;
  
    //   await youngScotController.saveValues(req, res, next);
    //   const savedExpiry = req.sessionModel.get("youngScotNationalEntitlementCardExpiryDate")

    //   expect(next).to.have.been.calledOnce;
    //   expect(savedExpiry).to.equal(expiryDateToSave.youngScotNationalEntitlementCardExpiryDate);
      
    // });

   

    // it("should save changeUrl to sessionModel if date is valid", async () => {
    // });

  });
})