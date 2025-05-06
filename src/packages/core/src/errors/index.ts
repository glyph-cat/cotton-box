/**
 * @public
 */
export class InvalidStateTransitionError extends Error {

  /**
   * {:TSDOC_DESC_INVALID_STATE_TRANSITION_ERROR:}
   * @param fromState - {:TSDOC_PARAM_DESC_FROM_STATE:}
   * @param toState - {:TSDOC_PARAM_DESC_TO_STATE:}
   * @param stateManager - {:TSDOC_DESC_OPTIONS_NAME:}
   * @see -{:DOCS_API_CORE_URL:}/InvalidStateTransitionError
   */
  constructor(
    readonly fromState: string,
    readonly toState: string,
    readonly stateManager?: string
  ) {
    super(`from "${fromState}" to "${toState}" in ${stateManager ?? 'unnamed state'}`)
    this.name = 'InvalidStateTransitionError'
  }

}
