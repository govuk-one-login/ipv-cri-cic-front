import express from "express"
import dotenv from "dotenv"

import {isOauthEnabled } from "./config"
import * as path from "path"
import cookieParser from "cookie-parser"
import { configureNunjucks } from "./config/nunjucks"
import helmet from "helmet"
import { helmetConfiguration } from "./config/helmet"
import i18next from "i18next"
import i18nextMiddleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend"
import { i18nextConfigurationOptions } from "./config/i18next"
import { serverErrorHandler } from "./handlers/error-handler"
import { bindRoutes } from "./config/public"
import { setLocalVarsMiddleware } from './middleware/setLocalVars'
import { oauthRouter } from "./f2f/oauth2";

import { flaggedRouter } from "./components/journeys/flaggedRouter"

dotenv.config()

async function createApp(): Promise<express.Application> {
  const app: express.Application = express()

  app.use(cookieParser())
  app.use(express.urlencoded({ extended: true }))

  const APP_VIEWS = [
    path.join(__dirname, "../src/views"),
    path.join(__dirname, "../src/views/journeys/f2f"),
    path.resolve("node_modules/govuk-frontend/")
  ]

  i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init(
      i18nextConfigurationOptions(
        path.join(__dirname, "locales/{{lng}}/{{ns}}.json")
      )
    )

  app.use(i18nextMiddleware.handle(i18next));

  app.use(express.static(path.join(__dirname, "public")))
  app.use("/public", express.static(path.join(__dirname, "public")))
  app.set("view engine", configureNunjucks(app, APP_VIEWS))
  app.use(setLocalVarsMiddleware);

  app.use(helmet(helmetConfiguration))

  bindRoutes(app)

  app.use("/stub", require("./stub"))
  app.use(require("./f2f/healthcheck"))

  if (isOauthEnabled()) {

      app.use(oauthRouter)
      app.use("/.well-known", require("./f2f/well-known"))
      app.use(flaggedRouter)
  }
  
  app.use(serverErrorHandler)

  return app
}

export { createApp }
