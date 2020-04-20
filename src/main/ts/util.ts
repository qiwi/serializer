import * as CORE_MODULES from 'builtin-modules'

export const getCoreModulesList = () => CORE_MODULES

export const getRegularModulesList = (): any => Object.keys(require.cache)

export const getModulesList = () => [...getCoreModulesList(), ...getRegularModulesList()]
