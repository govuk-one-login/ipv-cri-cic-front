import { Request, Response } from "express";
import { AUTH_ROOT } from '../../../app.constants';
import { PATH_NAMES } from './app.constants';

const TEMPLATE = "introAppPage.njk"
const BACK = `${AUTH_ROOT}${PATH_NAMES.VALID_DRIVING_LICENCE}`

export async function criLandingPage (req: Request, res: Response): Promise<void> {
  res.render(TEMPLATE, {
    back: BACK,
    continue: `${AUTH_ROOT}${PATH_NAMES.WORKING_CAMERA}`
  })
}
