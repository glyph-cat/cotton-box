import Heading from '@theme/Heading'
import clsx from 'clsx'
import styles from './styles.module.css'

interface FeatureItem {
  title: string
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: JSX.Element
}

const features: Array<FeatureItem> = [
  {
    title: 'Easy to Use',
    // TODO
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Lightweight and Fast',
    // TODO
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Compatible with React',
    // TODO
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
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
