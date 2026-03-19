import { AnimatePresence, motion } from 'motion/react'
import { ReactNode, useCallback, useState } from 'react'
import styles from './index.module.css'

export function KofiButton(): ReactNode {
  const [showPanel, setPanelVisibility] = useState(false)
  const hidePanel = useCallback(() => { setPanelVisibility(false) }, [])
  return (
    <>
      <button
        className={styles.button}
        onClick={useCallback(() => {
          setPanelVisibility(v => !v)
        }, [])}
      >
        <img
          height={36}
          style={{ border: 0, height: 36 }}
          src='https://storage.ko-fi.com/cdn/kofi5.png?v=6'
          alt='Buy Me a Coffee at ko-fi.com'
        />
      </button>
      <AnimatePresence initial={false}>
        {showPanel && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100vh',
              width: '100vw',
              placeItems: 'center',
              display: 'grid',
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                backgroundColor: '#00000080',
                backdropFilter: 'blur(2px)',
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100vw',
                placeItems: 'center',
                display: 'grid',
              }}
              onClick={hidePanel}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={{
                width: 500,
                maxWidth: '95vw',
                zIndex: 1,
              }}
            >
              <iframe
                id='kofiframe'
                src='https://ko-fi.com/glyphcat/?hidefeed=true&widget=true&embed=true&preview=true'
                style={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: 10,
                  border: 0,
                  padding: 4,
                  paddingTop: 50,
                  width: '100%',
                }}
                height='712'
                title='glyphcat'
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
