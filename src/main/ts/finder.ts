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
