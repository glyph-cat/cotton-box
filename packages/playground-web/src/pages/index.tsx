import { ReactNode } from 'react'
import { IndexList } from '~components/index-list'
import { PageIndex } from '~constants'

function Home(): ReactNode {
  return (
    <IndexList
      data={PageIndex}
      parentHref='/examples'
    />
  )
}

export default Home
