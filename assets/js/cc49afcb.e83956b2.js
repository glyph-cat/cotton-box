"use strict";(self.webpackChunkcotton_box_docs=self.webpackChunkcotton_box_docs||[]).push([[9338],{3022:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>S,contentTitle:()=>d,default:()=>_,frontMatter:()=>o,metadata:()=>h,toc:()=>p});var n=a(4848),i=a(8453),r=(a(6280),a(9562)),s=a(611),l=a(7600),c=a(3439);const o={sidebar_position:9},d="StateManagerVisibility",h={id:"api/core/StateManagerVisibility",title:"StateManagerVisibility",description:"Overview",source:"@site/docs/api/core/StateManagerVisibility.mdx",sourceDirName:"api/core",slug:"/api/core/StateManagerVisibility",permalink:"/cotton-box/docs/api/core/StateManagerVisibility",draft:!1,unlisted:!1,editUrl:"https://github.com/glyph-cat/cotton-box/tree/main/packages/docs/docs/api/core/StateManagerVisibility.mdx",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9},sidebar:"apiSidebar",previous:{title:"StateManagerDidSetArgs",permalink:"/cotton-box/docs/api/core/StateManagerDidSetArgs"},next:{title:"SetStateFn",permalink:"/cotton-box/docs/api/core/SetStateFn"}},S={},p=[{value:"Overview",id:"overview",level:2},{value:"Values",id:"values",level:2}];function E(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"statemanagervisibility",children:"StateManagerVisibility"}),"\n",(0,n.jsx)(t.h2,{id:"overview",children:"Overview"}),"\n",(0,n.jsx)(l.t,{children:l.p.enum}),"\n",(0,n.jsx)(r.r,{children:c.k.TSDOC_DESC_OPTIONS_VISIBILITY_DETAILED}),"\n",(0,n.jsx)("br",{}),"\n",(0,n.jsxs)(t.p,{children:["This can be specified in the ",(0,n.jsx)(t.a,{href:"/cotton-box/docs/api/core/StateManagerOptions",children:(0,n.jsx)(t.code,{children:"options"})})," parameter in the constructor of the State Manager:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { StateManager, StateManagerVisibility } from '{:CORE_PACKAGE_NAME:}'\n\nconst ExampleState = new StateManager('Hello, world!', {\n  visibility: StateManagerVisibility.HIDDEN,\n})\n"})}),"\n",(0,n.jsx)(t.h2,{id:"values",children:"Values"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Key"}),(0,n.jsx)(t.th,{style:{textAlign:"center"},children:"Value"}),(0,n.jsx)(t.th,{children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"ENVIRONMENT"})}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.code,{children:"0"})}),(0,n.jsx)(t.td,{children:c.k.DESC_STATE_MANAGER_VISIBILITY_ENVIRONMENT})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"EXPOSED"})}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.code,{children:"1"})}),(0,n.jsx)(t.td,{children:c.k.DESC_STATE_MANAGER_VISIBILITY_EXPOSED})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"HIDDEN"})}),(0,n.jsx)(t.td,{style:{textAlign:"center"},children:(0,n.jsx)(t.code,{children:"2"})}),(0,n.jsx)(t.td,{children:c.k.DESC_STATE_MANAGER_VISIBILITY_HIDDEN})]})]})]}),"\n",(0,n.jsx)("br",{}),"\n",(0,n.jsx)(s.b,{})]})}function _(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(E,{...e})}):E(e)}},6386:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(1400),i=a(4848);function r(e){let{label:t,children:a}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("span",{className:n.A.label,children:`${t}: `}),a]})}},611:(e,t,a)=>{a.d(t,{b:()=>c});var n=a(6025),i=a(3230),r=a(1122);const s={container:"container_RTTl",imgContainer:"imgContainer_SuJF",label:"label_TtvD"};var l=a(4848);function c(){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("p",{children:["The screenshots below show how State Managers with different ",(0,l.jsx)(i.A,{children:"visibility"})," values appear in the React Developer Tools."]}),(0,l.jsxs)("div",{className:s.container,children:[(0,l.jsxs)("div",{className:s.imgContainer,children:[(0,l.jsxs)("span",{className:s.label,children:["With ",(0,l.jsx)("code",{children:"StateManagerVisibility.HIDDEN"}),":"]}),(0,l.jsx)(r.A,{alt:"Inspecting an exposed state in React Dev Tools",sources:{light:(0,n.Ay)("/img/react-dev-tools-exposed-light.png"),dark:(0,n.Ay)("/img/react-dev-tools-exposed-dark.png")}})]}),(0,l.jsxs)("div",{className:s.imgContainer,children:[(0,l.jsxs)("span",{className:s.label,children:["With ",(0,l.jsx)("code",{children:"StateManagerVisibility.EXPOSED"}),":"]}),(0,l.jsx)(r.A,{alt:"Inspecting a hidden state in React Dev Tools",sources:{light:(0,n.Ay)("/img/react-dev-tools-hidden-light.png"),dark:(0,n.Ay)("/img/react-dev-tools-hidden-dark.png")}})]})]})]})}},7600:(e,t,a)=>{a.d(t,{p:()=>c,t:()=>o});var n=a(3439),i=a(6280),r=a(6386),s=a(1400),l=a(4848);let c=function(e){return e[e.any=0]="any",e[e.boolean=1]="boolean",e[e.string=2]="string",e[e.Function=3]="Function",e[e.Array=4]="Array",e[e.class=5]="class",e[e.interface=6]="interface",e[e.type=7]="type",e[e.enum=8]="enum",e[e.SimpleStateManager=9]="SimpleStateManager",e[e.StateManager=10]="StateManager",e[e.AsyncStateManager=11]="AsyncStateManager",e[e.StateManagerVisibility=12]="StateManagerVisibility",e[e.SimpleStateManagerOptions=13]="SimpleStateManagerOptions",e[e.StateManagerOptions=14]="StateManagerOptions",e[e.SetStateFn=15]="SetStateFn",e[e.StateSelector=16]="StateSelector",e[e.WaitEvaluator=17]="WaitEvaluator",e[e.EqualityFn=18]="EqualityFn",e[e.BuildType=19]="BuildType",e[e.FunctionComponent=20]="FunctionComponent",e[e.ReactNode=21]="ReactNode",e}({});function o(e){let{children:t,containerElement:a="p",typeIsArrayOf:n}=e;const o=Array.isArray(t)?t:[t],h=[];for(let r=0;r<o.length;r++){const e=o[r];h.push((0,l.jsx)(i.L,{href:d[e],children:c[e]},e)),r<o.length-1&&h.push((0,l.jsx)("span",{className:s.A.label,children:r===o.length-2?" or ":", "},r))}return(0,l.jsx)(a,{children:(0,l.jsx)(r.Z,{label:"Type",children:n?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.L,{href:d[c.Array],children:"Array"}),(0,l.jsx)("span",{className:s.A.label,children:" (of "}),h,(0,l.jsx)("span",{className:s.A.label,children:")"})]}):h})})}const d={[c.any]:n.k.TYPE_REFERENCE_URL_ANY,[c.boolean]:n.k.TYPE_REFERENCE_URL_BOOLEAN,[c.string]:n.k.TYPE_REFERENCE_URL_STRING,[c.Function]:n.k.TYPE_REFERENCE_URL_FUNCTION,[c.Array]:n.k.TYPE_REFERENCE_URL_ARRAY,[c.class]:n.k.TYPE_REFERENCE_URL_CLASS,[c.interface]:n.k.TYPE_REFERENCE_URL_INTERFACE,[c.type]:n.k.TYPE_REFERENCE_URL_TYPE,[c.enum]:n.k.TYPE_REFERENCE_URL_ENUM,[c.StateManagerVisibility]:`${n.k.DOCS_API_CORE_URL}/StateManagerVisibility`,[c.SimpleStateManager]:`${n.k.DOCS_API_CORE_URL}/SimpleStateManager`,[c.StateManager]:`${n.k.DOCS_API_CORE_URL}/StateManager`,[c.AsyncStateManager]:`${n.k.DOCS_API_CORE_URL}/AsyncStateManager`,[c.SimpleStateManagerOptions]:`${n.k.DOCS_API_CORE_URL}/SimpleStateManagerOptions`,[c.StateManagerOptions]:`${n.k.DOCS_API_CORE_URL}/StateManagerOptions`,[c.SetStateFn]:`${n.k.DOCS_API_CORE_URL}/SetStateFn`,[c.StateSelector]:`${n.k.DOCS_API_CORE_URL}/StateSelector`,[c.WaitEvaluator]:`${n.k.DOCS_API_CORE_URL}/WaitEvaluator`,[c.EqualityFn]:`${n.k.DOCS_API_CORE_URL}/EqualityFn`,[c.BuildType]:`${n.k.DOCS_API_MISC_URL}/BuildType`,[c.FunctionComponent]:"https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components",[c.ReactNode]:"https://react.dev/learn/typescript#typing-children"}},1400:(e,t,a)=>{a.d(t,{A:()=>n});const n={label:"label_LtL6"}}}]);