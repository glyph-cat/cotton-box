/**
 * @public
 */
export class InvalidStateTransitionError extends Error {

  constructor(fromState: string, toState: string, stateName?: string) {
    super(`Invalid state transition from "${fromState}" to "${toState}" ${stateName ? `in ${stateName}` : ''}`)
  }

}

// TODO: docs
