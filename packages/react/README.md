<div align="center" style="text-align: center">

[![Banner](https://raw.githubusercontent.com/glyph-cat/cotton-box/main/assets/icon-with-text.svg)](https://github.com/glyph-cat/cotton-box)

*A flexible toolbox with different types of state managers catered to different scenarios.*

[![License](https://img.shields.io/github/license/glyph-cat/cotton-box)](https://github.com/glyph-cat/cotton-box/blob/main/LICENSE)
[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/glyph-cat/cotton-box)
[![Support me on Ko-fi](https://img.shields.io/static/v1?label&logo=kofi&logoColor=ffffff&message=Support%20me%20on%20Ko-fi&color=FF5E5B)](https://ko-fi.com/glyphcat)

<!-- See: https://github.com/microsoft/vscode/issues/128813#issuecomment-943125631 -->

</div>

<div style="background-color: #2b80ff20; border-inline-start: solid 5px #2b80ff; padding-inline-start: 10px; padding-block: 5px; margin-block: 20px">This is the official React bindings for cotton-box.</div>

| Packages           | Stats                                                                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cotton-box`       | [![Version](https://img.shields.io/npm/v/cotton-box.svg)](https://www.npmjs.com/package/cotton-box) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/cotton-box)             |
| `cotton-box-react` | [![Version](https://img.shields.io/npm/v/cotton-box-react.svg)](https://www.npmjs.com/package/cotton-box) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/cotton-box-react) |

<br/>

# Key Features
* Lightweight & fast
* Supports asynchronous set-state functions
* Declarative lifecycle management
* Official bindings for React is available

<br/>

# Documentation

[View documentations (still a work-in-progress)](https://glyph-cat.github.io/cotton-box)

<br/>

# Examples

## Plain Example

```js
import { StateManager } from 'cotton-box'

const CounterState = new StateManager(42)

// Set, get, reset
CounterState.set(7)
console.log(CounterState.get()) // 7
CounterState.reset()
console.log(CounterState.get()) // 42

// Watch for state changes
const unwatch = CounterState.watch((state) => {
  console.log(state)
})

// Wait for state to change
// Promise will resolve when value matches
await CounterState.wait(50)
```

## Example With React
```jsx
import { useStateValue } from 'cotton-box-react'

function App() {
  const counter = useStateValue(CounterState)
  return <h1>Counter: {counter}</h1>
}
```

<br/>

# Support This Project

* Ko-fi: [`ko-fi.com/glyphcat`](https://ko-fi.com/glyphcat)
* BTC: [`bc1q5qp6a972l8m0k26ln9deuhup0nmldf86ndu5we`](bitcoin:bc1q5qp6a972l8m0k26ln9deuhup0nmldf86ndu5we)
