(window.webpackJsonp=window.webpackJsonp||[]).push([[20,21],{621:function(e,t,r){"use strict";r.r(t);r(24),r(42);var n={props:{preview:{type:Object}},computed:{cpPreview:function(){return this.preview}},data:function(){return{selected:null}},watch:{selected:function(e){this.selected=e.toString()}}},l=r(44),component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h6",{domProps:{textContent:e._s(e.cpPreview.title)}}),e._v(" "),r("b-form-group",{staticClass:"checkbox-style w-100",staticStyle:{width:"500px"}},[r("b-form-radio-group",{attrs:{options:e.cpPreview.options},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1),e._v(" "),null!==e.selected?r("div",{staticClass:"w-100 mt-3"},[e._v("\n    "+e._s("A resposta está "+(e.selected==e.cpPreview.rightAnswer?"certa":"incorreta")+"!")+"\n    "),r("p",[e._v(e._s(e.selected+" - "+e.cpPreview.rightAnswer))])]):e._e()],1)}),[],!1,null,null,null);t.default=component.exports},677:function(e,t,r){"use strict";r.r(t);var n={props:{task:{type:Object,default:{}}},computed:{preview:function(){return this.task}}},l=r(44),component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("b-modal",{ref:"modalPreviewQuestion",attrs:{id:"preview-question",title:"Pré-visualização de atividade",centered:"","no-close-on-backdrop":"","hide-footer":"","header-class":"border-0"}},[r("TaskMultipleChoice",{attrs:{preview:e.preview}})],1)],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{TaskMultipleChoice:r(621).default})}}]);