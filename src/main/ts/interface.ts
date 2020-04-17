import {IMetaTypedValue} from '@qiwi/substrate'

export const type = Symbol('Serialized')

export enum ISourceType {
  global,
  module,
  local
}

export enum ISourceRelation {
  reference,
  proto
}

export type IDefinitionDeclaration = {
  type: string // TODO enum
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
  target: string
  path: string
}

export type IDefinitionsMap = {
  [key in IDefinitionKey]: IDefinition
}

export type ISchema = IDefinitionDeclaration

export type ISerializedMeta = {
  generator: string
  schema: ISchema
}

export type ISerializedType = typeof type

export type ISerialized = IMetaTypedValue<any, ISerializedType, ISerializedMeta>
