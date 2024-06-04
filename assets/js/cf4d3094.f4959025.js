"use strict";(self.webpackChunkcotton_box_docs=self.webpackChunkcotton_box_docs||[]).push([[2678],{90:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var o=n(4848),a=n(8453);const s="import { StateManager } from 'cotton-box'\n\nconst CounterState = new StateManager(0)\n\nconst collectedValues: Array<number> = []\nconst unwatch = CounterState.watch((state) => {\n  collectedValues.push(state)\n  if (collectedValues.length >= 10) {\n    console.log('Successfully collected 10 numbers')\n    clearInterval(intervalRef)\n    unwatch()\n  }\n})\n\nconst intervalRef = setInterval(() => {\n  // Generate random number between 1 to 100\n  CounterState.set(1 + Math.floor(Math.random() * 100))\n}, 1000)\n";var c=n(9235);const i={sidebar_position:3},r="Watching For State Changes",l={id:"learn/tutorial/watching-for-state-changes",title:"Watching For State Changes",description:"We can create a watcher to observe state changes with the .watch method.",source:"@site/docs/learn/tutorial/watching-for-state-changes.mdx",sourceDirName:"learn/tutorial",slug:"/learn/tutorial/watching-for-state-changes",permalink:"/cotton-box/docs/learn/tutorial/watching-for-state-changes",draft:!1,unlisted:!1,editUrl:"https://github.com/glyph-cat/cotton-box/tree/main/packages/docs/docs/learn/tutorial/watching-for-state-changes.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"learnSidebar",previous:{title:"Quick Start",permalink:"/cotton-box/docs/learn/tutorial/quick-start"},next:{title:"Waiting For State Change",permalink:"/cotton-box/docs/learn/tutorial/waiting-for-state-change"}},h={},d=[{value:"Example",id:"example",level:2}];function u(e){const t={code:"code",h1:"h1",h2:"h2",p:"p",...(0,a.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"watching-for-state-changes",children:"Watching For State Changes"}),"\n",(0,o.jsxs)(t.p,{children:["We can create a watcher to observe state changes with the ",(0,o.jsx)(t.code,{children:".watch"})," method."]}),"\n",(0,o.jsx)(t.p,{children:"It accepts a callback function as its parameter and it will be invoked whenever the state changes."}),"\n",(0,o.jsxs)(t.p,{children:["The ",(0,o.jsx)(t.code,{children:".watch"})," method returns a callback, that when called, will remove the watcher."]}),"\n",(0,o.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,o.jsxs)(t.p,{children:["In the example below, we have an interval that sets the ",(0,o.jsx)(t.code,{children:"CounterState"})," with random numbers every second."]}),"\n",(0,o.jsx)(t.p,{children:"A watcher is added to observe these changes and it will push the state values into an array. Once the array has 10 numbers, the unwatch function is called to stop watching."}),"\n",(0,o.jsx)(c.P3,{code:s})]})}function p(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},9235:(e,t,n)=>{n.d(t,{IG:()=>f,P3:()=>j});var o=n(4477),a=n(9047),s=n(5293),c=n(8553),i=n(5938),r=n(6540),l=n(4848);const h="index.js",d="App.tsx",u="styles.css",p="index.module.css",m=!1,x={[h]:["import { createRoot } from 'react-dom/client'","import App from './App.tsx'",`import './${u}'`,"","const root = createRoot(document.getElementById('root'))","root.render(<App />)",""].join("\n"),[u]:["body {","  font-family: sans-serif;","  -webkit-font-smoothing: auto;","  -moz-font-smoothing: auto;","  -moz-osx-font-smoothing: grayscale;","  font-smoothing: auto;","  text-rendering: optimizeLegibility;","  font-smooth: always;","  -webkit-tap-highlight-color: transparent;","  -webkit-touch-callout: none;","}"].join("\n"),"package.json":["{",`  "main": "${h}",`,'  "dependencies": {','    "react": "^18.0.0",','    "react-dom": "^18.0.0",','    "react-scripts": "^5.0.0"',"  }","}"].join("\n"),"public/index.html":["<!DOCTYPE html>",'<html lang="en">',"  <head>",'    <meta charset="UTF-8">','    <meta name="viewport" content="width=device-width, initial-scale=1.0">',"    <title>Example</title>","  </head>","  <body>",'    <div id="root"></div>',"  </body>","</html>"].join("\n")};function g(){const{colorMode:e}=(0,s.G)();return"light"===e?a.Zw:a.$o}const w={customSetup:{dependencies:{"cotton-box":"latest","cotton-box-react":"latest"}},options:{editorWidthPercentage:65,editorHeight:"45vh",showLineNumbers:!0,showRefreshButton:!0,showTabs:!1,wrapContent:!0}};function f(e){return(0,i.i)()?(0,l.jsx)(b,{...e}):null}function b(e){let{code:t,css:n,extraDependencies:a,options:s}=e;const c=g();return(0,l.jsx)(l.Fragment,{children:m?(0,l.jsx)(o.l5,{files:{...x,[d]:t,...n?{[p]:n}:{}},...w,theme:c,customSetup:{...w.customSetup,entry:h,dependencies:{...w.customSetup.dependencies,...a}},options:{...w.options,activeFile:d,showConsole:/console\./.test(t),...s},children:(0,l.jsxs)(o.am,{children:[(0,l.jsx)(y,{}),(0,l.jsx)(o.G5,{})]})}):(0,l.jsx)(o.OZ,{files:{...x,[d]:t,...n?{[p]:n}:{}},...w,theme:c,customSetup:{...w.customSetup,entry:h,dependencies:{...w.customSetup.dependencies,...a}},options:{...w.options,activeFile:d,showConsole:/console\./.test(t),...s}})})}function j(e){return(0,i.i)()?(0,l.jsx)(v,{...e}):null}function v(e){let{code:t}=e;const n=g();return(0,l.jsx)(l.Fragment,{children:m?(0,l.jsx)(o.l5,{files:{[h]:t},...w,theme:n,customSetup:{...w.customSetup,entry:h},options:{...w.options,activeFile:h},children:(0,l.jsxs)(o.am,{children:[(0,l.jsx)(y,{}),(0,l.jsx)(o.X2,{})]})}):(0,l.jsx)(o.OZ,{files:{[h]:t},...w,theme:n,customSetup:{...w.customSetup,entry:h},options:{...w.options,activeFile:h,layout:"console"}})})}function y(){const{code:e,updateCode:t}=(0,o.Pe)(),{sandpack:n}=(0,o.ny)();return(0,l.jsx)(o.aN,{children:(0,l.jsx)("div",{style:{flex:1},children:(0,l.jsx)(c.Ay,{language:"typescript",theme:"vs-dark",defaultValue:e,onChange:(0,r.useCallback)((e=>t(e||"")),[t]),options:{fontSize:14,minimap:{enabled:!1},scrollBeyondLastLine:!1,wordWrap:"on"}},n.activeFile)})})}}}]);