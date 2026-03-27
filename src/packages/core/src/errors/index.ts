// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { SimpleFiniteStateManager } from '../api/SimpleFiniteStateManager'

import { Optional } from '@glyph-cat/foundation'

/**
 * {:TSDOC_DESC_INVALID_STATE_TRANSITION_ERROR:}
 * @public
 */
export class InvalidStateTransitionError extends Error {

  /**
   * @see -{:DOCS_API_CORE_URL:}/InvalidStateTransitionError
   * @param fromState - {:TSDOC_PARAM_DESC_FROM_STATE:}
   * @param toState - {:TSDOC_PARAM_DESC_TO_STATE:}
   * @param stateManagerName - {:TSDOC_DESC_OPTIONS_NAME:}
   */
  constructor(
    /**
     * {:TSDOC_PARAM_DESC_FROM_STATE:}
     */
    readonly fromState: unknown,
    /**
     * {:TSDOC_PARAM_DESC_TO_STATE:}
     */
    readonly toState: unknown,
    /**
     * {:TSDOC_DESC_OPTIONS_NAME:}
     */
    readonly stateManagerName?: Optional<string>
  ) {
    super(`Invalid state transition from "${String(fromState)}" to "${String(toState)}"${stateManagerName ? ` in ${stateManagerName}` : ''}`)
    this.name = 'InvalidStateTransitionError'
  }

}
