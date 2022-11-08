import { expect } from "chai";
import { EVENTS } from "../../app.constants";
import { getNext } from "../stateMachine";

describe("State machine", () => {

  describe("When passed an event which is not in the state machine", () => {
    it("Throws an error", () => {
      expect(() => getNext("INVALID_EVENT")).to.throw(Error, "Invalid event passed to the state machine")
    })
  })

  describe("HAS_DRIVING_LICENSE", () => {
    it("User is redirected to /idCheckApp", () => {
      const redirect = getNext(EVENTS.HAS_DRIVING_LICENSE)
      expect(redirect).to.equal("/idCheckApp")
    })
  })



})