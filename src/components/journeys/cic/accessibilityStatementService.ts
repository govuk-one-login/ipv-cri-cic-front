import {Request, Response} from "express";

const TEMPLATE = 'accessibilityStatement.njk'

export async function accessibilityStatement(req: Request, res: Response): Promise<void> {
    res.render(TEMPLATE)
}