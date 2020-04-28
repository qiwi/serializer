import {
  serialize,
  deserialize,
  serializeValue,
  deserializeValue,
} from '../../main/ts'

describe('facade', () => {
  it('properly exposes lib index', () => {
    expect(serialize).toEqual(expect.any(Function))
    expect(deserialize).toEqual(expect.any(Function))
    expect(serializeValue).toEqual(expect.any(Function))
    expect(deserializeValue).toEqual(expect.any(Function))
  })
})
