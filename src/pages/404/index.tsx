import { useRouter } from 'next/router'
import { useEffect } from 'react'

function PageNotFoundResolver(): JSX.Element {
  const { asPath, replace } = useRouter()
  useEffect(() => {
    if (/\/index\?tsx$/i.test(asPath)) {
      replace(asPath.replace('/index', ''), asPath)
    }
  }, [asPath, replace])
  return (
    <div style={{ display: 'grid', height: '90vh', placeItems: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>
        404 | Page not found
      </h1>
    </div>
  )
}

export default PageNotFoundResolver
