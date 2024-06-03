/* eslint-disable @typescript-eslint/no-var-requires */
import { useColorMode } from '@docusaurus/theme-common'
import { ThemeInterception } from '@site/src/hooks/theming'
import { SiteSettingsState, UIAppearance } from '@site/src/services/site-settings'
import { useStateValue } from 'cotton-box-react'
import { JSX, useCallback, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'

const AppearanceIcon = require('@site/static/img/brightness_4.svg').default
const CheckIcon = require('@site/static/img/check.svg').default

const setToAuto = () => {
  SiteSettingsState.set((prevState) => ({
    ...prevState,
    appearance: UIAppearance.AUTO,
  }))
}

const setToLight = () => {
  SiteSettingsState.set((prevState) => ({
    ...prevState,
    appearance: UIAppearance.LIGHT,
  }))
}

const setToDark = () => {
  SiteSettingsState.set((prevState) => ({
    ...prevState,
    appearance: UIAppearance.DARK,
  }))
}

function pointerIsInBound(event: MouseEvent, div: HTMLDivElement): boolean {
  const { top, left, height, width } = div.getBoundingClientRect()
  return (
    event.clientX >= left &&
    event.clientX <= left + width &&
    event.clientY >= top &&
    event.clientY <= top + height
  )
}

export default function NavbarColorModeToggle(): JSX.Element {
  const { colorMode } = useColorMode()
  const { appearance } = useStateValue(SiteSettingsState)
  const [showMenu, setMenuVisibility] = useState(false)
  const toggleMenuVisibility = useCallback(() => {
    setMenuVisibility(v => !v)
  }, [])
  const iconColor = colorMode === 'light' ? '#000000' : '#ffffff'

  const buttonRef = useRef<HTMLDivElement>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // Click-away handling
    if (!showMenu) { return }
    const onClick = (event: MouseEvent) => {
      if (pointerIsInBound(event, buttonRef.current)) { return }
      if (!pointerIsInBound(event, menuContainerRef.current)) {
        setMenuVisibility(false)
      }
    }
    window.addEventListener('click', onClick)
    return () => { window.removeEventListener('click', onClick) }
  }, [showMenu])

  return (
    <>
      <div
        ref={buttonRef}
        className={styles.colorModeButton}
        onClick={toggleMenuVisibility}
      >
        <AppearanceIcon fill={iconColor} />
      </div>
      {showMenu && (
        <div ref={menuContainerRef} className={styles.menuContainer}>
          <div className={styles.menuItem} onClick={setToAuto}>
            <div
              className={styles.checkIconContainer}
              style={appearance !== UIAppearance.AUTO ? { opacity: 0 } : {}}
            >
              <CheckIcon fill={iconColor} />
            </div>
            {'System'}
          </div>
          <div className={styles.menuItem} onClick={setToLight}>
            <div
              className={styles.checkIconContainer}
              style={appearance !== UIAppearance.LIGHT ? { opacity: 0 } : {}}
            >
              <CheckIcon fill={iconColor} />
            </div>
            {'Light'}
          </div>
          <div className={styles.menuItem} onClick={setToDark}>
            <div
              className={styles.checkIconContainer}
              style={appearance !== UIAppearance.DARK ? { opacity: 0 } : {}}
            >
              <CheckIcon fill={iconColor} />
            </div>
            {'Dark'}
          </div>
        </div>
      )}
      <ThemeInterception />
    </>
  )
}
