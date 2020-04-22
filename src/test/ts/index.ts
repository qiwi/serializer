import {
  serializeValue,
  deserializeValue
} from '../../main/ts'

describe('facade', () => {
  it('properly exposes lib index', () => {
    expect(serializeValue).toEqual(expect.any(Function))
    expect(deserializeValue).toEqual(expect.any(Function))
  })
})
