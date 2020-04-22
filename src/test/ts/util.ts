import {getTargetType} from '../../main/ts/util'

describe('util',() => {
  describe('#getTargetType', () => {
    const cases = [
      [null, 'null'],
      ['foo', 'string'],
      [1, 'number'],
      [true, 'boolean'],
      [[], 'array'],
      [{}, 'object'],
      [undefined, 'undefined'],
    ]

    cases.forEach(([target, result]) => {
      it(`detects ${target} as ${result}`, () => {
        expect(getTargetType(target)).toBe(result)
      })
    })
  })
})
