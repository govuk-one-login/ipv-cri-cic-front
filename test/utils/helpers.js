import { vi } from "vitest";

import JourneyModel from "hmpo-form-wizard/lib/journey-model.js";
import WizardModel from "hmpo-form-wizard/lib/wizard-model.js";

global.setupDefaultMocks = () => {
  const req = {
    form: { values: {} },
    headers: { "txma-audit-encoded": "dummy-txma-header" },
    axios: {
      get: vi.fn(),
      post: vi.fn(),
    },
    session: {
      "hmpo-wizard-previous": {},
    },
  };

  req.journeyModel = new JourneyModel(null, {
    req,
    key: "test",
  });
  req.sessionModel = new WizardModel(null, {
    req,
    key: "test",
    journeyModel: req.journeyModel,
    fields: {},
  });

  const res = {
    redirect: vi.fn(),
  };

  const next = vi.fn();

  return {
    req,
    res,
    next,
  };
};
