!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.createNumberMask=t():e.createNumberMask=t()}(this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){e.exports=o(3)},,,function(e,t){"use strict";function o(){function e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=e.length;if(L===!0&&(j=!0),(j===!1||k<=0)&&(M=""),e===l||e[0]===m[0]&&1===t){var o=[d,M,d];if(L===!0&&B===!0)for(var c=0;c<k-1;c++)o.push(d);return m.split(l).concat(o).concat(h.split(l))}if(e===M&&j){var a=["0",M,d];if(L===!0&&B===!0)for(var u=0;u<k-1;u++)a.push(d);return m.split(l).concat(a).concat(h.split(l))}var g=(e.match(new RegExp(f,"g"))||[]).length%2===1&&R;e=e.toString().replace(new RegExp(f,"g"),"");var y=e.lastIndexOf(M),x=y!==-1,w=void 0,D=void 0,N=void 0;if(e.slice(Z*-1)===h&&(e=e.slice(0,Z*-1)),x&&(j||L)?(w=e.slice(e.slice(0,T)===m?T:0,y),D=e.slice(y+1,t),D=n(D.replace(s,l))):w=e.slice(0,T)===m?e.slice(T):e,P&&("undefined"==typeof P?"undefined":r(P))===p){var E="."===S?"[.]":""+S,O=(w.match(new RegExp(E,"g"))||[]).length;w=w.slice(0,P+O*z)}if(w=w.replace(s,l),_||(w=w.replace(/^0+(0$|[^0])/,"$1")),w=b?i(w,S):w,L===!0&&w===l&&(w="0"),N=n(w),(x&&j||L===!0)&&(e[y-1]!==M&&N.push(v),N.push(M,v),D&&(("undefined"==typeof k?"undefined":r(k))===p&&(D=D.slice(0,k)),N=N.concat(D)),L===!0))if(B===!0)for(var $=D?k-D.length:k,q=0;q<$;q++)N.push(d);else e[y-1]===M&&N.push(d);return T>0&&(N=m.split(l).concat(N)),g&&(N.length===T&&N.push(d),N=[f].concat(N)),h.length>0&&(N=N.concat(h.split(l))),N}var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=t.prefix,m=void 0===o?c:o,g=t.suffix,h=void 0===g?l:g,y=t.includeThousandsSeparator,b=void 0===y||y,x=t.thousandsSeparatorSymbol,S=void 0===x?a:x,w=t.allowDecimal,j=void 0!==w&&w,D=t.decimalSymbol,M=void 0===D?u:D,N=t.decimalLimit,k=void 0===N?2:N,E=t.requireDecimal,L=void 0!==E&&E,O=t.allowNegative,R=void 0!==O&&O,$=t.allowLeadingZeroes,_=void 0!==$&&$,q=t.fixedDecimalScale,B=void 0!==q&&q,I=t.integerLimit,P=void 0===I?null:I,T=m&&m.length||0,Z=h&&h.length||0,z=S&&S.length||0;return e.instanceOf="createNumberMask",e}function n(e){return e.split(l).map(function(e){return d.test(e)?d:e})}function i(e,t){return e.replace(/\B(?=(\d{3})+(?!\d))/g,t)}Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=o;var c="$",l="",a=",",u=".",f=/-/,s=/\D+/g,p="number",d=/\d/,v="[]"}])});