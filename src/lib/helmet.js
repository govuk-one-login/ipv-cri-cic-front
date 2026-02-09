//Extracted from common-express and modified

module.exports = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        (_req, res) => `'nonce-${res.locals.cspNonce}'`,
        // pragma: allowlist nextline secret
        "'sha256-GUQ5ad8JK5KmEWmROf3LZd9ge94daqNvd8xy9YS1iDw='",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://ssl.google-analytics.com",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
      ],
      formAction: ["*"],
      objectSrc: ["'none'"],
      connectSrc: ["'self'", "*.google-analytics.com"],
    },
  },
  dnsPrefetchControl: {
    allow: false,
  },
  frameguard: {
    action: "deny",
  },
  hsts: {
    maxAge: 31536000, // 1 Year
    preload: true,
    includeSubDomains: true,
  },
  referrerPolicy: false,
  permittedCrossDomainPolicies: false,
  expectCt: false,
};
