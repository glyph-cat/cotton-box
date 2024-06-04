import { ColorMode, useColorMode } from '@docusaurus/theme-common'
import { SiteSettingsState, UIAppearance } from '@site/src/services/site-settings'
import { isFunction } from '@site/src/utils/type-check'
import { useStateValue } from 'cotton-box-react'
import { useEffect, useLayoutEffect, useReducer, useState } from 'react'

const forceUpdateReducer = (c: number): number => c + 1

const IS_MEDIA_QUERY_SUPPORTED = typeof window !== 'undefined' &&
  typeof window.matchMedia !== 'undefined'

export function useMediaQuery(query: string): boolean {
  const [, forceUpdate] = useReducer(forceUpdateReducer, 0)
  const [mediaQuery] = useState(() => {
    return IS_MEDIA_QUERY_SUPPORTED
      ? window.matchMedia(query)
      : null
  })
  useLayoutEffect(() => {
    // The ref value `mq.current will likely have changed by the time this
    // effect's cleanup function runs. So a copy by value is made inside this
    // effect.
    if (IS_MEDIA_QUERY_SUPPORTED) {
      if (isFunction(mediaQuery.addEventListener)) {
        // New API
        mediaQuery.addEventListener('change', forceUpdate)
        return () => { mediaQuery.removeEventListener('change', forceUpdate) }
      } else if (isFunction(mediaQuery.addListener)) {
        // Deprecated API (fallback for old systems)
        mediaQuery.addListener(forceUpdate)
        return () => { mediaQuery.removeListener(forceUpdate) }
      }
    }
  }, [forceUpdate, mediaQuery])
  return IS_MEDIA_QUERY_SUPPORTED ? mediaQuery.matches || false : false
}

export function useDerivedColorMode(): ColorMode {
  const { appearance: appearanceConfig } = useStateValue(SiteSettingsState)
  const systemPrefersDarkColorScheme = useMediaQuery('(prefers-color-scheme: dark)')
  if (appearanceConfig === UIAppearance.AUTO) {
    return systemPrefersDarkColorScheme ? 'dark' : 'light'
  } else {
    return appearanceConfig === UIAppearance.LIGHT ? 'light' : 'dark'
  }
}

export function ThemeInterception(): JSX.Element {
  const { colorMode: currentColorMode, setColorMode } = useColorMode()
  const derivedColorMode = useDerivedColorMode()
  useEffect(() => {
    console.log('derivedColorMode', derivedColorMode)
    console.log('currentColorMode', currentColorMode)
    if (derivedColorMode !== currentColorMode) {
      setColorMode(derivedColorMode)
    }
  }, [currentColorMode, derivedColorMode, setColorMode])
  return null
}
