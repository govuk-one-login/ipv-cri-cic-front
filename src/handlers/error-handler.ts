import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../app.constants";

export function serverErrorHandler(
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
  ): void {

  if (res.statusCode == HTTP_STATUS_CODES.NOT_FOUND) {
    return res.render("./errors/page-not-found.njk");
  }

  if (res.statusCode == HTTP_STATUS_CODES.UNAUTHORIZED) {
    return res.render("./errors/unauthorized.njk");
  }

  res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  res.render("./errors/error.njk");
}
