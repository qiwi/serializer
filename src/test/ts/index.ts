import {
  serializeValue,
  getGeneratorVersion,
} from '../../main/ts'

describe('#getGeneratorVersion', () => {
  it('returns actual generator version', () => {
    expect(getGeneratorVersion()).toMatch(/^@qiwi\/serialize@.+$/)
  })
})

describe('#serializeValue', () => {
  it('serializes regular object', () => {
    expect(serializeValue({
      foo: 'bar',
      baz: {qux: 1}
    })).toEqual({
      type: 'object',
      properties: {
        foo: {
          type: 'string',
          value: 'bar'
        },
        baz: {
          type: 'object',
          properties: {
            qux: {
              type: 'number',
              value: 1
            }
          }
        }
      }
    })
  })
})


describe('#deserialize', () => {
  it('', () => {})
})
