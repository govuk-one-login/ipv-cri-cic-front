import {Request, Response} from "express";

const TEMPLATE = 'privacyStatement.njk'

export async function privacyStatement(req: Request, res: Response): Promise<void> {
    res.render(TEMPLATE)
}