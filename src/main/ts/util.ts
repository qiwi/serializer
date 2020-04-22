import {
  isUndefined,
  negate,
  isEmpty,
  isObject,
  find,
} from 'lodash'

export {
  map,
  mapValues,
  pickBy,
  once,
  findKey,
  isObject,
  sortBy,
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

export const getTargetType = (target: unknown): string => {
  if (target === null) {
    return 'null'
  }

  if (Array.isArray(target)) {
    return 'array'
  }

  return typeof target
}

// Returns the first non-falsy predicate result
export const findResult = (target: any, predicate: any) => {
  let res

  find(target, (...args: any[]) => {
    res = predicate(...args)

    return res
  })

  return res || undefined
}
