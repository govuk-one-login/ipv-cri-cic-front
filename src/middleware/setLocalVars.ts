import { randomBytes } from 'crypto';
import { NextFunction, Request, Response } from "express";

export function generateNonce(): string {
    return randomBytes(16).toString("hex");
}

export function setLocalVarsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.locals.scriptNonce = generateNonce();
  res.locals.gtmId = process.env.GTM_CONTAINER_ID
  res.locals.analyticsCookieDomain = process.env.ANALYTICS_COOKIE_DOMAIN
  res.locals.apiUrl = process.env.API_URL
  res.locals.isSessionFinishedPollingDuration = process.env.IS_SESSION_FINISHED_POLLING_DURATION
  res.locals.isSessionFinishedInterval = process.env.IS_SESSION_FINISHED_INTERVAL
  next();
}
