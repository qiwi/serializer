import {
  serializeValue,
  deserializeValue,
  getGeneratorVersion,
} from '../../main/ts'

describe('#getGeneratorVersion', () => {
  it('returns actual generator version', () => {
    expect(getGeneratorVersion()).toMatch(/^@qiwi\/serialize@.+$/)
  })
})

describe('#serializeValue / #deserializeValue', () => {
  it('serializes regular object', () => {
    const target = {
      foo: 'bar',
      baz: {qux: 1},
    }
    const serialized = serializeValue(target)
    const restored = deserializeValue(serialized)

    expect(serialized).toEqual({
      type: 'object',
      properties: {
        foo: {
          type: 'string',
          value: 'bar',
        },
        baz: {
          type: 'object',
          properties: {
            qux: {
              type: 'number',
              value: 1,
            },
          },
        },
      },
    })
    expect(restored).toEqual(target)
  })
})
