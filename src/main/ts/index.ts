import {
  ISerializedValue,
  ISerialized,
  ISerializedMeta,
  IDefinedValue,
  IDefinitionsMap,
  ISourceDefinition,
  type
} from './interface'
import {sync as getPkg} from 'read-pkg-up'
import {
  mapValues,
  getTargetType,
  clear,
} from './util'

export const getGeneratorVersion = () => {
  const pkgJson: any = getPkg()?.packageJson

  return `${pkgJson.name}@${pkgJson.version}`
}

export const serialize = (target: any): ISerialized => {
  const value: ISerializedValue = serializeValue(target)
  const meta: ISerializedMeta = {
    generator: getGeneratorVersion(),
  }

  return {
    type,
    value,
    meta,
  }
}

export const serializeValue = (target: any, defs?: IDefinitionsMap): ISerializedValue => {
  const type = getTargetType(target)
  const definitions = defs ? undefined : {}

  let value: IDefinedValue | undefined
  let properties: IDefinitionsMap | undefined
  let source: ISourceDefinition | undefined

  if (type === 'object' || type === 'array') {
    properties = mapValues(target, (item: any) => serializeValue(item, definitions))
  }

  if (type === 'string' || type === 'number' || type === 'null' || type === 'undefined'){
    value = target
  }

  return clear({
    type,
    value,
    properties,
    definitions,
    source,
  })
}

