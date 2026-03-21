<div align="center" style="text-align: center">

[![Banner](https://raw.githubusercontent.com/glyph-cat/cotton-box/main/assets/icon-with-text.svg)](https://github.com/glyph-cat/cotton-box)

*Minimal state management library for React and beyond.*

[![License](https://img.shields.io/github/license/glyph-cat/cotton-box)](https://github.com/glyph-cat/cotton-box/blob/main/LICENSE)
![React compatibility v19](https://img.shields.io/badge/v19-blue?logo=react&logoColor=white)
[![Documentation](https://img.shields.io/badge/_-Docs-2b80ff?logo=docusaurus&logoColor=white)](https://glyph-cat.github.io/cotton-box)

</div>

Cotton Box is a lightweight state management library designed for flexibility and simplicity.

It works seamlessly with React Hooks while remaining usable outside React, requires no providers or boilerplate, and supports advanced features like async state updates, customizable equality checks, and declarative lifecycle management.

<!--:DO_NOT_DELETE_THIS_LINE_SUB_PACKAGE_ADDITIONAL_INFO:-->

| Packages | Stats |
| --- | --- |
| `cotton-box`       | [![Version](https://img.shields.io/npm/v/cotton-box.svg)](https://www.npmjs.com/package/cotton-box) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/cotton-box)             |
| `cotton-box-react` | [![Version](https://img.shields.io/npm/v/cotton-box-react.svg)](https://www.npmjs.com/package/cotton-box-react) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/cotton-box-react) |

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

### Creating A State Manager
```ts
import { SimpleStateManager } from 'cotton-box'

const CounterState = new SimpleStateManager(0)
```

### Set Value

#### By providing a value
```ts
CounterState.set(42)
```

#### By using a function
```ts
CounterState.set((c) => c + 1)
```

### Get Value
```ts
const counter = CounterState.get()
```

### Using With React
```tsx
import { useSimpleStateValue } from 'cotton-box-react'

function App() {
  const counter = useSimpleStateValue(CounterState)
  return <p>Counter: {counter}</p>
}
```

<br/>

## Links
<!-- | Links |
|---|
| [![Full Documentation](https://img.shields.io/badge/_-Full_Documentation-blue?logo=docusaurus&logoColor=white&style=for-the-badge)](https://glyph-cat.github.io/cotton-box) |
| [![Code Sandbox Examples](https://img.shields.io/badge/_-Code_Sandbox_Examples-bada55?logo=codesandbox&logoColor=black&style=for-the-badge)](https://glyph-cat.github.io/cotton-box/docs/demo/basic/counter)[![Source code](https://img.shields.io/badge/_-Source_code-9aad39?style=for-the-badge)](https://github.com/glyph-cat/cotton-box/tree/main/src/pages/examples) |
| [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D65P69N) | -->

[![Full Documentation](https://img.shields.io/badge/_-Full_Documentation-blue?logo=docusaurus&logoColor=white&style=for-the-badge)](https://glyph-cat.github.io/cotton-box)
<br />
[![Code Sandbox Examples](https://img.shields.io/badge/_-Code_Sandbox_Examples-bada55?logo=codesandbox&logoColor=black&style=for-the-badge)](https://glyph-cat.github.io/cotton-box/docs/demo/basic/counter)[![Source code](https://img.shields.io/badge/_-Source_code-9aad39?style=for-the-badge)](https://github.com/glyph-cat/cotton-box/tree/main/src/pages/examples)
<br />
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D65P69N)

<br/>
