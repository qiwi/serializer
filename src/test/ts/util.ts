import {
  getTargetType,
  findResult
} from '../../main/ts/util'

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

  describe('#findResult', () => {
    it('returns the first non-empty predicate result', () => {
      const arr = ['a', 'b']

      expect(findResult(arr, (v: string) =>
        v === 'a' ? v.toUpperCase() : false
      )).toBe('A')
    })

    it('returns undefined otherwise', () => {
      const arr = ['a', 'b']

      expect(findResult(arr, (v: string) =>
        v === 'c' ? v.toUpperCase() : false
      )).toBeUndefined()
    })
  })
})
