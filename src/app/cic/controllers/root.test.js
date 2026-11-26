import wizard from "hmpo-form-wizard";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { RootController } from "./root.js";

vi.spyOn(console, "log");

describe("RootController", () => {
  const rootController = new RootController({ route: "/test" });
  let req;
  let res;
  let next;

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;
  });

  it("should be an instance of BaseController", () => {
    expect(rootController).toBeInstanceOf(wizard.Controller);
  });

  describe("saveValues", () => {
    it("should save all values to sessionModel with full shared_claims object", async () => {
      req.session.shared_claims = {
        name: [
          {
            nameParts: [
              { value: "First" },
              { value: "Middle" },
              { value: "Last" },
            ],
          },
        ],
        birthDate: [{ value: "1999-03-01" }],
      };

      await rootController.saveValues(req, res, next);
      const firstName = req.sessionModel.get("firstName");
      const surname = req.sessionModel.get("surname");
      const dateOfBirth = req.sessionModel.get("dateOfBirth");

      expect(firstName).toEqual("First");
      expect(surname).toEqual("Last");
      expect(dateOfBirth).toEqual("1999-03-01");
    });
  });

  it("[TODO DUPLICATED TEST] should save appropriate values to sessionModel with partial shared_claims object", async () => {
    req.session.shared_claims = {
      name: [
        {
          nameParts: [
            { value: "First" },
            { value: "Middle" },
            { value: "Last" },
          ],
        },
      ],
      birthDate: [{ value: "1999-03-01" }],
    };

    await rootController.saveValues(req, res, next);
    const firstName = req.sessionModel.get("firstName");
    const surname = req.sessionModel.get("surname");
    const dateOfBirth = req.sessionModel.get("dateOfBirth");

    expect(firstName).toEqual("First");
    expect(surname).toEqual("Last");
    expect(dateOfBirth).toEqual("1999-03-01");
  });

  it("should not update sessionModel if no shared_claims attributes present", async () => {
    req.session.shared_claims = {
      name: [],
      birthDate: [],
    };

    await rootController.saveValues(req, res, next);
    const firstName = req.sessionModel.get("firstName");
    const surname = req.sessionModel.get("surname");
    const dateOfBirth = req.sessionModel.get("dateOfBirth");

    expect(firstName).toEqual(undefined);
    expect(surname).toEqual(undefined);
    expect(dateOfBirth).toEqual(undefined);
  });
});
