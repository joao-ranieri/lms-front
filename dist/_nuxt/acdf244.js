(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{615:function(t,e,r){var content=r(645);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(59).default)("2cd85c0c",content,!0,{sourceMap:!1})},643:function(t,e,r){t.exports=r.p+"img/ico-camera.8e6bbf1.svg"},644:function(t,e,r){"use strict";r(615)},645:function(t,e,r){var n=r(58)(!1);n.push([t.i,'.drag-drop-box[data-v-14d2673c]{display:flex;justify-content:center;align-items:center;border:2px dashed #cdcdce;border-radius:8px;font:14px "Inter Regular";color:#cdcdce;cursor:pointer;z-index:1}.size-default[data-v-14d2673c]{width:150px;height:200px}.actions-group[data-v-14d2673c]{position:absolute;display:none;justify-content:center;align-items:flex-end;background:linear-gradient(180deg,rgba(58,62,69,.0001),#212527);border-radius:8px;z-index:2;top:0}div:hover>.actions-group[data-v-14d2673c]{display:flex}.actions-group button[data-v-14d2673c]{border:none;border-radius:8px;background:#fff;padding:4px;width:28px;height:28px}.actions-group button>i[data-v-14d2673c]{height:18px}u[data-v-14d2673c]{color:#89238a}img[data-v-14d2673c]{border-radius:8px;-o-object-fit:cover;object-fit:cover}',""]),t.exports=n},673:function(t,e,r){"use strict";r.r(e);var n=r(21),o=(r(24),r(62),{props:{image:{type:String,default:null}},asyncComputed:{imgBase64:function(){return this.image}},methods:{setImage:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var img;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return img=t.dataTransfer?t.dataTransfer.files[0]:t.target.files[0],r.next=3,e.toBase64(img);case 3:case"end":return r.stop()}}),r)})))()},toBase64:function(t){var image,e=this;new Promise((function(e,r){var n=new FileReader;n.readAsDataURL(t),n.onload=function(){return e(n.result)},n.onerror=function(t){return r(t)}})).then((function(t){image=t})).finally((function(){var r={file:t,base64:image};e.$emit("send-image",r)}))},removeImage:function(){this.$emit("send-image",{file:null,base64:null})}}}),c=(r(644),r(44)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"position-relative"},[n("input",{ref:"fileInput",staticClass:"d-none",attrs:{type:"file",enctype:"multipart/form-data"},on:{change:t.setImage}}),t._v(" "),n("div",{staticClass:"drag-drop-box size-default",on:{click:function(e){return t.$refs.fileInput.click()},drop:function(e){return e.preventDefault(),t.setImage.apply(null,arguments)},dragover:function(t){t.preventDefault()}}},[t.imgBase64?n("img",{attrs:{src:t.imgBase64,width:"150",height:"200",alt:"author-image"}}):n("div",{staticClass:"text-center p-3"},[n("img",{attrs:{src:r(643),alt:"camera"}}),t._v(" "),t._m(0)])]),t._v(" "),t.imgBase64?n("div",{staticClass:"actions-group size-default"},[n("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Editar",expression:"'Editar'"}],staticClass:"mb-3 mr-3",attrs:{type:"button"},on:{click:function(e){return t.$refs.fileInput.click()}}},[n("i",{staticClass:"pencil-ico"})]),t._v(" "),n("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Remover",expression:"'Remover'"}],staticClass:"mb-3",attrs:{type:"button"},on:{click:t.removeImage}},[n("i",{staticClass:"trash-ico"})])]):t._e()])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",{staticClass:"d-block mt-3"},[t._v("\n          Arraste ou "),r("u",[t._v("selecione")]),t._v(" uma imagem de capa\n        ")])}],!1,null,"14d2673c",null);e.default=component.exports}}]);