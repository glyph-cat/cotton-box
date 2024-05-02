import styles from './index.module.css'

export default function NoComponent(): JSX.Element {
  return (
    <div className={styles.label}>
      Open the web inspector and navigate to the console to see the outputs.
    </div>
  )
}
