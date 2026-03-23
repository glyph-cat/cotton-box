/* eslint-disable @typescript-eslint/no-var-requires */
import Heading from '@theme/Heading'
import { ReactNode } from 'react'
import styles from './index.module.css'

export function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.featuresSection}>
      <Heading as='h2' className={styles.featuresTitle}>
        {'Features'}
      </Heading>
      <div className={styles.featuresContainer}>
        {features.map(({ title, description, Svg }, featureIndex) => (
          <div
            className={styles.featureItemContainer}
            style={{ animationDelay: `${featureIndex * 15}ms` }}
          >
            <Svg className={styles.featureSvg} role='img' />
            <Heading as='h3' className={styles.featureTitle}>
              {title}
            </Heading>
            <div />
            <p className={styles.featureDescription}>
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}


interface FeatureItem {
  title: string
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: ReactNode
}

const features: Array<FeatureItem> = [
  {
    title: 'Lightweight & Fast',
    Svg: require('@site/static/img/symbols/electric_bolt.svg').default,
    description: (
      <>
        Works for simple PWAs, complex applications, and even time-critical games.
      </>
    ),
  },
  {
    title: 'No Providers or Boilerplate',
    Svg: require('@site/static/img/symbols/skillet.svg').default,
    description: (
      <>
        Share states across different React render trees without providers or tedious setups.
      </>
    ),
  },
  {
    title: 'Customizable Equality Checking',
    Svg: require('@site/static/img/symbols/compare_arrows.svg').default,
    description: (
      <>
        Minimize unnecessary re-renders even when selector returns new object on each render.
      </>
    ),
  },

  {
    title: 'Declarative Lifecycle Management',
    Svg: require('@site/static/img/symbols/cycle.svg').default,
    description: (
      <>
        Persist state with <code>init</code>, <code>didSet</code>, and <code>didReset</code> lifecycle hooks.
      </>
    ),
  },
  {
    title: 'Works With and Without React',
    Svg: require('@site/static/img/react-logo.svg').default,
    description: (
      <>
        React bindings exists as a separate package but still, with first-class integration.
      </>
    ),
  },
  {
    title: 'Private State Values',
    Svg: require('@site/static/img/symbols/visibility_off.svg').default,
    description: (
      <>
        Hide sensitive information from React Developer Tools. No middleware required.
      </>
    ),
  },
  {
    title: 'Temporarily Unwatch State in Hooks',
    Svg: require('@site/static/img/symbols/pause_circle.svg').default,
    description: (
      <>
        Prevent components from re-rendering by temporarily unsubscribing from state changes.
      </>
    ),
  },
  {
    title: 'Async State Updates',
    Svg: require('@site/static/img/symbols/acute.svg').default,
    description: (
      <>
        For unique cases that really require it.
      </>
    ),
  },
]
