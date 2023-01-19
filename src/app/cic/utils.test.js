const { formatDate } = require('./utils')

describe('formatDate', () => {
  it('returns a YYYY-MM-DD date as DD MM YYYY', () => {
    expect(formatDate('1989-03-31')).toEqual('31 03 1989');
  })

  it('should return an empty string if date is empty string', () => {
    expect(formatDate("")).toEqual("");
  })

  it('should return an empty string if date is empty', () => {
    expect(formatDate()).toEqual("");
  })
})