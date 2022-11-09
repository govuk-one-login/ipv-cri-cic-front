/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck 
const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const chaiModule = require("chai");
const sinonChai = require("sinon-chai");

chaiModule.use(sinonChai);

describe("Download app", () => {

  let fetchStub
  beforeEach(async () => {
    global.window = {
      GOVUKFrontend: {},
      location: { href: "mockHref" },
      fetch: async () => "mockFetchReturn"
    }  
    fetchStub = sinon.stub(global.window, 'fetch')
    fetchStub.resolves({ status: 401 });
  });

  afterEach(() => {
    sinon.restore();
    delete require.cache[require.resolve("../../../../assets/javascript/pollIsSessionFinished")];
  });

  describe("Polling", () => {
    describe("When I do not post anything to the BE within the polling duration", () => {
      it("I am redirected to the timeoutPath", async () => {
      const clock = sinon.useFakeTimers();
      const pollingDuration = 1800000
      const interval = 3000

      require("../../../../assets/javascript/pollIsSessionFinished")
      await global.window.GOVUKFrontend.polling('apiUrl', 'redirectPath', 'timeoutPath', `${pollingDuration}`, `${interval}`, 'sessionId') 
      await clock.tickAsync(pollingDuration + interval);

      const expectedCallCount = Math.floor((pollingDuration / interval) + 1)
      expect(global.window.location.href).to.equal("timeoutPath")
      expect(fetchStub).to.have.callCount(expectedCallCount)
      });
    });
  });
});
