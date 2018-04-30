!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.reactTextMask=t(require("react")):e.reactTextMask=t(e.React)}(this,function(e){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.conformToMask=void 0;var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),f=r(2);Object.defineProperty(t,"conformToMask",{enumerable:!0,get:function(){return n(f).default}});var c=r(11),d=n(c),p=r(9),h=n(p),v=r(5),y=n(v),m=function(e){function t(){var e;i(this,t);for(var r=arguments.length,n=Array(r),o=0;o<r;o++)n[o]=arguments[o];var u=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(n)));return u.onBlur=u.onBlur.bind(u),u.onChange=u.onChange.bind(u),u}return u(t,e),s(t,[{key:"initTextMask",value:function(){var e=this.props,t=this.props.value;this.textMaskInputElement=(0,y.default)(l({inputElement:this.inputElement},e)),this.textMaskInputElement.update(t)}},{key:"componentDidMount",value:function(){this.initTextMask()}},{key:"componentDidUpdate",value:function(){this.initTextMask()}},{key:"render",value:function e(){var t=this,r=this.props,e=r.render,n=o(r,["render"]);delete n.mask,delete n.guide,delete n.pipe,delete n.placeholderChar,delete n.keepCharPositions,delete n.value,delete n.onBlur,delete n.onChange,delete n.showMask;var i=function(e){return t.inputElement=e};return e(i,l({onBlur:this.onBlur,onChange:this.onChange,defaultValue:this.props.value},n))}},{key:"onChange",value:function(e){this.textMaskInputElement.update(),"function"==typeof this.props.onChange&&this.props.onChange(e)}},{key:"onBlur",value:function(e){"function"==typeof this.props.onBlur&&this.props.onBlur(e)}}]),t}(d.default.Component);t.default=m,m.propTypes={mask:h.default.oneOfType([h.default.array,h.default.func,h.default.bool,h.default.shape({mask:h.default.oneOfType([h.default.array,h.default.func]),pipe:h.default.func})]).isRequired,guide:h.default.bool,value:h.default.oneOfType([h.default.string,h.default.number]),pipe:h.default.func,placeholderChar:h.default.string,keepCharPositions:h.default.bool,showMask:h.default.bool},m.defaultProps={render:function(e,t){return d.default.createElement("input",l({ref:e},t))}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.placeholderChar="_"},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.guide,u=void 0===n||n,l=r.previousConformedValue,s=void 0===l?a:l,f=r.placeholderChar,c=void 0===f?i.placeholderChar:f,d=r.placeholder,p=void 0===d?(0,o.convertMaskToPlaceholder)(t,c):d,h=r.currentCaretPosition,v=r.keepCharPositions,y=u===!1&&void 0!==s,m=e.length,g=s.length,b=p.length,C=t.length,k=m-g,O=k>0,P=h+(O?-k:0),x=P+Math.abs(k);if(v===!0&&!O){for(var T=a,_=P;_<x;_++)p[_]===c&&(T+=c);e=e.slice(0,P)+T+e.slice(P,m)}for(var w=e.split(a).map(function(e,t){return{char:e,isNew:t>=P&&t<x}}),j=m-1;j>=0;j--){var M=w[j].char;if(M!==c){var S=j>=P&&g===C;M===p[S?j-k:j]&&w.splice(j,1)}}var R=a,E=!1;e:for(var V=0;V<b;V++){var N=p[V];if(N===c){if(w.length>0)for(;w.length>0;){var A=w.shift(),B=A.char,I=A.isNew;if(B===c&&y!==!0){R+=c;continue e}if(t[V].test(B)){if(v===!0&&I!==!1&&s!==a&&u!==!1&&O){for(var q=w.length,F=null,D=0;D<q;D++){var L=w[D];if(L.char!==c&&L.isNew===!1)break;if(L.char===c){F=D;break}}null!==F?(R+=B,w.splice(F,1)):V--}else R+=B;continue e}E=!0}y===!1&&(R+=p.substr(V,b));break}R+=N}if(y&&O===!1){for(var J=null,U=0;U<R.length;U++)p[U]===c&&(J=U);R=null!==J?R.substr(0,J+1):a}return{conformedValue:R,meta:{someCharsRejected:E}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var o=r(3),i=r(1),a=""},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u.placeholderChar;if(e.indexOf(t)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(t)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?t:e}).join("")}function o(e){return"string"==typeof e||e instanceof String}function i(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function a(e){for(var t=[],r=void 0;r=e.indexOf(s),r!==-1;)t.push(r),e.splice(r,1);return{maskWithoutCaretTraps:e,indexes:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=n,t.isString=o,t.isNumber=i,t.processCaretTraps=a;var u=r(1),l=[],s="[]"},function(e,t){"use strict";function r(e){var t=e.previousConformedValue,r=void 0===t?o:t,i=e.previousPlaceholder,a=void 0===i?o:i,u=e.currentCaretPosition,l=void 0===u?0:u,s=e.conformedValue,f=e.rawValue,c=e.placeholderChar,d=e.placeholder,p=e.indexesOfPipedChars,h=void 0===p?n:p,v=e.caretTrapIndexes,y=void 0===v?n:v,m=e.RejectedChar,g=void 0===m?null:m,b=e.pipeRejected,C=void 0!==b&&b;if(0===l)return 0;var k=f.length,O=r.length,P=d.length,x=s.length,T=k-O,_=T>0,w=0===O,j=T>1&&!_&&!w;if(j)return l;var M=_&&(r===s||s===d)||null!==g&&g===!0&&C===!1,S=0,R=void 0,E=void 0;if(M)S=l-T;else{var V=s.toLowerCase(),N=f.toLowerCase(),A=N.substr(0,l).split(o),B=A.filter(function(e){return V.indexOf(e)!==-1});E=B[B.length-1];var I=a.substr(0,B.length).split(o).filter(function(e){return e!==c}).length,q=d.substr(0,B.length).split(o).filter(function(e){return e!==c}).length,F=q!==I,D=void 0!==a[B.length-1]&&void 0!==d[B.length-2]&&a[B.length-1]!==c&&a[B.length-1]!==d[B.length-1]&&a[B.length-1]===d[B.length-2];!_&&(F||D)&&I>0&&d.indexOf(E)>-1&&void 0!==f[l]&&(R=!0,E=f[l]);for(var L=h.map(function(e){return V[e]}),J=L.filter(function(e){return e===E}).length,U=B.filter(function(e){return e===E}).length,W=d.substr(0,d.indexOf(c)).split(o).filter(function(e,t){return e===E&&f[t]!==e}).length,H=W+U+J+(R?1:0),Y=0,z=0;z<x;z++){var G=V[z];if(S=z+1,G===E&&Y++,Y>=H)break}}if(_){for(var K=S,Q=S;Q<=P;Q++)if(d[Q]===c&&(K=Q),d[Q]===c||y.indexOf(Q)!==-1||Q===P)return K}else if(R){for(var X=S-1;X>=0;X--)if(s[X]===E||y.indexOf(X)!==-1||0===X)return X}else for(var Z=S;Z>=0;Z--)if(d[Z-1]===c||y.indexOf(Z)!==-1||0===Z)return Z}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var n=[],o=""},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:t,update:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,l=n.mask,f=n.guide,y=n.pipe,g=n.placeholderChar,b=void 0===g?p.placeholderChar:g,C=n.keepCharPositions,k=void 0!==C&&C,O=n.showMask,P=void 0!==O&&O,x=n.conformToMaskFunc,T=void 0===x?c.default:x;if("undefined"==typeof r&&(r=o.value),r!==t.previousConformedValue){("undefined"==typeof l?"undefined":u(l))===m&&void 0!==l.pipe&&void 0!==l.mask&&(y=l.pipe,l=l.mask);var _=void 0,w=void 0;if(l instanceof Array&&(_=(0,d.convertMaskToPlaceholder)(l,b)),l!==!1){var j=a(r),M=o.selectionEnd,S=t.previousConformedValue,R=t.previousPlaceholder,E=void 0,V=null;if(("undefined"==typeof l?"undefined":u(l))===h){if(w=l(j,{currentCaretPosition:M,previousConformedValue:S,placeholderChar:b}),w===!1)return;Array.isArray(w)||(V=w.hasRejectedChar,w=w.mask);var N=(0,d.processCaretTraps)(w),A=N.maskWithoutCaretTraps,B=N.indexes;w=A,E=B,_=(0,d.convertMaskToPlaceholder)(w,b)}else w=l;var I={previousConformedValue:S,guide:f,placeholderChar:b,pipe:y,placeholder:_,currentCaretPosition:M,keepCharPositions:k},q=T(j,w,I),F=q.conformedValue,D=("undefined"==typeof y?"undefined":u(y))===h,L={},J=!1;D&&(L=y(F,{rawValue:j,previousConformedValue:S,guide:f,placeholderChar:b,pipe:y,placeholder:_,currentCaretPosition:M,keepCharPositions:k}),L===!1?(L={value:S,rejected:!0},_=R,J=!0):(0,d.isString)(L)&&(L={value:L}));var U=D?L.value:F,W=(0,s.default)({previousConformedValue:S,previousPlaceholder:R,conformedValue:U,placeholder:_,rawValue:j,currentCaretPosition:M,placeholderChar:b,indexesOfPipedChars:L.indexesOfPipedChars,caretTrapIndexes:E,hasRejectedChar:V,pipeRejected:J}),H=U===_&&0===W,Y=P?_:v,z=H?Y:U;t.previousConformedValue=z,t.previousPlaceholder=_,o.value!==z&&(o.value=z,i(o,W))}}}}}function i(e,t){document.activeElement===e&&(g?b(function(){return e.setSelectionRange(t,t,y)},0):e.setSelectionRange(t,t,y))}function a(e){if((0,d.isString)(e))return e;if((0,d.isNumber)(e))return String(e);if(void 0===e||null===e)return v;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0});var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=o;var l=r(4),s=n(l),f=r(2),c=n(f),d=r(3),p=r(1),h="function",v="",y="none",m="object",g="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),b="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout},function(e,t){"use strict";function r(e){return function(){return e}}var n=function(){};n.thatReturns=r,n.thatReturnsFalse=r(!1),n.thatReturnsTrue=r(!0),n.thatReturnsNull=r(null),n.thatReturnsThis=function(){return this},n.thatReturnsArgument=function(e){return e},e.exports=n},function(e,t,r){"use strict";function n(e,t,r,n,i,a,u,l){if(o(t),!e){var s;if(void 0===t)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var f=[r,n,i,a,u,l],c=0;s=new Error(t.replace(/%s/g,function(){return f[c++]})),s.name="Invariant Violation"}throw s.framesToPop=1,s}}var o=function(e){};e.exports=n},function(e,t,r){"use strict";var n=r(6),o=r(7),i=r(10);e.exports=function(){function e(e,t,r,n,a,u){u!==i&&o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return r.checkPropTypes=n,r.PropTypes=r,r}},function(e,t,r){"use strict";"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports=r(8)()},function(e,t){"use strict";var r="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=r},function(t,r){t.exports=e}])});