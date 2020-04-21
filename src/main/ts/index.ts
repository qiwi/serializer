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
  map,
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

export const deserializeValue = (serialized: ISerializedValue, defs?: IDefinitionsMap): any => {
  const {
    type,
    value,
    properties,
    // source,
  } = serialized

  const definitions: IDefinitionsMap = defs || serialized.definitions || {}

  // use isPrimitive?
  if (type === 'string' || type === 'number' || type === 'null' || type === 'undefined'){
    return value
  }

  if (type === 'object') {
    return mapValues(properties || {}, (item: ISerializedValue) => deserializeValue(item, definitions))
  }

  if (type === 'array') {
    return map(properties || [], (item: ISerializedValue) => deserializeValue(item, definitions))
  }

}
