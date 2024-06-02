"use strict";(self.webpackChunkcotton_box_docs=self.webpackChunkcotton_box_docs||[]).push([[5117],{7638:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>S,contentTitle:()=>u,default:()=>x,frontMatter:()=>d,metadata:()=>m,toc:()=>h});var a=n(4848),i=n(8453);const s="import { StateManager } from 'cotton-box'\nimport { useInitState, useStateValue } from 'cotton-box-react'\n\nexport default function App(): JSX.Element {\n  const isInitializing = useInitState(UserState)\n  return (\n    <>\n      <button onClick={UserState.reinitialize}>Reinitialize</button>\n      {isInitializing\n        ? <div>Loading...</div>\n        : <SubComponent />\n      }\n    </>\n  )\n}\n\nfunction SubComponent(): JSX.Element {\n  const user = useStateValue(UserState)\n  return (\n    <div>\n      <h1>Hello, {user.firstName} {user.lastName}!</h1>\n    </div>\n  )\n}\n\ninterface IUserState {\n  firstName: string\n  lastName: string\n  luckyNumber: number\n}\n\nconst UserState = new StateManager<IUserState>(null, {\n  lifecycle: {\n    async init({ commit }) {\n      await delay(1000)\n      commit({\n        firstName: 'John',\n        lastName: 'Smith',\n        luckyNumber: null,\n      })\n    },\n  }\n})\n\nfunction delay(timeout: number): Promise<void> {\n  return new Promise((resolve) => {\n    setTimeout(resolve, timeout)\n  })\n}\n";var r=n(9235),o=n(9562),l=n(2301),c=n(7600),p=n(3439);const d={sidebar_position:3},u="useInitState",m={id:"api/react/useInitState",title:"useInitState",description:"Overview",source:"@site/docs/api/react/useInitState.mdx",sourceDirName:"api/react",slug:"/api/react/useInitState",permalink:"/cotton-box/docs/api/react/useInitState",draft:!1,unlisted:!1,editUrl:"https://github.com/glyph-cat/cotton-box/tree/main/packages/docs/docs/api/react/useInitState.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"apiSidebar",previous:{title:"useStateValue",permalink:"/cotton-box/docs/api/react/useStateValue"},next:{title:"useScoped",permalink:"/cotton-box/docs/api/react/useScoped"}},S={},h=[{value:"Overview",id:"overview",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Examples",id:"examples",level:2}];function E(e){const t={code:"code",h1:"h1",h2:"h2",pre:"pre",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"useinitstate",children:"useInitState"}),"\n",(0,a.jsx)(t.h2,{id:"overview",children:"Overview"}),"\n",(0,a.jsx)(c.t,{children:c.p.Function}),"\n",(0,a.jsx)(o.r,{children:p.k.TSDOC_DESC_USE_INIT_STATE}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-js",children:"const state = useInitState(stateManager)\n"})}),"\n",(0,a.jsx)(t.h2,{id:"parameters",children:"Parameters"}),"\n",(0,a.jsx)(l.u,{data:[{name:"stateManager",type:c.p.SimpleStateManager,description:p.k.TSDOC_PARAM_DESC_STATE_MANAGER}]}),"\n",(0,a.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,a.jsx)(r.I,{code:s})]})}function x(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(E,{...e})}):E(e)}},6386:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(1400),i=n(4848);function s(e){let{label:t,children:n}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("span",{className:a.A.label,children:`${t}: `}),n]})}},9235:(e,t,n)=>{n.d(t,{I:()=>h,P:()=>E});var a=n(4477),i=n(9047),s=n(8553),r=n(6540),o=n(4848);const l="index.js",c="App.tsx",p="styles.css",d="index.module.css",u=!1,m={[l]:["import { createRoot } from 'react-dom/client'","import App from './App.tsx'",`import './${p}'`,"","const root = createRoot(document.getElementById('root'))","root.render(<App />)",""].join("\n"),[p]:["body {","  font-family: sans-serif;","  -webkit-font-smoothing: auto;","  -moz-font-smoothing: auto;","  -moz-osx-font-smoothing: grayscale;","  font-smoothing: auto;","  text-rendering: optimizeLegibility;","  font-smooth: always;","  -webkit-tap-highlight-color: transparent;","  -webkit-touch-callout: none;","}"].join("\n"),"package.json":["{",`  "main": "${l}",`,'  "dependencies": {','    "react": "^18.0.0",','    "react-dom": "^18.0.0",','    "react-scripts": "^5.0.0"',"  }","}"].join("\n"),"public/index.html":["<!DOCTYPE html>",'<html lang="en">',"  <head>",'    <meta charset="UTF-8">','    <meta name="viewport" content="width=device-width, initial-scale=1.0">',"    <title>Example</title>","  </head>","  <body>",'    <div id="root"></div>',"  </body>","</html>"].join("\n")},S={theme:i.$o,customSetup:{dependencies:{"cotton-box":"latest","cotton-box-react":"latest"}},options:{editorWidthPercentage:65,editorHeight:"45vh",showLineNumbers:!0,showRefreshButton:!0,showTabs:!1,wrapContent:!0}};function h(e){let{code:t,css:n,extraDependencies:i,options:s}=e;return(0,o.jsx)(o.Fragment,{children:u?(0,o.jsx)(a.l5,{files:{...m,[c]:t,...n?{[d]:n}:{}},...S,customSetup:{...S.customSetup,entry:l,dependencies:{...S.customSetup.dependencies,...i}},options:{...S.options,activeFile:c,showConsole:/console\./.test(t),...s},children:(0,o.jsxs)(a.am,{children:[(0,o.jsx)(x,{}),(0,o.jsx)(a.G5,{})]})}):(0,o.jsx)(a.OZ,{files:{...m,[c]:t,...n?{[d]:n}:{}},...S,customSetup:{...S.customSetup,entry:l,dependencies:{...S.customSetup.dependencies,...i}},options:{...S.options,activeFile:c,showConsole:/console\./.test(t),...s}})})}function E(e){let{code:t}=e;return(0,o.jsx)(o.Fragment,{children:u?(0,o.jsx)(a.l5,{files:{[l]:t},...S,customSetup:{...S.customSetup,entry:l},options:{...S.options,activeFile:l},children:(0,o.jsxs)(a.am,{children:[(0,o.jsx)(x,{}),(0,o.jsx)(a.X2,{})]})}):(0,o.jsx)(a.OZ,{files:{[l]:t},...S,customSetup:{...S.customSetup,entry:l},options:{...S.options,activeFile:l,layout:"console"}})})}function x(){const{code:e,updateCode:t}=(0,a.Pe)(),{sandpack:n}=(0,a.ny)();return(0,o.jsx)(a.aN,{children:(0,o.jsx)("div",{style:{flex:1},children:(0,o.jsx)(s.Ay,{language:"typescript",theme:"vs-dark",defaultValue:e,onChange:(0,r.useCallback)((e=>t(e||"")),[t]),options:{fontSize:14,minimap:{enabled:!1},scrollBeyondLastLine:!1,wordWrap:"on"}},n.activeFile)})})}},2301:(e,t,n)=>{n.d(t,{u:()=>p});var a=n(6540),i=n(6386),s=n(1400),r=n(9562),o=n(7600);const l={li:"li_zBtQ",readonly:"readonly_EJF0",parameterName:"parameterName_jSio",specifications:"specifications_uYt5"};var c=n(4848);function p(e){let{data:t,hideOptional:n,requireEitherOne:p}=e;const d=[];for(const u of t){const{name:e,type:t,readonly:m,isOptional:S,defaultValue:h,description:E,typeIsArrayOf:x}=u;d.push((0,c.jsxs)("li",{className:l.li,children:[m&&(0,c.jsx)("span",{className:l.readonly,children:"readonly"}),(0,c.jsx)("code",{className:l.parameterName,children:e})," \u2014 ",(0,c.jsx)(r.r,{unwrapParagraph:!0,children:E}),(0,c.jsxs)("span",{className:l.specifications,children:[(0,c.jsx)("br",{}),(0,c.jsx)(o.t,{containerElement:a.Fragment,typeIsArrayOf:x,children:t}),!n&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("br",{}),(0,c.jsxs)(i.Z,{label:"Required",children:[S||h?"No":"Yes"+(p?" (either one)":""),h&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:s.A.label,children:" \u2014 (default value: "}),(0,c.jsx)(r.r,{unwrapParagraph:!0,children:h}),(0,c.jsx)("span",{className:s.A.label,children:")"})]})]})]}),(0,c.jsx)("br",{})]})]},e))}return(0,c.jsx)("ul",{children:d})}},7600:(e,t,n)=>{n.d(t,{p:()=>l,t:()=>c});var a=n(3439),i=n(6280),s=n(6386),r=n(1400),o=n(4848);let l=function(e){return e[e.any=0]="any",e[e.boolean=1]="boolean",e[e.string=2]="string",e[e.Function=3]="Function",e[e.Array=4]="Array",e[e.class=5]="class",e[e.interface=6]="interface",e[e.type=7]="type",e[e.enum=8]="enum",e[e.SimpleStateManager=9]="SimpleStateManager",e[e.StateManager=10]="StateManager",e[e.AsyncStateManager=11]="AsyncStateManager",e[e.StateManagerVisibility=12]="StateManagerVisibility",e[e.SimpleStateManagerOptions=13]="SimpleStateManagerOptions",e[e.StateManagerOptions=14]="StateManagerOptions",e[e.SetStateFn=15]="SetStateFn",e[e.StateSelector=16]="StateSelector",e[e.WaitEvaluator=17]="WaitEvaluator",e[e.EqualityFn=18]="EqualityFn",e[e.BuildType=19]="BuildType",e[e.FunctionComponent=20]="FunctionComponent",e[e.ReactNode=21]="ReactNode",e}({});function c(e){let{children:t,containerElement:n="p",typeIsArrayOf:a}=e;const c=Array.isArray(t)?t:[t],d=[];for(let s=0;s<c.length;s++){const e=c[s];d.push((0,o.jsx)(i.L,{href:p[e],children:l[e]},e)),s<c.length-1&&d.push((0,o.jsx)("span",{className:r.A.label,children:s===c.length-2?" or ":", "},s))}return(0,o.jsx)(n,{children:(0,o.jsx)(s.Z,{label:"Type",children:a?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.L,{href:p[l.Array],children:"Array"}),(0,o.jsx)("span",{className:r.A.label,children:" (of "}),d,(0,o.jsx)("span",{className:r.A.label,children:")"})]}):d})})}const p={[l.any]:a.k.TYPE_REFERENCE_URL_ANY,[l.boolean]:a.k.TYPE_REFERENCE_URL_BOOLEAN,[l.string]:a.k.TYPE_REFERENCE_URL_STRING,[l.Function]:a.k.TYPE_REFERENCE_URL_FUNCTION,[l.Array]:a.k.TYPE_REFERENCE_URL_ARRAY,[l.class]:a.k.TYPE_REFERENCE_URL_CLASS,[l.interface]:a.k.TYPE_REFERENCE_URL_INTERFACE,[l.type]:a.k.TYPE_REFERENCE_URL_TYPE,[l.enum]:a.k.TYPE_REFERENCE_URL_ENUM,[l.StateManagerVisibility]:`${a.k.DOCS_API_CORE_URL}/StateManagerVisibility`,[l.SimpleStateManager]:`${a.k.DOCS_API_CORE_URL}/SimpleStateManager`,[l.StateManager]:`${a.k.DOCS_API_CORE_URL}/StateManager`,[l.AsyncStateManager]:`${a.k.DOCS_API_CORE_URL}/AsyncStateManager`,[l.SimpleStateManagerOptions]:`${a.k.DOCS_API_CORE_URL}/SimpleStateManagerOptions`,[l.StateManagerOptions]:`${a.k.DOCS_API_CORE_URL}/StateManagerOptions`,[l.SetStateFn]:`${a.k.DOCS_API_CORE_URL}/SetStateFn`,[l.StateSelector]:`${a.k.DOCS_API_CORE_URL}/StateSelector`,[l.WaitEvaluator]:`${a.k.DOCS_API_CORE_URL}/WaitEvaluator`,[l.EqualityFn]:`${a.k.DOCS_API_CORE_URL}/EqualityFn`,[l.BuildType]:`${a.k.DOCS_API_MISC_URL}/BuildType`,[l.FunctionComponent]:"https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components",[l.ReactNode]:"https://react.dev/learn/typescript#typing-children"}},1400:(e,t,n)=>{n.d(t,{A:()=>a});const a={label:"label_LtL6"}}}]);