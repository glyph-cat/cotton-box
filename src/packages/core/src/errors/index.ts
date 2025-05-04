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
  constructor(fromState: string, toState: string, stateManagerName?: string) {
    super(`from "${fromState}" to "${toState}" in ${stateManagerName ?? 'unnamed state'}`)
    this.name = 'InvalidStateTransitionError'
  }

}
