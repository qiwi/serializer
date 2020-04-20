import {ISerialized, ISerializedMeta, type} from './interface'
import {sync as getPkg} from 'read-pkg-up'

export const getGeneratorVersion = () => {
  const pkgJson: any = getPkg()?.packageJson

  return `${pkgJson.name}@${pkgJson.version}`
}

export const serialize = (target: any): ISerialized => {
  const meta: ISerializedMeta = {
    generator: getGeneratorVersion(),
    schema: {
      type: 'string'
    }
  }
  const value = JSON.parse(JSON.stringify(target))

  return {
    type,
    value,
    meta,
  }
}
