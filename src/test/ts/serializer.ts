import {
  serializeValue,
  deserializeValue,
} from '../../main/ts'
import {A, A as SomeClass} from './stub/A'
import * as fs from 'fs'

describe('serializer', () => {
  describe('#serializeValue / #deserializeValue', () => {
    it('serializes regular object', () => {
      const target = {
        foo: 'bar',
        baz: {qux: 1},
      }
      const serialized = serializeValue(target)
      const restored = deserializeValue(serialized)

      expect(serialized).toEqual({
        type: 'object',
        properties: {
          foo: {
            type: 'string',
            value: 'bar',
          },
          baz: {
            type: 'object',
            properties: {
              qux: {
                type: 'number',
                value: 1,
              },
            },
          },
        },
      })
      expect(restored).toEqual(target)
    })

    it('serializes object with external refs', () => {
      const a = new A()
      a.fs = fs

      const target = {
        foo: 'bar',
        baz: {qux: 1},
        a,
        arr: [1, null],
        SomeClass,
      }
      const serialized = serializeValue(target)
      const serializedJson = JSON.stringify(serialized, null, 2)
      const restored = deserializeValue(JSON.parse(serializedJson))
      const cwd = process.cwd()

      expect(serialized).toEqual({
        type: 'object',
        properties: {
          foo: {
            type: 'string',
            value: 'bar',
          },
          baz: {
            type: 'object',
            properties: {
              qux: {
                type: 'number',
                value: 1,
              },
            },
          },
          a: {
            type: 'object',
            properties: {
              fs: {
                type: 'object',
                source: {
                  path: 'fs',
                  relation: 'reference',
                  type: 'module',
                },
              },
            },
            source: {
              path: `${cwd}/src/test/ts/stub/A.ts`,
              relation: 'proto',
              target: 'A',
              type: 'module',
            },
          },
          arr: {
            properties: {
              0: {
                type: 'number',
                value: 1,
              },
              1: {
                type: 'null',
                value: null,
              },
            },
            type: 'array',
          },
          SomeClass: {
            source: {
              path: `${cwd}/src/test/ts/stub/A.ts`,
              relation: 'reference',
              target: 'A',
              type: 'module',
            },
            type: 'function',
          },
        },
      })
      expect(restored).toEqual(target)
    })
  })
})
