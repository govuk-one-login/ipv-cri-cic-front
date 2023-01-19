const { formatDate } = require('./utils')

describe('formatDate', () => {
  it('returns a YYYY-MM-DD date as DD MM YYYY', () => {
    expect(formatDate('1989-03-31')).toEqual('31 03 1989');
  })
})