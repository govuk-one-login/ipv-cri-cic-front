export enum LOCALE {
    EN = "en",
    CY = "cy"
}

export const HTTP_STATUS_CODES = {
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    OK: 200
}

export type Path = `/${string}`
export const AUTH_ROOT: Path = "/f2f/oauth2"
export const APP_ROOT: Path = "/f2f/app"
export type PathNames = { [key: string]: `/${string}` }

export const PATH_NAMES : PathNames = {
    HEALTHCHECK: "/auth/health",
    AUTHORIZE: "/authorize",
    CALLBACK: "/callback",
    REDIRECT: "/redirect",
    STUB_CALLBACK: "/finishBiometricCheck",
    ABORT_SESSION: "/abort",
    FEATURE_FLAG_COOKIE: "/cookies"
}