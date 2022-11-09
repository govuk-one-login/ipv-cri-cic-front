import express from "express";
import { flaggedController } from "./flaggedController";

const router = express.Router()

router.get("/*", flaggedController);
router.post("/*", flaggedController);

export {router as flaggedRouter}
