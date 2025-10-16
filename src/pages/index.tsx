import { JSX } from 'react'
import { IndexList } from '~components/index-list'
import { PageIndex } from '~constants'

function Home(): JSX.Element {
  return (
    <IndexList
      data={PageIndex}
      parentHref='/examples'
    />
  )
}

export default Home
