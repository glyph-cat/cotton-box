"use strict";(self.webpackChunkcotton_box_docs=self.webpackChunkcotton_box_docs||[]).push([[6669],{8982:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>S,default:()=>b,frontMatter:()=>d,metadata:()=>h,toc:()=>x});var a=n(4848),s=n(8453);const r="import { SimpleStateManager } from 'cotton-box'\nimport { useSimpleStateValue } from 'cotton-box-react'\nimport { useCallback, useState } from 'react'\n\nexport default function App(): JSX.Element {\n  const [active, setActive] = useState(true)\n  const toggleActiveness = useCallback(() => { setActive(a => !a) }, [])\n  const user = useSimpleStateValue(UserState, null, active)\n  console.log('App is rendering...')\n  return (\n    <div>\n      <h1>Hello, {user.firstName} {user.lastName}!</h1>\n      <h2>Your lucky number is {user.luckyNumber ?? '...'}</h2>\n      <button onClick={rollLuckyNumber}>Roll lucky number</button>\n      <button onClick={toggleActiveness}>\n        {active ? 'Pause watching' : 'Start watching'}\n      </button>\n    </div>\n  )\n}\n\ninterface IUserState {\n  firstName: string\n  lastName: string\n  luckyNumber: number\n}\n\nconst UserState = new SimpleStateManager<IUserState>({\n  firstName: 'John',\n  lastName: 'Smith',\n  luckyNumber: null,\n})\n\nfunction rollLuckyNumber(): void {\n  UserState.set((previousState) => ({\n    ...previousState,\n    luckyNumber: Math.round(Math.random() * 100),\n  }))\n}\n",i="import { SimpleStateManager } from 'cotton-box'\nimport { useSimpleStateValue } from 'cotton-box-react'\n\nexport default function App(): JSX.Element {\n  const user = useSimpleStateValue(UserState)\n  return (\n    <div>\n      <h1>Hello, {user.firstName} {user.lastName}!</h1>\n      <h2>Your lucky number is {user.luckyNumber ?? '...'}</h2>\n      <button onClick={rollLuckyNumber}>Roll lucky number</button>\n    </div>\n  )\n}\n\ninterface IUserState {\n  firstName: string\n  lastName: string\n  luckyNumber: number\n}\n\nconst UserState = new SimpleStateManager<IUserState>({\n  firstName: 'John',\n  lastName: 'Smith',\n  luckyNumber: null,\n})\n\nfunction rollLuckyNumber(): void {\n  UserState.set((previousState) => ({\n    ...previousState,\n    luckyNumber: Math.round(Math.random() * 100),\n  }))\n}\n",o="import { SimpleStateManager } from 'cotton-box'\nimport { useSimpleStateValue } from 'cotton-box-react'\n\nexport default function App(): JSX.Element {\n  const firstName = useSimpleStateValue(UserState, (state) => state.firstName)\n  console.log('App is rendering...')\n  return (\n    <div>\n      <h1>Hello, {firstName}!</h1>\n      <button onClick={rollLuckyNumber}>Roll lucky number</button>\n    </div>\n  )\n}\n\ninterface IUserState {\n  firstName: string\n  lastName: string\n  luckyNumber: number\n}\n\nconst UserState = new SimpleStateManager<IUserState>({\n  firstName: 'John',\n  lastName: 'Smith',\n  luckyNumber: null,\n})\n\nfunction rollLuckyNumber(): void {\n  UserState.set((previousState) => ({\n    ...previousState,\n    luckyNumber: Math.round(Math.random() * 100),\n  }))\n}\n";var l=n(9235),c=n(9562),u=n(2301),p=n(7600),m=n(3439);const d={sidebar_position:1},S="useSimpleStateValue",h={id:"api/react/useSimpleStateValue",title:"useSimpleStateValue",description:"Overview",source:"@site/docs/api/react/useSimpleStateValue.mdx",sourceDirName:"api/react",slug:"/api/react/useSimpleStateValue",permalink:"/cotton-box/docs/api/react/useSimpleStateValue",draft:!1,unlisted:!1,editUrl:"https://github.com/glyph-cat/cotton-box/tree/main/packages/docs/docs/api/react/useSimpleStateValue.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"apiSidebar",previous:{title:"React",permalink:"/cotton-box/docs/api/react"},next:{title:"useStateValue",permalink:"/cotton-box/docs/api/react/useStateValue"}},g={},x=[{value:"Overview",id:"overview",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Basic",id:"basic",level:3},{value:"With selector",id:"with-selector",level:3},{value:"Conditionally watch for changes",id:"conditionally-watch-for-changes",level:3}];function y(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",pre:"pre",...(0,s.R)(),...e.components},{Details:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"usesimplestatevalue",children:"useSimpleStateValue"}),"\n",(0,a.jsx)(t.h2,{id:"overview",children:"Overview"}),"\n",(0,a.jsx)(p.t,{children:p.p.Function}),"\n",(0,a.jsx)(c.r,{children:m.k.TSDOC_DESC_USE_SIMPLE_STATE_VALUE}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-js",children:"const state = useSimpleStateValue(stateManager)\n"})}),"\n",(0,a.jsxs)(n,{children:[(0,a.jsx)("summary",{children:(0,a.jsx)("b",{children:"Overloads (+2)"})}),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-js",children:"const state = useSimpleStateValue(stateManager, selector)\n"})}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-js",children:"const state = useSimpleStateValue(stateManager, selector, active)\n"})})]})]}),"\n",(0,a.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,a.jsx)(u.u,{data:[{name:"stateManager",type:p.p.SimpleStateManager,description:m.k.TSDOC_PARAM_DESC_STATE_MANAGER},{name:"selector",type:p.p.StateSelector,defaultValue:"`null`",description:m.k.TSDOC_PARAM_DESC_SELECTOR},{name:"active",type:p.p.boolean,defaultValue:"`true`",description:m.k.TSDOC_PARAM_DESC_ACTIVE}]}),"\n",(0,a.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,a.jsx)(t.h3,{id:"basic",children:"Basic"}),"\n",(0,a.jsx)(l.IG,{code:i}),"\n",(0,a.jsx)(t.h3,{id:"with-selector",children:"With selector"}),"\n",(0,a.jsx)(l.IG,{code:o}),"\n",(0,a.jsx)(t.h3,{id:"conditionally-watch-for-changes",children:"Conditionally watch for changes"}),"\n",(0,a.jsx)(l.IG,{code:r})]})}function b(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(y,{...e})}):y(e)}},6386:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(1400),s=n(4848);function r(e){let{label:t,children:n}=e;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{className:a.A.label,children:`${t}: `}),n]})}},9235:(e,t,n)=>{n.d(t,{IG:()=>y,P3:()=>E});var a=n(4477),s=n(9047),r=n(5293),i=n(8553),o=n(5938),l=n(6540),c=n(4848);const u="index.js",p="App.tsx",m="styles.css",d="index.module.css",S=!1,h={[u]:["import { createRoot } from 'react-dom/client'","import App from './App.tsx'",`import './${m}'`,"","const root = createRoot(document.getElementById('root'))","root.render(<App />)",""].join("\n"),[m]:["body {","  font-family: sans-serif;","  -webkit-font-smoothing: auto;","  -moz-font-smoothing: auto;","  -moz-osx-font-smoothing: grayscale;","  font-smoothing: auto;","  text-rendering: optimizeLegibility;","  font-smooth: always;","  -webkit-tap-highlight-color: transparent;","  -webkit-touch-callout: none;","}"].join("\n"),"package.json":["{",`  "main": "${u}",`,'  "dependencies": {','    "react": "^18.0.0",','    "react-dom": "^18.0.0",','    "react-scripts": "^5.0.0"',"  }","}"].join("\n"),"public/index.html":["<!DOCTYPE html>",'<html lang="en">',"  <head>",'    <meta charset="UTF-8">','    <meta name="viewport" content="width=device-width, initial-scale=1.0">',"    <title>Example</title>","  </head>","  <body>",'    <div id="root"></div>',"  </body>","</html>"].join("\n")};function g(){const{colorMode:e}=(0,r.G)();return"light"===e?s.Zw:s.$o}const x={customSetup:{dependencies:{"cotton-box":"latest","cotton-box-react":"latest"}},options:{editorWidthPercentage:65,editorHeight:"45vh",showLineNumbers:!0,showRefreshButton:!0,showTabs:!1,wrapContent:!0}};function y(e){return(0,o.i)()?(0,c.jsx)(b,{...e}):null}function b(e){let{code:t,css:n,extraDependencies:s,options:r}=e;const i=g();return(0,c.jsx)(c.Fragment,{children:S?(0,c.jsx)(a.l5,{files:{...h,[p]:t,...n?{[d]:n}:{}},...x,theme:i,customSetup:{...x.customSetup,entry:u,dependencies:{...x.customSetup.dependencies,...s}},options:{...x.options,activeFile:p,showConsole:/console\./.test(t),...r},children:(0,c.jsxs)(a.am,{children:[(0,c.jsx)(_,{}),(0,c.jsx)(a.G5,{})]})}):(0,c.jsx)(a.OZ,{files:{...h,[p]:t,...n?{[d]:n}:{}},...x,theme:i,customSetup:{...x.customSetup,entry:u,dependencies:{...x.customSetup.dependencies,...s}},options:{...x.options,activeFile:p,showConsole:/console\./.test(t),...r}})})}function E(e){return(0,o.i)()?(0,c.jsx)(f,{...e}):null}function f(e){let{code:t}=e;const n=g();return(0,c.jsx)(c.Fragment,{children:S?(0,c.jsx)(a.l5,{files:{[u]:t},...x,theme:n,customSetup:{...x.customSetup,entry:u},options:{...x.options,activeFile:u},children:(0,c.jsxs)(a.am,{children:[(0,c.jsx)(_,{}),(0,c.jsx)(a.X2,{})]})}):(0,c.jsx)(a.OZ,{files:{[u]:t},...x,theme:n,customSetup:{...x.customSetup,entry:u},options:{...x.options,activeFile:u,layout:"console"}})})}function _(){const{code:e,updateCode:t}=(0,a.Pe)(),{sandpack:n}=(0,a.ny)();return(0,c.jsx)(a.aN,{children:(0,c.jsx)("div",{style:{flex:1},children:(0,c.jsx)(i.Ay,{language:"typescript",theme:"vs-dark",defaultValue:e,onChange:(0,l.useCallback)((e=>t(e||"")),[t]),options:{fontSize:14,minimap:{enabled:!1},scrollBeyondLastLine:!1,wordWrap:"on"}},n.activeFile)})})}},2301:(e,t,n)=>{n.d(t,{u:()=>u});var a=n(6540),s=n(6386),r=n(1400),i=n(9562),o=n(7600);const l={li:"li_zBtQ",readonly:"readonly_EJF0",parameterName:"parameterName_jSio",specifications:"specifications_uYt5"};var c=n(4848);function u(e){let{data:t,hideOptional:n,requireEitherOne:u}=e;const p=[];for(const m of t){const{name:e,type:t,readonly:d,isOptional:S,defaultValue:h,description:g,typeIsArrayOf:x}=m;p.push((0,c.jsxs)("li",{className:l.li,children:[d&&(0,c.jsx)("span",{className:l.readonly,children:"readonly"}),(0,c.jsx)("code",{className:l.parameterName,children:e})," \u2014 ",(0,c.jsx)(i.r,{unwrapParagraph:!0,children:g}),(0,c.jsxs)("span",{className:l.specifications,children:[(0,c.jsx)("br",{}),(0,c.jsx)(o.t,{containerElement:a.Fragment,typeIsArrayOf:x,children:t}),!n&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("br",{}),(0,c.jsxs)(s.Z,{label:"Required",children:[S||h?"No":"Yes"+(u?" (either one)":""),h&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:r.A.label,children:" \u2014 (default value: "}),(0,c.jsx)(i.r,{unwrapParagraph:!0,children:h}),(0,c.jsx)("span",{className:r.A.label,children:")"})]})]})]}),(0,c.jsx)("br",{})]})]},e))}return(0,c.jsx)("ul",{children:p})}},7600:(e,t,n)=>{n.d(t,{p:()=>l,t:()=>c});var a=n(3439),s=n(6280),r=n(6386),i=n(1400),o=n(4848);let l=function(e){return e[e.any=0]="any",e[e.boolean=1]="boolean",e[e.string=2]="string",e[e.Function=3]="Function",e[e.Array=4]="Array",e[e.class=5]="class",e[e.interface=6]="interface",e[e.type=7]="type",e[e.enum=8]="enum",e[e.SimpleStateManager=9]="SimpleStateManager",e[e.StateManager=10]="StateManager",e[e.AsyncStateManager=11]="AsyncStateManager",e[e.StateManagerVisibility=12]="StateManagerVisibility",e[e.SimpleStateManagerOptions=13]="SimpleStateManagerOptions",e[e.StateManagerOptions=14]="StateManagerOptions",e[e.SetStateFn=15]="SetStateFn",e[e.StateSelector=16]="StateSelector",e[e.WaitEvaluator=17]="WaitEvaluator",e[e.EqualityFn=18]="EqualityFn",e[e.BuildType=19]="BuildType",e[e.FunctionComponent=20]="FunctionComponent",e[e.ReactNode=21]="ReactNode",e}({});function c(e){let{children:t,containerElement:n="p",typeIsArrayOf:a}=e;const c=Array.isArray(t)?t:[t],p=[];for(let r=0;r<c.length;r++){const e=c[r];p.push((0,o.jsx)(s.L,{href:u[e],children:l[e]},e)),r<c.length-1&&p.push((0,o.jsx)("span",{className:i.A.label,children:r===c.length-2?" or ":", "},r))}return(0,o.jsx)(n,{children:(0,o.jsx)(r.Z,{label:"Type",children:a?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.L,{href:u[l.Array],children:"Array"}),(0,o.jsx)("span",{className:i.A.label,children:" (of "}),p,(0,o.jsx)("span",{className:i.A.label,children:")"})]}):p})})}const u={[l.any]:a.k.TYPE_REFERENCE_URL_ANY,[l.boolean]:a.k.TYPE_REFERENCE_URL_BOOLEAN,[l.string]:a.k.TYPE_REFERENCE_URL_STRING,[l.Function]:a.k.TYPE_REFERENCE_URL_FUNCTION,[l.Array]:a.k.TYPE_REFERENCE_URL_ARRAY,[l.class]:a.k.TYPE_REFERENCE_URL_CLASS,[l.interface]:a.k.TYPE_REFERENCE_URL_INTERFACE,[l.type]:a.k.TYPE_REFERENCE_URL_TYPE,[l.enum]:a.k.TYPE_REFERENCE_URL_ENUM,[l.StateManagerVisibility]:`${a.k.DOCS_API_CORE_URL}/StateManagerVisibility`,[l.SimpleStateManager]:`${a.k.DOCS_API_CORE_URL}/SimpleStateManager`,[l.StateManager]:`${a.k.DOCS_API_CORE_URL}/StateManager`,[l.AsyncStateManager]:`${a.k.DOCS_API_CORE_URL}/AsyncStateManager`,[l.SimpleStateManagerOptions]:`${a.k.DOCS_API_CORE_URL}/SimpleStateManagerOptions`,[l.StateManagerOptions]:`${a.k.DOCS_API_CORE_URL}/StateManagerOptions`,[l.SetStateFn]:`${a.k.DOCS_API_CORE_URL}/SetStateFn`,[l.StateSelector]:`${a.k.DOCS_API_CORE_URL}/StateSelector`,[l.WaitEvaluator]:`${a.k.DOCS_API_CORE_URL}/WaitEvaluator`,[l.EqualityFn]:`${a.k.DOCS_API_CORE_URL}/EqualityFn`,[l.BuildType]:`${a.k.DOCS_API_MISC_URL}/BuildType`,[l.FunctionComponent]:"https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components",[l.ReactNode]:"https://react.dev/learn/typescript#typing-children"}},1400:(e,t,n)=>{n.d(t,{A:()=>a});const a={label:"label_LtL6"}}}]);