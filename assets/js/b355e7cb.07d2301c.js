"use strict";(self.webpackChunkcotton_box_docs=self.webpackChunkcotton_box_docs||[]).push([[6347],{667:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>S,contentTitle:()=>p,default:()=>u,frontMatter:()=>c,metadata:()=>d,toc:()=>_});var n=a(4848),r=a(8453),i=a(4940),s=a(2301),l=a(7600),o=a(3439);const c={sidebar_position:8},p="StateManagerInitArgs",d={id:"api/core/StateManagerInitArgs",title:"StateManagerInitArgs",description:"Overview",source:"@site/docs/api/core/StateManagerInitArgs.mdx",sourceDirName:"api/core",slug:"/api/core/StateManagerInitArgs",permalink:"/cotton-box/docs/api/core/StateManagerInitArgs",draft:!1,unlisted:!1,editUrl:"https://github.com/glyph-cat/cotton-box/tree/main/packages/docs/docs/api/core/StateManagerInitArgs.mdx",tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8},sidebar:"apiSidebar",previous:{title:"StateManagerLifecycle",permalink:"/cotton-box/docs/api/core/StateManagerLifecycle"},next:{title:"StateManagerDidSetArgs",permalink:"/cotton-box/docs/api/core/StateManagerDidSetArgs"}},S={},_=[{value:"Overview",id:"overview",level:2},{value:"Properties",id:"properties",level:2}];function E(e){const t={h1:"h1",h2:"h2",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"statemanagerinitargs",children:"StateManagerInitArgs"}),"\n",(0,n.jsx)(t.h2,{id:"overview",children:"Overview"}),"\n",(0,n.jsx)(l.t,{children:l.p.interface}),"\n",(0,n.jsx)(i.r,{children:o.k.TSDOC_DESC_STATE_MANAGER_INIT_ARGS}),"\n",(0,n.jsx)(t.h2,{id:"properties",children:"Properties"}),"\n",(0,n.jsx)(s.u,{hideOptional:!0,data:[{name:"currentState",type:l.p.any,description:o.k.COMMON_DESC_CURRENT_STATE},{name:"defaultState",type:l.p.any,description:o.k.COMMON_DESC_DEFAULT_STATE},{name:"commit",type:l.p.Function,description:o.k.TSDOC_DESC_INIT_COMMIT},{name:"commitNoop",type:l.p.Function,description:o.k.TSDOC_DESC_INIT_COMMIT_NOOP}]})]})}function u(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(E,{...e})}):E(e)}},6386:(e,t,a)=>{a.d(t,{Z:()=>i});var n=a(1400),r=a(4848);function i(e){let{label:t,children:a}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{className:n.A.label,children:`${t}: `}),a]})}},4940:(e,t,a)=>{a.d(t,{r:()=>s});var n=a(5089),r=a(3849),i=a(4848);function s(e){let{children:t,unwrapParagraph:a,...s}=e;return(0,i.jsx)(n.o,{components:{a:r.N},...s,disallowedElements:a?["p",...s?.disallowedElements||[]]:s.disallowedElements,unwrapDisallowed:s?.unwrapDisallowed??a,children:t})}},2301:(e,t,a)=>{a.d(t,{u:()=>p});var n=a(6540),r=a(6386),i=a(1400),s=a(4940),l=a(7600);const o={li:"li_zBtQ",readonly:"readonly_EJF0",parameterName:"parameterName_jSio",specifications:"specifications_uYt5"};var c=a(4848);function p(e){let{data:t,hideOptional:a,requireEitherOne:p}=e;const d=[];for(const S of t){const{name:e,type:t,readonly:_,isOptional:E,defaultValue:u,description:g,typeIsArrayOf:h}=S;d.push((0,c.jsxs)("li",{className:o.li,children:[_&&(0,c.jsx)("span",{className:o.readonly,children:"readonly"}),(0,c.jsx)("code",{className:o.parameterName,children:e})," \u2014 ",(0,c.jsx)(s.r,{unwrapParagraph:!0,children:g}),(0,c.jsxs)("span",{className:o.specifications,children:[(0,c.jsx)("br",{}),(0,c.jsx)(l.t,{containerElement:n.Fragment,typeIsArrayOf:h,children:t}),!a&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("br",{}),(0,c.jsxs)(r.Z,{label:"Required",children:[E||u?"No":"Yes"+(p?" (either one)":""),u&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:i.A.label,children:" \u2014 (default value: "}),(0,c.jsx)(s.r,{unwrapParagraph:!0,children:u}),(0,c.jsx)("span",{className:i.A.label,children:")"})]})]})]}),(0,c.jsx)("br",{})]})]},e))}return(0,c.jsx)("ul",{children:d})}},7600:(e,t,a)=>{a.d(t,{p:()=>o,t:()=>c});var n=a(3439),r=a(6280),i=a(6386),s=a(1400),l=a(4848);let o=function(e){return e[e.any=0]="any",e[e.boolean=1]="boolean",e[e.string=2]="string",e[e.Function=3]="Function",e[e.Array=4]="Array",e[e.class=5]="class",e[e.interface=6]="interface",e[e.type=7]="type",e[e.enum=8]="enum",e[e.SimpleStateManager=9]="SimpleStateManager",e[e.StateManager=10]="StateManager",e[e.AsyncStateManager=11]="AsyncStateManager",e[e.StateManagerVisibility=12]="StateManagerVisibility",e[e.SimpleStateManagerOptions=13]="SimpleStateManagerOptions",e[e.StateManagerOptions=14]="StateManagerOptions",e[e.SetStateFn=15]="SetStateFn",e[e.StateSelector=16]="StateSelector",e[e.WaitEvaluator=17]="WaitEvaluator",e[e.EqualityFn=18]="EqualityFn",e[e.BuildType=19]="BuildType",e[e.FunctionComponent=20]="FunctionComponent",e[e.ReactNode=21]="ReactNode",e}({});function c(e){let{children:t,containerElement:a="p",typeIsArrayOf:n}=e;const c=Array.isArray(t)?t:[t],d=[];for(let i=0;i<c.length;i++){const e=c[i];d.push((0,l.jsx)(r.L,{href:p[e],children:o[e]},e)),i<c.length-1&&d.push((0,l.jsx)("span",{className:s.A.label,children:i===c.length-2?" or ":", "},i))}return(0,l.jsx)(a,{children:(0,l.jsx)(i.Z,{label:"Type",children:n?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r.L,{href:p[o.Array],children:"Array"}),(0,l.jsx)("span",{className:s.A.label,children:" (of "}),d,(0,l.jsx)("span",{className:s.A.label,children:")"})]}):d})})}const p={[o.any]:n.k.TYPE_REFERENCE_URL_ANY,[o.boolean]:n.k.TYPE_REFERENCE_URL_BOOLEAN,[o.string]:n.k.TYPE_REFERENCE_URL_STRING,[o.Function]:n.k.TYPE_REFERENCE_URL_FUNCTION,[o.Array]:n.k.TYPE_REFERENCE_URL_ARRAY,[o.class]:n.k.TYPE_REFERENCE_URL_CLASS,[o.interface]:n.k.TYPE_REFERENCE_URL_INTERFACE,[o.type]:n.k.TYPE_REFERENCE_URL_TYPE,[o.enum]:n.k.TYPE_REFERENCE_URL_ENUM,[o.StateManagerVisibility]:`${n.k.DOCS_API_CORE_URL}/StateManagerVisibility`,[o.SimpleStateManager]:`${n.k.DOCS_API_CORE_URL}/SimpleStateManager`,[o.StateManager]:`${n.k.DOCS_API_CORE_URL}/StateManager`,[o.AsyncStateManager]:`${n.k.DOCS_API_CORE_URL}/AsyncStateManager`,[o.SimpleStateManagerOptions]:`${n.k.DOCS_API_CORE_URL}/SimpleStateManagerOptions`,[o.StateManagerOptions]:`${n.k.DOCS_API_CORE_URL}/StateManagerOptions`,[o.SetStateFn]:`${n.k.DOCS_API_CORE_URL}/SetStateFn`,[o.StateSelector]:`${n.k.DOCS_API_CORE_URL}/StateSelector`,[o.WaitEvaluator]:`${n.k.DOCS_API_CORE_URL}/WaitEvaluator`,[o.EqualityFn]:`${n.k.DOCS_API_CORE_URL}/EqualityFn`,[o.BuildType]:`${n.k.DOCS_API_MISC_URL}/BuildType`,[o.FunctionComponent]:"https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components",[o.ReactNode]:"https://react.dev/learn/typescript#typing-children"}},1400:(e,t,a)=>{a.d(t,{A:()=>n});const n={label:"label_LtL6"}}}]);