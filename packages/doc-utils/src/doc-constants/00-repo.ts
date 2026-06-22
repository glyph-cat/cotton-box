export const DISPLAY_PACKAGE_NAME = 'Cotton Box'
export const CORE_PACKAGE_NAME = 'cotton-box'
export const REACT_PACKAGE_NAME = `${CORE_PACKAGE_NAME}-react`
export const GLYPH_CAT_GITHUB_IO = 'https://glyph-cat.github.io'

export const GITHUB_REPO_URL = `https://github.com/glyph-cat/${CORE_PACKAGE_NAME}`
export const PACKAGE_DESCRIPTION = 'Minimal state management library for React and beyond.' // TODO: [Low priority] Should we get this from root package.json?

export const DOCS_SITE_URL = process.env.NODE_ENV === 'development'
  ? `http://localhost:3000/${CORE_PACKAGE_NAME}`
  : `${GLYPH_CAT_GITHUB_IO}/${CORE_PACKAGE_NAME}`
export const DOCS_API_DOCS_URL = `${DOCS_SITE_URL}/docs`
export const DOCS_LEARN_URL = `${DOCS_API_DOCS_URL}/learn`
export const DOCS_API_URL = `${DOCS_API_DOCS_URL}/api`
export const DOCS_API_CORE_URL = `${DOCS_API_URL}/core`
export const DOCS_API_REACT_URL = `${DOCS_API_URL}/react`
export const DOCS_API_MISC_URL = `${DOCS_API_URL}/misc`
