import {
  Sandpack,
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  SandpackProps,
  SandpackProvider,
  SandpackSetup,
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
import { ReactNode, useCallback } from 'react'

const INDEX_TS = 'index.js'
const APP_TSX = 'App.tsx'
const STYLES_CSS = 'styles.css'
const CSS = 'index.module.css'

const BASE_DEPENDENCIES: Record<string, string> = {
  'react': 'latest',
  'react-dom': 'latest',
}

const TEMP_READY_TO_USE_MONACO_EDITOR = false // TODO

const SIMPLE_WEB_PLAYGROUND_TEMPLATE_FILES = {
  [INDEX_TS]: [
    'import { createRoot } from \'react-dom/client\'',
    'import App from \'./App.tsx\'',
    `import './${STYLES_CSS}'`,
    '',
    'const root = createRoot(document.getElementById("root"))',
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
  'package.json': JSON.stringify({
    main: INDEX_TS,
    dependencies: BASE_DEPENDENCIES,
  }),
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
  extraDependencies?: SandpackSetup['dependencies']
  options?: SandpackProps['options']
  disableInfiniteLoopProtection?: boolean
}

export function SimpleWebPlayground(props: SimpleWebPlaygroundProps): ReactNode {
  // TOFIX: we should still render the code somehow for crawlers to be able to read it
  const visibility = useDelayedVisibility()
  return visibility ? <SimpleWebPlaygroundBase {...props} /> : null
}

function SimpleWebPlaygroundBase({
  code,
  css,
  extraDependencies,
  options,
  disableInfiniteLoopProtection,
}: SimpleWebPlaygroundProps): ReactNode {
  const codeEditorTheme = useCodeEditorTheme()
  const detectedDependencies = getDependenciesAutomatically(code)
  // console.log('Detected dependencies:', detectedDependencies)
  return (
    <>
      {TEMP_READY_TO_USE_MONACO_EDITOR
        ? (
          <SandpackProvider
            files={{
              ...SIMPLE_WEB_PLAYGROUND_TEMPLATE_FILES,
              [APP_TSX]: code,
              ...(css && { [CSS]: css }),
              ...(disableInfiniteLoopProtection && {
                'sandbox.config.json': JSON.stringify({
                  infiniteLoopProtection: false,
                }),
              }),
            }}
            {...sharedProps}
            theme={codeEditorTheme}
            customSetup={{
              ...sharedProps.customSetup,
              entry: INDEX_TS,
              dependencies: {
                ...detectedDependencies,
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
              ...(css && { [CSS]: css }),
              ...(disableInfiniteLoopProtection && {
                'sandbox.config.json': JSON.stringify({
                  infiniteLoopProtection: false,
                }),
              }),
            }}
            {...sharedProps}
            theme={codeEditorTheme}
            customSetup={{
              ...sharedProps.customSetup,
              entry: INDEX_TS,
              dependencies: {
                ...detectedDependencies,
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
  extraDependencies?: SandpackSetup['dependencies']
}

export function SimpleConsolePlayground(props: SimpleConsolePlaygroundProps): ReactNode {
  const visibility = useDelayedVisibility()
  return visibility ? <SimpleConsolePlaygroundBase {...props} /> : null
}

export function SimpleConsolePlaygroundBase({
  code,
  extraDependencies,
}: SimpleConsolePlaygroundProps): ReactNode {
  const codeEditorTheme = useCodeEditorTheme()
  const detectedDependencies = getDependenciesAutomatically(code)
  console.log('Detected dependencies:', detectedDependencies)
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
              dependencies: {
                ...detectedDependencies,
                ...extraDependencies,
              },
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
              dependencies: {
                ...detectedDependencies,
                ...extraDependencies,
              },
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

function MonacoEditor(): ReactNode {
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
          onChange={useCallback((value: string | undefined) => {
            updateCode(value || '')
          }, [updateCode])}
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

function getImports(value: string): Array<string> {
  return (value.match(/from '@?[.a-z0-9/_-]+(?=')/g) || [])
    .map((match) => match.replace(/^from '/, ''))
}

function getDependenciesAutomatically(value: string): Record<string, string> {
  return getImports(value).filter((item) => {
    return !item.startsWith('./') || BASE_DEPENDENCIES[value]
  }).map((item) => {
    return item
    return item.split(/\//g)[0]
  }).reduce((acc, item) => {
    acc[item] = 'latest'
    return acc
  }, {} as Record<string, string>)
}
