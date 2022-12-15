import { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
// import { AUTH_ROOT, PATH_NAMES } from "../../app.constants"
// import {Features, getCurrentJourney} from "../../config";
import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from "axios"
import {IncomingHttpHeaders} from "http";
import {setCookie} from "../../cookies/setCookie";

dotenv.config();

function buildHeaders(headers: IncomingHttpHeaders): AxiosRequestHeaders {
  let axiosHeaders : AxiosRequestHeaders;
  if(headers['x-govuk-signin-source-ip'] !== null && headers['x-govuk-signin-source-ip'] !== undefined) {
    axiosHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Credentials": "true",
      "X-Requested-With": "XMLHttpRequest",
      "x-govuk-signin-source-ip": headers['x-govuk-signin-source-ip'].toString(),
    }
  } else {
    axiosHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Credentials": "true",
      "X-Requested-With": "XMLHttpRequest",
    }
  }
  return axiosHeaders
}

module.exports = {
  verifyRequest: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { response_type, client_id, request } = req.query;

    const url = `${process.env.API_URL}/verifyAuthorizeRequest`;
    const config: AxiosRequestConfig = {
      headers: buildHeaders(req.headers),
      params: { response_type, client_id, request }
    };

    try {
      const response = await axios.post(url, null, config);
      const sessionId = response.data.sessionId;
      setCookie(res, "sessionId", sessionId)
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(error));
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data
      ) {
        const redirect = error.response.data.redirect;
        const message = error.response.data.message;
        if (redirect) {
          // eslint-disable-next-line no-console
          console.log(
            `Invalid request to /authorize: ${message}. Redirecting to ${redirect}`
          );
          res.redirect(redirect);
          return;
        } else {
          // eslint-disable-next-line no-console
          console.log(
            `Invalid request to /authorize: ${message}. Returning error page`
          );
          res.statusCode = error.response.status;
        }
      }
      next(error);
    }
  },

  redirect: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    function buildRedirect(data: any) {
      const { type } = data
      if (type === "success") {
        const { redirectUri, authorizationCode, state } = data;
        return `${redirectUri}?state=${state}&code=${authorizationCode}`;
      } else if (type === "error") {
        const { redirectUri, state, error, errorDescription } = data;
        return `${redirectUri}?state=${state}&error=${error}&error_description=${errorDescription}`;
      } else {
        throw new Error(`Unexpected result [${type}] received when getting the redirect: ${JSON.stringify(data)}`)
      }
    }

    const sessionId = req.query.sessionId ?? req.cookies.sessionId;
    const url = `${process.env.API_URL}/redirect`;
    const config = { headers: buildHeaders(req.headers), params: { sessionId } };
    try {
      const { data } = await axios.get(url, config);
      const redirectURL = buildRedirect(data)
      res.clearCookie("sessionId");
      res.redirect(redirectURL);
    } catch (error: any) {
      let logMessage
      if (error instanceof AxiosError && error.response) {
        res.statusCode = error.response.status;
        logMessage = error.toJSON()
      } else {
        logMessage = error
      }
      // eslint-disable-next-line no-console
      console.log(logMessage)
      next(error)
    }
  },

  retrieveAuthorizationCode: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const sessionId = req.query.sessionId ?? req.cookies.sessionId;
    const url = `${process.env.API_URL}/authorizationCode`;
    const config = { headers: buildHeaders(req.headers), params: { sessionId } };

    try {
      const { data } = await axios.get(url, config);
      const { redirectUri, authorizationCode, state } = data;
      const redirectURL = `${redirectUri}?code=${authorizationCode}&state=${state}`;
      res.clearCookie("sessionId");
      res.redirect(redirectURL);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(error));
      res.statusCode = error.response.status;
      next(error);
    }
  },

  abortSession: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const sessionId = req.query.sessionId ?? req.cookies.sessionId;
    const url = `${process.env.API_URL}/userAbortSession`;
    const config = { headers: buildHeaders(req.headers), params: { sessionId } };

    try {
      const { data } = await axios.post(url, null, config);
      const { redirectUri, state, error, error_description } = data;
      const redirectURL = `${redirectUri}?state=${state}&error=${error}&error_description=${error_description}`;
      res.clearCookie("sessionId");
      res.redirect(redirectURL);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(error));
      res.statusCode = error.response.status;
      next(error);
    }
  },

  setFeatureFlagCookie: async (
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<void> => {
    try {
      for (const flagName in req.query) {
        const flagValue = req.query[flagName]
        if(typeof flagValue === "string") setCookie(res, flagName, flagValue)
      }
      res.sendStatus(200)
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(error));
      res.statusCode = error.response.status;
      next(error);
    }
  }
};
