import {
  findRefIn,
  findRefInGlobal,
  findRefInModule,
  getCoreModulesList,
  getModules,
  getModulesList,
  getRegularModulesList,
} from '../../main/ts/finder'

import {A, A as SomeClass} from './stub/A'
import * as fs from 'fs'

describe('finder', () => {
  describe('#findRefIn', () => {
    it('returns key ref if found', () => {
      const foo = {}
      const area = {
        bar: foo,
      }
      expect(findRefIn(foo, area)).toBe('bar')
    })

    it('returns undefined otherwise', () => {
      const foo = {}
      const area = {
        bar: foo,
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

  describe('#getRegularModulesList', () => {
    it('returns list of loaded modules', () => {
      const modules = getRegularModulesList()
      const module1 = require.resolve('../../main/ts/finder')
      const module2 = require.resolve('./stub/A')

      expect(A).toBeDefined()
      expect(modules.includes(module1)).toBeTruthy()
      expect(modules.includes(module2)).toBeTruthy()
    })
  })

  describe('#getCoreModulesList', () => {
    it('returns list of core modules', () => {
      const modules = getCoreModulesList()

      expect(modules.length).toBeGreaterThan(1)
      expect(modules.includes('fs')).toBeTruthy()
    })
  })

  describe('#getModules', () => {
    it('returns loaded module refs', () => {
      const modules = getModules()
      const moduleA = require.resolve('./stub/A')

      expect(modules['fs']).toBe(fs)
      expect(modules[moduleA].A).toBe(SomeClass)
    })
  })

  describe('#getModulesList', () => {
    it('returns loaded module refs', () => {
      const modules = getModulesList()
      const moduleA = require.resolve('./stub/A')

      expect(modules.includes(moduleA)).toBeTruthy()
      expect(modules.includes('fs')).toBeTruthy()
    })
  })
})
