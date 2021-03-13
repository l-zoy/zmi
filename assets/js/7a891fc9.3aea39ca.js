(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{83:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return i})),n.d(t,"default",(function(){return b}));var r=n(3),a=n(7),c=(n(0),n(96)),o={id:"webpack",title:"Webpack\u76f8\u5173"},p={unversionedId:"webpack",id:"webpack",isDocsHomePage:!1,title:"Webpack\u76f8\u5173",description:"\u4ecb\u7ecd",source:"@site/../docs/webpack.md",slug:"/webpack",permalink:"/zmi/docs/webpack",version:"current",sidebar:"someSidebar",previous:{title:"\u6837\u5f0f\u8868",permalink:"/zmi/docs/styles"}},i=[{value:"\u4ecb\u7ecd",id:"\u4ecb\u7ecd",children:[]},{value:"\u8b66\u544a",id:"\u8b66\u544a",children:[]},{value:"\u4fee\u6539 Loader \u9009\u9879",id:"\u4fee\u6539-loader-\u9009\u9879",children:[]}],l={toc:i};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("h3",{id:"\u4ecb\u7ecd"},"\u4ecb\u7ecd"),Object(c.b)("p",null,"Zmi \u5185\u90e8\u7684 webpack \u914d\u7f6e\u662f\u901a\u8fc7 webpack-chain \u7ef4\u62a4\u7684\u3002\u8fd9\u4e2a\u5e93\u63d0\u4f9b\u4e86\u4e00\u4e2a webpack \u539f\u59cb\u914d\u7f6e\u7684\u4e0a\u5c42\u62bd\u8c61\uff0c\u4f7f\u5176\u53ef\u4ee5\u5b9a\u4e49\u5177\u540d\u7684 loader \u89c4\u5219\u548c\u5177\u540d\u63d2\u4ef6\uff0c\u5e76\u6709\u673a\u4f1a\u5728\u540e\u671f\u8fdb\u5165\u8fd9\u4e9b\u89c4\u5219\u5e76\u5bf9\u5b83\u4eec\u7684\u9009\u9879\u8fdb\u884c\u4fee\u6539\u3002"),Object(c.b)("p",null,"\u5b83\u5141\u8bb8\u6211\u4eec\u66f4\u7ec6\u7c92\u5ea6\u7684\u63a7\u5236\u5176\u5185\u90e8\u914d\u7f6e\u3002\u63a5\u4e0b\u6765\u6709\u4e00\u4e9b\u5e38\u89c1\u7684\u5728 ",Object(c.b)("inlineCode",{parentName:"p"},".zmirc")," \u4e2d\u7684 chainWebpack \u4fee\u6539\u7684\u4f8b\u5b50\u3002"),Object(c.b)("h3",{id:"\u8b66\u544a"},"\u8b66\u544a"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"\u5e94\u8be5\u4f18\u5148\u5728.zmirc \u4e2d\u4fee\u6539\u914d\u7f6e,\u5982\u679c\u65e0\u6cd5\u5b8c\u6210\u60a8\u7684\u9700\u6c42,\u624d\u4f7f\u7528\u6b64\u9009\u9879")),Object(c.b)("blockquote",null,Object(c.b)("p",{parentName:"blockquote"},"\u6709\u4e9b webpack \u9009\u9879\u662f\u57fa\u4e8e .zmirc \u4e2d\u7684\u503c\u8bbe\u7f6e\u7684\uff0c\u6240\u4ee5\u4e0d\u80fd\u76f4\u63a5\u4fee\u6539\u3002\u4f8b\u5982\u4f60\u5e94\u8be5\u4fee\u6539 .zmirc \u4e2d\u7684 outputPath \u9009\u9879\u800c\u4e0d\u662f\u4fee\u6539 output.path\uff1b\u4f60\u5e94\u8be5\u4fee\u6539 .zmirc \u4e2d\u7684 publicPath \u9009\u9879\u800c\u4e0d\u662f\u4fee\u6539 output.publicPath\u3002\u8fd9\u6837\u505a\u662f\u56e0\u4e3a .zmirc \u4e2d\u7684\u503c\u4f1a\u88ab\u7528\u5728\u914d\u7f6e\u91cc\u7684\u591a\u4e2a\u5730\u65b9\uff0c\u4ee5\u786e\u4fdd\u6240\u6709\u7684\u90e8\u5206\u90fd\u80fd\u6b63\u5e38\u5de5\u4f5c\u5728\u4e00\u8d77")),Object(c.b)("h3",{id:"\u4fee\u6539-loader-\u9009\u9879"},"\u4fee\u6539 Loader \u9009\u9879"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-js"},"// .zmirc.js\nmodule.exports = {\n  chainWebpack: (webpackConfig, { createCSSRule, env }) => {\n    config.module\n      .rule('vue')\n      .use('vue-loader')\n      .tap((options) => {\n        // \u4fee\u6539\u5b83\u7684\u9009\u9879...\n        return options\n      })\n  }\n}\n")),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"env"),":\u73af\u5883\u53d8\u91cf"),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"createCSSRule"),":\u521b\u5efa css \u76f8\u5173 loader, \u4e00\u822c\u60c5\u51b5\u4e0b\u7528\u4e0d\u5230"),Object(c.b)("p",null,"\u6bd4\u5982:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-js"},"createCSSRule({\n  lang: 'less',\n  test: /\\.less$/,\n  loader: 'less-loader',\n  options: {...}\n})\n")),Object(c.b)("p",null,Object(c.b)("strong",{parentName:"p"},"\u4f60\u9700\u8981\u719f\u6089 ",Object(c.b)("a",{parentName:"strong",href:"https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans"},"webpack-chain \u7684 API "),"\u5e76\u9605\u8bfb",Object(c.b)("a",{parentName:"strong",href:"https://github.com/l-zoy/zmi/tree/main/packages/zmi-webpack/src"},"\u4e00\u4e9b\u6e90\u7801"),"\u4ee5\u4fbf\u4e86\u89e3\u5982\u4f55\u6700\u5927\u7a0b\u5ea6\u5229\u7528\u597d\u8fd9\u4e2a\u9009\u9879\uff0c\u4f46\u662f\u6bd4\u8d77\u76f4\u63a5\u4fee\u6539 webpack \u914d\u7f6e\uff0c\u5b83\u7684\u8868\u8fbe\u80fd\u529b\u66f4\u5f3a\uff0c\u4e5f\u66f4\u4e3a\u5b89\u5168")))}b.isMDXComponent=!0},96:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),b=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},u=function(e){var t=b(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,o=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=b(n),m=r,d=u["".concat(o,".").concat(m)]||u[m]||s[m]||c;return n?a.a.createElement(d,p(p({ref:t},l),{},{components:n})):a.a.createElement(d,p({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=n.length,o=new Array(c);o[0]=m;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:r,o[1]=p;for(var l=2;l<c;l++)o[l]=n[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);