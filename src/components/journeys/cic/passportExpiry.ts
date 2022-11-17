import { Request, Response } from "express";
import { AUTH_ROOT } from '../../../app.constants';
import { EVENTS, PATH_NAMES } from './app.constants'
import { getNext } from "./stateMachine/stateMachine";

const TEMPLATE = "passportExpiry.njk"
const BACK = `${AUTH_ROOT}${PATH_NAMES.PHOTO_ID_SELECTION}`

export async function passportDateOfExpiry (req: Request, res: Response): Promise<void> {
  res.render(TEMPLATE, {
    back: BACK
  })
}