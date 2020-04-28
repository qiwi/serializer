import {once} from './util'
import {sync as getPkg} from 'read-pkg-up'
import {ISerializedMeta} from './interface'

export const getGeneratorVersion = once(() => {
  const pkgJson: any = getPkg()?.packageJson

  return `${pkgJson.name}@${pkgJson.version}`
})

export const getNodejsVersion = () => process.version

export const getMeta = (): ISerializedMeta => ({
  timestamp: Date.now(),
  generator: getGeneratorVersion(),
  nodejs: getNodejsVersion(),
})
