import { useColorMode } from '@docusaurus/theme-common'
import type { WrapperProps } from '@docusaurus/types'
import Navbar from '@theme-original/Navbar'
import type NavbarType from '@theme/Navbar'
import React from 'react'

type Props = WrapperProps<typeof NavbarType>

export default function NavbarWrapper(props: Props): JSX.Element {
  const { colorMode } = useColorMode()
  return (
    <>
      <Navbar {...props} />
      <div style={{
        fontWeight: 600,
        padding: '5px 10px',
        position: 'sticky',
        textAlign: 'center',
        top: 60,
        zIndex: 1,
        ...(colorMode === 'light' ? {
          backgroundColor: '#ffeecc',
          color: '#aa804a',
        } : {
          backgroundColor: '#804a00',
          color: '#ffeecc',
        }),
      }}>
        NOTE: This library is still experimental and documentations might be incomplete.
      </div>
    </>
  )
}
