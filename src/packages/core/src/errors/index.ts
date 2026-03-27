// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { SimpleFiniteStateManager } from '../api/SimpleFiniteStateManager'

import { Optional } from '@glyph-cat/foundation'

/**
 * This error is thrown by {@link SimpleFiniteStateManager} when calling `set`
 * if the state transition from previous state to new state is not in the
 * `allowedStateTransitions` parameter in the constructor.
 * @public
 */
export class InvalidStateTransitionError extends Error {

  /**
   * {:TSDOC_DESC_INVALID_STATE_TRANSITION_ERROR:}
   * @see -{:DOCS_API_CORE_URL:}/InvalidStateTransitionError
   * @param fromState - {:TSDOC_PARAM_DESC_FROM_STATE:}
   * @param toState - {:TSDOC_PARAM_DESC_TO_STATE:}
   * @param stateManagerName - {:TSDOC_DESC_OPTIONS_NAME:}
   */
  constructor(
    readonly fromState: unknown,
    readonly toState: unknown,
    readonly stateManagerName?: Optional<string>
  ) {
    super(`Invalid state transition from "${String(fromState)}" to "${String(toState)}"${stateManagerName ? ` in ${stateManagerName}` : ''}`)
    this.name = 'InvalidStateTransitionError'
  }

}
