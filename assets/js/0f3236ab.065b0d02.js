"use strict";(self.webpackChunkcotton_box_docs=self.webpackChunkcotton_box_docs||[]).push([[9924],{1666:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>u,contentTitle:()=>x,default:()=>_,frontMatter:()=>m,metadata:()=>S,toc:()=>E});var t=n(4848),r=n(8453),s=n(6280),l=n(4322),i=n(6386),d=n(9562),c=n(2301),o=n(4912),h=n(7600),p=n(3439);n(3230);const m={sidebar_position:2},x="StateManager",S={id:"api/core/StateManager",title:"StateManager",description:"{/ Construction formula for this article: Copy everything to SimpleStateManager, change signature, change options param for constructor, then add a section for init and mention which properties and methods are inherited /}",source:"@site/docs/api/core/StateManager.mdx",sourceDirName:"api/core",slug:"/api/core/StateManager",permalink:"/cotton-box/docs/api/core/StateManager",draft:!1,unlisted:!1,editUrl:"https://github.com/glyph-cat/cotton-box/tree/main/packages/docs/docs/api/core/StateManager.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"apiSidebar",previous:{title:"SimpleStateManager",permalink:"/cotton-box/docs/api/core/SimpleStateManager"},next:{title:"AsyncStateManager",permalink:"/cotton-box/docs/api/core/AsyncStateManager"}},u={},E=[{value:"Overview",id:"overview",level:2},{value:"Constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Example",id:"example",level:4},{value:"Properties",id:"properties",level:2},{value:"defaultState",id:"defaultstate",level:3},{value:"name",id:"name",level:3},{value:"isInitializing",id:"isinitializing",level:3},{value:"Methods",id:"methods",level:2},{value:"init",id:"init",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns",level:4},{value:"Example",id:"example-1",level:4},{value:"get",id:"get",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Example",id:"example-2",level:4},{value:"set",id:"set",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Example",id:"example-3",level:4},{value:"reset",id:"reset",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Example",id:"example-4",level:4},{value:"watch",id:"watch",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Example",id:"example-5",level:4},{value:"unwatchAll",id:"unwatchall",level:3},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Example",id:"example-6",level:4},{value:"wait",id:"wait",level:3},{value:"Parameters",id:"parameters-7",level:4},{value:"Returns",id:"returns-6",level:4},{value:"Example",id:"example-7",level:4},{value:"waitForInit",id:"waitforinit",level:3},{value:"Parameters",id:"parameters-8",level:4},{value:"Returns",id:"returns-7",level:4},{value:"Example",id:"example-8",level:4},{value:"dispose",id:"dispose",level:3},{value:"Parameters",id:"parameters-9",level:4},{value:"Returns",id:"returns-8",level:4},{value:"Example",id:"example-9",level:4}];function j(e){const a={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.h1,{id:"statemanager",children:"StateManager"}),"\n","\n",(0,t.jsx)(a.h2,{id:"overview",children:"Overview"}),"\n",(0,t.jsx)(h.t,{children:h.p.class}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_DESC_STATE_MANAGER}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"class StateManager<State> extends SimpleStateManager<State> { }\n"})}),"\n",(0,t.jsx)(a.h3,{id:"constructor",children:"Constructor"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"constructor(defaultState: State, options: StateManagerOptions)\n"})}),"\n",(0,t.jsx)(a.h4,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(c.u,{data:[{name:"defaultState",type:h.p.any,description:p.k.COMMON_DESC_DEFAULT_STATE},{name:"options",type:h.p.StateManagerOptions,defaultValue:"`{}`",description:p.k.TSDOC_PARAM_DESC_STATE_MANAGER_OPTIONS_GENERAL}]}),"\n",(0,t.jsx)(a.h4,{id:"example",children:"Example"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"import { StateManager } from '{:CORE_PACKAGE_NAME:}'\n\nconst ExampleState = new StateManager('...')\n"})}),"\n",(0,t.jsx)(a.h2,{id:"properties",children:"Properties"}),"\n",(0,t.jsx)(a.h3,{id:"defaultstate",children:"defaultState"}),"\n",(0,t.jsx)(l.z,{href:"./SimpleStateManager#defaultState",name:"SimpleStateManager.defaultState"}),"\n",(0,t.jsx)(d.r,{children:p.k.COMMON_DESC_DEFAULT_STATE}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"readonly defaultState: State\n"})}),"\n",(0,t.jsx)(a.h3,{id:"name",children:"name"}),"\n",(0,t.jsx)(l.z,{href:"./SimpleStateManager#name",name:"SimpleStateManager.name"}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_DESC_OPTIONS_NAME}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"readonly name: string | undefined\n"})}),"\n",(0,t.jsx)(a.h3,{id:"isinitializing",children:"isInitializing"}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_DESC_IS_INITIALIZING}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"readonly isInitializing: boolean\n"})}),"\n",(0,t.jsx)(a.h2,{id:"methods",children:"Methods"}),"\n",(0,t.jsx)(a.h3,{id:"init",children:"init"}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_METHOD_DESC_INIT}),"\n",(0,t.jsx)("p",{children:(0,t.jsx)(i.Z,{label:"Also see",children:(0,t.jsx)(s.L,{href:"./StateManagerInitArgs",children:"StateManagerInitArgs"})})}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"init(initFn: (args: StateManagerInitArgs<State>) => void | Promise<void>): Promise<void>\n"})}),"\n",(0,t.jsx)(a.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,t.jsx)(c.u,{data:[{name:"initFn",type:h.p.Function,description:p.k.TSDOC_PARAM_DESC_INIT_FN}]}),"\n",(0,t.jsx)(a.h4,{id:"returns",children:"Returns"}),"\n",(0,t.jsx)(o.g,{name:"init",children:p.k.RETURN_DESC_INIT}),"\n",(0,t.jsx)(a.h4,{id:"example-1",children:"Example"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"await ExampleState.init(({ commit }) => {\n  const someValue = localStorage.get('some-value')\n  commit(someValue)\n})\n"})}),"\n",(0,t.jsx)(a.h3,{id:"get",children:"get"}),"\n",(0,t.jsx)(l.z,{href:"./SimpleStateManager#get",name:"SimpleStateManager.get"}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_METHOD_DESC_GET}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"get(): State\n"})}),"\n",(0,t.jsx)(a.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,t.jsx)(o.U,{name:"get"}),"\n",(0,t.jsx)(a.h4,{id:"returns-1",children:"Returns"}),"\n",(0,t.jsx)(o.g,{name:"get",children:p.k.RETURN_DESC_GET}),"\n",(0,t.jsx)(a.h4,{id:"example-2",children:"Example"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"const state = ExampleState.get()\n"})}),"\n",(0,t.jsx)(a.h3,{id:"set",children:"set"}),"\n",(0,t.jsx)(l.z,{href:"./SimpleStateManager#set",name:"SimpleStateManager.set"}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_METHOD_DESC_SET_BY_VALUE}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"set(newState: State): void\n"})}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_METHOD_DESC_SET_BY_FUNCTION}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"set(setStateFn: SetStateFn<State>): void\n"})}),"\n",(0,t.jsx)(a.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,t.jsxs)(a.p,{children:[(0,t.jsx)(a.code,{children:"set"})," takes either one of the following parameters:"]}),"\n",(0,t.jsx)(c.u,{requireEitherOne:!0,data:[{name:"newState",type:h.p.any,description:p.k.TSDOC_PARAM_DESC_SET_NEW_STATE},{name:"setStateFn",type:h.p.SetStateFn,description:p.k.TSDOC_PARAM_DESC_SET_FUNCTION}]}),"\n",(0,t.jsx)(a.h4,{id:"returns-2",children:"Returns"}),"\n",(0,t.jsx)(o.g,{name:"set",children:p.k.RETURN_DESC_SET}),"\n",(0,t.jsx)(a.h4,{id:"example-3",children:"Example"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"// Assuming that state is of type `number`\nExampleState.set(42)\nExampleState.set((previousState) => previousState + 1)\n"})}),"\n",(0,t.jsx)(a.h3,{id:"reset",children:"reset"}),"\n",(0,t.jsx)(l.z,{href:"./SimpleStateManager#reset",name:"SimpleStateManager.reset"}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_METHOD_DESC_RESET}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"reset(): void\n"})}),"\n",(0,t.jsx)(a.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,t.jsx)(o.U,{name:"reset"}),"\n",(0,t.jsx)(a.h4,{id:"returns-3",children:"Returns"}),"\n",(0,t.jsx)(o.g,{name:"reset",children:p.k.RETURN_DESC_RESET}),"\n",(0,t.jsx)(a.h4,{id:"example-4",children:"Example"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"ExampleState.reset()\n"})}),"\n",(0,t.jsx)(a.h3,{id:"watch",children:"watch"}),"\n",(0,t.jsx)(l.z,{href:"./SimpleStateManager#watch",name:"SimpleStateManager.watch"}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_METHOD_DESC_WATCH}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"watch(callback: (state: State) => void): () => void\n"})}),"\n",(0,t.jsx)(a.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,t.jsx)(c.u,{data:[{name:"callback",type:h.p.Function,description:p.k.TSDOC_PARAM_DESC_WATCH_CALLBACK}]}),"\n",(0,t.jsx)(a.h4,{id:"returns-4",children:"Returns"}),"\n",(0,t.jsx)(o.g,{name:"watch",children:p.k.RETURN_DESC_WATCH}),"\n",(0,t.jsx)(a.h4,{id:"example-5",children:"Example"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"const unwatch = ExampleState.watch((state) => { console.log(state) })\n// \xb7\xb7\xb7 then after some time \xb7\xb7\xb7\nunwatch()\n"})}),"\n",(0,t.jsx)(a.h3,{id:"unwatchall",children:"unwatchAll"}),"\n",(0,t.jsx)(l.z,{href:"./SimpleStateManager#unwatchAll",name:"SimpleStateManager.unwatchAll"}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_METHOD_DESC_UNWATCH_ALL}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"unwatchAll(): void\n"})}),"\n",(0,t.jsx)(a.h4,{id:"parameters-6",children:"Parameters"}),"\n",(0,t.jsx)(o.U,{name:"unwatchAll"}),"\n",(0,t.jsx)(a.h4,{id:"returns-5",children:"Returns"}),"\n",(0,t.jsx)(o.g,{name:"unwatchAll",children:p.k.RETURN_DESC_UNWATCH_ALL}),"\n",(0,t.jsx)(a.h4,{id:"example-6",children:"Example"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"ExampleState.unwatchAll()\n"})}),"\n",(0,t.jsx)(a.h3,{id:"wait",children:"wait"}),"\n",(0,t.jsx)(l.z,{href:"./SimpleStateManager#wait",name:"SimpleStateManager.wait"}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_METHOD_DESC_WAIT_BY_VALUE}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"wait(expectedValue: State): Promise<State>\n"})}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_METHOD_DESC_WAIT_BY_EVALUATOR}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"wait(evaluator: WaitEvaluator<State>): Promise<State>\n"})}),"\n",(0,t.jsx)(a.h4,{id:"parameters-7",children:"Parameters"}),"\n",(0,t.jsxs)(a.p,{children:[(0,t.jsx)(a.code,{children:"wait"})," takes either one of the following parameters:"]}),"\n",(0,t.jsx)(c.u,{requireEitherOne:!0,data:[{name:"expectedValue",type:h.p.any,description:p.k.TSDOC_PARAM_DESC_WAIT_EXPECTED_VALUE},{name:"evaluator",type:h.p.WaitEvaluator,description:p.k.TSDOC_PARAM_DESC_WAIT_EVALUATOR}]}),"\n",(0,t.jsx)(a.h4,{id:"returns-6",children:"Returns"}),"\n",(0,t.jsx)(o.g,{name:"wait",children:p.k.RETURN_DESC_WAIT}),"\n",(0,t.jsx)(a.h4,{id:"example-7",children:"Example"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"// Promise will resolve when the state value becomes `42`.\nawait ExampleState.wait(42)\n\n// Promise will resolve when the function returns `true`.\nawait ExampleState.wait((state) => fulfillsSomeCondition(state))\n"})}),"\n",(0,t.jsx)(a.h3,{id:"waitforinit",children:"waitForInit"}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_METHOD_DESC_WAIT_FOR_INIT}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"waitForInit(state?: boolean): Promise<void>\n"})}),"\n",(0,t.jsx)(a.h4,{id:"parameters-8",children:"Parameters"}),"\n",(0,t.jsx)(c.u,{data:[{name:"state",type:h.p.boolean,description:p.k.TSDOC_PARAM_DESC_WAIT_FOR_INIT_STATE,isOptional:!0}]}),"\n",(0,t.jsx)(a.h4,{id:"returns-7",children:"Returns"}),"\n",(0,t.jsx)(o.g,{name:"waitForInit",children:p.k.RETURN_DESC_WAIT_FOR_INIT}),"\n",(0,t.jsx)(a.h4,{id:"example-8",children:"Example"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"await ExampleState.waitForInit()\n"})}),"\n",(0,t.jsx)(a.h3,{id:"dispose",children:"dispose"}),"\n",(0,t.jsx)(l.z,{href:"./SimpleStateManager#dispose",name:"SimpleStateManager.dispose"}),"\n",(0,t.jsx)(d.r,{children:p.k.TSDOC_METHOD_DESC_DISPOSE}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-ts",children:"dispose(): void\n"})}),"\n",(0,t.jsx)(a.h4,{id:"parameters-9",children:"Parameters"}),"\n",(0,t.jsx)(o.U,{name:"dispose"}),"\n",(0,t.jsx)(a.h4,{id:"returns-8",children:"Returns"}),"\n",(0,t.jsx)(o.g,{name:"dispose",children:p.k.RETURN_DESC_DISPOSE}),"\n",(0,t.jsx)(a.h4,{id:"example-9",children:"Example"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-js",children:"ExampleState.dispose()\n"})})]})}function _(e={}){const{wrapper:a}={...(0,r.R)(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(j,{...e})}):j(e)}},4322:(e,a,n)=>{n.d(a,{z:()=>i});var t=n(3230),r=n(3849),s=n(6386),l=n(4848);function i(e){let{name:a,href:n}=e;return(0,l.jsx)("p",{children:(0,l.jsx)(s.Z,{label:"Inherited from",children:(0,l.jsx)(r.N,{href:n,children:(0,l.jsx)(t.A,{children:a})})})})}},6386:(e,a,n)=>{n.d(a,{Z:()=>s});var t=n(1400),r=n(4848);function s(e){let{label:a,children:n}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{className:t.A.label,children:`${a}: `}),n]})}},2301:(e,a,n)=>{n.d(a,{u:()=>o});var t=n(6540),r=n(6386),s=n(1400),l=n(9562),i=n(7600);const d={li:"li_zBtQ",readonly:"readonly_EJF0",parameterName:"parameterName_jSio",specifications:"specifications_uYt5"};var c=n(4848);function o(e){let{data:a,hideOptional:n,requireEitherOne:o}=e;const h=[];for(const p of a){const{name:e,type:a,readonly:m,isOptional:x,defaultValue:S,description:u,typeIsArrayOf:E}=p;h.push((0,c.jsxs)("li",{className:d.li,children:[m&&(0,c.jsx)("span",{className:d.readonly,children:"readonly"}),(0,c.jsx)("code",{className:d.parameterName,children:e})," \u2014 ",(0,c.jsx)(l.r,{unwrapParagraph:!0,children:u}),(0,c.jsxs)("span",{className:d.specifications,children:[(0,c.jsx)("br",{}),(0,c.jsx)(i.t,{containerElement:t.Fragment,typeIsArrayOf:E,children:a}),!n&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("br",{}),(0,c.jsxs)(r.Z,{label:"Required",children:[x||S?"No":"Yes"+(o?" (either one)":""),S&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:s.A.label,children:" \u2014 (default value: "}),(0,c.jsx)(l.r,{unwrapParagraph:!0,children:S}),(0,c.jsx)("span",{className:s.A.label,children:")"})]})]})]}),(0,c.jsx)("br",{})]})]},e))}return(0,c.jsx)("ul",{children:h})}},4912:(e,a,n)=>{n.d(a,{U:()=>i,g:()=>c});var t=n(3230),r=n(9562),s=n(3439),l=n(4848);function i(e){let{name:a}=e;return(0,l.jsxs)("p",{children:[(0,l.jsx)(t.A,{children:a})," does not take any parameters."]})}function d(e){let{name:a}=e;return(0,l.jsxs)("p",{children:[(0,l.jsx)(t.A,{children:a})," does not return anything."]})}function c(e){let{name:a,children:n}=e;if(n===s.k.TYPE_UNDEFINED)return(0,l.jsx)(d,{name:a});{const e=n.split("");return e[0]=e[0].toLowerCase(),(0,l.jsx)(r.r,{children:`\`${a}\` returns ${e.join("")}`})}}},7600:(e,a,n)=>{n.d(a,{p:()=>d,t:()=>c});var t=n(3439),r=n(6280),s=n(6386),l=n(1400),i=n(4848);let d=function(e){return e[e.any=0]="any",e[e.boolean=1]="boolean",e[e.string=2]="string",e[e.Function=3]="Function",e[e.Array=4]="Array",e[e.class=5]="class",e[e.interface=6]="interface",e[e.type=7]="type",e[e.enum=8]="enum",e[e.SimpleStateManager=9]="SimpleStateManager",e[e.StateManager=10]="StateManager",e[e.AsyncStateManager=11]="AsyncStateManager",e[e.StateManagerVisibility=12]="StateManagerVisibility",e[e.SimpleStateManagerOptions=13]="SimpleStateManagerOptions",e[e.StateManagerOptions=14]="StateManagerOptions",e[e.SetStateFn=15]="SetStateFn",e[e.StateSelector=16]="StateSelector",e[e.WaitEvaluator=17]="WaitEvaluator",e[e.EqualityFn=18]="EqualityFn",e[e.BuildType=19]="BuildType",e[e.FunctionComponent=20]="FunctionComponent",e[e.ReactNode=21]="ReactNode",e}({});function c(e){let{children:a,containerElement:n="p",typeIsArrayOf:t}=e;const c=Array.isArray(a)?a:[a],h=[];for(let s=0;s<c.length;s++){const e=c[s];h.push((0,i.jsx)(r.L,{href:o[e],children:d[e]},e)),s<c.length-1&&h.push((0,i.jsx)("span",{className:l.A.label,children:s===c.length-2?" or ":", "},s))}return(0,i.jsx)(n,{children:(0,i.jsx)(s.Z,{label:"Type",children:t?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.L,{href:o[d.Array],children:"Array"}),(0,i.jsx)("span",{className:l.A.label,children:" (of "}),h,(0,i.jsx)("span",{className:l.A.label,children:")"})]}):h})})}const o={[d.any]:t.k.TYPE_REFERENCE_URL_ANY,[d.boolean]:t.k.TYPE_REFERENCE_URL_BOOLEAN,[d.string]:t.k.TYPE_REFERENCE_URL_STRING,[d.Function]:t.k.TYPE_REFERENCE_URL_FUNCTION,[d.Array]:t.k.TYPE_REFERENCE_URL_ARRAY,[d.class]:t.k.TYPE_REFERENCE_URL_CLASS,[d.interface]:t.k.TYPE_REFERENCE_URL_INTERFACE,[d.type]:t.k.TYPE_REFERENCE_URL_TYPE,[d.enum]:t.k.TYPE_REFERENCE_URL_ENUM,[d.StateManagerVisibility]:`${t.k.DOCS_API_CORE_URL}/StateManagerVisibility`,[d.SimpleStateManager]:`${t.k.DOCS_API_CORE_URL}/SimpleStateManager`,[d.StateManager]:`${t.k.DOCS_API_CORE_URL}/StateManager`,[d.AsyncStateManager]:`${t.k.DOCS_API_CORE_URL}/AsyncStateManager`,[d.SimpleStateManagerOptions]:`${t.k.DOCS_API_CORE_URL}/SimpleStateManagerOptions`,[d.StateManagerOptions]:`${t.k.DOCS_API_CORE_URL}/StateManagerOptions`,[d.SetStateFn]:`${t.k.DOCS_API_CORE_URL}/SetStateFn`,[d.StateSelector]:`${t.k.DOCS_API_CORE_URL}/StateSelector`,[d.WaitEvaluator]:`${t.k.DOCS_API_CORE_URL}/WaitEvaluator`,[d.EqualityFn]:`${t.k.DOCS_API_CORE_URL}/EqualityFn`,[d.BuildType]:`${t.k.DOCS_API_MISC_URL}/BuildType`,[d.FunctionComponent]:"https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components",[d.ReactNode]:"https://react.dev/learn/typescript#typing-children"}},1400:(e,a,n)=>{n.d(a,{A:()=>t});const t={label:"label_LtL6"}}}]);