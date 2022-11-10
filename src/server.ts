/* eslint-disable no-console */
import { createApp } from "./app";

const port = process.env.PORT;

(async () => {
  const app = await createApp();
  app
    .listen(port, () => {
      console.log(`Server listening on port ${port}`);
    })
    .on("error", (error: Error) => {
      console.log(`Unable to start server because of ${error.message}`);
    });
})().catch((err) => {
  console.log("Server failed to create app", err);
});
