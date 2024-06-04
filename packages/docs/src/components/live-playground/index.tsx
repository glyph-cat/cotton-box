import {
  Sandpack,
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  SandpackProps,
  SandpackProvider,
  SandpackStack,
  SandpackTheme,
  useActiveCode,
  useSandpack,
  useSandpackConsole,
} from '@codesandbox/sandpack-react'
import { aquaBlue, freeCodeCampDark } from '@codesandbox/sandpack-themes'
import { useColorMode } from '@docusaurus/theme-common'
import MonacoEditorBase from '@monaco-editor/react'
import { useDelayedVisibility } from '@site/src/hooks/delayed-visibility'
import { JSX, useCallback } from 'react'

const INDEX_TS = 'index.js'
const APP_TSX = 'App.tsx'
const STYLES_CSS = 'styles.css'
const CSS = 'index.module.css'

const TEMP_READY_TO_USE_MONACO_EDITOR = false // TODO

const SIMPLE_WEB_PLAYGROUND_TEMPLATE_FILES = {
  [INDEX_TS]: [
    'import { createRoot } from \'react-dom/client\'',
    'import App from \'./App.tsx\'',
    `import './${STYLES_CSS}'`,
    '',
    'const root = createRoot(document.getElementById(\'root\'))',
    'root.render(<App />)',
    '',
  ].join('\n'),
  [STYLES_CSS]: [
    // TODO: [high priority] raw import from examples-web, probably need script instead of raw loader
    'body {',
    '  font-family: sans-serif;',
    '  -webkit-font-smoothing: auto;',
    '  -moz-font-smoothing: auto;',
    '  -moz-osx-font-smoothing: grayscale;',
    '  font-smoothing: auto;',
    '  text-rendering: optimizeLegibility;',
    '  font-smooth: always;',
    '  -webkit-tap-highlight-color: transparent;',
    '  -webkit-touch-callout: none;',
    '}',
  ].join('\n'),
  'package.json': [
    '{',
    `  "main": "${INDEX_TS}",`,
    '  "dependencies": {',
    '    "react": "^18.0.0",',
    '    "react-dom": "^18.0.0",',
    '    "react-scripts": "^5.0.0"',
    '  }',
    '}',
  ].join('\n'),
  'public/index.html': [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '  <head>',
    '    <meta charset="UTF-8">',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '    <title>Example</title>',
    '  </head>',
    '  <body>',
    '    <div id="root"></div>',
    '  </body>',
    '</html>',
  ].join('\n'),
}

function useCodeEditorTheme(): SandpackTheme {
  const { colorMode } = useColorMode()
  return colorMode === 'light' ? aquaBlue : freeCodeCampDark
}

const sharedProps: SandpackProps = {
  customSetup: {
    dependencies: {
      // KIV: [Low priority] versioning support?
      'cotton-box': 'latest',
      'cotton-box-react': 'latest',
    },
  },
  options: {
    editorWidthPercentage: 65,
    editorHeight: '45vh',
    showLineNumbers: true,
    showRefreshButton: true,
    showTabs: false,
    wrapContent: true,
  },
}

export interface SimpleWebPlaygroundProps {
  code: string
  css?: string
  extraDependencies?: SandpackProps['customSetup']['dependencies']
  options?: SandpackProps['options']
}

export function SimpleWebPlayground(props: SimpleWebPlaygroundProps): JSX.Element {
  const visibility = useDelayedVisibility()
  return visibility ? <SimpleWebPlaygroundBase {...props} /> : null
}

function SimpleWebPlaygroundBase({
  code,
  css,
  extraDependencies,
  options,
}: SimpleWebPlaygroundProps): JSX.Element {
  const codeEditorTheme = useCodeEditorTheme()
  return (
    <>
      {TEMP_READY_TO_USE_MONACO_EDITOR
        ? (
          <SandpackProvider
            files={{
              ...SIMPLE_WEB_PLAYGROUND_TEMPLATE_FILES,
              [APP_TSX]: code,
              ...(css ? { [CSS]: css } : {}),
            }}
            {...sharedProps}
            theme={codeEditorTheme}
            customSetup={{
              ...sharedProps.customSetup,
              entry: INDEX_TS,
              dependencies: {
                ...sharedProps.customSetup.dependencies,
                ...extraDependencies,
              },
            }}
            options={{
              ...sharedProps.options,
              activeFile: APP_TSX,
              showConsole: /console\./.test(code),
              ...options,
            }}
          >
            <SandpackLayout>
              <MonacoEditor />
              <SandpackPreview />
            </SandpackLayout>
          </SandpackProvider>
        )
        : (
          <Sandpack
            files={{
              ...SIMPLE_WEB_PLAYGROUND_TEMPLATE_FILES,
              [APP_TSX]: code,
              ...(css ? { [CSS]: css } : {}),
            }}
            {...sharedProps}
            theme={codeEditorTheme}
            customSetup={{
              ...sharedProps.customSetup,
              entry: INDEX_TS,
              dependencies: {
                ...sharedProps.customSetup.dependencies,
                ...extraDependencies,
              },
            }}
            options={{
              ...sharedProps.options,
              activeFile: APP_TSX,
              showConsole: /console\./.test(code),
              ...options,
            }}
          />
        )
      }
    </>
  )
}

export interface SimpleConsolePlaygroundProps {
  code: string
}

export function SimpleConsolePlayground(props: SimpleConsolePlaygroundProps): JSX.Element {
  const visibility = useDelayedVisibility()
  return visibility ? <SimpleConsolePlaygroundBase {...props} /> : null
}

export function SimpleConsolePlaygroundBase({
  code,
}: SimpleConsolePlaygroundProps): JSX.Element {
  const codeEditorTheme = useCodeEditorTheme()
  // const { sandpack } = useSandpack()
  // const { logs } = useSandpackConsole()
  return (
    <>
      {TEMP_READY_TO_USE_MONACO_EDITOR
        ? (
          <SandpackProvider
            files={{ [INDEX_TS]: code }}
            {...sharedProps}
            theme={codeEditorTheme}
            customSetup={{
              ...sharedProps.customSetup,
              entry: INDEX_TS,
            }}
            options={{
              ...sharedProps.options,
              activeFile: INDEX_TS,
            }}
          >
            <SandpackLayout>
              <MonacoEditor />
              <SandpackConsole />
            </SandpackLayout>
          </SandpackProvider>
        )
        : (
          <Sandpack
            files={{ [INDEX_TS]: code }}
            {...sharedProps}
            theme={codeEditorTheme}
            customSetup={{
              ...sharedProps.customSetup,
              entry: INDEX_TS,
            }}
            options={{
              ...sharedProps.options,
              activeFile: INDEX_TS,
              layout: 'console',
            }}
          />
        )
      }
    </>
  )
}

function MonacoEditor(): JSX.Element {
  const { code, updateCode } = useActiveCode()
  const { sandpack } = useSandpack()
  return (
    <SandpackStack>
      <div style={{ flex: 1 }}>
        <MonacoEditorBase
          key={sandpack.activeFile}
          language='typescript' // TODO: [critical] 'typescriptreact'
          theme='vs-dark'
          defaultValue={code}
          onChange={useCallback((value) => updateCode(value || ''), [updateCode])}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />
      </div>
    </SandpackStack>
  )
}
