<div align="center" style="text-align: center">

[![Banner](https://raw.githubusercontent.com/glyph-cat/cotton-box/main/assets/icon-with-text.svg)](https://github.com/glyph-cat/cotton-box)

*Minimal state management for React and beyond.*

[![Read The Docs](https://img.shields.io/badge/-📖_Read_The_Docs-blue)](https://glyph-cat.github.io/cotton-box)
[![License](https://img.shields.io/github/license/glyph-cat/cotton-box)](https://github.com/glyph-cat/cotton-box/blob/main/LICENSE)
[![Support me on Ko-fi](https://img.shields.io/static/v1?label&logo=kofi&logoColor=ffffff&message=Support%20me%20on%20Ko-fi&color=FF5E5B)](https://ko-fi.com/glyphcat)

<!-- See: https://github.com/microsoft/vscode/issues/128813#issuecomment-943125631 -->

</div>

Cotton Box is a lightweight state management library designed for flexibility and simplicity.  

It works seamlessly with React Hooks while remaining usable outside React, requires no providers or boilerplate, and supports advanced features like async state updates, customizable equality checks, and declarative lifecycle management.

<!--:DO_NOT_DELETE_THIS_LINE_SUB_PACKAGE_ADDITIONAL_INFO:-->

| Packages           | Stats                                                                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cotton-box`       | [![Version](https://img.shields.io/npm/v/cotton-box.svg)](https://www.npmjs.com/package/cotton-box) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/cotton-box)             |
| `cotton-box-react` | [![Version](https://img.shields.io/npm/v/cotton-box-react.svg)](https://www.npmjs.com/package/cotton-box) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/cotton-box-react) |

<br/>

## Features

- No Providers/boilerplate 🧩
- Customizable equality function 🎯
- Async <code>setState</code> support 🔄
- Temporarily unwatch state in React Hooks ⏸️
- Declarative lifecycle management 🌱
- Private state values (without middleware) 🔒
- Works with and without React ⚛️
- Fast ⚡️

<br/>

## Examples

### Create A New State Manager
```js
import { StateManager } from 'cotton-box'

const CounterState = new StateManager(0)
```

### Set Value
```js
CounterState.set(42)
CounterState.set((c) => c + 1)
```

### Get Value
```js
CounterState.get()
```

### With React
```jsx
import { useStateValue } from 'cotton-box-react'

function App() {
  const counter = useStateValue(CounterState)
  return <p>Counter: {counter}</p>
}
```

<br/>

## Documentation

[![Read The Docs](https://img.shields.io/badge/-📖_Read_The_Docs-blue)](https://glyph-cat.github.io/cotton-box)
