import {NextFunction, Request, Response} from "express";
import { mockRequest, mockResponse } from "mock-req-res";
const { verifyRequest } = require("../middleware");
import sinon from "sinon";
import {expect} from "chai";
import chai from "chai";
import axios from "axios";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

describe('Authorization middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: Partial<NextFunction>;

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('without x-govuk-signin-source-ip headers', async () => {

        const axiosSpy = sinon.spy(axios, "post");

        req.headers = {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Credentials": "true",
            "X-Requested-With": "XMLHttpRequest",
        }

        req.query = {
            response_type: "response_type",
            client_id: "clientId",
            request: "request"
        }

        await verifyRequest(req as Request, res as Response, next as NextFunction);

        expect(axiosSpy).to.have.been.calledWith(sinon.match.any, null, {headers: req.headers, params: req.query})
    });

    it('with x-govuk-signin-source-ip headers', async () => {

        const axiosSpy = sinon.spy(axios, "post");

        req.headers = {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Credentials": "true",
            "X-Requested-With": "XMLHttpRequest",
            "x-govuk-signin-source-ip": "1.1.1.1"
        }

        req.query = {
            response_type: "response_type",
            client_id: "clientId",
            request: "request"
        }

        await verifyRequest(req as Request, res as Response, next as NextFunction);

        expect(axiosSpy).to.have.been.calledWith(sinon.match.any, null, {headers: req.headers, params: req.query})
    });
});