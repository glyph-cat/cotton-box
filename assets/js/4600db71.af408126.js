"use strict";(self.webpackChunkcotton_box_docs=self.webpackChunkcotton_box_docs||[]).push([[7371],{5879:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>S,contentTitle:()=>m,default:()=>E,frontMatter:()=>p,metadata:()=>u,toc:()=>h});var a=n(4848),o=n(8453),i=n(8966),s=n(9235),r=n(9562),l=n(2301),c=n(7600),d=n(3439);const p={sidebar_position:4},m="useScoped",u={id:"api/react/useScoped",title:"useScoped",description:"Overview",source:"@site/docs/api/react/useScoped.mdx",sourceDirName:"api/react",slug:"/api/react/useScoped",permalink:"/cotton-box/docs/api/react/useScoped",draft:!1,unlisted:!1,editUrl:"https://github.com/glyph-cat/cotton-box/tree/main/packages/docs/docs/api/react/useScoped.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"apiSidebar",previous:{title:"useInitState",permalink:"/cotton-box/docs/api/react/useInitState"},next:{title:"StateManagerScopeProvider",permalink:"/cotton-box/docs/api/react/StateManagerScopeProvider"}},S={},h=[{value:"Overview",id:"overview",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Example",id:"example",level:2}];function g(e){const t={code:"code",h1:"h1",h2:"h2",pre:"pre",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"usescoped",children:"useScoped"}),"\n",(0,a.jsx)(t.h2,{id:"overview",children:"Overview"}),"\n",(0,a.jsx)(c.t,{children:c.p.Function}),"\n",(0,a.jsx)(r.r,{children:d.k.TSDOC_DESC_USE_SCOPED}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-js",children:"const scopedStateManager = useScoped(stateManager)\n"})}),"\n",(0,a.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,a.jsx)(l.u,{data:[{name:"stateManager",type:[c.p.SimpleStateManager,c.p.StateManager,c.p.AsyncStateManager],description:d.k.TSDOC_PARAM_DESC_STATE_MANAGER_FOR_USE_SCOPE}]}),"\n",(0,a.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,a.jsx)(s.I,{code:i.A})]})}function E(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(g,{...e})}):g(e)}},6386:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(1400),o=n(4848);function i(e){let{label:t,children:n}=e;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{className:a.A.label,children:`${t}: `}),n]})}},9235:(e,t,n)=>{n.d(t,{I:()=>E,P:()=>y});var a=n(4477),o=n(9047),i=n(5293),s=n(8553),r=n(6540),l=n(4848);const c="index.js",d="App.tsx",p="styles.css",m="index.module.css",u=!1,S={[c]:["import { createRoot } from 'react-dom/client'","import App from './App.tsx'",`import './${p}'`,"","const root = createRoot(document.getElementById('root'))","root.render(<App />)",""].join("\n"),[p]:["body {","  font-family: sans-serif;","  -webkit-font-smoothing: auto;","  -moz-font-smoothing: auto;","  -moz-osx-font-smoothing: grayscale;","  font-smoothing: auto;","  text-rendering: optimizeLegibility;","  font-smooth: always;","  -webkit-tap-highlight-color: transparent;","  -webkit-touch-callout: none;","}"].join("\n"),"package.json":["{",`  "main": "${c}",`,'  "dependencies": {','    "react": "^18.0.0",','    "react-dom": "^18.0.0",','    "react-scripts": "^5.0.0"',"  }","}"].join("\n"),"public/index.html":["<!DOCTYPE html>",'<html lang="en">',"  <head>",'    <meta charset="UTF-8">','    <meta name="viewport" content="width=device-width, initial-scale=1.0">',"    <title>Example</title>","  </head>","  <body>",'    <div id="root"></div>',"  </body>","</html>"].join("\n")};function h(){const{colorMode:e}=(0,i.G)();return"light"===e?o.Zw:o.$o}const g={customSetup:{dependencies:{"cotton-box":"latest","cotton-box-react":"latest"}},options:{editorWidthPercentage:65,editorHeight:"45vh",showLineNumbers:!0,showRefreshButton:!0,showTabs:!1,wrapContent:!0}};function E(e){let{code:t,css:n,extraDependencies:o,options:i}=e;const s=h();return(0,l.jsx)(l.Fragment,{children:u?(0,l.jsx)(a.l5,{files:{...S,[d]:t,...n?{[m]:n}:{}},...g,theme:s,customSetup:{...g.customSetup,entry:c,dependencies:{...g.customSetup.dependencies,...o}},options:{...g.options,activeFile:d,showConsole:/console\./.test(t),...i},children:(0,l.jsxs)(a.am,{children:[(0,l.jsx)(x,{}),(0,l.jsx)(a.G5,{})]})}):(0,l.jsx)(a.OZ,{files:{...S,[d]:t,...n?{[m]:n}:{}},...g,theme:s,customSetup:{...g.customSetup,entry:c,dependencies:{...g.customSetup.dependencies,...o}},options:{...g.options,activeFile:d,showConsole:/console\./.test(t),...i}})})}function y(e){let{code:t}=e;const n=h();return(0,l.jsx)(l.Fragment,{children:u?(0,l.jsx)(a.l5,{files:{[c]:t},...g,theme:n,customSetup:{...g.customSetup,entry:c},options:{...g.options,activeFile:c},children:(0,l.jsxs)(a.am,{children:[(0,l.jsx)(x,{}),(0,l.jsx)(a.X2,{})]})}):(0,l.jsx)(a.OZ,{files:{[c]:t},...g,theme:n,customSetup:{...g.customSetup,entry:c},options:{...g.options,activeFile:c,layout:"console"}})})}function x(){const{code:e,updateCode:t}=(0,a.Pe)(),{sandpack:n}=(0,a.ny)();return(0,l.jsx)(a.aN,{children:(0,l.jsx)("div",{style:{flex:1},children:(0,l.jsx)(s.Ay,{language:"typescript",theme:"vs-dark",defaultValue:e,onChange:(0,r.useCallback)((e=>t(e||"")),[t]),options:{fontSize:14,minimap:{enabled:!1},scrollBeyondLastLine:!1,wordWrap:"on"}},n.activeFile)})})}},2301:(e,t,n)=>{n.d(t,{u:()=>d});var a=n(6540),o=n(6386),i=n(1400),s=n(9562),r=n(7600);const l={li:"li_zBtQ",readonly:"readonly_EJF0",parameterName:"parameterName_jSio",specifications:"specifications_uYt5"};var c=n(4848);function d(e){let{data:t,hideOptional:n,requireEitherOne:d}=e;const p=[];for(const m of t){const{name:e,type:t,readonly:u,isOptional:S,defaultValue:h,description:g,typeIsArrayOf:E}=m;p.push((0,c.jsxs)("li",{className:l.li,children:[u&&(0,c.jsx)("span",{className:l.readonly,children:"readonly"}),(0,c.jsx)("code",{className:l.parameterName,children:e})," \u2014 ",(0,c.jsx)(s.r,{unwrapParagraph:!0,children:g}),(0,c.jsxs)("span",{className:l.specifications,children:[(0,c.jsx)("br",{}),(0,c.jsx)(r.t,{containerElement:a.Fragment,typeIsArrayOf:E,children:t}),!n&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("br",{}),(0,c.jsxs)(o.Z,{label:"Required",children:[S||h?"No":"Yes"+(d?" (either one)":""),h&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:i.A.label,children:" \u2014 (default value: "}),(0,c.jsx)(s.r,{unwrapParagraph:!0,children:h}),(0,c.jsx)("span",{className:i.A.label,children:")"})]})]})]}),(0,c.jsx)("br",{})]})]},e))}return(0,c.jsx)("ul",{children:p})}},7600:(e,t,n)=>{n.d(t,{p:()=>l,t:()=>c});var a=n(3439),o=n(6280),i=n(6386),s=n(1400),r=n(4848);let l=function(e){return e[e.any=0]="any",e[e.boolean=1]="boolean",e[e.string=2]="string",e[e.Function=3]="Function",e[e.Array=4]="Array",e[e.class=5]="class",e[e.interface=6]="interface",e[e.type=7]="type",e[e.enum=8]="enum",e[e.SimpleStateManager=9]="SimpleStateManager",e[e.StateManager=10]="StateManager",e[e.AsyncStateManager=11]="AsyncStateManager",e[e.StateManagerVisibility=12]="StateManagerVisibility",e[e.SimpleStateManagerOptions=13]="SimpleStateManagerOptions",e[e.StateManagerOptions=14]="StateManagerOptions",e[e.SetStateFn=15]="SetStateFn",e[e.StateSelector=16]="StateSelector",e[e.WaitEvaluator=17]="WaitEvaluator",e[e.EqualityFn=18]="EqualityFn",e[e.BuildType=19]="BuildType",e[e.FunctionComponent=20]="FunctionComponent",e[e.ReactNode=21]="ReactNode",e}({});function c(e){let{children:t,containerElement:n="p",typeIsArrayOf:a}=e;const c=Array.isArray(t)?t:[t],p=[];for(let i=0;i<c.length;i++){const e=c[i];p.push((0,r.jsx)(o.L,{href:d[e],children:l[e]},e)),i<c.length-1&&p.push((0,r.jsx)("span",{className:s.A.label,children:i===c.length-2?" or ":", "},i))}return(0,r.jsx)(n,{children:(0,r.jsx)(i.Z,{label:"Type",children:a?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.L,{href:d[l.Array],children:"Array"}),(0,r.jsx)("span",{className:s.A.label,children:" (of "}),p,(0,r.jsx)("span",{className:s.A.label,children:")"})]}):p})})}const d={[l.any]:a.k.TYPE_REFERENCE_URL_ANY,[l.boolean]:a.k.TYPE_REFERENCE_URL_BOOLEAN,[l.string]:a.k.TYPE_REFERENCE_URL_STRING,[l.Function]:a.k.TYPE_REFERENCE_URL_FUNCTION,[l.Array]:a.k.TYPE_REFERENCE_URL_ARRAY,[l.class]:a.k.TYPE_REFERENCE_URL_CLASS,[l.interface]:a.k.TYPE_REFERENCE_URL_INTERFACE,[l.type]:a.k.TYPE_REFERENCE_URL_TYPE,[l.enum]:a.k.TYPE_REFERENCE_URL_ENUM,[l.StateManagerVisibility]:`${a.k.DOCS_API_CORE_URL}/StateManagerVisibility`,[l.SimpleStateManager]:`${a.k.DOCS_API_CORE_URL}/SimpleStateManager`,[l.StateManager]:`${a.k.DOCS_API_CORE_URL}/StateManager`,[l.AsyncStateManager]:`${a.k.DOCS_API_CORE_URL}/AsyncStateManager`,[l.SimpleStateManagerOptions]:`${a.k.DOCS_API_CORE_URL}/SimpleStateManagerOptions`,[l.StateManagerOptions]:`${a.k.DOCS_API_CORE_URL}/StateManagerOptions`,[l.SetStateFn]:`${a.k.DOCS_API_CORE_URL}/SetStateFn`,[l.StateSelector]:`${a.k.DOCS_API_CORE_URL}/StateSelector`,[l.WaitEvaluator]:`${a.k.DOCS_API_CORE_URL}/WaitEvaluator`,[l.EqualityFn]:`${a.k.DOCS_API_CORE_URL}/EqualityFn`,[l.BuildType]:`${a.k.DOCS_API_MISC_URL}/BuildType`,[l.FunctionComponent]:"https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components",[l.ReactNode]:"https://react.dev/learn/typescript#typing-children"}},1400:(e,t,n)=>{n.d(t,{A:()=>a});const a={label:"label_LtL6"}},8966:(e,t,n)=>{n.d(t,{A:()=>a});const a="import { SimpleStateManager } from 'cotton-box'\nimport { StateManagerScopeProvider, useScoped, useSimpleStateValue } from 'cotton-box-react'\nimport { useEffect, useState } from 'react'\n\nenum Color {\n  BLUE = '#2b80ff',\n  PINK = '#ff2b80',\n}\n\nconst GlobalThemeState = new SimpleStateManager(Color.BLUE)\n\nexport default function App(): JSX.Element {\n\n  const [\n    dynamicallyCreatedThemeState,\n    setDynamicallyCreatedThemeState,\n  ] = useState<SimpleStateManager<Color>>(null)\n  useEffect(() => {\n    const $dynamicallyCreatedThemeState = new SimpleStateManager(Color.PINK, {\n      scope: GlobalThemeState,\n    })\n    setDynamicallyCreatedThemeState($dynamicallyCreatedThemeState)\n    return () => { $dynamicallyCreatedThemeState.dispose() }\n  }, [])\n\n  return (\n    <div>\n      <ChildComponent />\n      {dynamicallyCreatedThemeState && (\n        <div style={{ border: 'solid 1px #808080' }}>\n          <span style={{ padding: 10 }}>Scoped:</span>\n          <StateManagerScopeProvider with={[dynamicallyCreatedThemeState]}>\n            <ChildComponent />\n          </StateManagerScopeProvider>\n        </div>\n      )}\n    </div>\n  )\n}\n\nfunction ChildComponent(): JSX.Element {\n  const theme = useSimpleStateValue(useScoped(GlobalThemeState))\n  const tileSize = 28 // px\n  return (\n    <div style={{\n      alignItems: 'center',\n      padding: 10,\n      display: 'grid',\n      gap: 10,\n      gridTemplateColumns: 'auto 1fr',\n    }}>\n      <div style={{\n        backgroundColor: theme,\n        border: 'solid 1px #808080',\n        height: tileSize,\n        outline: 'solid 1px #ffffff',\n        width: tileSize,\n      }} />\n      <code>{theme}</code>\n    </div>\n  )\n}\n"}}]);