# Tic Tac Toe

> import DEMO_CSS from '!!raw-loader!@site/src/examples/demo/tic-tac-toe/index.module.css'
import DEMO_TSX from '!!raw-loader!@site/src/examples/demo/tic-tac-toe/index.tsx'
import { SimpleWebPlayground } from '@site/src/components/live-playground'

# Tic Tac Toe

This is a game of tic-tac-toe that uses a class to manage the game logic instead of writing it all with React Hooks.

State managers are declared as read-only class properties and manage a very narrow scope of logic. React components that need to subscribe to state changes would only have to call the hook corresponding to the state manager class (in this case: `useSimpleStateValue`) with whichever class property of `GameInstance` that has the relevant logic.

<SimpleWebPlayground
  code={DEMO_TSX}
  css={DEMO_CSS}
  options={{
    editorHeight: 500,
    editorWidthPercentage: 50,
  }}
/>
