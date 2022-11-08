import { NextFunction, Request, Response } from "express"
import { Features } from "../../config"
import { f2fRoutes } from './f2f/f2fRoutes'

type Controller = ((req: Request, res: Response) => Promise<void>) | ((req: Request, res: Response, next: NextFunction) => Promise<void>)
export type HTTPMethod = "GET" | "POST"
type Method = { [key in HTTPMethod]?: Controller }
type Routes = { [key: string]: Method }
type RoutesByFeature = { [key in Features]: Routes }

export const routes: RoutesByFeature = {
  [Features.F2F]: f2fRoutes
}
