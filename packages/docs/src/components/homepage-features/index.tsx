import Heading from '@theme/Heading'
import clsx from 'clsx'
import styles from './styles.module.css'

interface FeatureItem {
  title: string
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: JSX.Element
}

// TODO [High priority] build content from README.md
// - Lightweight & fast
// - Supports asynchronous set-state functions
// - Declarative lifecycle management
// - Official bindings for React is available
const features: Array<FeatureItem> = [
  {
    title: '...',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Lorem ipsum dolor sit amet.
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
