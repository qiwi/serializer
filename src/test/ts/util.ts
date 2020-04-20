import {A} from './stub/A'
import {
  getRegularModulesList,
  getCoreModulesList
} from '../../main/ts/util'

describe('util',() => {
  describe('#getLoadedModules', () => {
    it('returns list of loaded modules', () => {
      const modules = getRegularModulesList()
      const module1 = require.resolve('../../main/ts/util')
      const module2 = require.resolve('./stub/A')

      expect(A).toBeDefined()
      expect(modules.includes(module1)).toBeTruthy()
      expect(modules.includes(module2)).toBeTruthy()
    })
  })

  describe('#getCoreModules', () => {
    it('returns list of core modules', () => {
      const modules = getCoreModulesList()

      expect(modules.length).toBeGreaterThan(1)
      expect(modules.includes('fs')).toBeTruthy()
    })
  })
})
