import {IMetaTypedValue} from '@qiwi/substrate'

export const type = 'serialized'

export enum ISourceType {
  global = 'global',
  module = 'module',
  local = 'local',
}

export enum ISourceRelation {
  reference = 'reference',
  proto = 'proto',
}

export type IDefinedValue = string | number | null

export type IDefinitionDeclaration = {
  type: string // TODO enum
  value?: IDefinedValue,
  properties?: IDefinitionsMap
  definitions?: IDefinitionsMap
  source?: ISourceDefinition
}

export type IDefinitionReference = {
  '$ref': string
}

export type IDefinition = IDefinitionDeclaration | IDefinitionReference

export type IDefinitionKey = string | number

export type ISourceDefinition = {
  type: ISourceType
  relation: ISourceRelation
  target?: string
  path?: string
}

export type IDefinitionsMap = {
  [key in IDefinitionKey]: IDefinition
}

export type ISerializedValue = IDefinitionDeclaration

export type ISerializedMeta = {
  generator: string,
  nodejs: string,
  timestamp?: number
}

export type ISerializedType = typeof type

export type ISerialized = IMetaTypedValue<ISerializedValue, ISerializedType, ISerializedMeta>
