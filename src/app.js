require("express");
require("express-async-errors");

const path = require("path");
const session = require("express-session");
const AWS = require("aws-sdk");
const DynamoDBStore = require("connect-dynamodb")(session);
const wizard = require("hmpo-form-wizard");
const logger = require("hmpo-logger");

const commonExpress = require("@govuk-one-login/di-ipv-cri-common-express");

const setHeaders = commonExpress.lib.headers;
const setScenarioHeaders = commonExpress.lib.scenarioHeaders;
const setAxiosDefaults = commonExpress.lib.axios;

const { setAPIConfig, setOAuthPaths } = require("./lib/settings");

const { setGTM } = commonExpress.lib.settings;
const { getGTM } = commonExpress.lib.locals;

const {
  setI18n,
} = require("@govuk-one-login/di-ipv-cri-common-express/src/lib/i18next");

const steps = require("./app/cic/steps");
const fields = require("./app/cic/fields");

const {
  API,
  APP,
  PORT,
  SESSION_SECRET,
  SESSION_TABLE_NAME,
  SESSION_TTL,
} = require("./lib/config");

const { setup } = require("hmpo-app");

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

const helmetConfig = require("./lib/helmet.js");

const { app, router } = setup({
  config: { APP_ROOT: __dirname },
  port: PORT,
  logs: loggerConfig,
  session: sessionConfig,
  helmet: helmetConfig,
  redis: SESSION_TABLE_NAME ? false : commonExpress.lib.redis(),
  urls: {
    public: "/public",
  },
  publicDirs: ["../dist/public"],
  views: [
    path.resolve(
      path.dirname(
        require.resolve("@govuk-one-login/di-ipv-cri-common-express"),
      ),
      "components",
    ),
    "views",
  ],
  translation: {
    allowedLangs: ["en", "cy"],
    fallbackLang: ["en"],
    cookie: { name: "lng" },
  },
  middlewareSetupFn: (app) => {
    app.use(setHeaders);
  },
  dev: true,
});

setI18n({
  router,
  config: {
    secure: true,
    cookieDomain: APP.GTM.DOMAIN,
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
  ga4Disabled: APP.GTM.GA4_DISABLED,
  uaDisabled: APP.GTM.UA_DISABLED,
});

router.use(getGTM);

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
    .get()
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
