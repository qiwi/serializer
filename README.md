# serializer
Utility to serialize/deserialize js object and restore its context as close as possible

## Motivation
In JS:
* We have no "classpaths", so we cannot bind class ref with its package/module.
* `JSON.serialize`, `v8.serialize` does not produce any meta that could be used to restore object context (proto, bindings).

There are... just a few JSON supersets that change the situation slightly: [json-schema](https://json-schema.org/), [serialize-javascript](https://github.com/yahoo/serialize-javascript)
Therefore, yet another one incompatible format does not affect anything.

## Suggestions
* Serialized data should describe itself by meta (something like as regular file does: header + ext)
* Classes refs may be found by scanning `require.cache` inners or globals

## Status
🚧 Work in progress 🚧 / Experimental / Early preview / pre-alpha version / 0.0.0-draft

## Install
```shell script
yarn add @qiwi/serializer
```

## Usage
```typescript
import {serialize, deserialize} from '@qiwi/serializer'
import {A} from './A'

const a: A = new A()
const serialized: string = serialize(a)
const restored: A = deserialize(serialized)

console.log(restored instanceof A) // true
```

## Refs
* [https://stackoverflow.com/questions/9791925/list-of-currently-loaded-node-js-modules](https://stackoverflow.com/questions/9791925/list-of-currently-loaded-node-js-modules)
* [https://github.com/facebook/jest/issues/5120](https://github.com/facebook/jest/issues/5120)
* [https://github.com/facebook/jest/issues/5741](https://github.com/facebook/jest/issues/5741)
