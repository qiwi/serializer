import {
  findRefIn,
  findRefInGlobal,
  findRefInModule,
} from '../../main/ts/finder'
import {A as SomeClass} from './stub/A'

describe('finder', () => {
  describe('#findRefIn', () => {
    it('returns key ref if found', () => {
      const foo = {}
      const area = {
        bar: foo
      }
      expect(findRefIn(foo, area)).toBe('bar')
    })

    it('returns undefined otherwise', () => {
      const foo = {}
      const area = {
        bar: foo
      }
      expect(findRefIn({}, area)).toBeUndefined()
    })
  })

  describe('#findRefInGlobal', () => {
    it('returns key ref if found', () => {
      const foo: any = []

      expect(findRefInGlobal(foo.__proto__.constructor)).toBe('Array')
    })

    it('returns undefined otherwise', () => {
      expect(findRefInGlobal({})).toBeUndefined()
    })
  })

  describe('#findRefInModule', () => {
    const aClassPath = require.resolve('./stub/A')

    it('returns key ref if found', () => {
      expect(findRefInModule(SomeClass, aClassPath)).toBe('A')
    })

    it('returns undefined otherwise', () => {
      expect(findRefInModule({}, aClassPath)).toBeUndefined()
    })
  })
})


