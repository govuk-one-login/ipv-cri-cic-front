import {serviceCookieDomain} from "../config";
import {Response} from "express";

export function setCookie(res: Response, cookieName: string, value: string): void {
    res.cookie(`${cookieName}`, value, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        domain: serviceCookieDomain()
    });
}