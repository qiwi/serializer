import {
  // serialize,
  getGeneratorVersion,
} from '../../main/ts'

describe('#getGeneratorVersion', () => {
  it('returns actual generator version', () => {
    expect(getGeneratorVersion()).toMatch(/^@qiwi\/serialize@.+$/)
  })
})

describe('#serialize', () => {
  it('', () => {})
})


describe('#deserialize', () => {
  it('', () => {})
})
