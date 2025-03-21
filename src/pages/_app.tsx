import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { JSX, useCallback } from 'react'
import '../styles/globals.css'

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
  const { asPath, pathname, query } = useRouter()
  const firstQueryKey = Object.keys(query)[0]
  // This is an assumption because we are not using query for anything else
  const openInEditor = useCallback(async () => {
    await fetch(`/api/open-in-editor?p=${encodeURI(asPath.replace(/\?tsx?$/i, ''))}&e=${firstQueryKey}`)
  }, [asPath, firstQueryKey])
  if (pathname === '/') { return null } // Early exit
  return (
    <div style={{ marginBottom: 10 }}>
      <Link href='/'>{'[Home]'}</Link>
      {' '}
      <span className='a' onClick={openInEditor}>{'[Open in editor]'}</span>
    </div>
  )
}
