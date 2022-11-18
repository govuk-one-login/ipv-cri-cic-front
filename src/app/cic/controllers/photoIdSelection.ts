import { Request, Response } from "express";
import { AUTH_ROOT } from '../../../app.constants';
import { EVENTS, PATH_NAMES } from '../../../app.constants'
import { getNext } from "../stateMachine/stateMachine";
const BaseController = require("hmpo-form-wizard").Controller;

const TEMPLATE = "photoIdSelection.njk"
const BACK = `${AUTH_ROOT}${PATH_NAMES.LANDING_PAGE}`

export class PhotoIdSelectionController extends BaseController {
  async render(req: any, res: any, next: any) {
    console.log("came here photoId")
    if (req.body != null && req.body["photo-id-choice"] === "ukPassport") {
      res.redirect(`${AUTH_ROOT}${getNext(EVENTS.SELECTED_UK_PASSPORT)}`)
    } else if (req.body != null && req.body["photo-id-choice"] === "brp") {
      res.redirect(`${AUTH_ROOT}${getNext(EVENTS.SELECTED_BRP)}`)
    } else if (req.body != null && req.body["photo-id-choice"] === "ukPhotocardDL") {
      res.redirect(`${AUTH_ROOT}${getNext(EVENTS.SELECTED_UK_PHOTOCARD_DL)}`)
    } else if (req.body != null && req.body["photo-id-choice"] === "otherPassport") {
      res.redirect(`${AUTH_ROOT}${getNext(EVENTS.SELECTED_OTHER_PASSPORT)}`)
    }else {
      res.render(TEMPLATE, {
        back: BACK,
        isInvalid:
            req.body["photo-id-choice"] === undefined ? true : false
      })
    }
  }
}
