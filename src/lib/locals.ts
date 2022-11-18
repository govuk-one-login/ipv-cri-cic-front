import { CONFIG } from "./config";
const { generateNonce } = require("./strings");

export function  getGTM (req: any, res: any, next: any) {
    res.locals.gtmId = CONFIG.GTM_ID;
    res.locals.scriptNonce = generateNonce();
    res.locals.analyticsCookieDomain = CONFIG.GTM_ANALYTICS_COOKIE_DOMAIN;
    next();
};
