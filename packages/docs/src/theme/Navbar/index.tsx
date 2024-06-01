import React from 'react'
import Navbar from '@theme-original/Navbar'
import type NavbarType from '@theme/Navbar'
import type { WrapperProps } from '@docusaurus/types'

type Props = WrapperProps<typeof NavbarType>

export default function NavbarWrapper(props: Props): JSX.Element {
  return (
    <>
      <Navbar {...props} />
      <div style={{
        backgroundColor: '#ffeecc',
        color: '#aa804a',
        fontWeight: 600,
        padding: '5px 10px',
        position: 'sticky',
        textAlign: 'center',
        top: 60,
        zIndex: 1,
      }}>
        NOTE: This library is still experimental and documentations might be incomplete.
      </div>
    </>
  )
}
