export enum LOCALE {
    EN = "en"
}

export const HTTP_STATUS_CODES = {
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    OK: 200
}

export type Path = `/${string}`
export const AUTH_ROOT: Path = "/cic/oauth2"
export const APP_ROOT: Path = "/cic/app"
export type PathNames = { [key: string]: `/${string}` }

export const PATH_NAMES : PathNames = {
    HEALTHCHECK: "/auth/health",
    AUTHORIZE: "/authorize"
}
