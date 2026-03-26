# Stress Test

> import DEMO_REACT from '!!raw-loader!@site/src/examples/stress-test/react-built-in.tsx'
import DEMO_COTTON_BOX from '!!raw-loader!@site/src/examples/stress-test/cotton-box.tsx'
import DEMO_ZUSTAND from '!!raw-loader!@site/src/examples/stress-test/zustand.tsx'
import DEMO_REDUX from '!!raw-loader!@site/src/examples/stress-test/redux.tsx'
import { SimpleWebPlayground } from '@site/src/components/live-playground'

# Stress Test

The sandboxes below show how many operations per second each library is capable of.

How the test is conducted:
1. While `performance.now() - startTime` is less than 1 second, keep running.
2. After loop has completed calculate, `performance.now() - startTime` again. This is because it is not guaranteed that loops will stop immediately after one second.
3. Operations per second = total operations recorded ÷ total run time × 1000 milliseconds

Upon clicking "Start", the sandbox will try to invoke as many set-state calls as possible for 1 second.

## React (built-in state)

<SimpleWebPlayground
  code={DEMO_REACT}
  options={{
    editorHeight: 500,
    editorWidthPercentage: 50,
  }}
  disableInfiniteLoopProtection
/>

# Cotton Box

<SimpleWebPlayground
  code={DEMO_COTTON_BOX}
  options={{
    editorHeight: 500,
    editorWidthPercentage: 50,
  }}
  disableInfiniteLoopProtection
/>

# Zustand

<SimpleWebPlayground
  code={DEMO_ZUSTAND}
  options={{
    editorHeight: 500,
    editorWidthPercentage: 50,
  }}
  disableInfiniteLoopProtection
/>

# Redux

<SimpleWebPlayground
  code={DEMO_REDUX}
  options={{
    editorHeight: 500,
    editorWidthPercentage: 50,
  }}
  disableInfiniteLoopProtection
/>
