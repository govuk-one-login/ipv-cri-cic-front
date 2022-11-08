import { Request, Response, NextFunction } from "express"
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios"

const headers: AxiosRequestHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": "true",
  "X-Requested-With": "XMLHttpRequest"
}

module.exports = {
  callback(req: Request, res: Response): void {
    res.render("stub.njk")
  },

  fetchBiometricToken: async (
      req: Request,
      res: Response,
      next: NextFunction
  ) : Promise<void> => {
    const sessionId = req.cookies.sessionId
    const url = `${process.env.API_URL}/biometricToken`
    const config: AxiosRequestConfig = {
      headers: headers,
      params: { authSessionId: sessionId }
    }
    try {
      await axios.get(url, config)
      next()
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(error))
      res.statusCode = error.response.status
      next(error)
    }
  },

  finishBiometricsCheck: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const sessionId = req.cookies.sessionId
    const biometricSessionId = "892d3797-f6ec-4484-af0e-88b5c853e5e2" // must be uuid
    const url = `${process.env.API_URL}/finishBiometricSession`
    const config: AxiosRequestConfig = {
      headers: headers,
      params: { authSessionId: sessionId, biometricSessionId }
    }
    try {
      await axios.post(url, null, config)
      next()
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(error))
      res.statusCode = error.response.status
      next(error)
    }
  }
}
