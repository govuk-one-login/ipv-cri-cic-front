
import express from "express";
import * as path from "path";

export function bindRoutes(app: express.Application): void {
const urls = {
    public: "/public",
    publicImages: "/public/images",
    assetsImage: "/assets/images",
  };

  app.use(
    urls.publicImages,
    express.static(
      path.resolve(
        path.dirname(require.resolve("hmpo-components")),
        "assets",
        "images"
      )
    )
  );

  app.use(
    urls.public,
    express.static(
      path.resolve(path.dirname(require.resolve("govuk-frontend")), "assets")
    )
  );

  app.use(
    urls.assetsImage,
    express.static(
      path.resolve(
        path.dirname(require.resolve("govuk-frontend")),
        "assets",
        "images"
      )
    )
  );
}