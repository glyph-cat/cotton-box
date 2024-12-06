"use strict";(self.webpackChunkcotton_box_docs=self.webpackChunkcotton_box_docs||[]).push([[7643],{5124:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});n(6540);var o=n(8215),a=n(4586),s=n(5500),i=n(7559),c=n(6535),r=n(7713),l=n(1463),d=n(3892),u=n(5260),p=n(6676),m=n(4848);function g(e){const t=(0,p.k)(e);return(0,m.jsx)(u.A,{children:(0,m.jsx)("script",{type:"application/ld+json",children:JSON.stringify(t)})})}function h(e){const{metadata:t}=e,{siteConfig:{title:n}}=(0,a.A)(),{blogDescription:o,blogTitle:i,permalink:c}=t,r="/"===c?n:i;return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(s.be,{title:r,description:o}),(0,m.jsx)(l.A,{tag:"blog_posts_list"})]})}function b(e){const{metadata:t,items:n,sidebar:o}=e;return(0,m.jsxs)(c.A,{sidebar:o,children:[(0,m.jsx)(d.A,{items:n}),(0,m.jsx)(r.A,{metadata:t})]})}function f(e){return(0,m.jsxs)(s.e3,{className:(0,o.A)(i.G.wrapper.blogPages,i.G.page.blogListPage),children:[(0,m.jsx)(h,{...e}),(0,m.jsx)(g,{...e}),(0,m.jsx)(b,{...e})]})}},7713:(e,t,n)=>{n.d(t,{A:()=>i});n(6540);var o=n(1312),a=n(9022),s=n(4848);function i(e){const{metadata:t}=e,{previousPage:n,nextPage:i}=t;return(0,s.jsxs)("nav",{className:"pagination-nav","aria-label":(0,o.T)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"}),children:[n&&(0,s.jsx)(a.A,{permalink:n,title:(0,s.jsx)(o.A,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)",children:"Newer Entries"})}),i&&(0,s.jsx)(a.A,{permalink:i,title:(0,s.jsx)(o.A,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)",children:"Older Entries"}),isNext:!0})]})}},3892:(e,t,n)=>{n.d(t,{A:()=>i});n(6540);var o=n(7131),a=n(4651),s=n(4848);function i(e){let{items:t,component:n=a.A}=e;return(0,s.jsx)(s.Fragment,{children:t.map((e=>{let{content:t}=e;return(0,s.jsx)(o.i,{content:t,children:(0,s.jsx)(n,{children:(0,s.jsx)(t,{})})},t.metadata.permalink)}))})}},6676:(e,t,n)=>{n.d(t,{k:()=>d,J:()=>u});var o=n(6025),a=n(4586),s=n(6803);var i=n(7131);const c=e=>new Date(e).toISOString();function r(e){const t=e.map(p);return{author:1===t.length?t[0]:t}}function l(e,t,n){return e?{image:m({imageUrl:t(e,{absolute:!0}),caption:`title image for the blog post: ${n}`})}:{}}function d(e){const{siteConfig:t}=(0,a.A)(),{withBaseUrl:n}=(0,o.hH)(),{metadata:{blogDescription:s,blogTitle:i,permalink:d}}=e,u=`${t.url}${d}`;return{"@context":"https://schema.org","@type":"Blog","@id":u,mainEntityOfPage:u,headline:i,description:s,blogPost:e.items.map((e=>function(e,t,n){const{assets:o,frontMatter:a,metadata:s}=e,{date:i,title:d,description:u,lastUpdatedAt:p}=s,m=o.image??a.image,g=a.keywords??[],h=`${t.url}${s.permalink}`,b=p?c(p):void 0;return{"@type":"BlogPosting","@id":h,mainEntityOfPage:h,url:h,headline:d,name:d,description:u,datePublished:i,...b?{dateModified:b}:{},...r(s.authors),...l(m,n,d),...g?{keywords:g}:{}}}(e.content,t,n)))}}function u(){const e=function(){const e=(0,s.A)(),t=e?.data?.blogMetadata;if(!t)throw new Error("useBlogMetadata() can't be called on the current route because the blog metadata could not be found in route context");return t}(),{assets:t,metadata:n}=(0,i.e)(),{siteConfig:d}=(0,a.A)(),{withBaseUrl:u}=(0,o.hH)(),{date:p,title:m,description:g,frontMatter:h,lastUpdatedAt:b}=n,f=t.image??h.image,x=h.keywords??[],k=b?c(b):void 0,A=`${d.url}${n.permalink}`;return{"@context":"https://schema.org","@type":"BlogPosting","@id":A,mainEntityOfPage:A,url:A,headline:m,name:m,description:g,datePublished:p,...k?{dateModified:k}:{},...r(n.authors),...l(f,u,m),...x?{keywords:x}:{},isPartOf:{"@type":"Blog","@id":`${d.url}${e.blogBasePath}`,name:e.blogTitle}}}function p(e){return{"@type":"Person",...e.name?{name:e.name}:{},...e.title?{description:e.title}:{},...e.url?{url:e.url}:{},...e.email?{email:e.email}:{},...e.imageURL?{image:e.imageURL}:{}}}function m(e){let{imageUrl:t,caption:n}=e;return{"@type":"ImageObject","@id":t,url:t,contentUrl:t,caption:n}}},6124:(e,t,n)=>{n.d(t,{A:()=>T});var o=n(2303),a=n(3439);function s(e){const t=e.split("\n");for(let n=0;n<t.length;n++)t[n]=t[n].replace(/\s+$/,"");return t.join("\n")}var i=n(6540),c=n(4164),r=n(6058),l=n(7559),d=n(4291);const u={codeBlockContainer:"codeBlockContainer_APcc"};var p=n(4848);function m(e){let{as:t,...n}=e;const o=(0,r.A)(),a=(0,d.M$)(o);return(0,p.jsx)(t,{...n,style:a,className:(0,c.A)(n.className,u.codeBlockContainer,l.G.common.codeBlock)})}const g={codeBlockContent:"codeBlockContent_m3Ux",codeBlockTitle:"codeBlockTitle_P25_",codeBlock:"codeBlock_qGQc",codeBlockStandalone:"codeBlockStandalone_zC50",codeBlockLines:"codeBlockLines_p187",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_OFgW",buttonGroup:"buttonGroup_6DOT"};function h(e){let{children:t,className:n}=e;return(0,p.jsx)(m,{as:"pre",tabIndex:0,className:(0,c.A)(g.codeBlockStandalone,"thin-scrollbar",n),children:(0,p.jsx)("code",{className:g.codeBlockLines,children:t})})}var b=n(6342),f=n(6591),x=n(8181);const k={codeLine:"codeLine_iPqp",codeLineNumber:"codeLineNumber_F4P7",codeLineContent:"codeLineContent_pOih"};function A(e){let{line:t,classNames:n,showLineNumbers:o,getLineProps:a,getTokenProps:s}=e;1===t.length&&"\n"===t[0].content&&(t[0].content="");const i=a({line:t,className:(0,c.A)(n,o&&k.codeLine)}),r=t.map(((e,t)=>(0,p.jsx)("span",{...s({token:e})},t)));return(0,p.jsxs)("span",{...i,children:[o?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("span",{className:k.codeLineNumber}),(0,p.jsx)("span",{className:k.codeLineContent,children:r})]}):r,(0,p.jsx)("br",{})]})}var B=n(6861),j=n(1312),N=n(1473),y=n(4115);const C={copyButtonCopied:"copyButtonCopied__QnY",copyButtonIcons:"copyButtonIcons_FhaS",copyButtonIcon:"copyButtonIcon_phi_",copyButtonSuccessIcon:"copyButtonSuccessIcon_FfTR"};function w(e){let{code:t,className:n}=e;const[o,a]=(0,i.useState)(!1),s=(0,i.useRef)(void 0),r=(0,i.useCallback)((()=>{(0,B.A)(t),a(!0),s.current=window.setTimeout((()=>{a(!1)}),1e3)}),[t]);return(0,i.useEffect)((()=>()=>window.clearTimeout(s.current)),[]),(0,p.jsx)("button",{type:"button","aria-label":o?(0,j.T)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,j.T)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,j.T)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,c.A)("clean-btn",n,C.copyButton,o&&C.copyButtonCopied),onClick:r,children:(0,p.jsxs)("span",{className:C.copyButtonIcons,"aria-hidden":"true",children:[(0,p.jsx)(N.A,{className:C.copyButtonIcon}),(0,p.jsx)(y.A,{className:C.copyButtonSuccessIcon})]})})}var _=n(5048);const E={wordWrapButtonIcon:"wordWrapButtonIcon_iowe",wordWrapButtonEnabled:"wordWrapButtonEnabled_gY8A"};function L(e){let{className:t,onClick:n,isEnabled:o}=e;const a=(0,j.T)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,p.jsx)("button",{type:"button",onClick:n,className:(0,c.A)("clean-btn",t,o&&E.wordWrapButtonEnabled),"aria-label":a,title:a,children:(0,p.jsx)(_.A,{className:E.wordWrapButtonIcon,"aria-hidden":"true"})})}function P(e){let{children:t,className:n="",metastring:o,title:a,showLineNumbers:s,language:i}=e;const{prism:{defaultLanguage:l,magicComments:u}}=(0,b.p)(),h=function(e){return e?.toLowerCase()}(i??(0,d.Op)(n)??l),k=(0,r.A)(),B=(0,f.f)(),j=(0,d.wt)(o)||a,{lineClassNames:N,code:y}=(0,d.Li)(t,{metastring:o,language:h,magicComments:u}),C=s??(0,d._u)(o);return(0,p.jsxs)(m,{as:"div",className:(0,c.A)(n,h&&!n.includes(`language-${h}`)&&`language-${h}`),children:[j&&(0,p.jsx)("div",{className:g.codeBlockTitle,children:j}),(0,p.jsxs)("div",{className:g.codeBlockContent,children:[(0,p.jsx)(x.f4,{theme:k,code:y,language:h??"text",children:e=>{let{className:t,style:n,tokens:o,getLineProps:a,getTokenProps:s}=e;return(0,p.jsx)("pre",{tabIndex:0,ref:B.codeBlockRef,className:(0,c.A)(t,g.codeBlock,"thin-scrollbar"),style:n,children:(0,p.jsx)("code",{className:(0,c.A)(g.codeBlockLines,C&&g.codeBlockLinesWithNumbering),children:o.map(((e,t)=>(0,p.jsx)(A,{line:e,getLineProps:a,getTokenProps:s,classNames:N[t],showLineNumbers:C},t)))})})}}),(0,p.jsxs)("div",{className:g.buttonGroup,children:[(B.isEnabled||B.isCodeScrollable)&&(0,p.jsx)(L,{className:g.codeButton,onClick:()=>B.toggle(),isEnabled:B.isEnabled}),(0,p.jsx)(w,{className:g.codeButton,code:y})]})]})]})}function T(e){let{children:t,...n}=e;const c=(0,o.A)(),r=function(e){return i.Children.toArray(e).some((e=>(0,i.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t),l="string"==typeof r?function(e,t,n){if(!e)return{data:"",unusedVariables:[]};const o=[];for(const a in t){const i=`-?{:${a}:}`;if((e.match(new RegExp(i,"g"))??[]).length>0){let o=t[a];n&&(o=s(o.replace(/\n/g,"\n * "))),e=e.replace(new RegExp(i,"g"),o)}else o.push(a)}return{data:e,unusedVariables:o}}(r,{CORE_PACKAGE_NAME:a.k.CORE_PACKAGE_NAME,REACT_PACKAGE_NAME:a.k.REACT_PACKAGE_NAME},!1).data:r,d="string"==typeof l?P:h;return(0,p.jsx)(d,{...n,children:l},String(c))}},9692:(e,t,n)=>{n.d(t,{A:()=>s});var o=n(3849),a=n(4848);function s(e){return(0,a.jsx)(o.N,{...e})}}}]);