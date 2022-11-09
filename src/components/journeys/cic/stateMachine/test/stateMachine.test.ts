import { expect } from "chai";
import { EVENTS } from "../../app.constants";
import { getNext } from "../stateMachine";

describe("State machine", () => {

  describe("When passed an event which is not in the state machine", () => {
    it("Throws an error", () => {
      expect(() => getNext("INVALID_EVENT")).to.throw(Error, "Invalid event passed to the state machine")
    })
  })

})