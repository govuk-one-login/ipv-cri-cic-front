import { expect } from "chai";
import { describe } from "mocha";
import sinon from "sinon";
import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../../../app.constants";
import chai from "chai";
import sinonChai from "sinon-chai";
const { healthcheckGet } = require("../middleware");

chai.use(sinonChai);

describe("healthcheck controller", () => {
  let sandbox: sinon.SinonSandbox;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = {
      body: {},
    };
    res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.fake(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("healthcheckGet", () => {
    it("Should return 200", () => {
      healthcheckGet(req as Request, res as Response);

      expect(res.status).to.have.been.calledWith(HTTP_STATUS_CODES.OK);
    });
  });
});
