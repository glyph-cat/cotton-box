/* eslint-disable no-restricted-imports */
import UNBUNDLED_CORE_LIB from '../../core'
import BUNDLED_CORE_LIB from 'cotton-box'

// KIV: [low priority]
// Purpose: To allow unbundled code from this package to be tested with the unbundled core package
// For now, we have problems with using types and interfaces if we proceed as-is.
// Also enable rule in `.eslintrc.js` if/when this can actually work.

const LIB_TO_EXPORT = process.env.IS_INTERNAL_DEBUG_ENV === 'false'
  ? UNBUNDLED_CORE_LIB
  : BUNDLED_CORE_LIB
export default LIB_TO_EXPORT
