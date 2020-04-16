import {IMetaTypedValue} from '@qiwi/substrate'

export const type = Symbol('Serialized')

export enum IDefinitionSource {
  global,
  module
}

export type IContextDeclaration = {
  prop: string
  definition: IDefinition | IDefinitionKey
}

export type IDefinitionKey = string

export type IDefinition = {
  source: IDefinitionSource
  target: string
  path: string
}

export type IDefinitionsMap = {
  [key in IDefinitionKey]: IDefinition
}

export type ISerializedMeta = {
  generator: string
  context: IContextDeclaration
  definitions: IDefinitionsMap
}

export type ISerializedType = typeof type

export type ISerialized = IMetaTypedValue<any, ISerializedType, ISerializedMeta>
