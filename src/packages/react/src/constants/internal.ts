import { BuildType } from '@glyph-cat/foundation'
import { BUILD_TYPE } from './public'

export const $$INTERNALS = {} as const

// Referenced from '@glyph-cat/swiss-army-knife':
export const IS_CLIENT_ENV = BUILD_TYPE === BuildType.RN || typeof window !== 'undefined'
