import * as CORE_MODULES from 'builtin-modules'
import {
  findKey,
  isObject,
} from './util'

export const findRefIn = (target: any, area: any) =>
  findKey(Object.getOwnPropertyDescriptors(area), ({value}) =>
    isObject(value) && target === value,
  )

export const findRefInGlobal = (target: any) => findRefIn(target, global)

export const findRefInModule = (target: any, id: string) => findRefIn(target, require(id))

export const getCoreModulesList = () => CORE_MODULES

export const getRegularModulesList = (): any => Object.keys(require.cache)

export const getModulesList = () => [...getCoreModulesList(), ...getRegularModulesList()]

export const getModules = () => getModulesList().reduce((m, id) => {
  m[id] = require(id)
  return m
}, {})
