!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.textMaskAddons=r():e.textMaskAddons=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(r,"__esModule",{value:!0});var o=t(1);Object.defineProperty(r,"createAutoCorrectedDatePipe",{enumerable:!0,get:function(){return n(o).default}});var i=t(2);Object.defineProperty(r,"createNumberMask",{enumerable:!0,get:function(){return n(i).default}});var a=t(3);Object.defineProperty(r,"emailMask",{enumerable:!0,get:function(){return n(a).default}});var l=t(7);Object.defineProperty(r,"createFixedDecimalScaleNumberPipe",{enumerable:!0,get:function(){return n(l).default}});var u=t(6);Object.defineProperty(r,"createFixedDecimalScaleComformToMask",{enumerable:!0,get:function(){return n(u).default}})},function(e,r){"use strict";function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"mm dd yyyy";return function(r){var t=[],n=e.split(/[^dmyHMS]+/),o={dd:31,mm:12,yy:99,yyyy:9999,HH:23,MM:59,SS:59},i={dd:1,mm:1,yy:0,yyyy:1,HH:0,MM:0,SS:0},a=r.split("");n.forEach(function(r){var n=e.indexOf(r),i=parseInt(o[r].toString().substr(0,1),10);parseInt(a[n],10)>i&&(a[n+1]=a[n],a[n]=0,t.push(n))});var l=n.some(function(t){var n=e.indexOf(t),a=t.length,l=r.substr(n,a).replace(/\D/g,""),u=parseInt(l,10);return u>o[t]||l.length===a&&u<i[t]});return!l&&{value:a.join(""),indexesOfPipedChars:t}}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t},function(e,r){"use strict";function t(){function e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,r=e.length;if(e===l||e[0]===g[0]&&1===r)return g.split(l).concat([v]).concat(y.split(l));if(e===M&&S)return g.split(l).concat(["0",M,v]).concat(y.split(l));var t=e[0]===d&&V;t&&(e=e.toString().substr(1));var a=e.lastIndexOf(M),u=a!==-1,c=void 0,m=void 0,b=void 0;e.slice($*-1)===y&&(e=e.slice(0,$*-1));var C=!1,O=e;if(O=O.replace(s,""),O=O.replace(new RegExp(g.replace(/\$/g,"\\$"),"g"),""),O=O.replace(new RegExp(y.replace(/\$/g,"\\$"),"g"),""),O=O.replace(new RegExp(M.replace(/\./g,"\\."),"g"),""),O=O.replace(new RegExp(P.replace(/\./g,"\\."),"g"),""),C=(O.match(f)||[]).length>0,u&&(S||T)?(c=e.slice(e.slice(0,F)===g?F:0,a),m=e.slice(a+1,r),m=n(m.replace(f,l))):c=e.slice(0,F)===g?e.slice(F):e,I&&("undefined"==typeof I?"undefined":i(I))===p){var w="."===P?"[.]":""+P,j=(c.match(new RegExp(w,"g"))||[]).length;c=c.slice(0,I+j*q)}if(c=c.replace(f,l),N||(c=c.replace(/^0+(0$|[^0])/,"$1")),c=x?o(c,P):c,T===!0&&c===l&&(c="0"),b=n(c),(u&&S||T===!0)&&(e[a-1]!==M&&b.push(h),b.push(M,h),m&&(("undefined"==typeof k?"undefined":i(k))===p&&(m=m.slice(0,k)),b=b.concat(m)),T===!0))if(L===!0)for(var _=m?k-m.length:k,R=0;R<_;R++)b.push(v);else e[a-1]===M&&b.push(v);return F>0&&(b=g.split(l).concat(b)),t&&(b.length===F&&b.push(v),b=[s].concat(b)),y.length>0&&(b=b.concat(y.split(l))),{mask:b,hasRejectedChar:C}}var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=r.prefix,g=void 0===t?a:t,m=r.suffix,y=void 0===m?l:m,b=r.includeThousandsSeparator,x=void 0===b||b,C=r.thousandsSeparatorSymbol,P=void 0===C?u:C,O=r.allowDecimal,S=void 0!==O&&O,w=r.decimalSymbol,M=void 0===w?c:w,j=r.decimalLimit,k=void 0===j?2:j,_=r.requireDecimal,T=void 0!==_&&_,R=r.allowNegative,V=void 0!==R&&R,E=r.allowLeadingZeroes,N=void 0!==E&&E,D=r.fixedDecimalScale,L=void 0!==D&&D,A=r.integerLimit,I=void 0===A?null:A,F=g&&g.length||0,$=y&&y.length||0,q=P&&P.length||0;return e.instanceOf="createNumberMask",e}function n(e){return e.split(l).map(function(e){return v.test(e)?v:e})}function o(e,r){return e.replace(/\B(?=(\d{3})+(?!\d))/g,r)}Object.defineProperty(r,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=t;var a="$",l="",u=",",c=".",d="-",s=/-/,f=/\D+/g,p="number",v=/\d/,h="[]"},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,r){e=e.replace(C,v);var t=r.placeholderChar,n=r.currentCaretPosition,o=e.indexOf(h),d=e.lastIndexOf(p),s=d<o?-1:d,f=i(e,o+1,h),g=i(e,s-1,p),m=a(e,o,t),y=l(e,o,s,t),b=u(e,s,t,n);m=c(m),y=c(y),b=c(b,!0);var x=m.concat(f).concat(y).concat(g).concat(b);return x}function i(e,r,t){var n=[];return e[r]===t?n.push(t):n.push(g,t),n.push(g),n}function a(e,r){return r===-1?e:e.slice(0,r)}function l(e,r,t,n){var o=v;return r!==-1&&(o=t===-1?e.slice(r+1,e.length):e.slice(r+1,t)),o=o.replace(new RegExp("[\\s"+n+"]",y),v),o===h?f:o.length<1?m:o[o.length-1]===p?o.slice(0,o.length-1):o}function u(e,r,t,n){var o=v;return r!==-1&&(o=e.slice(r+1,e.length)),o=o.replace(new RegExp("[\\s"+t+".]",y),v),0===o.length?e[r-1]===p&&n!==e.length?f:v:o}function c(e,r){return e.split(v).map(function(e){return e===m?e:r?x:b})}Object.defineProperty(r,"__esModule",{value:!0});var d=t(4),s=n(d),f="*",p=".",v="",h="@",g="[]",m=" ",y="g",b=/[^\s]/,x=/[^.\s]/,C=/\s/g;r.default={mask:o,pipe:s.default}},function(e,r){"use strict";function t(e,r){var t=r.currentCaretPosition,i=r.rawValue,f=r.previousConformedValue,p=r.placeholderChar,v=e;v=n(v);var h=v.indexOf(l),g=null===i.match(new RegExp("[^@\\s."+p+"]"));if(g)return a;if(v.indexOf(c)!==-1||h!==-1&&t!==h+1||i.indexOf(o)===-1&&f!==a&&i.indexOf(u)!==-1)return!1;var m=v.indexOf(o),y=v.slice(m+1,v.length);return(y.match(s)||d).length>1&&v.substr(-1)===u&&t!==i.length&&(v=v.slice(0,v.length-1)),v}function n(e){var r=0;return e.replace(i,function(){return r++,1===r?o:a})}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t;var o="@",i=/@/g,a="",l="@.",u=".",c="..",d=[],s=/\./g},function(e,r,t){!function(r,t){e.exports=t()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(r,"__esModule",{value:!0});var o=t(4);Object.defineProperty(r,"conformToMask",{enumerable:!0,get:function(){return n(o).default}});var i=t(3);Object.defineProperty(r,"adjustCaretPosition",{enumerable:!0,get:function(){return n(i).default}});var a=t(5);Object.defineProperty(r,"createTextMaskInputElement",{enumerable:!0,get:function(){return n(a).default}});var l=t(2);Object.defineProperty(r,"convertMaskToPlaceholder",{enumerable:!0,get:function(){return n(l).default}});var u=t(1);Object.defineProperty(r,"placeholderChar",{enumerable:!0,get:function(){return u.placeholderChar}})},function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.placeholderChar="_"},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l.placeholderChar;if(e.indexOf(r)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(r)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?r:e}).join("")}function o(e){return"string"==typeof e||e instanceof String}function i(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function a(e){for(var r=[],t=void 0;t=e.indexOf(c),t!==-1;)r.push(t),e.splice(t,1);return{maskWithoutCaretTraps:e,indexes:r}}Object.defineProperty(r,"__esModule",{value:!0}),r.convertMaskToPlaceholder=n,r.isString=o,r.isNumber=i,r.processCaretTraps=a;var l=t(1),u=[],c="[]"},function(e,r){"use strict";function t(e){var r=e.previousConformedValue,t=void 0===r?o:r,i=e.previousPlaceholder,a=void 0===i?o:i,l=e.currentCaretPosition,u=void 0===l?0:l,c=e.conformedValue,d=e.rawValue,s=e.placeholderChar,f=e.placeholder,p=e.indexesOfPipedChars,v=void 0===p?n:p,h=e.caretTrapIndexes,g=void 0===h?n:h,m=e.RejectedChar,y=void 0===m?null:m,b=e.pipeRejected,x=void 0!==b&&b;if(0===u)return 0;var C=d.length,P=t.length,O=f.length,S=c.length,w=C-P,M=w>0,j=0===P,k=w>1&&!M&&!j;if(k)return u;var _=M&&(t===c||c===f)||null!==y&&y===!0&&x===!1,T=0,R=void 0,V=void 0;if(_)T=u-w;else{var E=c.toLowerCase(),N=d.toLowerCase(),D=N.substr(0,u).split(o),L=D.filter(function(e){return E.indexOf(e)!==-1});V=L[L.length-1];var A=a.substr(0,L.length).split(o).filter(function(e){return e!==s}).length,I=f.substr(0,L.length).split(o).filter(function(e){return e!==s}).length,F=I!==A,$=void 0!==a[L.length-1]&&void 0!==f[L.length-2]&&a[L.length-1]!==s&&a[L.length-1]!==f[L.length-1]&&a[L.length-1]===f[L.length-2];!M&&(F||$)&&A>0&&f.indexOf(V)>-1&&void 0!==d[u]&&(R=!0,V=d[u]);for(var q=v.map(function(e){return E[e]}),H=q.filter(function(e){return e===V}).length,J=L.filter(function(e){return e===V}).length,Z=f.substr(0,f.indexOf(s)).split(o).filter(function(e,r){return e===V&&d[r]!==e}).length,W=Z+J+H+(R?1:0),B=0,z=0;z<S;z++){var G=E[z];if(T=z+1,G===V&&B++,B>=W)break}}if(M){for(var K=T,Q=T;Q<=O;Q++)if(f[Q]===s&&(K=Q),f[Q]===s||g.indexOf(Q)!==-1||Q===O)return K}else if(R){for(var U=T-1;U>=0;U--)if(c[U]===V||g.indexOf(U)!==-1||0===U)return U}else for(var X=T;X>=0;X--)if(f[X-1]===s||g.indexOf(X)!==-1||0===X)return X}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t;var n=[],o=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=t.guide,l=void 0===n||n,u=t.previousConformedValue,c=void 0===u?a:u,d=t.placeholderChar,s=void 0===d?i.placeholderChar:d,f=t.placeholder,p=void 0===f?(0,o.convertMaskToPlaceholder)(r,s):f,v=t.currentCaretPosition,h=t.keepCharPositions,g=l===!1&&void 0!==c,m=e.length,y=c.length,b=p.length,x=r.length,C=m-y,P=C>0,O=v+(P?-C:0),S=O+Math.abs(C);if(h===!0&&!P){for(var w=a,M=O;M<S;M++)p[M]===s&&(w+=s);e=e.slice(0,O)+w+e.slice(O,m)}for(var j=e.split(a).map(function(e,r){return{char:e,isNew:r>=O&&r<S}}),k=m-1;k>=0;k--){var _=j[k].char;if(_!==s){var T=k>=O&&y===x;_===p[T?k-C:k]&&j.splice(k,1)}}var R=a,V=!1;e:for(var E=0;E<b;E++){var N=p[E];if(N===s){if(j.length>0)for(;j.length>0;){var D=j.shift(),L=D.char,A=D.isNew;if(L===s&&g!==!0){R+=s;continue e}if(r[E].test(L)){if(h===!0&&A!==!1&&c!==a&&l!==!1&&P){for(var I=j.length,F=null,$=0;$<I;$++){var q=j[$];if(q.char!==s&&q.isNew===!1)break;if(q.char===s){F=$;break}}null!==F?(R+=L,j.splice(F,1)):E--}else R+=L;continue e}V=!0}g===!1&&(R+=p.substr(E,b));break}R+=N}if(g&&P===!1){for(var H=null,J=0;J<R.length;J++)p[J]===s&&(H=J);R=null!==H?R.substr(0,H+1):a}return{conformedValue:R,meta:{someCharsRejected:V}}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=n;var o=t(2),i=t(1),a=""},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:r,update:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,u=n.mask,d=n.guide,g=n.pipe,y=n.placeholderChar,b=void 0===y?p.placeholderChar:y,x=n.keepCharPositions,C=void 0!==x&&x,P=n.showMask,O=void 0!==P&&P,S=n.conformToMaskFunc,w=void 0===S?s.default:S;if("undefined"==typeof t&&(t=o.value),t!==r.previousConformedValue){("undefined"==typeof u?"undefined":l(u))===m&&void 0!==u.pipe&&void 0!==u.mask&&(g=u.pipe,u=u.mask);var M=void 0,j=void 0;if(u instanceof Array&&(M=(0,f.convertMaskToPlaceholder)(u,b)),u!==!1){var k=a(t),_=o.selectionEnd,T=r.previousConformedValue,R=r.previousPlaceholder,V=void 0,E=null;if(("undefined"==typeof u?"undefined":l(u))===v){if(j=u(k,{currentCaretPosition:_,previousConformedValue:T,placeholderChar:b}),j===!1)return;Array.isArray(j)||(E=j.hasRejectedChar,j=j.mask);var N=(0,f.processCaretTraps)(j),D=N.maskWithoutCaretTraps,L=N.indexes;j=D,V=L,M=(0,f.convertMaskToPlaceholder)(j,b)}else j=u;var A={previousConformedValue:T,guide:d,placeholderChar:b,pipe:g,placeholder:M,currentCaretPosition:_,keepCharPositions:C},I=w(k,j,A),F=I.conformedValue,$=("undefined"==typeof g?"undefined":l(g))===v,q={},H=!1;$&&(q=g(F,{rawValue:k,previousConformedValue:T,guide:d,placeholderChar:b,pipe:g,placeholder:M,currentCaretPosition:_,keepCharPositions:C}),q===!1?(q={value:T,rejected:!0},M=R,H=!0):(0,f.isString)(q)&&(q={value:q}));var J=$?q.value:F,Z=(0,c.default)({previousConformedValue:T,previousPlaceholder:R,conformedValue:J,placeholder:M,rawValue:k,currentCaretPosition:_,placeholderChar:b,indexesOfPipedChars:q.indexesOfPipedChars,caretTrapIndexes:V,hasRejectedChar:E,pipeRejected:H}),W=J===M&&0===Z,B=O?M:h,z=W?B:J;r.previousConformedValue=z,r.previousPlaceholder=M,o.value!==z&&(o.value=z,i(o,Z))}}}}}function i(e,r){document.activeElement===e&&(y?b(function(){return e.setSelectionRange(r,r,g)},0):e.setSelectionRange(r,r,g))}function a(e){if((0,f.isString)(e))return e;if((0,f.isNumber)(e))return String(e);if(void 0===e||null===e)return h;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(r,"__esModule",{value:!0});var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=o;var u=t(3),c=n(u),d=t(4),s=n(d),f=t(2),p=t(1),v="function",h="",g="none",m="object",y="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),b="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])})},function(e,r,t){"use strict";function n(){function e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=e;if((a.match(u)||[]).length>0)if(a!==i&&a[0]===d&&(a.match(new RegExp("0","g"))||[]).length===f)a="";else if((a||"").length>0&&a[0]===d&&(a="0"+a),(a||"").length>2&&("0"===a[0]||n===i||a[0]===n))for(var l=0;l<a.length&&("0"===a[l]||n===i||a[l]===n)&&a[l+1]!==d;)a=a.substr(1);var c=t.placeholderChar,s=void 0===c?o.placeholderChar:c,p=t.previousConformedValue,v=(0,o.conformToMask)(a,r,t),h=v.conformedValue,g=v.meta;return((h.match(u)||[]).length>0||(p||"")===i&&h!==i&&h[1]===d&&(h.match(new RegExp(s,"g"))||[]).length===f+1)&&(h=h.replace(new RegExp(s,"g"),"0")),{conformedValue:h,meta:g}}var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=(r.prefix,r.suffix,r.includeThousandsSeparator,r.thousandsSeparatorSymbol),n=void 0===t?a:t,c=(r.allowDecimal,r.decimalSymbol),d=void 0===c?l:c,s=r.decimalLimit,f=void 0===s?2:s;return r.requireDecimal,r.allowNegative,r.allowLeadingZeroes,r.fixedDecimalScale,r.integerLimit,e.instanceOf="createFixedDecimalScaleComformToMask",e}Object.defineProperty(r,"__esModule",{value:!0}),r.default=n;var o=t(5),i="",a=",",l=".",u=/\d/g},function(e,r){"use strict";function t(){function e(e,o){var i=o.rawValue,a=o.previousConformedValue,u=o.placeholderChar,c=(i||"").length,d=(a||"").length,s=c-d,p=s>0,v=i,h=r(v);return!(h>1||0===h&&(v||"")!==n&&(a||"")!==n||"0"===v[0]&&v[1]!==f&&p&&(a||"")!==n&&"0"!==a[0]||(v.match(new RegExp(u))||[]).length>0||v.length>1&&"0"===v[0]&&"0"===v[1]&&p||p&&t(v)>t(a)&&l(v)===l(a))&&e}function r(e){var r=new RegExp(f.replace(/\./g,"\\."),"g");return((e||"").match(r)||[]).length}function t(e){var r=new RegExp(d.replace(/\./g,"\\."),"g");return((e||"").match(r)||[]).length}function l(e){return((e||"").match(a)||[]).length}var u=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},c=(u.prefix,u.suffix,u.includeThousandsSeparator,u.thousandsSeparatorSymbol),d=void 0===c?o:c,s=(u.allowDecimal,u.decimalSymbol),f=void 0===s?i:s;return u.decimalLimit,u.requireDecimal,u.allowNegative,u.allowLeadingZeroes,u.fixedDecimalScale,u.integerLimit,e.instanceOf="createFixedDecimalScaleNumberPipe",e}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t;var n="",o=",",i=".",a=/\d/}])});