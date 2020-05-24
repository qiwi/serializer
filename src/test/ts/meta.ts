import {
  getGeneratorVersion,
  getMeta,
  getNodejsVersion,
} from '../../main/ts/meta'

describe('#getMeta', () => {
  it('returns proper meta', () => {
    expect(getMeta()).toEqual({
      timestamp: expect.any(Number),
      generator: getGeneratorVersion(),
      nodejs: getNodejsVersion(),
    })
  })
})

describe('#getNodejsVersion', () => {
  it('returns nodejs engine version', () => {
    expect(getNodejsVersion()).toMatch(/^v\d+\.\d+\.\d+$/)
  })
})

describe('#getGeneratorVersion', () => {
  it('returns actual generator version', () => {
    expect(getGeneratorVersion()).toMatch(/^@qiwi\/serializer@.+$/)
  })
})
