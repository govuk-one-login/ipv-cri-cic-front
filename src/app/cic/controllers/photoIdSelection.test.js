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
    it("should save values to sessionModel according to selected document type", async () => {
      
      req.form.values.photoIdChoice = APP.PHOTO_ID_OPTIONS.UK_PASSPORT;

        await photoIdSelectionController.saveValues(req, res, next);
        const selectedDocumentValue = req.sessionModel.get("photoIdChoice")
        const selectedDocument = req.sessionModel.get("selectedDocument");
        const changeUrl = req.sessionModel.get("changeUrl");

        expect(next).to.have.been.calledOnce;
        expect(selectedDocumentValue).to.equal(APP.PHOTO_ID_OPTIONS.UK_PASSPORT)
        expect(selectedDocument).to.equal("UK passport");
        expect(changeUrl).to.equal("passportDetails");
    });
  });

  describe("saveValues when user selects no option", () => {
    it("should call next with error", async () => {
      
      req.form.values.photoIdChoice = undefined;

        await photoIdSelectionController.saveValues(req, res, next);
        const nextError = next.firstArg;
        const nextErrMessage = ("photo-id-selection: Invalid action " + undefined);
        
        expect(next).to.have.been.calledOnce;
        expect(nextError).to.be.instanceOf(Error);
        expect(nextError.message).to.equal(nextErrMessage);
    });
  });

  });
