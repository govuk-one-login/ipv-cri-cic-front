import { Request, Response } from "express";
import { AUTH_ROOT } from '../../../app.constants';
import { EVENTS, PATH_NAMES } from '../../../app.constants'
const BaseController = require("hmpo-form-wizard").Controller;
// import { getNext } from "./stateMachine/stateMachine";
// import { validDay } from "./validators";

const TEMPLATE = "cic/passportExpiry.html"
const BACK = `${AUTH_ROOT}${PATH_NAMES.PHOTO_ID_SELECTION}`

export class PassportExpiryController extends BaseController {
    async render(req: any, res: any, next: any) {
        console.log("came here passport expiry ")
        res.render(TEMPLATE, {
            back: BACK
        })
    }
}
// export async function dateOfExpiry (req: Request, res: Response): Promise<void> {
//   console.log(req.body["passport-expiry"] )
//   res.render(TEMPLATE, {
//     back: BACK
//   })
// }

// export async function validatePassportExpiry (
//     req: Request,
//     res: Response
// ): Promise<void> {
//     console.log("hello")
//     var isInvalid = true;
//     const day=  req.body["passport-expiry-day"]
//     const month =  req.body["passport-expiry-month"]
//     const year =  req.body["passport-expiry-year"]
//     console.log(day)
//     console.log(month)
//     console.log(year)
//     if(day && month && year && validDay(day)){
//
//
//         console.log("here")
//         res.redirect(`${AUTH_ROOT}${getNext(EVENTS.TEST)}`)
//     }else{
//         console.log("invalid")
//         res.render(TEMPLATE, {
//             back: BACK,
//             isInvalid:
//                 true
//         })
//     }
  // if (req.body != null && req.body["flashing-colours-choice"] === "yes") {
  //   res.redirect(`${AUTH_ROOT}${getNext(EVENTS.CONSENTED_TO_FLASHING_WARNING)}`)
  // } else if (
  //     req.body != null &&
  //     req.body["flashing-colours-choice"] === "no"
  // ) {
  //   res.redirect(`${AUTH_ROOT}${getNext(EVENTS.ABORTED_JOURNEY)}`)
  // } else {
  //   res.render(TEMPLATE, {
  //     back: BACK,
  //     isInvalid:
  //         req.body["passport-expiry"] === undefined ? true : false
  //   })
 // }

