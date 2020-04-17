import {IMetaTypedValue} from '@qiwi/substrate'

export const type = Symbol('Serialized')

export enum ISourceType {
  global,
  module
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
