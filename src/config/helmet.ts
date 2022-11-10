import helmet from "helmet"
import { Request, Response } from "express";

// Helmet does not export the config type - This is the way they recommend getting it on GitHub.
export const helmetConfiguration: Parameters<typeof helmet>[0] = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      blockAllMixedContent: [],
      fontSrc: ["'self'", "https:", "data:"],
      formAction: ["'self'", "*.gov.uk", "*.cloudapps.digital"],
      frameAncestors: ["'self'"],
      imgSrc: [
        "'self'",
        "data:",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com"
      ],
      objectSrc: ["'none'"],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      scriptSrc: [
        "'self'",
        (req: Request, res: Response): string => `'nonce-${res.locals.scriptNonce}'`,
        "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://ssl.google-analytics.com",
      ], //https://github.com/alphagov/govuk-frontend/issues/1811
      scriptSrcAttr: ["'none'"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      upgradeInsecureRequests: [],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      connectSrc: [
        "'self'", 
        "https://www.google-analytics.com", 
        (req: Request, res: Response): string => res.locals.apiUrl
    ],
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "same-origin" },
  dnsPrefetchControl: false, // Disabling because DNS requests can have high latency for mobile networks
  expectCt: false, // Obsolete header
  frameguard: { action: "deny" },
  hsts: {
    maxAge: 31536000, // 1 Year
    preload: true,
    includeSubDomains: true
  },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: { permittedPolicies: "none" },
  referrerPolicy: { policy: "no-referrer" },
  xssFilter: true
}
