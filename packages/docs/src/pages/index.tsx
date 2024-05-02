import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { Link } from '@site/src/components/custom-link'
import { HomepageFeatures } from '@site/src/components/homepage-features'
import Heading from '@theme/Heading'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import { SimpleWebPlayground } from '../components/live-playground'
import styles from './index.module.css'

// @ts-expect-error as this is an import from raw loader
import DEMO_TSX from '!!raw-loader!@site/src/examples/demo/notes-app/index.tsx'
import DEMO_CSS from '!!raw-loader!@site/src/examples/demo/notes-app/index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className='container'>
        <Heading as='h1' className='hero__title'>
          {siteConfig.title}
        </Heading>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className='button button--secondary button--lg'
            href='cotton-box/docs/learn/tutorial/setup'>
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <h2 style={{ marginTop: 20, textAlign: 'center' }}>
        {'Quick Demo'}
      </h2>
      <SimpleWebPlayground
        code={DEMO_TSX}
        css={DEMO_CSS as unknown as string}
        options={{
          editorHeight: 500,
          editorWidthPercentage: 50,
        }}
      />
    </Layout>
  )
}
