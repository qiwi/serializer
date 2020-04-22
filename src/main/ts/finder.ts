import * as CORE_MODULES from 'builtin-modules'
import {clear, findKey, findResult, isObject,} from './util'
import {ISourceDefinition, ISourceRelation, ISourceType} from './interface'

export const loadSource = ({type, path, target}: ISourceDefinition): any => {
  const source = type === ISourceType.module
    ? require(path + '')
    : global

  return target
    ? source[target]
    : source
}

export const findSource = (target: any): ISourceDefinition | undefined => {
  const moduleList = getModulesList()
  const areas = [
    ...moduleList.reduce((m, id) => {
      m.push({
        relation: ISourceRelation.reference,
        type: ISourceType.module,
        path: id
      }, {
        relation: ISourceRelation.proto,
        type: ISourceType.module,
        path: id
      })

      return m
    }, []),
    {
      type: ISourceType.global,
      relation: ISourceRelation.reference,
    }
  ]

  return findResult(areas,({type, path, relation}: ISourceDefinition) => {
    const _target = relation === ISourceRelation.reference
      ? target
      : target.__proto__?.constructor

    const ref = type === ISourceType.global
      ? findRefInGlobal(_target)
      : findRefInModule(_target, path + '')

    return ref
      ? clear({
        type,
        path,
        relation,
        target: typeof ref === 'string' ? ref : undefined,
      })
      : false
  })

}

export const findRefIn = (target: any, area: any) =>
  target === area || findKey(Object.getOwnPropertyDescriptors(area), ({value}) =>
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
