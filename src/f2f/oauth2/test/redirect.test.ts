import { expect } from "chai";
import { describe } from "mocha";
import sinon from "sinon";
import chai from "chai";
import axios, {AxiosError} from "axios";
import sinonChai from "sinon-chai";
import {NextFunction, Request, Response} from "express";
import { mockRequest, mockResponse } from "mock-req-res";
const { redirect } = require("../middleware")

chai.use(sinonChai);

describe("Redirect", () => {

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("Returns correct redirect when app journey has been aborted", async () => {

    sinon.stub(axios, "get").returns(Promise.resolve({
      data: {
        type: "error",
        error: "error",
        errorDescription: "errorDescription",
        state: "state",
        redirectUri: "redirectUri"
      }
    }));

    await redirect(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).to.have.been.calledWith("redirectUri?state=state&error=error&error_description=errorDescription")
  })

  it("Returns correct redirect when app journey has been successfully completed", async () => {

    sinon.stub(axios, "get").returns(Promise.resolve({
      data: {
        type: "success",
        state: "state",
        redirectUri: "redirectUri",
        authorizationCode: "authorizationCode"
      }
    }));

    await redirect(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).to.have.been.calledWith("redirectUri?state=state&code=authorizationCode")
  })

  it("Calls next and sets response status to 401 when it receives a 401 error from axios", async () => {
    const expectedError = new AxiosError( "message", "code", undefined, undefined,
        {
          data: {},
          status: 401,
          statusText: "error",
          headers: {},
          config: {}
        });
    const axiosGet = sinon.stub(axios, 'get');
    axiosGet.throws(expectedError);
    const next = sinon.spy();

    await redirect(req as Request, res as Response, next);

    axiosGet.restore()
    sinon.assert.calledWith(next, expectedError)
    expect(res.statusCode).to.eq(401)
  })
})