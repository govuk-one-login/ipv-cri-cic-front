import { Request, Response, NextFunction } from "express"
import { HTTP_STATUS_CODES } from '../../app.constants'
import { getCurrentJourney } from "../../config"
import { HTTPMethod, routes } from "./routes"

export const flaggedController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const method = req.method as HTTPMethod
  const feature = getCurrentJourney(req.cookies)
  const path = req.url

  // http here doesnt matter, its just so that we can parse it
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathName = url.pathname

  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await routes[feature][pathName][method]!(req, res, next)
  } catch (err) { 
    // eslint-disable-next-line no-console
    console.error({ message: 'Page, method, feature not found', messageCode: "Page, method, feature not found", data: {cookies:JSON.stringify(req.cookies),method, feature, path: path, routes: JSON.stringify(routes), pathName }, err })

    res.statusCode = HTTP_STATUS_CODES.NOT_FOUND
    next(err)
  }
}
