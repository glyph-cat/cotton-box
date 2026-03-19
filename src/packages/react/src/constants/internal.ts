import { BUILD_TYPE } from './public'

export const $$INTERNALS = {} as const

/**
 * Because terser could not statically determine the value of `BuildType.RN`,
 */
export const IS_RN_BUILD = BUILD_TYPE === 'RN'

/**
 * Referenced from '@glyph-cat/swiss-army-knife':
 */
export const IS_CLIENT_ENV = IS_RN_BUILD || typeof window !== 'undefined'
