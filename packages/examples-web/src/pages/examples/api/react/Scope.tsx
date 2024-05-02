import { SimpleStateManager } from 'cotton-box'
import { StateManagerScopeProvider, useScoped, useSimpleStateValue } from 'cotton-box-react'
import { useEffect, useState } from 'react'

enum Color {
  BLUE = '#2b80ff',
  PINK = '#ff2b80',
}

const GlobalThemeState = new SimpleStateManager(Color.BLUE)

export default function App(): JSX.Element {

  const [
    dynamicallyCreatedThemeState,
    setDynamicallyCreatedThemeState,
  ] = useState<SimpleStateManager<Color>>(null)
  useEffect(() => {
    const $dynamicallyCreatedThemeState = new SimpleStateManager(Color.PINK, {
      scope: GlobalThemeState,
    })
    setDynamicallyCreatedThemeState($dynamicallyCreatedThemeState)
    return () => { $dynamicallyCreatedThemeState.dispose() }
  }, [])

  return (
    <div>
      <ChildComponent />
      {dynamicallyCreatedThemeState && (
        <div style={{ border: 'solid 1px #808080' }}>
          <span style={{ padding: 10 }}>Scoped:</span>
          <StateManagerScopeProvider with={[dynamicallyCreatedThemeState]}>
            <ChildComponent />
          </StateManagerScopeProvider>
        </div>
      )}
    </div>
  )
}

function ChildComponent(): JSX.Element {
  const theme = useSimpleStateValue(useScoped(GlobalThemeState))
  const tileSize = 28 // px
  return (
    <div style={{
      alignItems: 'center',
      padding: 10,
      display: 'grid',
      gap: 10,
      gridTemplateColumns: 'auto 1fr',
    }}>
      <div style={{
        backgroundColor: theme,
        border: 'solid 1px #808080',
        height: tileSize,
        outline: 'solid 1px #ffffff',
        width: tileSize,
      }} />
      <code>{theme}</code>
    </div>
  )
}
