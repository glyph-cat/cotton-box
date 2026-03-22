import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { Link } from '@site/src/components/custom-link'
import { HomepageFeatures } from '@site/src/components/homepage-features'
import Heading from '@theme/Heading'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { SimpleWebPlayground } from '../components/live-playground'
import styles from './index.module.css'

import DEMO_CSS from '!!raw-loader!@site/src/examples/demo/tic-tac-toe/index.module.css'
import DEMO_TSX from '!!raw-loader!@site/src/examples/demo/tic-tac-toe/index.tsx'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className='container' style={{ color: '#000000' }}>
        <Heading
          as='h1'
          className='hero__title'
          style={{
            fontFamily: 'Work Sans',
            fontSize: '4rem',
            fontWeight: '300',
          }}
        >
          {siteConfig.title}
        </Heading>
        <p
          className='hero__subtitle'
          style={{
            fontFamily: 'Work Sans',
            letterSpacing: '-0.05rem',
          }}
        >
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className='button button--secondary button--lg'
            href='/cotton-box/docs/learn/tutorial/setup'
            style={{
              fontFamily: 'Work Sans',
              fontWeight: '500',
            }}
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout description={siteConfig.tagline}>

      <HomepageHeader />

      <main>
        <HomepageFeatures />
      </main>

      <Heading
        as='h2'
        style={{
          fontFamily: 'Work Sans',
          fontSize: '24pt',
          fontWeight: 400,
          marginTop: '1rem',
          opacity: 0.65,
          textAlign: 'center',
        }}>
        {'Demo'}
      </Heading>

      <div style={{
        display: 'grid',
        gap: 40,
        placeItems: 'center',
      }}>
        <div style={{
          display: 'grid',
          maxWidth: 1000,
          width: '100%',
        }}>
          <SimpleWebPlayground
            code={DEMO_TSX}
            css={DEMO_CSS as unknown as string}
            options={{
              editorHeight: 500,
              editorWidthPercentage: 55,
            }}
          />
        </div>
        <Link
          href='/cotton-box/docs/demo/advanced/tic-tac-toe'
          style={{ fontSize: '16pt' }}
        >
          {'Explore more examples →'}
        </Link>
      </div>

      <div style={{ height: 100 }} />

    </Layout>
  )
}
