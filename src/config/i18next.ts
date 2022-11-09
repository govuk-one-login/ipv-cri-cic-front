import { LOCALE } from "../app.constants";

export function i18nextConfigurationOptions(
  path: string
): Record<string, unknown> {
  return {
    debug: false,
    fallbackLng: LOCALE.EN,
    preload: [LOCALE.EN],
    supportedLngs: [LOCALE.EN],
    backend: {
      loadPath: path,
      allowMultiLoading: true,
    },
    detection: {
      lookupCookie: "lng",
      order: ["cookie"],
      caches: false,
      ignoreCase: true,
      cookieSecure: true,
      cookieSameSite: "",
    },
  };
}
