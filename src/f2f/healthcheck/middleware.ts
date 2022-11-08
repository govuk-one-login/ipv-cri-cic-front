import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../../app.constants";

module.exports = {
  healthcheckGet(req: Request, res: Response): void {
    res.status(HTTP_STATUS_CODES.OK).send("OK");
  },
};
