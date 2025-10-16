import '../styles/globals.css'

import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useRouter } from 'next/router'
import QS from 'query-string'
import { JSX, useCallback } from 'react'
import { SandboxUrlParam } from '~constants'

export default function App({
  Component,
  pageProps,
}: AppProps): JSX.Element {
  return (
    <div style={{
      display: 'grid',
      padding: 20,
    }}>
      <UtilArea />
      <div style={{ margin: 10 }}>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

function UtilArea(): JSX.Element {
  const { pathname } = useRouter()
  const openInEditor = useCallback(async () => {
    await fetch(QS.stringifyUrl({
      url: '/api/open-in-editor',
      query: {
        [SandboxUrlParam.PATHNAME]: pathname,
      },
    }))
  }, [pathname])
  if (pathname === '/') { return null } // Early exit
  return (
    <div style={{ marginBottom: 10 }}>
      <Link href='/'>{'[Home]'}</Link>
      {' '}
      <span className='a' onClick={openInEditor}>{'[Open in editor]'}</span>
    </div>
  )
}
