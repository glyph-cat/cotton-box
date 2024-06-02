import React from 'react'
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common'
import ColorModeToggle from '@theme/ColorModeToggle'
import type { Props } from '@theme/Navbar/ColorModeToggle'
import styles from './styles.module.css'

export default function NavbarColorModeToggle({
  className,
}: Props): JSX.Element | null {
  const navbarStyle = useThemeConfig().navbar.style
  const disabled = useThemeConfig().colorMode.disableSwitch
  const { colorMode, setColorMode } = useColorMode()

  if (disabled) {
    return null
  }

  // TODO: [Low priority] `useMediaQuery` to find out if system prefers dark theme (when set to `system`)

  // TODO: [Low priority] Dropdown menu
  // - System
  // - Light
  // - Dark

  return (
    <ColorModeToggle
      className={className}
      buttonClassName={
        navbarStyle === 'dark' ? styles.darkNavbarColorModeToggle : undefined
      }
      value={colorMode}
      onChange={setColorMode}
    />
  )
}
