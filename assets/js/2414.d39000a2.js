(self.webpackChunkcotton_box_docs=self.webpackChunkcotton_box_docs||[]).push([[2414],{7293:(e,t,n)=>{"use strict";n.d(t,{A:()=>T});var s=n(6540),a=n(4848);function r(e){const{mdxAdmonitionTitle:t,rest:n}=function(e){const t=s.Children.toArray(e),n=t.find((e=>s.isValidElement(e)&&"mdxAdmonitionTitle"===e.type)),r=t.filter((e=>e!==n)),i=n?.props.children;return{mdxAdmonitionTitle:i,rest:r.length>0?(0,a.jsx)(a.Fragment,{children:r}):null}}(e.children),r=e.title??t;return{...e,...r&&{title:r},children:n}}var i=n(8215),c=n(1312),l=n(7559);const o={admonition:"admonition_xJq3",admonitionHeading:"admonitionHeading_Gvgb",admonitionIcon:"admonitionIcon_Rf37",admonitionContent:"admonitionContent_BuS1"};function d(e){let{type:t,className:n,children:s}=e;return(0,a.jsx)("div",{className:(0,i.A)(l.G.common.admonition,l.G.common.admonitionType(t),o.admonition,n),children:s})}function u(e){let{icon:t,title:n}=e;return(0,a.jsxs)("div",{className:o.admonitionHeading,children:[(0,a.jsx)("span",{className:o.admonitionIcon,children:t}),n]})}function m(e){let{children:t}=e;return t?(0,a.jsx)("div",{className:o.admonitionContent,children:t}):null}function h(e){const{type:t,icon:n,title:s,children:r,className:i}=e;return(0,a.jsxs)(d,{type:t,className:i,children:[s||n?(0,a.jsx)(u,{title:s,icon:n}):null,(0,a.jsx)(m,{children:r})]})}function f(e){return(0,a.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})})}const p={icon:(0,a.jsx)(f,{}),title:(0,a.jsx)(c.A,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function x(e){return(0,a.jsx)(h,{...p,...e,className:(0,i.A)("alert alert--secondary",e.className),children:e.children})}function g(e){return(0,a.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})})}const j={icon:(0,a.jsx)(g,{}),title:(0,a.jsx)(c.A,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function v(e){return(0,a.jsx)(h,{...j,...e,className:(0,i.A)("alert alert--success",e.className),children:e.children})}function b(e){return(0,a.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})})}const A={icon:(0,a.jsx)(b,{}),title:(0,a.jsx)(c.A,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function y(e){return(0,a.jsx)(h,{...A,...e,className:(0,i.A)("alert alert--info",e.className),children:e.children})}function N(e){return(0,a.jsx)("svg",{viewBox:"0 0 16 16",...e,children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})})}const w={icon:(0,a.jsx)(N,{}),title:(0,a.jsx)(c.A,{id:"theme.admonition.warning",description:"The default label used for the Warning admonition (:::warning)",children:"warning"})};function C(e){return(0,a.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})})}const k={icon:(0,a.jsx)(C,{}),title:(0,a.jsx)(c.A,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};const E={icon:(0,a.jsx)(N,{}),title:(0,a.jsx)(c.A,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};const _={...{note:x,tip:v,info:y,warning:function(e){return(0,a.jsx)(h,{...w,...e,className:(0,i.A)("alert alert--warning",e.className),children:e.children})},danger:function(e){return(0,a.jsx)(h,{...k,...e,className:(0,i.A)("alert alert--danger",e.className),children:e.children})}},...{secondary:e=>(0,a.jsx)(x,{title:"secondary",...e}),important:e=>(0,a.jsx)(y,{title:"important",...e}),success:e=>(0,a.jsx)(v,{title:"success",...e}),caution:function(e){return(0,a.jsx)(h,{...E,...e,className:(0,i.A)("alert alert--warning",e.className),children:e.children})}}};function T(e){const t=r(e),n=(s=t.type,_[s]||(console.warn(`No admonition component found for admonition type "${s}". Using Info as fallback.`),_.info));var s;return(0,a.jsx)(n,{...t})}},4336:(e,t,n)=>{"use strict";n.d(t,{A:()=>x});n(6540);var s=n(8215),a=n(1312),r=n(7559),i=n(8774);const c={iconEdit:"iconEdit_Z9Sw"};var l=n(4848);function o(e){let{className:t,...n}=e;return(0,l.jsx)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,s.A)(c.iconEdit,t),"aria-hidden":"true",...n,children:(0,l.jsx)("g",{children:(0,l.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function d(e){let{editUrl:t}=e;return(0,l.jsxs)(i.A,{to:t,className:r.G.common.editThisPage,children:[(0,l.jsx)(o,{}),(0,l.jsx)(a.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}var u=n(6266);function m(e){let{lastUpdatedAt:t}=e;const n=new Date(t),s=(0,u.i)({day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(n);return(0,l.jsx)(a.A,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,l.jsx)("b",{children:(0,l.jsx)("time",{dateTime:n.toISOString(),itemProp:"dateModified",children:s})})},children:" on {date}"})}function h(e){let{lastUpdatedBy:t}=e;return(0,l.jsx)(a.A,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,l.jsx)("b",{children:t})},children:" by {user}"})}function f(e){let{lastUpdatedAt:t,lastUpdatedBy:n}=e;return(0,l.jsxs)("span",{className:r.G.common.lastUpdated,children:[(0,l.jsx)(a.A,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t?(0,l.jsx)(m,{lastUpdatedAt:t}):"",byUser:n?(0,l.jsx)(h,{lastUpdatedBy:n}):""},children:"Last updated{atDate}{byUser}"}),!1]})}const p={lastUpdated:"lastUpdated_JAkA"};function x(e){let{className:t,editUrl:n,lastUpdatedAt:a,lastUpdatedBy:r}=e;return(0,l.jsxs)("div",{className:(0,s.A)("row",t),children:[(0,l.jsx)("div",{className:"col",children:n&&(0,l.jsx)(d,{editUrl:n})}),(0,l.jsx)("div",{className:(0,s.A)("col",p.lastUpdated),children:(a||r)&&(0,l.jsx)(f,{lastUpdatedAt:a,lastUpdatedBy:r})})]})}},1473:(e,t,n)=>{"use strict";n.d(t,{A:()=>a});n(6540);var s=n(4848);function a(e){return(0,s.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,s.jsx)("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})})}},4115:(e,t,n)=>{"use strict";n.d(t,{A:()=>a});n(6540);var s=n(4848);function a(e){return(0,s.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,s.jsx)("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})})}},5048:(e,t,n)=>{"use strict";n.d(t,{A:()=>a});n(6540);var s=n(4848);function a(e){return(0,s.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,s.jsx)("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})})}},921:(e,t,n)=>{"use strict";n.d(t,{A:()=>U});var s=n(6540),a=n(8453),r=n(5260),i=n(6124),c=n(3230),l=n(4848);var o=n(9692);var d=n(8215),u=n(5066),m=n(3427),h=n(2303),f=n(1422);const p={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function x(e){return!!e&&("SUMMARY"===e.tagName||x(e.parentElement))}function g(e,t){return!!e&&(e===t||g(e.parentElement,t))}function j(e){let{summary:t,children:n,...a}=e;(0,m.A)().collectAnchor(a.id);const r=(0,h.A)(),i=(0,s.useRef)(null),{collapsed:c,setCollapsed:o}=(0,f.u)({initialState:!a.open}),[d,j]=(0,s.useState)(a.open),v=s.isValidElement(t)?t:(0,l.jsx)("summary",{children:t??"Details"});return(0,l.jsxs)("details",{...a,ref:i,open:d,"data-collapsed":c,className:(0,u.A)(p.details,r&&p.isBrowser,a.className),onMouseDown:e=>{x(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;x(t)&&g(t,i.current)&&(e.preventDefault(),c?(o(!1),j(!0)):o(!0))},children:[v,(0,l.jsx)(f.N,{lazy:!1,collapsed:c,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{o(e),j(!e)},children:(0,l.jsx)("div",{className:p.collapsibleContent,children:n})})]})}const v={details:"details_b_Ee"},b="alert alert--info";function A(e){let{...t}=e;return(0,l.jsx)(j,{...t,className:(0,d.A)(b,v.details,t.className)})}function y(e){const t=s.Children.toArray(e.children),n=t.find((e=>s.isValidElement(e)&&"summary"===e.type)),a=(0,l.jsx)(l.Fragment,{children:t.filter((e=>e!==n))});return(0,l.jsx)(A,{...e,summary:n,children:a})}var N=n(1107);function w(e){return(0,l.jsx)(N.A,{...e})}const C={containsTaskList:"containsTaskList_mC6p"};function k(e){if(void 0!==e)return(0,d.A)(e,e?.includes("contains-task-list")&&C.containsTaskList)}const E={img:"img_ev3q"};var _=n(7293);const T={Head:r.A,details:y,Details:y,code:function(e){return function(e){return void 0!==e.children&&s.Children.toArray(e.children).every((e=>"string"==typeof e&&!e.includes("\n")))}(e)?(0,l.jsx)(c.A,{...e}):(0,l.jsx)(i.A,{...e})},a:o.A,pre:function(e){return(0,l.jsx)(l.Fragment,{children:e.children})},ul:function(e){return(0,l.jsx)("ul",{...e,className:k(e.className)})},li:function(e){return(0,m.A)().collectAnchor(e.id),(0,l.jsx)("li",{...e})},img:function(e){return(0,l.jsx)("img",{decoding:"async",loading:"lazy",...e,className:(t=e.className,(0,d.A)(t,E.img))});var t},h1:e=>(0,l.jsx)(w,{as:"h1",...e}),h2:e=>(0,l.jsx)(w,{as:"h2",...e}),h3:e=>(0,l.jsx)(w,{as:"h3",...e}),h4:e=>(0,l.jsx)(w,{as:"h4",...e}),h5:e=>(0,l.jsx)(w,{as:"h5",...e}),h6:e=>(0,l.jsx)(w,{as:"h6",...e}),admonition:_.A,mermaid:()=>null};function U(e){let{children:t}=e;return(0,l.jsx)(a.x,{components:T,children:t})}},9022:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});n(6540);var s=n(8215),a=n(8774),r=n(4848);function i(e){const{permalink:t,title:n,subLabel:i,isNext:c}=e;return(0,r.jsxs)(a.A,{className:(0,s.A)("pagination-nav__link",c?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[i&&(0,r.jsx)("div",{className:"pagination-nav__sublabel",children:i}),(0,r.jsx)("div",{className:"pagination-nav__label",children:n})]})}},6133:(e,t,n)=>{"use strict";n.d(t,{A:()=>c});n(6540);var s=n(8215),a=n(8774);const r={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var i=n(4848);function c(e){let{permalink:t,label:n,count:c,description:l}=e;return(0,i.jsxs)(a.A,{href:t,title:l,className:(0,s.A)(r.tag,c?r.tagWithCount:r.tagRegular),children:[n,c&&(0,i.jsx)("span",{children:c})]})}},2053:(e,t,n)=>{"use strict";n.d(t,{A:()=>l});n(6540);var s=n(8215),a=n(1312),r=n(6133);const i={tags:"tags_jXut",tag:"tag_QGVx"};var c=n(4848);function l(e){let{tags:t}=e;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(a.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,c.jsx)("ul",{className:(0,s.A)(i.tags,"padding--none","margin-left--sm"),children:t.map((e=>(0,c.jsx)("li",{className:i.tag,children:(0,c.jsx)(r.A,{...e})},e.permalink)))})]})}},6591:(e,t,n)=>{"use strict";n.d(t,{f:()=>c});var s=n(6540),a=n(9532);const r={attributes:!0,characterData:!0,childList:!0,subtree:!0};function i(e,t){const[n,i]=(0,s.useState)(),c=(0,s.useCallback)((()=>{i(e.current?.closest("[role=tabpanel][hidden]"))}),[e,i]);(0,s.useEffect)((()=>{c()}),[c]),function(e,t,n){void 0===n&&(n=r);const i=(0,a._q)(t),c=(0,a.Be)(n);(0,s.useEffect)((()=>{const t=new MutationObserver(i);return e&&t.observe(e,c),()=>t.disconnect()}),[e,i,c])}(n,(e=>{e.forEach((e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),c())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}function c(){const[e,t]=(0,s.useState)(!1),[n,a]=(0,s.useState)(!1),r=(0,s.useRef)(null),c=(0,s.useCallback)((()=>{const n=r.current.querySelector("code");e?n.removeAttribute("style"):(n.style.whiteSpace="pre-wrap",n.style.overflowWrap="anywhere"),t((e=>!e))}),[r,e]),l=(0,s.useCallback)((()=>{const{scrollWidth:e,clientWidth:t}=r.current,n=e>t||r.current.querySelector("code").hasAttribute("style");a(n)}),[r]);return i(r,l),(0,s.useEffect)((()=>{l()}),[e,l]),(0,s.useEffect)((()=>(window.addEventListener("resize",l,{passive:!0}),()=>{window.removeEventListener("resize",l)})),[l]),{codeBlockRef:r,isEnabled:e,isCodeScrollable:n,toggle:c}}},6058:(e,t,n)=>{"use strict";n.d(t,{A:()=>r});var s=n(5293),a=n(6342);function r(){const{prism:e}=(0,a.p)(),{colorMode:t}=(0,s.G)(),n=e.theme,r=e.darkTheme||n;return"dark"===t?r:n}},6266:(e,t,n)=>{"use strict";n.d(t,{i:()=>a});var s=n(4586);function a(e){void 0===e&&(e={});const{i18n:{currentLocale:t}}=(0,s.A)(),n=function(){const{i18n:{currentLocale:e,localeConfigs:t}}=(0,s.A)();return t[e].calendar}();return new Intl.DateTimeFormat(t,{calendar:n,...e})}},4291:(e,t,n)=>{"use strict";n.d(t,{Li:()=>f,M$:()=>p,Op:()=>h,_u:()=>m,wt:()=>u});var s=n(8426),a=n.n(s);const r=/title=(?<quote>["'])(?<title>.*?)\1/,i=/\{(?<range>[\d,-]+)\}/,c={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},l={...c,lua:{start:"--",end:""},wasm:{start:"\\;\\;",end:""},tex:{start:"%",end:""},vb:{start:"['\u2018\u2019]",end:""},vbnet:{start:"(?:_\\s*)?['\u2018\u2019]",end:""},rem:{start:"[Rr][Ee][Mm]\\b",end:""},f90:{start:"!",end:""},ml:{start:"\\(\\*",end:"\\*\\)"},cobol:{start:"\\*>",end:""}},o=Object.keys(c);function d(e,t){const n=e.map((e=>{const{start:n,end:s}=l[e];return`(?:${n}\\s*(${t.flatMap((e=>[e.line,e.block?.start,e.block?.end].filter(Boolean))).join("|")})\\s*${s})`})).join("|");return new RegExp(`^\\s*(?:${n})\\s*$`)}function u(e){return e?.match(r)?.groups.title??""}function m(e){return Boolean(e?.includes("showLineNumbers"))}function h(e){const t=e.split(" ").find((e=>e.startsWith("language-")));return t?.replace(/language-/,"")}function f(e,t){let n=e.replace(/\n$/,"");const{language:s,magicComments:r,metastring:c}=t;if(c&&i.test(c)){const e=c.match(i).groups.range;if(0===r.length)throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${c}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);const t=r[0].className,s=a()(e).filter((e=>e>0)).map((e=>[e-1,[t]]));return{lineClassNames:Object.fromEntries(s),code:n}}if(void 0===s)return{lineClassNames:{},code:n};const l=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return d(["js","jsBlock"],t);case"jsx":case"tsx":return d(["js","jsBlock","jsx"],t);case"html":return d(["js","jsBlock","html"],t);case"python":case"py":case"bash":return d(["bash"],t);case"markdown":case"md":return d(["html","jsx","bash"],t);case"tex":case"latex":case"matlab":return d(["tex"],t);case"lua":case"haskell":case"sql":return d(["lua"],t);case"wasm":return d(["wasm"],t);case"vb":case"vba":case"visual-basic":return d(["vb","rem"],t);case"vbnet":return d(["vbnet","rem"],t);case"batch":return d(["rem"],t);case"basic":return d(["rem","f90"],t);case"fsharp":return d(["js","ml"],t);case"ocaml":case"sml":return d(["ml"],t);case"fortran":return d(["f90"],t);case"cobol":return d(["cobol"],t);default:return d(o,t)}}(s,r),u=n.split("\n"),m=Object.fromEntries(r.map((e=>[e.className,{start:0,range:""}]))),h=Object.fromEntries(r.filter((e=>e.line)).map((e=>{let{className:t,line:n}=e;return[n,t]}))),f=Object.fromEntries(r.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.start,t]}))),p=Object.fromEntries(r.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.end,t]})));for(let a=0;a<u.length;){const e=u[a].match(l);if(!e){a+=1;continue}const t=e.slice(1).find((e=>void 0!==e));h[t]?m[h[t]].range+=`${a},`:f[t]?m[f[t]].start=a:p[t]&&(m[p[t]].range+=`${m[p[t]].start}-${a-1},`),u.splice(a,1)}n=u.join("\n");const x={};return Object.entries(m).forEach((e=>{let[t,{range:n}]=e;a()(n).forEach((e=>{x[e]??=[],x[e].push(t)}))})),{lineClassNames:x,code:n}}function p(e){const t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach((e=>{let[s,a]=e;const r=t[s];r&&"string"==typeof a&&(n[r]=a)})),n}},8426:(e,t)=>{function n(e){let t,n=[];for(let s of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(s))n.push(parseInt(s,10));else if(t=s.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,s,a,r]=t;if(s&&r){s=parseInt(s),r=parseInt(r);const e=s<r?1:-1;"-"!==a&&".."!==a&&"\u2025"!==a||(r+=e);for(let t=s;t!==r;t+=e)n.push(t)}}return n}t.default=n,e.exports=n},6861:(e,t,n)=>{"use strict";function s(e,t){let{target:n=document.body}=void 0===t?{}:t;if("string"!=typeof e)throw new TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof e}\`.`);const s=document.createElement("textarea"),a=document.activeElement;s.value=e,s.setAttribute("readonly",""),s.style.contain="strict",s.style.position="absolute",s.style.left="-9999px",s.style.fontSize="12pt";const r=document.getSelection(),i=r.rangeCount>0&&r.getRangeAt(0);n.append(s),s.select(),s.selectionStart=0,s.selectionEnd=e.length;let c=!1;try{c=document.execCommand("copy")}catch{}return s.remove(),i&&(r.removeAllRanges(),r.addRange(i)),a&&a.focus(),c}n.d(t,{A:()=>s})},4164:(e,t,n)=>{"use strict";function s(e){var t,n,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e)){var r=e.length;for(t=0;t<r;t++)e[t]&&(n=s(e[t]))&&(a&&(a+=" "),a+=n)}else for(n in e)e[n]&&(a&&(a+=" "),a+=n);return a}n.d(t,{A:()=>a});const a=function(){for(var e,t,n=0,a="",r=arguments.length;n<r;n++)(e=arguments[n])&&(t=s(e))&&(a&&(a+=" "),a+=t);return a}}}]);