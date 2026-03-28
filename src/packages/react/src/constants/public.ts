import { BuildType } from '@glyph-cat/foundation'

// NOTE: These variables will be not be available (`undefined`) until they
// have been bundled.

/**
 * {:TSDOC_DESC_BUILD_TYPE:}
 * @see -{:DOCS_API_MISC_URL:}/BUILD_TYPE
 * @public
 */
export const BUILD_TYPE = process.env.BUILD_TYPE as BuildType

/**
 * {:TSDOC_DESC_BUILD_HASH:}
 *
 * The build hash of this package is `{:PACKAGE_BUILD_HASH:}`.
 * @see -{:DOCS_API_MISC_URL:}/BUILD_HASH
 * @public
 */
export const BUILD_HASH = process.env.BUILD_HASH as string

/**
 * {:TSDOC_DESC_VERSION:}
 *
 * The version of this package is `{:PACKAGE_VERSION:}`.
 * @see -{:DOCS_API_MISC_URL:}/VERSION
 * @public
 */
export const VERSION = process.env.PACKAGE_VERSION as string
