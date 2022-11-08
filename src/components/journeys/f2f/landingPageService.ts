import { Request, Response } from "express";
import { AUTH_ROOT } from '../../../app.constants';
import { PATH_NAMES } from './app.constants';

const TEMPLATE = "landingPage.njk"

export async function landingPage (req: Request, res: Response): Promise<void> {
  res.render(TEMPLATE, {
    continue: `${AUTH_ROOT}${PATH_NAMES.WORKING_CAMERA}`
  })
}
