require("express");
require("express-async-errors");

const path = require("path");
const session = require("express-session");
const AWS = require("aws-sdk");
const DynamoDBStore = require("connect-dynamodb")(session);
const wizard = require("hmpo-form-wizard");
const logger = require("hmpo-logger");

const commonExpress = require("@govuk-one-login/di-ipv-cri-common-express");
const frontendUi = require("@govuk-one-login/frontend-ui");

const setHeaders = commonExpress.lib.headers;
const setScenarioHeaders = commonExpress.lib.scenarioHeaders;
const setAxiosDefaults = commonExpress.lib.axios;

const { setAPIConfig, setOAuthPaths } = require("./lib/settings");

const { setGTM, setLanguageToggle, setDeviceIntelligence } =
  commonExpress.lib.settings;
const { getGTM, getLanguageToggle, getDeviceIntelligence } =
  commonExpress.lib.locals;

const overloadProtectionConfigService = require("./lib/overload-protection-config.js");

const addLanguageParam = require("@govuk-one-login/frontend-language-toggle/build/cjs/language-param-setter.cjs");
const customValidators = require("./app/cic/validators/customValidators");

const {
  frontendVitalSignsInitFromApp,
} = require("@govuk-one-login/frontend-vital-signs");

const {
  setI18n,
} = require("@govuk-one-login/di-ipv-cri-common-express/src/lib/i18next");

const steps = require("./app/cic/steps");
const fields = require("./app/cic/fields");

const {
  PACKAGE_NAME,
  API,
  APP,
  PORT,
  SESSION_SECRET,
  SESSION_TABLE_NAME,
  SESSION_TTL,
} = require("./lib/config");

const { setup } =
  require("@govuk-one-login/di-ipv-cri-common-express").bootstrap;

const loggerConfig = {
  console: true,
  consoleLevel: process.env.LOG_LEVEL || "warn",
  consoleJSON: true,
  app: false,
};

AWS.config.update({
  region: "eu-west-2",
});
const dynamodb = new AWS.DynamoDB();

const dynamoDBSessionStore = new DynamoDBStore({
  client: dynamodb,
  table: SESSION_TABLE_NAME,
});

const sessionConfig = {
  cookieName: "service_session",
  secret: SESSION_SECRET,
  cookieOptions: { maxAge: SESSION_TTL },
  ...(SESSION_TABLE_NAME && { sessionStore: dynamoDBSessionStore }),
};

const overloadProtectionConfig = overloadProtectionConfigService.init();

const helmetConfig = require("./lib/helmet.js");

const { app, router } = setup({
  config: { APP_ROOT: __dirname },
  port: false,
  logs: loggerConfig,
  session: sessionConfig,
  helmet: helmetConfig,
  redis: SESSION_TABLE_NAME ? false : commonExpress.lib.redis(),
  urls: {
    public: "/public",
  },
  publicDirs: ["../dist/public"],
  views: [
    path.resolve(__dirname, "views"),
    path.resolve(
      path.dirname(require.resolve("@govuk-one-login/di-ipv-cri-common-express")),
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
  },
  overloadProtection: overloadProtectionConfig,
  dev: true,
});

setI18n({
  router,
  config: {
    secure: true,
    cookieDomain: APP.GTM.ANALYTICS_COOKIE_DOMAIN,
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
  baseUrl: API.BASE_URL,
  sessionPath: API.PATHS.SESSION,
  authorizationPath: API.PATHS.AUTHORIZATION,
});

setOAuthPaths({ app, entryPointPath: APP.PATHS.CIC });

setGTM({
  app,
  ga4ContainerId: APP.GTM.GA4_ID,
  uaContainerId: APP.GTM.UA_ID,
  analyticsCookieDomain: APP.GTM.ANALYTICS_COOKIE_DOMAIN,
  ga4Enabled: APP.GTM.GA4_ENABLED,
  uaEnabled: APP.GTM.UA_ENABLED,
  ga4PageViewEnabled: APP.GTM.GA4_PAGE_VIEW_ENABLED,
  ga4FormResponseEnabled: APP.GTM.GA4_FORM_RESPONSE_ENABLED,
  ga4FormErrorEnabled: APP.GTM.GA4_FORM_ERROR_ENABLED,
  ga4FormChangeEnabled: APP.GTM.GA4_FORM_CHANGE_ENABLED,
  ga4NavigationEnabled: APP.GTM.GA4_NAVIGATION_ENABLED,
  ga4SelectContentEnabled: APP.GTM.GA4_SELECT_CONTENT_ENABLED,
  analyticsDataSensitive: APP.GTM.ANALYTICS_DATA_SENSITIVE,
});

/* Server configuration */
const server = app.listen(PORT);

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
const showLanguageToggle = APP.LANGUAGE_TOGGLE_DISABLED == "true" ? "0" : "1";
setLanguageToggle({ app, showLanguageToggle: showLanguageToggle });

setDeviceIntelligence({
  app,
  deviceIntelligenceEnabled: APP.DEVICE_INTELLIGENCE_ENABLED,
  deviceIntelligenceDomain: APP.DEVICE_INTELLIGENCE_DOMAIN,
});

app.get("nunjucks").addGlobal("addLanguageParam", addLanguageParam);

router.use(getGTM);
router.use(getLanguageToggle);
router.use(frontendUi.frontendUiMiddlewareIdentityBypass);
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
  logger
    .get(PACKAGE_NAME)
    .error(
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
