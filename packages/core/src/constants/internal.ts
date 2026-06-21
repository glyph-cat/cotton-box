import { CommitStrategy, StateChangeEvent } from '../abstractions'
import { BUILD_TYPE } from './public'

export const COMMIT_STRATEGY_COMMIT: CommitStrategy = 'commit'

export const COMMIT_STRATEGY_COMMIT_NOOP: CommitStrategy = 'commitNoop'

/**
 * Because terser could not statically determine the value of `BuildType.RN`,
 */
export const IS_RN_BUILD = BUILD_TYPE === 'RN'

export const STATE_CHANGE_SET_EVENT: StateChangeEvent = 1

export const STATE_CHANGE_RESET_EVENT: StateChangeEvent = 2

export const STATE_CHANGE_INIT_EVENT: StateChangeEvent = 3
