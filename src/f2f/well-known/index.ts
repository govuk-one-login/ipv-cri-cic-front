import express, { Request, Response } from "express";

const router = express.Router();

const appID = `${process.env.MOBILE_APP_ID}`
const androidAppID = `${process.env.ANDROID_APP_ID}`
const androidFingerPrint = `${process.env.ANDROID_FINGER_PRINT}`

router.get("/apple-app-site-association", (req: Request, res: Response): void => {
    res.type('application/json');
    res.send(JSON.stringify({
        "applinks": {
            "apps": [],
            "details": [
                {
                    appID,
                    "paths": ["/dca/app/open"]
                }
            ]
        }
    }, null, 4));
});

router.get("/assetlinks.json", (_:Request, res:Response):void => {
    res.type('application/json');
    res.send(JSON.stringify([
        {
          "relation": ["delegate_permission/common.handle_all_urls"],
          "target": {
            "namespace": "android_app",
            "package_name": androidAppID,
            "sha256_cert_fingerprints":
            [androidFingerPrint]
          }
        }
      ]))
})

module.exports = router;