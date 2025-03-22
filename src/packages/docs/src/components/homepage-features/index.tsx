/* eslint-disable @typescript-eslint/no-var-requires */
import Heading from '@theme/Heading'
import clsx from 'clsx'
import { JSX } from 'react'
import styles from './styles.module.css'

interface FeatureItem {
  title: string
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: JSX.Element
}

const features: Array<FeatureItem> = [
  {
    title: 'Lightweight & fast',
    Svg: require('@site/static/img/electric_bolt.svg').default,
    description: (
      <>
        Suitable for various projects. From simple PWAs to complex applications and even time-critical games.
      </>
    ),
  },
  {
    title: 'Declarative lifecycle management',
    Svg: require('@site/static/img/cycle.svg').default,
    description: (
      <>
        Persist and retrieve data with lifecycle hooks such as <code>init</code>, <code>didSet</code> & <code>didReset</code>.
      </>
    ),
  },
  {
    title: 'Supports async set-state functions',
    Svg: require('@site/static/img/acute.svg').default,
    description: (
      <>
        An escape hatch for when you need to set state in conjunction with complicated data-fetching logic.
      </>
    ),
  },
]

function Feature({
  title,
  Svg,
  description,
}: FeatureItem): JSX.Element {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <Svg className={styles.featureSvg} role='img' />
      </div>
      <div className='text--center padding-horiz--md'>
        <Heading as='h3'>{title}</Heading>
        <p style={{ opacity: 0.65 }}>{description}</p>
      </div>
    </div>
  )
}

export function HomepageFeatures(): JSX.Element {
  const renderStack = []
  for (let i = 0; i < features.length; i++) {
    renderStack.push(<Feature key={i} {...features[i]} />)
  }
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {renderStack}
        </div>
      </div>
    </section>
  )
}
