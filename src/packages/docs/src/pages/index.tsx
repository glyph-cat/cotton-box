import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { Link } from '@site/src/components/custom-link'
import { HomepageFeatures } from '@site/src/components/homepage-features'
import particleOptions from '@site/src/constants/particles.json'
import Heading from '@theme/Heading'
import Layout from '@theme/Layout'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import clsx from 'clsx'
import { ReactNode, useCallback, useEffect, useReducer, useState } from 'react'
import { SimpleWebPlayground } from '../components/live-playground'
import styles from './index.module.css'

import DEMO_CSS from '!!raw-loader!@site/src/examples/demo/tic-tac-toe/index.module.css'
import DEMO_TSX from '!!raw-loader!@site/src/examples/demo/tic-tac-toe/index.tsx'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  const [areParticlesInitialized, onParticlesInitialized] = useReducer(() => true, false)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      onParticlesInitialized()
    }).catch((e) => {
      console.error(e)
    })
  }, [])

  const [areParticlesLoaded, onParticlesLoaded] = useReducer(() => true, false)
  const onParticlesLoadedAsync = useCallback(async () => onParticlesLoaded(), [])

  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={{ margin: 0, padding: 0 }}
    >
      {areParticlesInitialized && (
        <div style={{
          opacity: areParticlesLoaded ? 1 : 0,
          transitionDuration: '3s',
        }}>
          <Particles
            id='tsparticles'
            particlesLoaded={onParticlesLoadedAsync}
            options={particleOptions}
          />
        </div>
      )}
      <div className={styles.heroContent}>
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

      <div className={styles.demoContainer}>
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
        <div style={{
          display: 'grid',
          height: 100,
          placeItems: 'center',
        }}>
          <Link
            href='/cotton-box/docs/demo/advanced/tic-tac-toe'
            style={{ fontSize: '16pt' }}
          >
            {'Explore more examples →'}
          </Link>
        </div>
      </div>

    </Layout>
  )
}
