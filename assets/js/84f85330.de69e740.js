"use strict";(self.webpackChunkcotton_box_docs=self.webpackChunkcotton_box_docs||[]).push([[3132],{6553:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>f,contentTitle:()=>x,default:()=>y,frontMatter:()=>S,metadata:()=>g,toc:()=>v});var a=n(4848),i=n(8453);const s="import { SimpleStateManager } from 'cotton-box'\nimport { useSimpleStateValueWithReactiveSelector } from 'cotton-box-react'\nimport { useCallback, useState } from 'react'\n\nconst selector = (state: IUserState) => state.luckyNumber\n\nexport default function App(): JSX.Element {\n  const [active, setActive] = useState(true)\n  const toggleActiveness = useCallback(() => { setActive(a => !a) }, [])\n  const luckyNumber = useSimpleStateValueWithReactiveSelector(UserState, selector, active)\n  console.log('App is rendering...')\n  return (\n    <div>\n      <h1>Lucky number: {luckyNumber ?? '...'}</h1>\n      <button onClick={rollLuckyNumber}>Roll lucky number</button>\n      <button onClick={toggleActiveness}>\n        {active ? 'Pause watching' : 'Start watching'}\n      </button>\n    </div>\n  )\n}\n\ninterface IUserState {\n  firstName: string\n  lastName: string\n  luckyNumber: number\n}\n\nconst UserState = new SimpleStateManager<IUserState>({\n  firstName: 'John',\n  lastName: 'Smith',\n  luckyNumber: null,\n})\n\nfunction rollLuckyNumber(): void {\n  UserState.set((previousState) => ({\n    ...previousState,\n    luckyNumber: Math.round(Math.random() * 100),\n  }))\n}\n",o="import { StateManager } from 'cotton-box'\nimport { useStateValueWithReactiveSelector } from 'cotton-box-react'\n\nconst selector = (state: IUserState) => state.luckyNumber\n\nexport default function App(): JSX.Element {\n  const luckyNumber = useStateValueWithReactiveSelector(UserState, selector)\n  console.log('App is rendering...')\n  return (\n    <div>\n      <h1>Lucky number: {luckyNumber ?? '...'}</h1>\n      <button onClick={rollLuckyNumber}>Roll lucky number</button>\n    </div>\n  )\n}\n\ninterface IUserState {\n  firstName: string\n  lastName: string\n  luckyNumber: number\n}\n\nconst UserState = new StateManager<IUserState>({\n  firstName: 'John',\n  lastName: 'Smith',\n  luckyNumber: null,\n})\n\nfunction rollLuckyNumber(): void {\n  UserState.set((previousState) => ({\n    ...previousState,\n    luckyNumber: Math.round(Math.random() * 100),\n  }))\n}\n",r="import { Equality, StateManager } from 'cotton-box'\nimport { useStateValueWithReactiveSelector } from 'cotton-box-react'\nimport { useCallback, useState } from 'react'\n\nconst selector = (state: IUserState) => [state.firstName, state.lastName]\n\n// KIV: temp note expect infinite loop when using `Object.Is`\n\nexport default function App(): JSX.Element {\n  const [shouldUseObjectIs, setUseObjectIs] = useState(false)\n  const name = useStateValueWithReactiveSelector(\n    UserState,\n    selector,\n    shouldUseObjectIs ? Object.is : Equality.shallowCompareArray,\n  )\n  const setEqualityObjectIs = useCallback(() => {\n    setUseObjectIs(true)\n  }, [])\n  const setEqualityShallowCompareArray = useCallback(() => {\n    setUseObjectIs(false)\n  }, [])\n  console.log('App is rendering...')\n  return (\n    <div>\n      <h1>Hello, {name.join(' ')}!</h1>\n      <button onClick={setStateBySpreadingOnly}>Set state by spreading only</button>\n      <button onClick={setEqualityObjectIs} disabled={shouldUseObjectIs}>\n        Use <code>Object.is</code>\n      </button>\n      <button onClick={setEqualityShallowCompareArray} disabled={!shouldUseObjectIs}>\n        Use <code>Equality.shallowCompareArray</code>\n      </button>\n    </div>\n  )\n}\n\ninterface IUserState {\n  firstName: string\n  lastName: string\n  luckyNumber: number\n}\n\nconst UserState = new StateManager<IUserState>({\n  firstName: 'John',\n  lastName: 'Smith',\n  luckyNumber: null,\n})\n\nfunction setStateBySpreadingOnly(): void {\n  UserState.set((previousState) => ({ ...previousState }))\n}\n";var c=n(6280),l=n(9235),d=n(9562),u=n(2301),h=n(7600),m=n(7483),p=n(3439);const S={sidebar_position:7},x="useStateValueWithReactiveSelector",g={id:"api/react/useStateValueWithReactiveSelector",title:"useStateValueWithReactiveSelector",description:"This is provided as an escape hatch in special cases where useStateValue is not behaving as expected. For example, the selector depends on external values (props or data from other hooks) and the returned value does not change when those dependencies change. Under normal circumstances, the returned value will change when those external values change and this hook is not needed.",source:"@site/docs/api/react/useStateValueWithReactiveSelector.mdx",sourceDirName:"api/react",slug:"/api/react/useStateValueWithReactiveSelector",permalink:"/cotton-box/docs/api/react/useStateValueWithReactiveSelector",draft:!1,unlisted:!1,editUrl:"https://github.com/glyph-cat/cotton-box/tree/main/packages/docs/docs/api/react/useStateValueWithReactiveSelector.mdx",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"apiSidebar",previous:{title:"useSimpleStateValueWithReactiveSelector",permalink:"/cotton-box/docs/api/react/useSimpleStateValueWithReactiveSelector"},next:{title:"Miscellaneous",permalink:"/cotton-box/docs/api/misc"}},f={},v=[{value:"Overview",id:"overview",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2},{value:"Basic",id:"basic",level:3},{value:"Custom equality checking",id:"custom-equality-checking",level:3},{value:"Conditionally watch for changes",id:"conditionally-watch-for-changes",level:3}];function j(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,i.R)(),...e.components},{Details:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"usestatevaluewithreactiveselector",children:"useStateValueWithReactiveSelector"}),"\n",(0,a.jsx)(m.n,{children:(0,a.jsxs)(t.p,{children:["This is provided as an escape hatch in special cases where ",(0,a.jsx)(c.L,{href:`${p.k.DOCS_API_REACT_URL}/useStateValue`,children:"useStateValue"})," is not behaving as expected. For example, the selector depends on external values (props or data from other hooks) and the returned value does not change when those dependencies change. Under normal circumstances, the returned value will change when those external values change and this hook is not needed."]})}),"\n",(0,a.jsx)(t.h2,{id:"overview",children:"Overview"}),"\n",(0,a.jsx)(h.t,{children:h.p.Function}),"\n",(0,a.jsx)(d.r,{children:p.k.TSDOC_DESC_USE_STATE_VALUE_WITH_REACTIVE_SELECTOR}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-js",children:"const state = useStateValueWithReactiveSelector(stateManager, selector)\n"})}),"\n",(0,a.jsxs)(n,{children:[(0,a.jsx)("summary",{children:(0,a.jsx)("b",{children:"Overloads (+3)"})}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-js",children:"const state = useStateValueWithReactiveSelector(stateManager, selector, active)\n"})}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-js",children:"const state = useStateValueWithReactiveSelector(stateManager, selector, equalityFn)\n"})}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-js",children:"const state = useStateValueWithReactiveSelector(stateManager, selector, equalityFn, active)\n"})})]}),"\n",(0,a.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,a.jsx)(u.u,{data:[{name:"stateManager",type:[h.p.SimpleStateManager,h.p.StateManager,h.p.AsyncStateManager],description:p.k.TSDOC_PARAM_DESC_STATE_MANAGER},{name:"selector",type:h.p.StateSelector,description:p.k.TSDOC_PARAM_DESC_REACTIVE_SELECTOR},{name:"equalityFn",type:h.p.EqualityFn,defaultValue:`[\`Object.is\`](${p.k.API_REFERENCE_URL_OBJECT_IS})`,description:p.k.TSDOC_PARAM_DESC_REACTIVE_EQUALITY_FN},{name:"active",type:h.p.boolean,defaultValue:"`true`",description:p.k.TSDOC_PARAM_DESC_ACTIVE}]}),"\n",(0,a.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,a.jsx)(t.h3,{id:"basic",children:"Basic"}),"\n",(0,a.jsx)(l.IG,{code:o}),"\n",(0,a.jsx)(t.h3,{id:"custom-equality-checking",children:"Custom equality checking"}),"\n",(0,a.jsx)(l.IG,{code:r}),"\n",(0,a.jsx)(t.h3,{id:"conditionally-watch-for-changes",children:"Conditionally watch for changes"}),"\n",(0,a.jsx)(l.IG,{code:s})]})}function y(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(j,{...e})}):j(e)}},7293:(e,t,n)=>{n.d(t,{A:()=>k});var a=n(6540),i=n(4848);function s(e){const{mdxAdmonitionTitle:t,rest:n}=function(e){const t=a.Children.toArray(e),n=t.find((e=>a.isValidElement(e)&&"mdxAdmonitionTitle"===e.type)),s=t.filter((e=>e!==n)),o=n?.props.children;return{mdxAdmonitionTitle:o,rest:s.length>0?(0,i.jsx)(i.Fragment,{children:s}):null}}(e.children),s=e.title??t;return{...e,...s&&{title:s},children:n}}var o=n(8215),r=n(1312),c=n(7559);const l={admonition:"admonition_xJq3",admonitionHeading:"admonitionHeading_Gvgb",admonitionIcon:"admonitionIcon_Rf37",admonitionContent:"admonitionContent_BuS1"};function d(e){let{type:t,className:n,children:a}=e;return(0,i.jsx)("div",{className:(0,o.A)(c.G.common.admonition,c.G.common.admonitionType(t),l.admonition,n),children:a})}function u(e){let{icon:t,title:n}=e;return(0,i.jsxs)("div",{className:l.admonitionHeading,children:[(0,i.jsx)("span",{className:l.admonitionIcon,children:t}),n]})}function h(e){let{children:t}=e;return t?(0,i.jsx)("div",{className:l.admonitionContent,children:t}):null}function m(e){const{type:t,icon:n,title:a,children:s,className:o}=e;return(0,i.jsxs)(d,{type:t,className:o,children:[a||n?(0,i.jsx)(u,{title:a,icon:n}):null,(0,i.jsx)(h,{children:s})]})}function p(e){return(0,i.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})})}const S={icon:(0,i.jsx)(p,{}),title:(0,i.jsx)(r.A,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function x(e){return(0,i.jsx)(m,{...S,...e,className:(0,o.A)("alert alert--secondary",e.className),children:e.children})}function g(e){return(0,i.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})})}const f={icon:(0,i.jsx)(g,{}),title:(0,i.jsx)(r.A,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function v(e){return(0,i.jsx)(m,{...f,...e,className:(0,o.A)("alert alert--success",e.className),children:e.children})}function j(e){return(0,i.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})})}const y={icon:(0,i.jsx)(j,{}),title:(0,i.jsx)(r.A,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function b(e){return(0,i.jsx)(m,{...y,...e,className:(0,o.A)("alert alert--info",e.className),children:e.children})}function E(e){return(0,i.jsx)("svg",{viewBox:"0 0 16 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})})}const _={icon:(0,i.jsx)(E,{}),title:(0,i.jsx)(r.A,{id:"theme.admonition.warning",description:"The default label used for the Warning admonition (:::warning)",children:"warning"})};function R(e){return(0,i.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})})}const A={icon:(0,i.jsx)(R,{}),title:(0,i.jsx)(r.A,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};const C={icon:(0,i.jsx)(E,{}),title:(0,i.jsx)(r.A,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};const N={...{note:x,tip:v,info:b,warning:function(e){return(0,i.jsx)(m,{..._,...e,className:(0,o.A)("alert alert--warning",e.className),children:e.children})},danger:function(e){return(0,i.jsx)(m,{...A,...e,className:(0,o.A)("alert alert--danger",e.className),children:e.children})}},...{secondary:e=>(0,i.jsx)(x,{title:"secondary",...e}),important:e=>(0,i.jsx)(b,{title:"important",...e}),success:e=>(0,i.jsx)(v,{title:"success",...e}),caution:function(e){return(0,i.jsx)(m,{...C,...e,className:(0,o.A)("alert alert--warning",e.className),children:e.children})}}};function k(e){const t=s(e),n=(a=t.type,N[a]||(console.warn(`No admonition component found for admonition type "${a}". Using Info as fallback.`),N.info));var a;return(0,i.jsx)(n,{...t})}},6386:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(1400),i=n(4848);function s(e){let{label:t,children:n}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("span",{className:a.A.label,children:`${t}: `}),n]})}},9235:(e,t,n)=>{n.d(t,{IG:()=>f,P3:()=>j});var a=n(4477),i=n(9047),s=n(5293),o=n(8553),r=n(5938),c=n(6540),l=n(4848);const d="index.js",u="App.tsx",h="styles.css",m="index.module.css",p=!1,S={[d]:["import { createRoot } from 'react-dom/client'","import App from './App.tsx'",`import './${h}'`,"","const root = createRoot(document.getElementById('root'))","root.render(<App />)",""].join("\n"),[h]:["body {","  font-family: sans-serif;","  -webkit-font-smoothing: auto;","  -moz-font-smoothing: auto;","  -moz-osx-font-smoothing: grayscale;","  font-smoothing: auto;","  text-rendering: optimizeLegibility;","  font-smooth: always;","  -webkit-tap-highlight-color: transparent;","  -webkit-touch-callout: none;","}"].join("\n"),"package.json":["{",`  "main": "${d}",`,'  "dependencies": {','    "react": "^18.0.0",','    "react-dom": "^18.0.0",','    "react-scripts": "^5.0.0"',"  }","}"].join("\n"),"public/index.html":["<!DOCTYPE html>",'<html lang="en">',"  <head>",'    <meta charset="UTF-8">','    <meta name="viewport" content="width=device-width, initial-scale=1.0">',"    <title>Example</title>","  </head>","  <body>",'    <div id="root"></div>',"  </body>","</html>"].join("\n")};function x(){const{colorMode:e}=(0,s.G)();return"light"===e?i.Zw:i.$o}const g={customSetup:{dependencies:{"cotton-box":"latest","cotton-box-react":"latest"}},options:{editorWidthPercentage:65,editorHeight:"45vh",showLineNumbers:!0,showRefreshButton:!0,showTabs:!1,wrapContent:!0}};function f(e){return(0,r.i)()?(0,l.jsx)(v,{...e}):null}function v(e){let{code:t,css:n,extraDependencies:i,options:s}=e;const o=x();return(0,l.jsx)(l.Fragment,{children:p?(0,l.jsx)(a.l5,{files:{...S,[u]:t,...n?{[m]:n}:{}},...g,theme:o,customSetup:{...g.customSetup,entry:d,dependencies:{...g.customSetup.dependencies,...i}},options:{...g.options,activeFile:u,showConsole:/console\./.test(t),...s},children:(0,l.jsxs)(a.am,{children:[(0,l.jsx)(b,{}),(0,l.jsx)(a.G5,{})]})}):(0,l.jsx)(a.OZ,{files:{...S,[u]:t,...n?{[m]:n}:{}},...g,theme:o,customSetup:{...g.customSetup,entry:d,dependencies:{...g.customSetup.dependencies,...i}},options:{...g.options,activeFile:u,showConsole:/console\./.test(t),...s}})})}function j(e){return(0,r.i)()?(0,l.jsx)(y,{...e}):null}function y(e){let{code:t}=e;const n=x();return(0,l.jsx)(l.Fragment,{children:p?(0,l.jsx)(a.l5,{files:{[d]:t},...g,theme:n,customSetup:{...g.customSetup,entry:d},options:{...g.options,activeFile:d},children:(0,l.jsxs)(a.am,{children:[(0,l.jsx)(b,{}),(0,l.jsx)(a.X2,{})]})}):(0,l.jsx)(a.OZ,{files:{[d]:t},...g,theme:n,customSetup:{...g.customSetup,entry:d},options:{...g.options,activeFile:d,layout:"console"}})})}function b(){const{code:e,updateCode:t}=(0,a.Pe)(),{sandpack:n}=(0,a.ny)();return(0,l.jsx)(a.aN,{children:(0,l.jsx)("div",{style:{flex:1},children:(0,l.jsx)(o.Ay,{language:"typescript",theme:"vs-dark",defaultValue:e,onChange:(0,c.useCallback)((e=>t(e||"")),[t]),options:{fontSize:14,minimap:{enabled:!1},scrollBeyondLastLine:!1,wordWrap:"on"}},n.activeFile)})})}},2301:(e,t,n)=>{n.d(t,{u:()=>d});var a=n(6540),i=n(6386),s=n(1400),o=n(9562),r=n(7600);const c={li:"li_zBtQ",readonly:"readonly_EJF0",parameterName:"parameterName_jSio",specifications:"specifications_uYt5"};var l=n(4848);function d(e){let{data:t,hideOptional:n,requireEitherOne:d}=e;const u=[];for(const h of t){const{name:e,type:t,readonly:m,isOptional:p,defaultValue:S,description:x,typeIsArrayOf:g}=h;u.push((0,l.jsxs)("li",{className:c.li,children:[m&&(0,l.jsx)("span",{className:c.readonly,children:"readonly"}),(0,l.jsx)("code",{className:c.parameterName,children:e})," \u2014 ",(0,l.jsx)(o.r,{unwrapParagraph:!0,children:x}),(0,l.jsxs)("span",{className:c.specifications,children:[(0,l.jsx)("br",{}),(0,l.jsx)(r.t,{containerElement:a.Fragment,typeIsArrayOf:g,children:t}),!n&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("br",{}),(0,l.jsxs)(i.Z,{label:"Required",children:[p||S?"No":"Yes"+(d?" (either one)":""),S&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("span",{className:s.A.label,children:" \u2014 (default value: "}),(0,l.jsx)(o.r,{unwrapParagraph:!0,children:S}),(0,l.jsx)("span",{className:s.A.label,children:")"})]})]})]}),(0,l.jsx)("br",{})]})]},e))}return(0,l.jsx)("ul",{children:u})}},7600:(e,t,n)=>{n.d(t,{p:()=>c,t:()=>l});var a=n(3439),i=n(6280),s=n(6386),o=n(1400),r=n(4848);let c=function(e){return e[e.any=0]="any",e[e.boolean=1]="boolean",e[e.string=2]="string",e[e.Function=3]="Function",e[e.Array=4]="Array",e[e.class=5]="class",e[e.interface=6]="interface",e[e.type=7]="type",e[e.enum=8]="enum",e[e.SimpleStateManager=9]="SimpleStateManager",e[e.StateManager=10]="StateManager",e[e.AsyncStateManager=11]="AsyncStateManager",e[e.StateManagerVisibility=12]="StateManagerVisibility",e[e.SimpleStateManagerOptions=13]="SimpleStateManagerOptions",e[e.StateManagerOptions=14]="StateManagerOptions",e[e.SetStateFn=15]="SetStateFn",e[e.StateSelector=16]="StateSelector",e[e.WaitEvaluator=17]="WaitEvaluator",e[e.EqualityFn=18]="EqualityFn",e[e.BuildType=19]="BuildType",e[e.FunctionComponent=20]="FunctionComponent",e[e.ReactNode=21]="ReactNode",e}({});function l(e){let{children:t,containerElement:n="p",typeIsArrayOf:a}=e;const l=Array.isArray(t)?t:[t],u=[];for(let s=0;s<l.length;s++){const e=l[s];u.push((0,r.jsx)(i.L,{href:d[e],children:c[e]},e)),s<l.length-1&&u.push((0,r.jsx)("span",{className:o.A.label,children:s===l.length-2?" or ":", "},s))}return(0,r.jsx)(n,{children:(0,r.jsx)(s.Z,{label:"Type",children:a?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.L,{href:d[c.Array],children:"Array"}),(0,r.jsx)("span",{className:o.A.label,children:" (of "}),u,(0,r.jsx)("span",{className:o.A.label,children:")"})]}):u})})}const d={[c.any]:a.k.TYPE_REFERENCE_URL_ANY,[c.boolean]:a.k.TYPE_REFERENCE_URL_BOOLEAN,[c.string]:a.k.TYPE_REFERENCE_URL_STRING,[c.Function]:a.k.TYPE_REFERENCE_URL_FUNCTION,[c.Array]:a.k.TYPE_REFERENCE_URL_ARRAY,[c.class]:a.k.TYPE_REFERENCE_URL_CLASS,[c.interface]:a.k.TYPE_REFERENCE_URL_INTERFACE,[c.type]:a.k.TYPE_REFERENCE_URL_TYPE,[c.enum]:a.k.TYPE_REFERENCE_URL_ENUM,[c.StateManagerVisibility]:`${a.k.DOCS_API_CORE_URL}/StateManagerVisibility`,[c.SimpleStateManager]:`${a.k.DOCS_API_CORE_URL}/SimpleStateManager`,[c.StateManager]:`${a.k.DOCS_API_CORE_URL}/StateManager`,[c.AsyncStateManager]:`${a.k.DOCS_API_CORE_URL}/AsyncStateManager`,[c.SimpleStateManagerOptions]:`${a.k.DOCS_API_CORE_URL}/SimpleStateManagerOptions`,[c.StateManagerOptions]:`${a.k.DOCS_API_CORE_URL}/StateManagerOptions`,[c.SetStateFn]:`${a.k.DOCS_API_CORE_URL}/SetStateFn`,[c.StateSelector]:`${a.k.DOCS_API_CORE_URL}/StateSelector`,[c.WaitEvaluator]:`${a.k.DOCS_API_CORE_URL}/WaitEvaluator`,[c.EqualityFn]:`${a.k.DOCS_API_CORE_URL}/EqualityFn`,[c.BuildType]:`${a.k.DOCS_API_MISC_URL}/BuildType`,[c.FunctionComponent]:"https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components",[c.ReactNode]:"https://react.dev/learn/typescript#typing-children"}},7483:(e,t,n)=>{n.d(t,{n:()=>s});var a=n(7293),i=n(4848);function s(e){let{children:t}=e;return(0,i.jsxs)(a.A,{type:"warning",title:"Caution: Unstable API",children:[(0,i.jsx)("p",{children:"The accepted parameters, return value and behavior of this function may change, and it might be renamed or entirely removed between minor versions in future releases."}),t&&(0,i.jsx)("p",{children:t})]})}},1400:(e,t,n)=>{n.d(t,{A:()=>a});const a={label:"label_LtL6"}}}]);