(window.webpackJsonp=window.webpackJsonp||[]).push([[19,22],{593:function(t,e,n){"use strict";n.r(e);var r=n(37),o=(n(179),n(2),n(180),{props:{src:{type:String},w:{type:Number,default:128},h:{type:Number,default:128},cssGroup:{type:Object}},methods:{setCSS:function(style){style&&Object.entries(style).forEach((function(t){var e=Object(r.a)(t,2),n=e[0],o=e[1];document.getElementsByClassName("content-animation")[0].style[n]=o}))}}}),c=n(44),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content-animation d-flex justify-content-center w-100",style:t.cssGroup},[n("lottie-player",{style:{width:t.w+"px",height:t.h+"px"},attrs:{src:t.src,background:"transparent",speed:"1",loop:"",autoplay:""}})],1)}),[],!1,null,null,null);e.default=component.exports},679:function(t,e,n){"use strict";n.r(e);var r={props:{message:{type:String},type:{type:String}},computed:{messageText:function(){return this.message},typeNotification:function(){return this.type}},data:function(){return{animations:{error:"/animations/error.json",alert:"/animations/alert.json"},styleProps:{error:{transform:"scale(1)"},alert:{transform:"scale(1.5)"}}}}},o=n(44),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-modal",{ref:"notification",attrs:{size:"sm",id:"notification",centered:"","no-close-on-backdrop":"","hide-footer":"","hide-header":"","header-class":"border-0"}},[n("div",{staticClass:"d-block text-center"},[n("div",{staticClass:"d-flex justify-content-center "},[n("UtilsAnimation",{attrs:{cssGroup:t.styleProps[t.typeNotification],w:70,h:70,src:t.animations[t.typeNotification]}})],1),t._v(" "),n("h6",{domProps:{innerHTML:t._s(t.messageText)}})]),t._v(" "),n("div",{staticClass:"text-center mt-3"},[n("b-button",{staticClass:"pl-4 pr-4",attrs:{size:"sm"},on:{click:function(e){return t.$bvModal.hide("notification")}}},[t._v("Ok")])],1)])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{UtilsAnimation:n(593).default})}}]);