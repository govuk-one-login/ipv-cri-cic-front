/* global window */

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { expect } = require("chai");

chai.use(sinonChai);

describe("PageViewTracker", () => {
  let expected;
  let mockSendData;

  beforeEach(async () => {
    global.window = {
      DI: {
        core: {
          sendData: () => "sent!",
        },
        cookies: {
          getCookie: () => "en",
        },
      },
    };
    mockSendData = sinon.stub(global.window.DI.core, "sendData");
    global.document = {
      title: "some-title",
      location: {
        href: "/href",
      },
      referrer: "mockReferrer",
    };
    window.dataLayer = [];

    expected = {
      event: "page_view_ga4",
      page_view: {
        language: "en",
        location: "/href",
        organisations: "<OT1056>",
        primary_publishing_organisation:
          "government digital service - digital identity",
        status_code: 200,
        title: "some-title",
        referrer: "mockreferrer",
        taxonomy_level1: "web cri",
        taxonomy_level2: "cic",
      },
    };

    require("../../src/assets/javascript/analytics/ga4/pageViewTracker");
  });

  afterEach(() => {
    delete require.cache[
      require.resolve(
        "../../src/assets/javascript/analytics/ga4/pageViewTracker",
      )
    ];
  });

  it("Returns a standard page view", function () {
    global.window.DI.analyticsGa4.trackers.PageViewTracker.init();

    expect(mockSendData).to.have.been.calledWith(expected);
  });

  it("Sets the language to the value of the lng cookie if set", function () {
    global.window.DI.cookies.getCookie = () => "cy";

    global.window.DI.analyticsGa4.trackers.PageViewTracker.init();

    expected.page_view.language = "cy";
    expect(mockSendData).to.have.been.calledWith(expected);
  });

  it("Sets the status_code to the value of the http status code if set", function () {
    global.window.DI.httpStatusCode = 401;

    global.window.DI.analyticsGa4.trackers.PageViewTracker.init();

    expected.page_view.status_code = 401;
    expect(mockSendData).to.have.been.calledWith(expected);
  });

  it("Sets title, location, referrer and language to lowercase if they contain uppercase characters", function () {
    global.document.title = "SOME-TITLE";
    global.document.location.href = "/HREF";
    global.document.referrer = "MOCKREFERRER";
    global.window.DI.cookies.getCookie = () => "EN";

    global.window.DI.analyticsGa4.trackers.PageViewTracker.init();

    expect(mockSendData).to.have.been.calledWith(expected);
  });
});
