import { fileURLToPath } from "node:url";
import path from "node:path";
import expressSession from "express-session";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import connectDynamoDB from "connect-dynamodb";
import wizard from "hmpo-form-wizard";
import { config } from "./lib/config.js";
import commonExpress from "@govuk-one-login/di-ipv-cri-common-express";
import {
  addFrontendUiGlobals,
  localsMiddleware,
  frontendUiMiddlewareIdentityBypass,
} from "@govuk-one-login/frontend-ui";
import { setAPIConfig, setOAuthPaths } from "./lib/settings.js";
import { overloadProtectionConfig } from "./lib/overload-protection-config.js";
import addLanguageParam from "@govuk-one-login/frontend-language-toggle";
import { frontendVitalSignsInitFromApp } from "@govuk-one-login/frontend-vital-signs";
import { steps } from "./app/cic/steps.js";
import { fields } from "./app/cic/fields.js";
import { helmetConfig } from "./lib/helmet.js";

const logger = commonExpress.bootstrap.logger.get(config.PACKAGE_NAME);
const setHeaders = commonExpress.lib.headers;
const setScenarioHeaders = commonExpress.lib.scenarioHeaders;
const setAxiosDefaults = commonExpress.lib.axios;
const { setGTM, setLanguageToggle, setDeviceIntelligence } =
  commonExpress.lib.settings;
const { getGTM, getLanguageToggle, getDeviceIntelligence } =
  commonExpress.lib.locals;
const { setI18n } = commonExpress.lib.i18n;
const { setup } = commonExpress.bootstrap;

const DynamoDBStore = connectDynamoDB(expressSession);

const loggerConfig = {
  console: true,
  consoleLevel: process.env.LOG_LEVEL || "warn",
  consoleJSON: true,
  app: false,
};

const dynamodb = new DynamoDBClient({
  region: "eu-west-2",
});

const dynamoDBSessionStore = new DynamoDBStore({
  client: dynamodb,
  table: config.SESSION_TABLE_NAME,
});

const sessionConfig = {
  cookieName: "service_session",
  secret: config.SESSION_SECRET,
  cookieOptions: { maxAge: config.SESSION_TTL },
  ...(config.SESSION_TABLE_NAME && { sessionStore: dynamoDBSessionStore }),
};

const { app, router } = setup({
  config: { APP_ROOT: import.meta.dirname },
  port: false,
  logs: loggerConfig,
  session: sessionConfig,
  helmet: helmetConfig,
  redis: config.SESSION_TABLE_NAME ? false : commonExpress.lib.redis(),
  urls: {
    public: "/public",
  },
  publicDirs: ["../dist/public"],
  views: [
    path.resolve(import.meta.dirname, "views"),
    path.resolve(
      path.dirname(
        fileURLToPath(
          import.meta.resolve("@govuk-one-login/di-ipv-cri-common-express"),
        ),
      ),
      "components",
    ),
    path.resolve("node_modules/@govuk-one-login/"),
  ],
  translation: {
    allowedLangs: ["en", "cy"],
    fallbackLang: ["en"],
    cookie: { name: "lng" },
  },
  middlewareSetupFn: (app) => {
    const nunjucksEnv = app.get("nunjucks");
    if (nunjucksEnv) {
      addFrontendUiGlobals(nunjucksEnv);
      app.use(localsMiddleware(app, nunjucksEnv));
    }
    frontendVitalSignsInitFromApp(app, {
      interval: 60000,
      logLevel: "info",
      metrics: [
        "requestsPerSecond",
        "avgResponseTime",
        "maxConcurrentConnections",
        "eventLoopDelay",
        "eventLoopUtilization",
      ],
      staticPaths: [
        /^\/assets\/.*/,
        "/ga4-assets",
        "/javascript",
        "/javascripts",
        "/images",
        "/stylesheets",
      ],
    });
    app.use(setHeaders);
    app.use((req, res, next) => {
      res.locals.query = req.query; // Makes ?edit=true available as query.edit
      next();
    });
  },
  overloadProtection: overloadProtectionConfig,
  dev: true,
});

setI18n({
  router,
  config: {
    secure: true,
    cookieDomain: config.APP.GTM.ANALYTICS_COOKIE_DOMAIN,
  },
});

