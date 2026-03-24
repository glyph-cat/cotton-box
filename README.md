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

| Packages | Stats | |
| --- | --- | --- |
| `cotton-box`       | [![Version](https://img.shields.io/npm/v/cotton-box.svg)](https://www.npmjs.com/package/cotton-box) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/cotton-box) | [Changelogs](https://glyph-cat.github.io/cotton-box/docs/changelogs/current#cotton-box) |
| `cotton-box-react` | [![Version](https://img.shields.io/npm/v/cotton-box-react.svg)](https://www.npmjs.com/package/cotton-box-react) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/cotton-box-react) | [Changelogs](https://glyph-cat.github.io/cotton-box/docs/changelogs/current#cotton-box-react) |

<br/>

## Features
- Lightweight & fast ⚡️
- No providers or boilerplate 🧩
- Customizable equality checking 🎯
- Declarative lifecycle management 🌱
- Works with and without react ⚛️
- Temporarily unwatch state in hooks ⏸️
- Supports async state updates 🔄

<br/>

## Examples

### Creating A State Manager
```ts
import { SimpleStateManager } from 'cotton-box'

const CounterState = new SimpleStateManager(0)
```

### Set Value

#### By providing a new value
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

### Watch stage changes
```tsx
const unwatch = CounterState.watch((counter) => {
  console.log(counter)
})
// ... other code here ...
unwatch()
```

### Wait for a value
```tsx
// Wait for counter to reach 100
await CounterState.wait(100)
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
[![Full Documentation](https://img.shields.io/badge/_-Full_Documentation-2b80ff?logo=docusaurus&logoColor=white&style=for-the-badge)](https://glyph-cat.github.io/cotton-box)[![Changelogs](https://img.shields.io/badge/_-Changelogs-1b60e5?style=for-the-badge)](https://glyph-cat.github.io/cotton-box/docs/changelogs/current)
<br />
[![Code Sandbox Examples](https://img.shields.io/badge/_-Code_Sandbox_Examples-bada55?logo=codesandbox&logoColor=black&style=for-the-badge)](https://glyph-cat.github.io/cotton-box/docs/demo/basic/counter)[![Source code](https://img.shields.io/badge/_-Source_code-89ad21?style=for-the-badge)](https://github.com/glyph-cat/cotton-box/tree/main/src/pages/examples)
<br />
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D65P69N)

<br/>
