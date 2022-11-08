export enum Features{
  F2F = "X_GOVUK_SIGNIN_F2F_FEATURE_FLAG_20221108_CRI"
}

function getOrThrow(variableName: string): string {
  const variableValue = process.env[variableName] ?? null
  if (variableValue === null) {
    throw new Error(`${variableName} variable not set in the current environment`)
  } else {
    return variableValue
  }
}

export function getCurrentJourney(cookies: any): Features {
  if (cookies.X_GOVUK_SIGNIN_F2F_FEATURE_FLAG_20221108_CRI == 'true') return Features.F2F

  return Features.F2F
}

export function isOauthEnabled(): boolean {
  const oauthEnabled = getOrThrow("OAUTH_ENABLED")
  return oauthEnabled === 'true'
}

export function frontEndUrl(): string {
  return getOrThrow("FRONT_END_URL")
}

export function serviceCookieDomain(): string {
  return getOrThrow("SERVICE_COOKIE_DOMAIN")
}
