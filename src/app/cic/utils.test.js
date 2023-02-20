const { formatDate } = require('./utils')
const { expect } = require("chai");

describe('formatDate', () => {
  it('returns a YYYY-MM-DD date as DD MM YYYY', () => {
    expect(formatDate('1989-03-31', "YYYY-MM-DD")).to.equal('31 03 1989');
  })

  it('returns a YYYY-MM-DD date as DD MM YYYY', () => {
    expect(formatDate('198903/31', "YYYY-MM-DD")).to.equal('');
  })

  it('should return an empty string if date is empty string', () => {
    expect(formatDate("","YYYY-MM-DD")).to.equal("");
  })

  it('should return an empty string if date is empty', () => {
    expect(formatDate(null,"YYYY-MM-DD")).to.equal("");
  })
})
