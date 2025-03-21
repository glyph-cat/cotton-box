import useBaseUrl from '@docusaurus/useBaseUrl'
import CodeInline from '@theme/CodeInline'
import ThemedImage from '@theme/ThemedImage'
import styles from './index.module.css'

export function DevToolsPreview(): JSX.Element {
  return (
    <>
      <p>
        The screenshots below show how State Managers with different <CodeInline>visibility</CodeInline> values appear in the React Developer Tools.
      </p>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <span className={styles.label}>
            With <code>StateManagerVisibility.HIDDEN</code>:
          </span>
          <ThemedImage
            alt='Inspecting an exposed state in React Dev Tools'
            sources={{
              light: useBaseUrl('/img/react-dev-tools-exposed-light.png'),
              dark: useBaseUrl('/img/react-dev-tools-exposed-dark.png'),
            }}
          />
        </div>
        <div className={styles.imgContainer}>
          <span className={styles.label}>
            With <code>StateManagerVisibility.EXPOSED</code>:
          </span>
          <ThemedImage
            alt='Inspecting a hidden state in React Dev Tools'
            sources={{
              light: useBaseUrl('/img/react-dev-tools-hidden-light.png'),
              dark: useBaseUrl('/img/react-dev-tools-hidden-dark.png'),
            }}
          />
        </div>
      </div>
    </>
  )
}
