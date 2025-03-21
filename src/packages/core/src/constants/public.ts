/**
 * {:TSDOC_DESC_ENUM_BUILD_TYPE:}
 * @see -{:DOCS_API_MISC_URL:}/BuildType
 * @public
 */
export enum BuildType {
  /**
   * {:TSDOC_DESC_ENUM_BUILD_TYPE_CJS:}
   */
  CJS = 'CJS',
  /**
   * {:TSDOC_DESC_ENUM_BUILD_TYPE_ES:}
   */
  ES = 'ES',
  /**
   * {:TSDOC_DESC_ENUM_BUILD_TYPE_MJS:}
   */
  MJS = 'MJS',
  /**
   * {:TSDOC_DESC_ENUM_BUILD_TYPE_UMD:}
   */
  UMD = 'UMD',
  /**
   * {:TSDOC_DESC_ENUM_BUILD_TYPE_UMD_MIN:}
   */
  UMD_MIN = 'UMD_MIN',
}

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
 * @see -{:DOCS_API_MISC_URL:}/BUILD_HASH
 * @public
 */
export const BUILD_HASH = process.env.BUILD_HASH as string

/**
 * {:TSDOC_DESC_VERSION:}
 * @see -{:DOCS_API_MISC_URL:}/VERSION
 * @public
 */
export const VERSION = process.env.PACKAGE_VERSION as string
