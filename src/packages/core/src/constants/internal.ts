import { CommitStrategy } from '../abstractions'
import { BUILD_TYPE } from './public'

export const COMMIT_STRATEGY_COMMIT: CommitStrategy = 'commit'

export const COMMIT_STRATEGY_COMMIT_NOOP: CommitStrategy = 'commitNoop'

/**
 * Because terser could not statically determine the value of `BuildType.RN`,
 */
export const IS_RN_BUILD = BUILD_TYPE === 'RN'
