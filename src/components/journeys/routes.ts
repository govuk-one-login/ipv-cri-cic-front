import { NextFunction, Request, Response } from "express"
import { Features } from "../../config"
import { cicRoutes } from './cic/cicRoutes'

type Controller = ((req: Request, res: Response) => Promise<void>) | ((req: Request, res: Response, next: NextFunction) => Promise<void>)
export type HTTPMethod = "GET" | "POST"
type Method = { [key in HTTPMethod]?: Controller }
type Routes = { [key: string]: Method }
type RoutesByFeature = { [key in Features]: Routes }

export const routes: RoutesByFeature = {
  [Features.CIC]: cicRoutes
}
