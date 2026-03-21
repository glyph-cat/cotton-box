import { Optional } from '@glyph-cat/foundation'

/**
 * @public
 */
export class InvalidStateTransitionError extends Error {

  /**
   * {:TSDOC_DESC_INVALID_STATE_TRANSITION_ERROR:}
   * @param fromState - {:TSDOC_PARAM_DESC_FROM_STATE:}
   * @param toState - {:TSDOC_PARAM_DESC_TO_STATE:}
   * @param stateManagerName - {:TSDOC_DESC_OPTIONS_NAME:}
   * @see -{:DOCS_API_CORE_URL:}/InvalidStateTransitionError
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
