"use strict";(self.webpackChunkcotton_box_docs=self.webpackChunkcotton_box_docs||[]).push([[8412],{3747:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>d,toc:()=>p});var t=o(4848),c=o(8453),s=o(3849),i=o(8127),r=o(3439);const a={sidebar_position:1},l="Setup",d={id:"learn/react/setup",title:"Setup",description:"The minimum required version of React for cotton-box to work is 19.",source:"@site/docs/learn/react/setup.mdx",sourceDirName:"learn/react",slug:"/learn/react/setup",permalink:"/cotton-box/docs/learn/react/setup",draft:!1,unlisted:!1,editUrl:"https://github.com/glyph-cat/cotton-box/tree/main/packages/docs/docs/learn/react/setup.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"learnSidebar",previous:{title:"Using with React",permalink:"/cotton-box/docs/learn/react"},next:{title:"Quick Start",permalink:"/cotton-box/docs/learn/react/quick-start"}},u={},p=[{value:"Installation",id:"installation",level:2},{value:"Using a dependency manager",id:"using-a-dependency-manager",level:3},{value:"With UNPKG",id:"with-unpkg",level:3},{value:"For development",id:"for-development",level:4},{value:"For production",id:"for-production",level:4}];function h(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,c.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"setup",children:"Setup"}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsxs)(n.p,{children:["The minimum required version of React for ",(0,t.jsx)(n.code,{children:"cotton-box"})," to work is 19."]})}),"\n",(0,t.jsxs)(n.p,{children:["In order to use ",(0,t.jsx)(n.code,{children:"cotton-box"})," with ",(0,t.jsx)(s.N,{href:r.k.REACT_DOCS_SITE,children:"React"}),", we need to install ",(0,t.jsx)(n.code,{children:"cotton-box-react"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(n.h3,{id:"using-a-dependency-manager",children:"Using a dependency manager"}),"\n",(0,t.jsx)(i.j,{children:(0,t.jsxs)(n.p,{children:["yarn add ",r.k.CORE_PACKAGE_NAME,"\n// highlight-next-line\nyarn add ",r.k.REACT_PACKAGE_NAME]})}),"\n",(0,t.jsx)(n.h3,{id:"with-unpkg",children:"With UNPKG"}),"\n",(0,t.jsx)(n.h4,{id:"for-development",children:"For development"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-html",children:'<script src="https://www.unpkg.com/{:CORE_PACKAGE_NAME:}@<VERSION>/lib/umd/index.js" crossorigin><\/script>\n\x3c!-- highlight-next-line --\x3e\n<script src="https://www.unpkg.com/{:REACT_PACKAGE_NAME:}@<VERSION>/lib/umd/index.js" crossorigin><\/script>\n'})}),"\n",(0,t.jsx)(n.h4,{id:"for-production",children:"For production"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-html",children:'<script src="https://www.unpkg.com/{:CORE_PACKAGE_NAME:}@<VERSION>/lib/umd/index.min.js" crossorigin><\/script>\n\x3c!-- highlight-next-line --\x3e\n<script src="https://www.unpkg.com/{:REACT_PACKAGE_NAME:}@<VERSION>/lib/umd/index.min.js" crossorigin><\/script>\n'})}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsxs)(n.p,{children:["Then replace ",(0,t.jsx)(n.code,{children:"<VERSION>"})," with the version that you need."]})]})}function m(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},8127:(e,n,o)=>{o.d(n,{j:()=>r});var t=o(6124),c=o(1470),s=o(9365),i=o(4848);function r(e){let{children:n,title:o}=e;return n=n.props?n.props.children:n,Array.isArray(n)&&(n=n.join("")),(0,i.jsxs)(c.A,{groupId:"language",children:[(0,i.jsx)(s.A,{value:"yarn",label:"Yarn",default:!0,children:(0,i.jsx)(t.A,{language:"sh",title:o,children:n})}),(0,i.jsx)(s.A,{value:"npm",label:"NPM",default:!0,children:(0,i.jsx)(t.A,{language:"sh",title:o,children:n.replace(/yarn add/,"npm install")})})]})}},6124:(e,n,o)=>{o.d(n,{A:()=>R});var t=o(2303),c=o(3439);function s(e){const n=e.split("\n");for(let o=0;o<n.length;o++)n[o]=n[o].replace(/\s+$/,"");return n.join("\n")}var i=o(6540),r=o(4164),a=o(6058),l=o(7559),d=o(4291);const u={codeBlockContainer:"codeBlockContainer_APcc"};var p=o(4848);function h(e){let{as:n,...o}=e;const t=(0,a.A)(),c=(0,d.M$)(t);return(0,p.jsx)(n,{...o,style:c,className:(0,r.A)(o.className,u.codeBlockContainer,l.G.common.codeBlock)})}const m={codeBlockContent:"codeBlockContent_m3Ux",codeBlockTitle:"codeBlockTitle_P25_",codeBlock:"codeBlock_qGQc",codeBlockStandalone:"codeBlockStandalone_zC50",codeBlockLines:"codeBlockLines_p187",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_OFgW",buttonGroup:"buttonGroup_6DOT"};function g(e){let{children:n,className:o}=e;return(0,p.jsx)(h,{as:"pre",tabIndex:0,className:(0,r.A)(m.codeBlockStandalone,"thin-scrollbar",o),children:(0,p.jsx)("code",{className:m.codeBlockLines,children:n})})}var x=o(6342),b=o(6591),A=o(1765);const j={codeLine:"codeLine_iPqp",codeLineNumber:"codeLineNumber_F4P7",codeLineContent:"codeLineContent_pOih"};function k(e){let{line:n,classNames:o,showLineNumbers:t,getLineProps:c,getTokenProps:s}=e;1===n.length&&"\n"===n[0].content&&(n[0].content="");const i=c({line:n,className:(0,r.A)(o,t&&j.codeLine)}),a=n.map(((e,n)=>(0,p.jsx)("span",{...s({token:e})},n)));return(0,p.jsxs)("span",{...i,children:[t?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("span",{className:j.codeLineNumber}),(0,p.jsx)("span",{className:j.codeLineContent,children:a})]}):a,(0,p.jsx)("br",{})]})}var N=o(6861),C=o(1312),f=o(1473),B=o(4115);const _={copyButtonCopied:"copyButtonCopied__QnY",copyButtonIcons:"copyButtonIcons_FhaS",copyButtonIcon:"copyButtonIcon_phi_",copyButtonSuccessIcon:"copyButtonSuccessIcon_FfTR"};function E(e){let{code:n,className:o}=e;const[t,c]=(0,i.useState)(!1),s=(0,i.useRef)(void 0),a=(0,i.useCallback)((()=>{(0,N.A)(n),c(!0),s.current=window.setTimeout((()=>{c(!1)}),1e3)}),[n]);return(0,i.useEffect)((()=>()=>window.clearTimeout(s.current)),[]),(0,p.jsx)("button",{type:"button","aria-label":t?(0,C.T)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,C.T)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,C.T)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,r.A)("clean-btn",o,_.copyButton,t&&_.copyButtonCopied),onClick:a,children:(0,p.jsxs)("span",{className:_.copyButtonIcons,"aria-hidden":"true",children:[(0,p.jsx)(f.A,{className:_.copyButtonIcon}),(0,p.jsx)(B.A,{className:_.copyButtonSuccessIcon})]})})}var w=o(5048);const y={wordWrapButtonIcon:"wordWrapButtonIcon_iowe",wordWrapButtonEnabled:"wordWrapButtonEnabled_gY8A"};function v(e){let{className:n,onClick:o,isEnabled:t}=e;const c=(0,C.T)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,p.jsx)("button",{type:"button",onClick:o,className:(0,r.A)("clean-btn",n,t&&y.wordWrapButtonEnabled),"aria-label":c,title:c,children:(0,p.jsx)(w.A,{className:y.wordWrapButtonIcon,"aria-hidden":"true"})})}function T(e){let{children:n,className:o="",metastring:t,title:c,showLineNumbers:s,language:i}=e;const{prism:{defaultLanguage:l,magicComments:u}}=(0,x.p)(),g=function(e){return e?.toLowerCase()}(i??(0,d.Op)(o)??l),j=(0,a.A)(),N=(0,b.f)(),C=(0,d.wt)(t)||c,{lineClassNames:f,code:B}=(0,d.Li)(n,{metastring:t,language:g,magicComments:u}),_=s??(0,d._u)(t);return(0,p.jsxs)(h,{as:"div",className:(0,r.A)(o,g&&!o.includes(`language-${g}`)&&`language-${g}`),children:[C&&(0,p.jsx)("div",{className:m.codeBlockTitle,children:C}),(0,p.jsxs)("div",{className:m.codeBlockContent,children:[(0,p.jsx)(A.f4,{theme:j,code:B,language:g??"text",children:e=>{let{className:n,style:o,tokens:t,getLineProps:c,getTokenProps:s}=e;return(0,p.jsx)("pre",{tabIndex:0,ref:N.codeBlockRef,className:(0,r.A)(n,m.codeBlock,"thin-scrollbar"),style:o,children:(0,p.jsx)("code",{className:(0,r.A)(m.codeBlockLines,_&&m.codeBlockLinesWithNumbering),children:t.map(((e,n)=>(0,p.jsx)(k,{line:e,getLineProps:c,getTokenProps:s,classNames:f[n],showLineNumbers:_},n)))})})}}),(0,p.jsxs)("div",{className:m.buttonGroup,children:[(N.isEnabled||N.isCodeScrollable)&&(0,p.jsx)(v,{className:m.codeButton,onClick:()=>N.toggle(),isEnabled:N.isEnabled}),(0,p.jsx)(E,{className:m.codeButton,code:B})]})]})]})}function R(e){let{children:n,...o}=e;const r=(0,t.A)(),a=function(e){return i.Children.toArray(e).some((e=>(0,i.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(n),l="string"==typeof a?function(e,n,o){if(!e)return{data:"",unusedVariables:[]};const t=[];for(const c in n){const i=`-?{:${c}:}`;if((e.match(new RegExp(i,"g"))??[]).length>0){let t=n[c];o&&(t=s(t.replace(/\n/g,"\n * "))),e=e.replace(new RegExp(i,"g"),t)}else t.push(c)}return{data:e,unusedVariables:t}}(a,{CORE_PACKAGE_NAME:c.k.CORE_PACKAGE_NAME,REACT_PACKAGE_NAME:c.k.REACT_PACKAGE_NAME},!1).data:a,d="string"==typeof l?T:g;return(0,p.jsx)(d,{...o,children:l},String(r))}}}]);