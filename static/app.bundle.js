!function(e){function t(t){for(var r,u,l=t[0],i=t[1],c=t[2],f=0,d=[];f<l.length;f++)u=l[f],a[u]&&d.push(a[u][0]),a[u]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(s&&s(t);d.length;)d.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,l=1;l<n.length;l++){var i=n[l];0!==a[i]&&(r=!1)}r&&(o.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={0:0},o=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="";var l=window.webpackJsonp=window.webpackJsonp||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var s=i;o.push([137,1]),n()}({137:function(e,t,n){e.exports=n(138)},138:function(e,t,n){"use strict";n(97);var r=i(n(2)),a=i(n(134)),o=n(69),u=i(n(347)),l=i(n(353));function i(e){return e&&e.__esModule?e:{default:e}}var c=document.getElementById("contents"),s=function(){return r.default.createElement("p",null,"Page Not Found (App.jsx)")},f=function(){return r.default.createElement(o.Switch,null,r.default.createElement(o.Redirect,{exact:!0,from:"/",to:"/issues"}),r.default.createElement(o.Route,{exact:!0,path:"/issues",component:(0,o.withRouter)(u.default)}),r.default.createElement(o.Route,{path:"/issues/:id",component:l.default}),r.default.createElement(o.Route,{component:s}))},d=function(){return r.default.createElement("div",null,r.default.createElement("div",{className:"header"},r.default.createElement("h1",null,"Issue Tracker")),r.default.createElement(f,null),r.default.createElement("div",{className:"footer"},"Full source code available at this ",r.default.createElement("a",{href:"https://github.com/sunqing99/mern/tree/chap8"},"GitHub repository")))};a.default.render(r.default.createElement(function(){return r.default.createElement(o.BrowserRouter,null,r.default.createElement(d,null))},null),c)},347:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=s(n(2)),o=s(n(1)),u=n(69),l=s(n(348));n(135);var i=s(n(351)),c=s(n(352));function s(e){return e&&e.__esModule?e:{default:e}}var f=function(e){var t=e.issue,n=t._id,r=t.status,o=t.owner,l=t.created,i=t.effort,c=t.completionDate,s=t.title;return a.default.createElement("tr",null,a.default.createElement("td",null,a.default.createElement(u.Link,{to:"/issues/"+n},n.substr(-4))),a.default.createElement("td",null,r),a.default.createElement("td",null,o),a.default.createElement("td",null,l.toDateString()),a.default.createElement("td",null,i),a.default.createElement("td",null,c?c.toDateString():"Not completed"),a.default.createElement("td",null,s))};function d(e){var t=e.issues.map(function(e){return a.default.createElement(f,{key:e._id,issue:e})});return a.default.createElement("table",{className:"bordered-table"},a.default.createElement("thead",null,a.default.createElement("tr",null,a.default.createElement("th",null,"Id"),a.default.createElement("th",null,"Status"),a.default.createElement("th",null,"Owner"),a.default.createElement("th",null,"Created"),a.default.createElement("th",null,"Effort"),a.default.createElement("th",null,"Completion Date"),a.default.createElement("th",null,"Title"))),a.default.createElement("tbody",null,t))}f.propTypes={issue:o.default.shape({_id:o.default.string}).isRequired},d.propTypes={issues:o.default.arrayOf(o.default.shape({_id:o.default.string})).isRequired};var p=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={issues:[]},e.createIssue=e.createIssue.bind(e),e.setFilter=e.setFilter.bind(e),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"componentDidMount",value:function(){this.loadData()}},{key:"componentDidUpdate",value:function(e){var t=this.props.location,n=l.default.parse(e.location.search),r=l.default.parse(t.search);n.status===r.status&&n.effort_gte===r.effort_gte&&n.effort_lte===r.effort_lte||this.loadData()}},{key:"setFilter",value:function(e){var t=this.props,n=t.history,r=t.location.pathname;n.push({pathname:r,search:l.default.stringify(e)})}},{key:"loadData",value:function(){var e=this,t=this.props.location;fetch("/api/issues"+t.search).then(function(t){t.ok?t.json().then(function(t){t.records.forEach(function(e){e.created=new Date(e.created),e.completionDate&&(e.completionDate=new Date(e.completionDate))}),e.setState({issues:t.records})}):t.json().then(function(e){alert("Failed to fetch issues: "+e.message)})}).catch(function(e){alert("Error in fetch data from server: "+e)})}},{key:"createIssue",value:function(e){var t=this;fetch("/api/issues",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(e){e.ok?e.json().then(function(e){e.created=new Date(e.created),e.completionDate&&(e.completionDate=new Date(e.completionDate));var n=t.state.issues.concat(e);t.setState({issues:n})}):e.json().then(function(e){alert("Failed to add issue: "+e.message)})}).catch(function(e){alert("Error in sending data to server: "+e.message)})}},{key:"render",value:function(){var e=this.state.issues,t=this.props.location.search,n=l.default.parse(t);return a.default.createElement("div",null,a.default.createElement(c.default,{setFilter:this.setFilter,initFilter:n}),a.default.createElement("hr",null),a.default.createElement(d,{issues:e}),a.default.createElement("hr",null),a.default.createElement(i.default,{createIssue:this.createIssue}))}}],[{key:"propTypes",get:function(){return{location:o.default.shape({search:o.default.string.isRequired}).isRequired,history:o.default.shape({length:o.default.number}).isRequired}}}]),t}();t.default=p},348:function(e,t,n){"use strict";const r=n(349),a=n(350);function o(e,t){return t.encode?t.strict?r(e):encodeURIComponent(e):e}function u(e,t){return t.decode?a(e):e}function l(e){const t=e.indexOf("?");return-1===t?"":e.slice(t+1)}function i(e,t){const n=function(e){let t;switch(e.arrayFormat){case"index":return(e,n,r)=>{t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===r[e]&&(r[e]={}),r[e][t[1]]=n):r[e]=n};case"bracket":return(e,n,r)=>{t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==r[e]?r[e]=[].concat(r[e],n):r[e]=[n]:r[e]=n};default:return(e,t,n)=>{void 0!==n[e]?n[e]=[].concat(n[e],t):n[e]=t}}}(t=Object.assign({decode:!0,arrayFormat:"none"},t)),r=Object.create(null);if("string"!=typeof e)return r;if(!(e=e.trim().replace(/^[?#&]/,"")))return r;for(const a of e.split("&")){let[e,o]=a.replace(/\+/g," ").split("=");o=void 0===o?null:u(o,t),n(u(e,t),o,r)}return Object.keys(r).sort().reduce((e,t)=>{const n=r[t];return Boolean(n)&&"object"==typeof n&&!Array.isArray(n)?e[t]=function e(t){return Array.isArray(t)?t.sort():"object"==typeof t?e(Object.keys(t)).sort((e,t)=>Number(e)-Number(t)).map(e=>t[e]):t}(n):e[t]=n,e},Object.create(null))}t.extract=l,t.parse=i,t.stringify=((e,t)=>{!1===(t=Object.assign({encode:!0,strict:!0,arrayFormat:"none"},t)).sort&&(t.sort=(()=>{}));const n=function(e){switch(e.arrayFormat){case"index":return(t,n,r)=>null===n?[o(t,e),"[",r,"]"].join(""):[o(t,e),"[",o(r,e),"]=",o(n,e)].join("");case"bracket":return(t,n)=>null===n?[o(t,e),"[]"].join(""):[o(t,e),"[]=",o(n,e)].join("");default:return(t,n)=>null===n?o(t,e):[o(t,e),"=",o(n,e)].join("")}}(t);return e?Object.keys(e).sort(t.sort).map(r=>{const a=e[r];if(void 0===a)return"";if(null===a)return o(r,t);if(Array.isArray(a)){const e=[];for(const t of a.slice())void 0!==t&&e.push(n(r,t,e.length));return e.join("&")}return o(r,t)+"="+o(a,t)}).filter(e=>e.length>0).join("&"):""}),t.parseUrl=((e,t)=>({url:e.split("?")[0]||"",query:i(l(e),t)}))},349:function(e,t,n){"use strict";e.exports=(e=>encodeURIComponent(e).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`))},350:function(e,t,n){"use strict";var r=new RegExp("%[a-f0-9]{2}","gi"),a=new RegExp("(%[a-f0-9]{2})+","gi");function o(e,t){try{return decodeURIComponent(e.join(""))}catch(e){}if(1===e.length)return e;t=t||1;var n=e.slice(0,t),r=e.slice(t);return Array.prototype.concat.call([],o(n),o(r))}function u(e){try{return decodeURIComponent(e)}catch(a){for(var t=e.match(r),n=1;n<t.length;n++)t=(e=o(t,n).join("")).match(r);return e}}e.exports=function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return function(e){for(var t={"%FE%FF":"��","%FF%FE":"��"},n=a.exec(e);n;){try{t[n[0]]=decodeURIComponent(n[0])}catch(e){var r=u(n[0]);r!==n[0]&&(t[n[0]]=r)}n=a.exec(e)}t["%C2"]="�";for(var o=Object.keys(t),l=0;l<o.length;l++){var i=o[l];e=e.replace(new RegExp(i,"g"),t[i])}return e}(e)}}},351:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=u(n(2)),o=u(n(1));function u(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.handleSubmit=e.handleSubmit.bind(e),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"handleSubmit",value:function(e){e.preventDefault();var t=document.forms.issueAdd;(0,this.props.createIssue)({owner:t.owner.value,title:t.title.value,status:"New",created:new Date}),t.owner.value="",t.title.value=""}},{key:"render",value:function(){return a.default.createElement("div",null,a.default.createElement("form",{name:"issueAdd",onSubmit:this.handleSubmit},a.default.createElement("input",{type:"text",name:"owner",placeholder:"Owner"}),a.default.createElement("input",{type:"text",name:"title",placeholder:"Title"}),a.default.createElement("button",{type:"submit"},"Add")))}}],[{key:"propTypes",get:function(){return{createIssue:o.default.func.isRequired}}}]),t}();t.default=l},352:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=u(n(2)),o=u(n(1));function u(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={status:e.initFilter.status||"",effort_gte:e.initFilter.effort_gte||"",effort_lte:e.initFilter.effort_lte||"",changed:!1},n.onChangeStatus=n.onChangeStatus.bind(n),n.onChangeEffortGte=n.onChangeEffortGte.bind(n),n.onChangeEffortLte=n.onChangeEffortLte.bind(n),n.applyFilter=n.applyFilter.bind(n),n.resetFilter=n.resetFilter.bind(n),n.clearFilter=n.clearFilter.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"onChangeStatus",value:function(e){this.setState({status:e.target.value,changed:!0})}},{key:"onChangeEffortGte",value:function(e){e.target.value.match(/^\d*$/)&&this.setState({effort_gte:e.target.value,changed:!0})}},{key:"onChangeEffortLte",value:function(e){e.target.value.match(/^\d*$/)&&this.setState({effort_lte:e.target.value,changed:!0})}},{key:"applyFilter",value:function(){var e={},t=this.state,n=t.status,r=t.effort_gte,a=t.effort_lte,o=this.props.setFilter;n&&(e.status=n),r&&(e.effort_gte=r),a&&(e.effort_lte=a),o(e)}},{key:"resetFilter",value:function(){var e=this.props.initFilter,t=e.status,n=e.effort_gte,r=e.effort_lte;this.setState({status:t||"",effort_gte:n||"",effort_lte:r||"",changed:!1})}},{key:"clearFilter",value:function(){(0,this.props.setFilter)({})}},{key:"render",value:function(){var e=this.state,t=e.status,n=e.effort_gte,r=e.effort_lte,o=e.changed;return a.default.createElement("div",null,"Status:",a.default.createElement("select",{value:t,onChange:this.onChangeStatus},a.default.createElement("option",{value:""},"(Any)"),a.default.createElement("option",{value:"New"},"New"),a.default.createElement("option",{value:"Open"},"Open"),a.default.createElement("option",{value:"Assigned"},"Assigned"),a.default.createElement("option",{value:"Fixed"},"Fixed"),a.default.createElement("option",{value:"Verified"},"Verified"),a.default.createElement("option",{value:"Closed"},"Closed"))," Effort between:",a.default.createElement("input",{size:5,value:n,onChange:this.onChangeEffortGte})," - ",a.default.createElement("input",{size:5,value:r,onChange:this.onChangeEffortLte}),a.default.createElement("button",{type:"button",onClick:this.applyFilter},"Apply"),a.default.createElement("button",{type:"button",onClick:this.resetFilter,disabled:!o},"Reset"),a.default.createElement("button",{type:"button",onClick:this.clearFilter},"Clear"))}}],[{key:"propTypes",get:function(){return{setFilter:o.default.func.isRequired,initFilter:o.default.shape({status:o.default.string,effort_gte:o.default.string,effort_lte:o.default.string,changed:o.default.bool}).isRequired}}}]),t}();t.default=l},353:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var r=u(n(2)),a=u(n(1)),o=n(69);function u(e){return e&&e.__esModule?e:{default:e}}function l(e){var t=e.match;return r.default.createElement("div",null,r.default.createElement("p",null,"Placeholder for editing issue ",t.params.id),r.default.createElement(o.Link,{to:"/issues"},"Back to issue list"))}l.propTypes={match:a.default.shape({params:a.default.shape({id:a.default.string})}).isRequired}}});
//# sourceMappingURL=app.bundle.js.map