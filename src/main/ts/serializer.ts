import {
  IDefinedValue,
  IDefinitionsMap,
  ISerialized,
  ISerializedMeta,
  ISerializedValue,
  ISourceDefinition,
  ISourceRelation,
  type,
} from './interface'
import {
  clear,
  getTargetType,
  map,
  mapValues,
} from './util'
import {
  findSource,
  loadSource,
} from './finder'

import {
  getMeta,
} from './meta'

export const serialize = (target: any): ISerialized => {
  const value: ISerializedValue = serializeValue(target)
  const meta: ISerializedMeta = getMeta()

  return {
    type,
    value,
    meta,
  }
}

export const deserialize = (serialized: ISerialized): any => {
  const {
    value,
  } = serialized

  return deserializeValue(value)
}

export const serializeValue = (target: any, defs?: IDefinitionsMap): ISerializedValue => {
  const type = getTargetType(target)
  const definitions = defs ? undefined : {}

  let value: IDefinedValue | undefined
  let properties: IDefinitionsMap | undefined
  let source: ISourceDefinition | undefined

  if (type === 'string' || type === 'number' || type === 'null' || type === 'undefined') {
    value = target
  }

  if (type === 'function') {
    source = findSource(target)
  }

  if (type === 'object' || type === 'array') {
    source = findSource(target)
    if (!source || source.relation === ISourceRelation.proto) {
      properties = mapValues(target, (item: any) => serializeValue(item, definitions))
    }
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
    source,
  } = serialized

  const definitions: IDefinitionsMap = defs || serialized.definitions || {}

  // use isPrimitive?
  if (type === 'string' || type === 'number' || type === 'null' || type === 'undefined') {
    return value
  }

  if (type === 'function' && source) {
    return loadSource(source)
  }

  if (type === 'object' || type === 'array') {
    const stub = {...properties}
    const mapper: Function = type === 'array'
      ? map
      : mapValues

    if (source) {
      const ref = loadSource(source)
      const {relation} = source

      if (relation === ISourceRelation.reference) {
        return ref
      }
      Object.setPrototypeOf(stub, ref.prototype)
    }

    return mapper(stub, (item: ISerializedValue) => deserializeValue(item, definitions))
  }
}
