import * as CORE_MODULES from 'builtin-modules'
import {
  isUndefined,
  negate,
  isEmpty,
  isObject,
} from 'lodash'

export {
  map,
  mapValues,
  pickBy,
} from 'lodash'

export const clear = (obj: any) => {
  Object.keys(obj).forEach(key => {
    const value = obj[key]

    if (value === undefined || isObject(value) && isEmpty(value)) {
      delete obj[key]
    }
  })

  return obj
}

export const isDefined = negate(isUndefined)

export const getCoreModulesList = () => CORE_MODULES

export const getRegularModulesList = (): any => Object.keys(require.cache)

export const getModulesList = () => [...getCoreModulesList(), ...getRegularModulesList()]

export const getModules = () => getModulesList().reduce((m, id) => {
  m[id] = require(id)
  return m
}, {})

export const getTargetType = (target: unknown): string => {
  if (target === null) {
    return 'null';
  }

  if (Array.isArray(target)) {
    return 'array'
  }

  return typeof target
}
