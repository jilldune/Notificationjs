!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Notificationsjs=e():t.Notificationsjs=e()}(this,(()=>(()=>{"use strict";var t={d:(e,n)=>{for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=Array(e);n<e;n++)i[n]=t[n];return i}function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,c(i.key),i)}}function s(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function a(t,e,n){return(e=c(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function c(t){var e=function(t,e){if("object"!=i(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!=i(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==i(e)?e:e+""}t.r(e),t.d(e,{Notification:()=>k,Prompt:()=>E,Toast:()=>_});var l=function(){return s((function t(){o(this,t),a(this,"items",[])}),[{key:"enqueue",value:function(t){this.items.push(t)}},{key:"appendFirst",value:function(t){this.items.unshift(t)}},{key:"dequeue",value:function(){return this.isEmpty()?"Underflow":this.items.shift()}},{key:"peek",value:function(){return this.isEmpty()?"No elements in Queue":this.items[0]}},{key:"isEmpty",value:function(){return 0===this.items.length}},{key:"printQueue",value:function(){for(var t="",e=0;e<this.items.length;e++)t+=this.items[e]+" ";return t}}])}(),u=function(){return s((function t(e){var n=this;o(this,t),a(this,"defaults",{backdrop:{set:!1,level:1,clickToClose:!1}}),a(this,"settings",{}),a(this,"PREFIX","-notifjs"),a(this,"BACK_DROP_ID","backdrop".concat(this.PREFIX)),a(this,"notificationBackdrop",null),a(this,"listenerAdded",!1),a(this,"callback",null),a(this,"backdropClick",(function(t){t.preventDefault(),setTimeout((function(){p(n.callback)&&n.callback(),n.toggleBackdrop(),n.removeListener()}),200)})),this.setOptions(e)}),[{key:"setOptions",value:function(t){this.settings=h(t)?f(this.defaults,t):this.defaults}},{key:"createBackdrop",value:function(){var t=this.settings.backdrop;if(t.set){var e=document.getElementById(this.BACK_DROP_ID);if(e)return this.removeBackdropBGLevel(e),e.classList.add("drop-".concat(t.level)),void(this.notificationBackdrop=e);var n=document.createElement("div");n.classList.add("drop-".concat(t.level)),n.id=this.BACK_DROP_ID;var i=document.body.querySelectorAll("script");i?document.body.insertBefore(n,i[0]):document.body.append(n),this.notificationBackdrop=n}}},{key:"removeBackdropBGLevel",value:function(t){for(var e=1;e<11;e++)t.classList.remove("drop-".concat(e))}},{key:"toggleBackdrop",value:function(){if(this.settings.backdrop.set){var t=document.getElementById(this.BACK_DROP_ID);t.classList.contains("show")?(t.classList.remove("show"),this.notificationBackdrop=t,this.removeListener()):(t.classList.add("show"),this.notificationBackdrop=t)}}},{key:"bindBackDropEvent",value:function(t){if(!this.listenerAdded){var e=this.settings.backdrop;e.set&&e.clickToClose&&(this.callback=t,this.notificationBackdrop.addEventListener("click",this.backdropClick),this.listenerAdded=!0)}}},{key:"removeListener",value:function(){this.listenerAdded&&(this.notificationBackdrop.removeEventListener("click",this.backdropClick),this.listenerAdded=!1)}}])}(),f=function t(){for(var e=function(t){return t&&"object"===i(t)},o=arguments.length,r=new Array(o),s=0;s<o;s++)r[s]=arguments[s];return r.reduce((function(i,o){return Object.keys(o).forEach((function(r){var s,a=i[r],c=o[r];Array.isArray(a)&&Array.isArray(c)?i[r]=a.concat.apply(a,function(t){if(Array.isArray(t))return n(t)}(s=c)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(s)||function(t,e){if(t){if("string"==typeof t)return n(t,e);var i={}.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?n(t,e):void 0}}(s)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()):e(a)&&e(c)?i[r]=t(a,c):i[r]=c})),i}),{})},h=function(t){return t&&"object"===i(t)&&!Array.isArray(t)},p=function(t){return t&&"function"==typeof t};function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=Array(e);n<e;n++)i[n]=t[n];return i}function b(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,m(i.key),i)}}function v(t,e,n){return(e=m(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function m(t){var e=function(t,e){if("object"!=d(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=d(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==d(e)?e:e+""}var k=function(){return t=function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),v(this,"defaults",{header:"Notification",body:"This is a notification body",button:null,actions:null,onClose:null,position:"bottom-right",autoClose:!0,duration:3500,final:null,checkbox:{set:!1,label:"Label",checked:!1,onChange:null},backdrop:{set:!0,level:1,clickToClose:!1}}),v(this,"arrowIcons",{"top-right":"ri-arrow-right-line","right-center":"ri-arrow-right-line","bottom-right":"ri-arrow-right-line","top-left":"ri-arrow-left-line","left-center":"ri-arrow-left-line","bottom-left":"ri-arrow-left-line","bottom-center":"ri-close-line","top-center":"ri-close-line",center:"ri-close-line"}),v(this,"positionsArray",["top-right","right-center","bottom-right","top-left","left-center","bottom-left","bottom-center","top-center","center"]),v(this,"settings",{}),v(this,"notificationContainer",null),v(this,"backdropClass",void 0),v(this,"queue",void 0),v(this,"isRunning",!1),v(this,"notification",(function(t){n.queue.enqueue(t),n.run()})),this.queue=new l,this.settings=this.isObject(e)?f(this.defaults,e):this.defaults,this.backdropClass=new u(this.settings),this.createContainer()},e=[{key:"createContainer",value:function(){var t=document.createElement("div");t.classList.add("notification");var e=document.body.querySelectorAll("script");e?document.body.insertBefore(t,e[0]):document.body.append(t),this.notificationContainer=t,this.backdropClass.createBackdrop()}},{key:"run",value:function(){this.queue.isEmpty()||this.isRunning||(this.display(this.queue.dequeue()),this.isRunning=!0)}},{key:"display",value:function(t){this.settings=this.isObject(t)?f(this.defaults,{backdrop:this.settings.backdrop},t):this.settings;var e=this.settings,n=e.header,i=e.body,o=e.position;n=n||this.defaults.header,i=i||this.defaults.body,o=o||this.defaults.position,this.backdropClass.setOptions(this.settings),this.backdropClass.createBackdrop(),this.checkPosition(o),this.resetNotification(),this.setContent(n,i,o),this.closeNotification()}},{key:"setContent",value:function(t,e,n){var i=this;this.notificationContainer.innerHTML='\n            <div class="notification-header">\n                <p>'.concat(t,'</p>\n                <span class="notification-close"><i class="').concat(this.closeIcon(n),'"></i></span>\n            </div>\n            <div class="notification-body">\n                <p>').concat(e,'</p>\n            </div>\n            <div class="notification-footer">\n                ').concat(this.createCheckBox(),"\n                ").concat(this.setButtons(),"\n            </div>\n        "),this.bindButtonEvent(),this.checkAutoClose(),this.notificationContainer.classList.add(n),setTimeout((function(){i.backdropClass.toggleBackdrop(),i.notificationContainer.classList.add("show")}),200)}},{key:"createCheckBox",value:function(){var t=this.settings.checkbox;if(t&&this.isObject(t)){var e=t.label,n=t.checked;if(t.set)return'\n                    <div class="notification-checker">\n                        <label>\n                            <input type="checkbox" '.concat(n?"checked":"",">\n                            <span>").concat(e||"Checkbox","</span>\n                        </label>\n                    </div>\n                ")}return""}},{key:"bindCheckboxEvent",value:function(){var t=this.settings.checkbox;if(t&&this.isObject(t)){var e=t.onChange;t.set&&e&&"function"==typeof e&&this.notificationContainer.querySelector('.notification-checker label input[type="checkbox"]').addEventListener("change",(function(t){e(t.target.checked)}))}return""}},{key:"setButtons",value:function(){var t=this.settings.button;return Array.isArray(t)&&t.length?'\n                <div class="notification-buttons">\n                    '.concat(t.map((function(t){return'<button type="button">'.concat(t||"button","</button>")})).join(""),"\n                </div>\n            "):""}},{key:"showFinal",value:function(t){t&&t()}},{key:"bindButtonEvent",value:function(){var t=this,e=this.settings,n=e.button,i=e.final,o=e.actions,r=e.checkbox,s=(e.backdrop,Array.isArray(n)?n:[]),a=Array.isArray(o)?o:[],c="function"==typeof i?i:null,l=null;this.bindCheckboxEvent(),s.length&&function(t){return function(t){if(Array.isArray(t))return y(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return y(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(this.notificationContainer.querySelectorAll(".notification-footer button")).forEach((function(e,n){e.addEventListener("click",(function(e){if(e.preventDefault(),a[n])if(r.set){var i={checked:!!(l=t.notificationContainer.querySelector(".notification-checker label input"))&&l.checked};a[n](i)}else a[n]();t.showFinal(c),setTimeout((function(){t.resetNotification(),t.backdropClass.toggleBackdrop(),t.run(),l=!1}),200)}),{once:!0})})),this.backdropClass.bindBackDropEvent((function(){t.resetNotification(),t.run()}))}},{key:"checkAutoClose",value:function(){var t=this,e=this.settings,n=e.autoClose,i=e.final,o=e.onClose,r=e.duration,s="function"==typeof i?i:this.defaults.final,a="boolean"==typeof n?n:this.defaults.autoClose,c="function"==typeof o?o:this.defaults.onClose,l="number"==typeof r?r:this.defaults.duration;a&&setTimeout((function(){t.resetNotification(),t.backdropClass.toggleBackdrop(),c&&c(),t.showFinal(s),t.run()}),l)}},{key:"resetNotification",value:function(){this.clearPosition(),this.notificationContainer.classList.remove("show"),this.notificationContainer.innerHTML="",this.isRunning=!1}},{key:"closeNotification",value:function(){var t=this,e=this.settings,n=e.final,i=e.onClose,o="function"==typeof n?n:this.defaults.final,r="function"==typeof i?i:this.defaults.onClose;this.notificationContainer.querySelector(".notification-close").addEventListener("click",(function(e){e.preventDefault(),r&&r(),t.showFinal(o),t.resetNotification(),t.backdropClass.toggleBackdrop(),t.run()}))}},{key:"clearPosition",value:function(){var t=this;this.positionsArray.forEach((function(e){t.notificationContainer.classList.remove(e)}))}},{key:"closeIcon",value:function(t){return this.arrowIcons[t]}},{key:"checkPosition",value:function(t){this.positionsArray.includes(t)||console.error("Invalid position: '".concat(t,"' is NOT a valid position."))}},{key:"isObject",value:function(t){return t&&"object"===d(t)&&!Array.isArray(t)}}],e&&b(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();function g(t){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g(t)}function C(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=Array(e);n<e;n++)i[n]=t[n];return i}function w(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,S(i.key),i)}}function A(t,e,n){return(e=S(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function S(t){var e=function(t,e){if("object"!=g(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=g(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==g(e)?e:e+""}var E=function(){return t=function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),A(this,"defaults",{header:"Prompt",placeHolder:"enter text",value:"",label:null,type:"text",button:null,actions:null,onClose:null,position:"bottom-right",autoClose:!0,duration:3500,final:null,checkbox:{set:!1,label:"Label",checked:!1,onChange:null},backdrop:{set:!0,level:1,clickToClose:!1}}),A(this,"arrowIcons",{"top-right":"ri-arrow-right-line","right-center":"ri-arrow-right-line","bottom-right":"ri-arrow-right-line","top-left":"ri-arrow-left-line","left-center":"ri-arrow-left-line","bottom-left":"ri-arrow-left-line","bottom-center":"ri-close-line","top-center":"ri-close-line",center:"ri-close-line"}),A(this,"positionsArray",["top-right","right-center","bottom-right","top-left","left-center","bottom-left","bottom-center","top-center","center"]),A(this,"types",["textarea","text","password","number","tel","email","url"]),A(this,"settings",{}),A(this,"promptContainer",null),A(this,"queue",void 0),A(this,"isRunning",!1),A(this,"backdropClass",null),A(this,"prompt",(function(t){n.queue.enqueue(t),n.run()})),this.queue=new l,this.settings=this.isObject(e)?f(this.defaults,e):this.defaults,this.backdropClass=new u(this.settings),this.createContainer()},e=[{key:"createContainer",value:function(){var t=document.createElement("div");t.classList.add("prompt");var e=document.body.querySelectorAll("script");e?document.body.insertBefore(t,e[0]):document.body.append(t),this.promptContainer=t}},{key:"run",value:function(){this.queue.isEmpty()||this.isRunning||(this.display(this.queue.dequeue()),this.isRunning=!0)}},{key:"display",value:function(t){this.settings=this.isObject(t)?f(this.defaults,{backdrop:this.settings.backdrop},t):this.settings;var e=this.settings,n=e.header,i=e.position,o=e.value,r=e.placeHolder,s=e.type,a=e.label;n=n||this.defaults.header,i=i||this.defaults.position,o=o||this.defaults.value,s=s||this.defaults.type,a=a||this.defaults.label,r=r||this.defaults.placeHolder,this.backdropClass.setOptions(this.settings),this.backdropClass.createBackdrop(),this.checkPosition(i),this.resetPrompt(),this.setContent(n,i,s,o,r,a),this.closePrompt()}},{key:"setContent",value:function(t,e,n,i,o,r){var s=this,a=([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(t){return(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16)}));this.promptContainer.innerHTML='\n            <div class="prompt-header">\n                <p>'.concat(t,'</p>\n                <span class="prompt-close"><i class="').concat(this.closeIcon(e),'"></i></span>\n            </div>\n            <div class="prompt-body">\n                ').concat(r?'<label class="prompt-label" for="'.concat(a,'">').concat("string"==typeof r?r:"","</label>"):"","\n                ").concat(this.types.includes(n)&&"textarea"===n?'<textarea class="prompt-input" id="'.concat(a,'" placeholder="').concat(o,'" aria-placeholder="').concat(o,'">').concat(i?"".concat(i):"","</textarea>"):this.types.includes(n)?'<input class="prompt-input" id="'.concat(a,'" type="').concat(n,'" ').concat(i?'value="'.concat(i,'"'):"",' placeholder="').concat(o,'" aria-placeholder="').concat(o,'" />'):'<input class="prompt-input" id="'.concat(a,'" type="text" ').concat(i?'value="'.concat(i,'"'):"",' placeholder="').concat(o,'" aria-placeholder="').concat(o,'" />'),'\n            </div>\n            <div class="prompt-footer">\n                ').concat(this.createCheckBox(),"\n                ").concat(this.setButtons(),"\n            </div>\n        "),this.bindButtonEvent(),this.checkAutoClose(),this.promptContainer.classList.add(e),setTimeout((function(){s.backdropClass.toggleBackdrop(),s.promptContainer.classList.add("show")}),200)}},{key:"createCheckBox",value:function(){var t=this.settings.checkbox;if(t&&this.isObject(t)){var e=t.label,n=t.checked;if(t.set)return'\n                    <div class="prompt-checker">\n                        <label>\n                            <input type="checkbox" '.concat(n?"checked":"",">\n                            <span>").concat(e||"Checkbox","</span>\n                        </label>\n                    </div>\n                ")}return""}},{key:"bindCheckboxEvent",value:function(){var t=this.settings.checkbox;if(t&&this.isObject(t)){var e=t.onChange;t.set&&e&&"function"==typeof e&&this.promptContainer.querySelector('.prompt-checker label input[type="checkbox"]').addEventListener("change",(function(t){e(t.target.checked)}))}}},{key:"setButtons",value:function(){var t=this.settings.button;return Array.isArray(t)&&t.length?'\n                <div class="prompt-buttons">\n                    '.concat(t.map((function(t){return'<button type="button">'.concat(t||"button","</button>")})).join(""),"\n                </div>\n            "):""}},{key:"showFinal",value:function(t){t&&t()}},{key:"bindButtonEvent",value:function(){var t=this,e=this.settings,n=e.button,i=e.final,o=e.actions,r=e.checkbox,s=Array.isArray(n)?n:[],a=Array.isArray(o)?o:[],c="function"==typeof i?i:null;if(this.bindCheckboxEvent(),s.length){var l=function(t){return function(t){if(Array.isArray(t))return C(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return C(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(this.promptContainer.querySelectorAll(".prompt-footer button")),u=this.promptContainer.querySelector(".prompt-input"),f=null;l.forEach((function(e,n){e.addEventListener("click",(function(e){if(e.preventDefault(),a[n]){r.set&&(f=t.promptContainer.querySelector(".prompt-checker label input"));var i={input:u,value:u.value.trim()||null,checked:!!f&&f.checked};a[n](i)}t.showFinal(c),setTimeout((function(){t.resetPrompt(),t.backdropClass.toggleBackdrop(),t.isRunning=!1,f=!1,t.run()}),200)}),{once:!0})}))}this.backdropClass.bindBackDropEvent((function(){t.resetNotification(),t.run()}))}},{key:"checkAutoClose",value:function(){var t=this,e=this.settings,n=e.autoClose,i=e.final,o=e.onClose,r=e.duration,s="function"==typeof i?i:this.defaults.final,a="boolean"==typeof n?n:this.defaults.autoClose,c="function"==typeof o?o:this.defaults.onClose,l="number"==typeof r?r:this.defaults.duration;a&&setTimeout((function(){t.resetPrompt(),t.backdropClass.toggleBackdrop(),c&&c(),t.showFinal(s),t.isRunning=!1,t.run()}),l)}},{key:"resetPrompt",value:function(){this.clearPosition(),this.promptContainer.classList.remove("show"),this.promptContainer.innerHTML="",this.isRunning=!1}},{key:"closePrompt",value:function(){var t=this,e=this.settings,n=e.final,i=e.onClose,o="function"==typeof n?n:this.defaults.final,r="function"==typeof i?i:this.defaults.onClose;this.promptContainer.querySelector(".prompt-close").addEventListener("click",(function(e){e.preventDefault(),r&&r(),t.showFinal(o),t.resetPrompt(),t.backdropClass.toggleBackdrop(),t.run()}))}},{key:"clearPosition",value:function(){var t=this;this.positionsArray.forEach((function(e){t.promptContainer.classList.remove(e)}))}},{key:"closeIcon",value:function(t){return this.arrowIcons[t]}},{key:"checkPosition",value:function(t){this.positionsArray.includes(t)||console.error("Invalid position: '".concat(t,"' is NOT a valid position."))}},{key:"isObject",value:function(t){return t&&"object"===g(t)&&!Array.isArray(t)}}],e&&w(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();function T(t){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},T(t)}function j(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,O(i.key),i)}}function P(t,e,n){(function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")})(t,e),e.set(t,n)}function B(t,e,n){return(e=O(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function O(t){var e=function(t,e){if("object"!=T(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=T(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==T(e)?e:e+""}function L(t,e){return t.get(q(t,e))}function x(t,e,n){return t.set(q(t,e),n),n}function q(t,e,n){if("function"==typeof t?t===e:t.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var I=new WeakMap,R=new WeakMap,N=new WeakMap,_=function(){return t=function t(){var e=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),B(this,"TOAST_DEFAULTS",{duration:5e3}),B(this,"TOAST_TYPES",{alert:"alert",neutral:"neutral",success:"success",info:"info",error:"error",a:"alert",n:"neutral",s:"success",i:"info",e:"error"}),B(this,"PREFIX","toastjs"),B(this,"CONTAINER_CLASS","toast-container-".concat(this.PREFIX)),P(this,I,void 0),P(this,R,void 0),P(this,N,void 0),B(this,"isRunning",!1),B(this,"toast",(function(t,n){if(arguments.length>2&&void 0!==arguments[2]&&arguments[2])return L(R,e).appendFirst({toast_type:t,message:n}),void e.dismissToast();L(R,e).enqueue({toast_type:t,message:n}),e.run()})),x(R,this,new l),this.createParentContainer()},(e=[{key:"createParentContainer",value:function(){var t=document.querySelector(".".concat(this.CONTAINER_CLASS));if(x(I,this,t),!t){var e=document.createElement("div");e.className=this.CONTAINER_CLASS,document.body.insertAdjacentElement("afterbegin",e),x(I,this,e)}}},{key:"createToastElement",value:function(t){if(!t)return"";var e=document.createElement("div");return e.className="toast ".concat(this.TOAST_TYPES[t.toast_type.toLowerCase()]," active"),e.textContent=t.message,e}},{key:"run",value:function(){var t=this;if(!L(R,this).isEmpty()&&!this.isRunning){var e=this.createToastElement(L(R,this).dequeue());if(!e)return;L(I,this).appendChild(e),this.isRunning=!0,L(N,this)&&clearTimeout(L(N,this));var n=setTimeout((function(){x(N,t,n),t.isRunning&&t.dismissToast(),clearTimeout(n)}),this.TOAST_DEFAULTS.duration)}}},{key:"dismissToast",value:function(){var t=this;if(this.isRunning)try{L(I,this).querySelector("div.toast.active").classList.remove("active");var e=setTimeout((function(){clearTimeout(e),L(I,t).innerHTML="",t.isRunning=!1,t.run()}),1e3)}catch(t){}else this.run()}}])&&j(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();return e})()));