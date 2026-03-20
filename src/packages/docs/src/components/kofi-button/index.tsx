import { AnimatePresence, motion } from 'motion/react'
import { ReactNode, useCallback, useInsertionEffect, useState } from 'react'
import styles from './index.module.css'

const IFRAME_PADDING_TOP = 42 // px

export function KofiButton(): ReactNode {
  const [shouldShowPanel, setPanelVisibility] = useState(false)
  const showPanel = useCallback(() => { setPanelVisibility(true) }, [])
  const hidePanel = useCallback(() => { setPanelVisibility(false) }, [])
  useInsertionEffect(() => {
    // Docusaurus injects an inline `overflow: visible;` to the document body.
    console.log('shouldShowPanel', shouldShowPanel)
    if (shouldShowPanel) {
      document.body.classList.add(styles.noScroll)
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'visible'
        document.body.classList.remove(styles.noScroll)
      }
    }
  }, [shouldShowPanel])
  return (
    <>
      <button
        className={styles.button}
        onClick={showPanel}
      >
        <img
          height={36}
          style={{ border: 0, height: 36 }}
          src='https://storage.ko-fi.com/cdn/kofi5.png?v=6'
          alt='Buy Me a Coffee at ko-fi.com'
        />
      </button>
      <AnimatePresence initial={false}>
        {shouldShowPanel && (
          <div className={styles.popupContainer}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.underlay}
              onClick={hidePanel}
            />
            <motion.div
              className={styles.popupSheet}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
            >
              <div style={{
                display: 'grid',
                justifySelf: 'end',
                height: IFRAME_PADDING_TOP,
              }}>
                <button
                  className={styles.closeButton}
                  onClick={hidePanel}
                >×</button>
              </div>
              <iframe
                id='kofiframe'
                src='https://ko-fi.com/glyphcat/?hidefeed=true&widget=true&embed=true&preview=true'
                className={styles.iframe}
                height={712 + IFRAME_PADDING_TOP}
                title='glyphcat'
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
