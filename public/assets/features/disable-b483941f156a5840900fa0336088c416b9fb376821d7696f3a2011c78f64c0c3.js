(function(){var e,t;t=Element.prototype.matches||Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector,Rails.matches=function(e,n){return null!=n.exclude?t.call(e,n.selector)&&!t.call(e,n.exclude):t.call(e,n)},e="_ujsData",Rails.getData=function(t,n){var a;return null!=(a=t[e])?a[n]:void 0},Rails.setData=function(t,n,a){return null==t[e]&&(t[e]={}),t[e][n]=a},Rails.$=function(e){return Array.prototype.slice.call(document.querySelectorAll(e))}}).call(this),function(){var e,t,n;e=Rails.$,n=Rails.csrfToken=function(){var e;return(e=document.querySelector("meta[name=csrf-token]"))&&e.content},t=Rails.csrfParam=function(){var e;return(e=document.querySelector("meta[name=csrf-param]"))&&e.content},Rails.CSRFProtection=function(e){var t;if(null!=(t=n()))return e.setRequestHeader("X-CSRF-Token",t)},Rails.refreshCSRFTokens=function(){var a,r;if(r=n(),a=t(),null!=r&&null!=a)return e('form input[name="'+a+'"]').forEach(function(e){return e.value=r})}}.call(this),function(){var e,t,n;n=Rails.matches,e=window.CustomEvent,"function"!=typeof e&&(e=function(e,t){var n;return n=document.createEvent("CustomEvent"),n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n},e.prototype=window.Event.prototype),t=Rails.fire=function(t,n,a){var r;return r=new e(n,{bubbles:!0,cancelable:!0,detail:a}),t.dispatchEvent(r),!r.defaultPrevented},Rails.stopEverything=function(e){return t(e.target,"ujs:everythingStopped"),e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()},Rails.delegate=function(e,t,a,r){return e.addEventListener(a,function(e){var a;for(a=e.target;a instanceof Element&&!n(a,t);)a=a.parentNode;if(a instanceof Element&&r.call(a,e)===!1)return e.preventDefault(),e.stopPropagation()})}}.call(this),function(){var e,t,n,a,r,l;t=Rails.CSRFProtection,a=Rails.fire,e={"*":"*/*",text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript",script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},Rails.ajax=function(e){var t;return e=r(e),t=n(e,function(){var n;return n=l(t.response,t.getResponseHeader("Content-Type")),2===Math.floor(t.status/100)?"function"==typeof e.success&&e.success(n,t.statusText,t):"function"==typeof e.error&&e.error(n,t.statusText,t),"function"==typeof e.complete?e.complete(t,t.statusText):void 0}),"function"==typeof e.beforeSend&&e.beforeSend(t,e),t.readyState===XMLHttpRequest.OPENED?t.send(e.data):a(document,"ajaxStop")},r=function(t){return t.type=t.type.toUpperCase(),"GET"===t.type&&t.data&&(t.url.indexOf("?")<0?t.url+="?"+t.data:t.url+="&"+t.data),null==e[t.dataType]&&(t.dataType="*"),t.accept=e[t.dataType],"*"!==t.dataType&&(t.accept+=", */*; q=0.01"),t},n=function(e,n){var a;return a=new XMLHttpRequest,a.open(e.type,e.url,!0),a.setRequestHeader("Accept",e.accept),"string"==typeof e.data&&a.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),e.crossDomain||a.setRequestHeader("X-Requested-With","XMLHttpRequest"),t(a),a.withCredentials=!!e.withCredentials,a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE)return n(a)},a},l=function(e,t){var n,a;if("string"==typeof e&&"string"==typeof t)if(t.match(/\bjson\b/))try{e=JSON.parse(e)}catch(e){}else if(t.match(/\bjavascript\b/))a=document.createElement("script"),a.innerHTML=e,document.body.appendChild(a);else if(t.match(/\b(xml|html|svg)\b/)){n=new DOMParser,t=t.replace(/;.+/,"");try{e=n.parseFromString(e,t)}catch(e){}}return e},Rails.href=function(e){return e.href},Rails.isCrossDomain=function(e){var t,n;t=document.createElement("a"),t.href=location.href,n=document.createElement("a");try{return n.href=e,!((!n.protocol||":"===n.protocol)&&!n.host||t.protocol+"//"+t.host==n.protocol+"//"+n.host)}catch(e){return e,!0}}}.call(this),function(){var e,t;e=Rails.matches,t=function(e){return Array.prototype.slice.call(e)},Rails.serializeElement=function(n,a){var r,l;return r=[n],e(n,"form")&&(r=t(n.elements)),l=[],r.forEach(function(n){if(n.name)return e(n,"select")?t(n.options).forEach(function(e){if(e.selected)return l.push({name:n.name,value:e.value})}):n.checked||["radio","checkbox","submit"].indexOf(n.type)===-1?l.push({name:n.name,value:n.value}):void 0}),a&&l.push(a),l.map(function(e){return null!=e.name?encodeURIComponent(e.name)+"="+encodeURIComponent(e.value):e}).join("&")},Rails.formElements=function(n,a){return e(n,"form")?t(n.elements).filter(function(t){return e(t,a)}):t(n.querySelectorAll(a))}}.call(this),function(){var e,t,n,a,r,l,o,i,c,s,u;c=Rails.matches,i=Rails.getData,s=Rails.setData,u=Rails.stopEverything,o=Rails.formElements,Rails.enableElement=function(e){var t;return t=e instanceof Event?e.target:e,c(t,Rails.linkDisableSelector)?l(t):c(t,Rails.buttonDisableSelector)||c(t,Rails.formEnableSelector)?a(t):c(t,Rails.formSubmitSelector)?r(t):void 0},Rails.disableElement=function(a){var r;return r=a instanceof Event?a.target:a,c(r,Rails.linkDisableSelector)?n(r):c(r,Rails.buttonDisableSelector)||c(r,Rails.formDisableSelector)?e(r):c(r,Rails.formSubmitSelector)?t(r):void 0},n=function(e){var t;return t=e.getAttribute("data-disable-with"),null!=t&&(s(e,"ujs:enable-with",e.innerHTML),e.innerHTML=t),e.addEventListener("click",u),s(e,"ujs:disabled",!0)},l=function(e){var t;return t=i(e,"ujs:enable-with"),null!=t&&(e.innerHTML=t,s(e,"ujs:enable-with",null)),e.removeEventListener("click",u),s(e,"ujs:disabled",null)},t=function(t){return o(t,Rails.formDisableSelector).forEach(e)},e=function(e){var t;return t=e.getAttribute("data-disable-with"),null!=t&&(c(e,"button")?(s(e,"ujs:enable-with",e.innerHTML),e.innerHTML=t):(s(e,"ujs:enable-with",e.value),e.value=t)),e.disabled=!0,s(e,"ujs:disabled",!0)},r=function(e){return o(e,Rails.formEnableSelector).forEach(a)},a=function(e){var t;return t=i(e,"ujs:enable-with"),null!=t&&(c(e,"button")?e.innerHTML=t:e.value=t,s(e,"ujs:enable-with",null)),e.disabled=!1,s(e,"ujs:disabled",null)}}.call(this);