app.get("nunjucks").addGlobal("getContext", function () {
  return {
    keys: Object.keys(this.ctx),
    ctx: this.ctx.ctx,
  };
});

setAPIConfig({
  app,
  baseUrl: config.API.BASE_URL,
  sessionPath: config.API.PATHS.SESSION,
  authorizationPath: config.API.PATHS.AUTHORIZATION,
});

setOAuthPaths({ app, entryPointPath: config.APP.PATHS.CIC });

setGTM({
  app,
  ga4ContainerId: config.APP.GTM.GA4_ID,
  uaContainerId: "",
  analyticsCookieDomain: config.APP.GTM.ANALYTICS_COOKIE_DOMAIN,
  ga4Enabled: true,
  uaEnabled: false,
  ga4PageViewEnabled: config.APP.GTM.GA4_PAGE_VIEW_ENABLED,
  ga4FormResponseEnabled: config.APP.GTM.GA4_FORM_RESPONSE_ENABLED,
  ga4FormErrorEnabled: config.APP.GTM.GA4_FORM_ERROR_ENABLED,
  ga4FormChangeEnabled: config.APP.GTM.GA4_FORM_CHANGE_ENABLED,
  ga4NavigationEnabled: config.APP.GTM.GA4_NAVIGATION_ENABLED,
  ga4SelectContentEnabled: config.APP.GTM.GA4_SELECT_CONTENT_ENABLED,
  analyticsDataSensitive: false,
});

/* Server configuration */
const server = app.listen(config.PORT);

// AWS recommends the keep-alive duration of the target is longer than the idle timeout value of the load balancer (default 60s)
// to prevent possible 502 errors where the target connection has already been closed
// https://docs.aws.amazon.com/elast
server.keepAliveTimeout = 65000;

// Handles graceful shutdown of the NODE service, so that if the container is killed by a SIGTERM, it finishes processing existing connections before the server shuts down.
let serverAlreadyExiting = false;
let exitCode = 0;
const MAX_EXIT_WAIT = 30000;
process.on("SIGTERM", () => {
  if (serverAlreadyExiting) {
    console.log("SIGTERM signal received: Server close already called");
    return;
  }
  serverAlreadyExiting = true;

  console.log("SIGTERM signal received: closing HTTP server");

  // Stop accepting new connections
  server.close((err) => {
    if (err) {
      console.log(
        `Error while calling server.close() occurred: ${err.message}`,
      );

      exitCode = 1;
    } else {
      console.log("HTTP server closed");
    }
  });

  // There maybe active timers in the event loop preventing a clean exit.
  // Give remaining active connections some time to compelte
  // Then exit, this also closes any connection with keep-alive set
  setTimeout(() => {
    console.log(`Waiting ${MAX_EXIT_WAIT}ms for before exiting fully`);

    // Close any active connections that have not closed (KeepAlives/Idle etc)
    server.closeAllConnections();

    console.log(`Calling process exit ${exitCode}`);
    process.exit(exitCode);
  }, MAX_EXIT_WAIT);
});

// Common express relies on 0/1 strings
setLanguageToggle({ app, showLanguageToggle: "1" });

setDeviceIntelligence({
  app,
  deviceIntelligenceEnabled: "true",
  deviceIntelligenceDomain: config.APP.DEVICE_INTELLIGENCE_DOMAIN,
});

app.get("nunjucks").addGlobal("addLanguageParam", addLanguageParam);

router.use(getGTM);
router.use(getLanguageToggle);
router.use(frontendUiMiddlewareIdentityBypass);
router.use(getDeviceIntelligence);

router.use(setScenarioHeaders);
router.use(setAxiosDefaults);

router.use("/oauth2", commonExpress.routes.oauth2);

const wizardOptions = {
  name: "cri-cic-front",
  journeyName: "cic",
  templatePath: "cic",
};

router.use(wizard(steps, fields, wizardOptions));

router.use((err, req, res, next) => {
  logger.error(
    "Error caught by Express handler - redirecting to Callback with server_error",
    { err },
  );
  const REDIRECT_URI = req.session?.authParams?.redirect_uri;
  if (REDIRECT_URI) {
    next(err);
    router.use(commonExpress.lib.errorHandling.redirectAsErrorToCallback);
  } else {
    res.redirect("/error");
  }
});
