import * as CORE_MODULES from 'builtin-modules'
import {
  findKey,
  isObject,
  findResult,
  clear,
} from './util'
import {ISourceDefinition, ISourceRelation, ISourceType} from './interface'

export const findSource = (target: any): ISourceDefinition | undefined => {
  const moduleList = getModulesList()
  const areas = [
    ...moduleList.map(id => ({
      type: ISourceType.module,
      path: id
    })),
    {
      type: ISourceType.global
    }
  ].reduce((m, v) => {
    m.push({
      relation: ISourceRelation.reference,
      ...v
    }, {
      relation: ISourceRelation.proto,
      ...v
    })

    return m
  }, [] as any)

  return findResult(areas,({type, path, relation}: ISourceDefinition) => {
    const _target = relation === ISourceRelation.reference
      ? target
      : target.__proto__.constructor

    const ref = type === ISourceType.global
      ? findRefInGlobal(_target)
      : findRefInModule(_target, path + '')

    return ref
      ? clear({
        type,
        path,
        relation,
        target: ref
      })
      : false
  })

}

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
