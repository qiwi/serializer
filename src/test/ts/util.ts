import {A} from './stub/A'
import {
  getRegularModulesList,
  getCoreModulesList,
  getModules
} from '../../main/ts/util'
import * as fs from 'fs'

describe('util',() => {
  describe('#getRegularModulesList', () => {
    it('returns list of loaded modules', () => {
      const modules = getRegularModulesList()
      const module1 = require.resolve('../../main/ts/util')
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
      expect(modules[moduleA].A).toBe(A)
    })
  })
})
