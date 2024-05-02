import { isObject } from '../../internals/type-checker'

/**
 * {:TSDOC_DESC_EQUALITY:}
 * @see -{:DOCS_API_CORE_URL:}/Equality
 * @public
 */
export const Equality = {
  /**
   * {:TSDOC_DESC_EQUALITY_SHALLOW_COMPARE_ARRAY:}
   * @param previousState - {:COMMON_DESC_CURRENT_STATE:}
   * @param nextState - {:COMMON_DESC_NEXT_STATE:}
   * @see -{:DOCS_API_CORE_URL:}/Equality#shallowCompareArray
   * @returns -{:RETURN_DESC_SHALLOW_COMPARE_ARRAY:}
   */
  shallowCompareArray: (
    previousState: Array<any> | any,
    nextState: Array<any> | any,
  ): boolean => {

    if (Array.isArray(previousState) && Array.isArray(nextState)) {

      if (previousState.length !== nextState.length) {
        return false // Early exit
      }

      for (let i = 0; i < previousState.length; i++) {
        if (!Object.is(previousState[i], nextState[i])) {
          return false // Early exit
        }
      }

      return true

    } else {
      return Object.is(previousState, nextState) // Fallback
    }

  },

  /**
   * {:TSDOC_DESC_EQUALITY_SHALLOW_COMPARE_ARRAY_OR_OBJECT:}
   * @param previousState - {:COMMON_DESC_CURRENT_STATE:}
   * @param nextState - {:COMMON_DESC_NEXT_STATE:}
   * @see -{:DOCS_API_CORE_URL:}/Equality#shallowCompareArrayOrObject
   * @returns -{:RETURN_DESC_SHALLOW_COMPARE_ARRAY_OR_OBJECT:}
   */
  shallowCompareArrayOrObject: (
    previousState: Array<any> | any,
    nextState: Array<any> | any,
  ): boolean => {

    const previousStateIsArray = Array.isArray(previousState)
    const nextStateIsArray = Array.isArray(nextState)
    if (previousStateIsArray !== nextStateIsArray) {
      return false // Early exit
    }
    if (previousStateIsArray && nextStateIsArray) {
      return Equality.shallowCompareArray(previousState, nextState) // Early exit
    }

    // Eventually will fallback to `Object.is` if not both are objects
    return Equality.shallowCompareObject(previousState, nextState) // Early exit

  },

  /**
   * {:TSDOC_DESC_EQUALITY_SHALLOW_COMPARE_OBJECT:}
   * @param previousState - {:COMMON_DESC_CURRENT_STATE:}
   * @param nextState - {:COMMON_DESC_NEXT_STATE:}
   * @see -{:DOCS_API_CORE_URL:}/Equality#shallowCompareObject
   * @returns -{:RETURN_DESC_SHALLOW_COMPARE_OBJECT:}
   */
  shallowCompareObject: (
    previousState: any,
    nextState: any,
  ): boolean => {

    if (isObject(previousState) && isObject(nextState)) {

      const previousStateKeys = Object.keys(previousState)
      const nextStateKeys = Object.keys(nextState)

      if (previousStateKeys.length !== nextStateKeys.length) {
        return false // Early exit
      }

      // NOTE: We probably don't need this, if position of the key-value pairs
      // change without the actual keys or values changing, we should still
      // treat it as 'not equal'.
      // const allKeys = [...new Set([...previousStateKeys, ...nextStateKeys])]

      for (let i = 0; i < previousStateKeys.length; i++) {
        const previousStateKey = previousStateKeys[i]
        const nextStateKey = nextStateKeys[i]
        if (previousStateKey !== nextStateKey) {
          return false // Early exit
        }
        if (!Object.is(previousState[previousStateKey], nextState[nextStateKey])) {
          return false // Early exit
        }
      }

      return true

    } else {
      return Object.is(previousState, nextState) // Fallback
    }

  },

  /**
   * {:TSDOC_DESC_EQUALITY_STRINGIFY_COMPARE:}
   * @param previousState - {:COMMON_DESC_CURRENT_STATE:}
   * @param nextState - {:COMMON_DESC_NEXT_STATE:}
   * @see -{:DOCS_API_CORE_URL:}/Equality#stringifyCompare
   * @returns -{:RETURN_DESC_STRINGIFY_COMPARE:}
   */
  stringifyCompare: (
    previousState: any,
    nextState: any,
  ): boolean => {
    return JSON.stringify(previousState) === JSON.stringify(nextState)
  },

} as const
