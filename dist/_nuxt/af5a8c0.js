(window.webpackJsonp=window.webpackJsonp||[]).push([[27,6],{599:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDI0IDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8Y2lyY2xlIGN4PSIxMiIgY3k9IjMiIHI9IjIiIHN0cm9rZT0iIzA5MEUxMSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIyIiBzdHJva2U9IiMwOTBFMTEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8Y2lyY2xlIGN4PSIyMSIgY3k9IjMiIHI9IjIiIHN0cm9rZT0iIzA5MEUxMSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjwvc3ZnPg0K"},602:function(t,e,o){"use strict";o.r(e);var n={props:{title:{type:String},msg:{type:String},onlyConfirmation:{type:Boolean,default:!1},redirect:{type:String},typeRequest:{type:String,default:"delete"}},computed:{url:function(){return this.redirect}},data:function(){return{isLoading:!1,isSuccess:!1}},methods:{execute:function(){this.$emit("confirmed"),this.$bvModal.hide("confirmation")},close:function(){this.$bvModal.hide("confirmation")}}},r=o(44),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("b-modal",{ref:"modalAuthor",attrs:{id:"confirmation",title:t.title,centered:"","no-close-on-esc":"","no-close-on-backdrop":"","hide-footer":"","header-class":"border-0","dialog-class":"modal-author"}},[o("div",{staticClass:"mt-4 mb-4"},[t.onlyConfirmation?o("span",{staticClass:"text-center"},[o("span",{staticClass:"d-block green-text"},[t._v("\n          "+t._s(t.msg)+"\n\n          "),o("UtilsAnimation",{attrs:{src:"/animations/save-success.json",cssGroup:{transform:"scale(1.5)"}}})],1)]):o("span",[t._v("\n        "+t._s(t.msg)+"\n      ")])]),t._v(" "),o("div",{staticClass:"mt-5 mb-2 d-flex justify-content-around"},[o("b-button",{staticClass:"btn-grey lg",attrs:{disabled:t.isLoading},on:{click:t.close}},[t._v("\n        "+t._s(t.isSuccess||t.onlyConfirmation?"Fechar":"Cancelar")+"\n      ")]),t._v(" "),t.onlyConfirmation?t._e():o("b-button",{staticClass:"btn-purple lg ml-2",attrs:{variant:"none",disabled:t.isLoading},on:{click:t.execute}},[t.isLoading?o("UtilsLoading"):o("span",[t._v("Confirmar")])],1)],1)])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{UtilsAnimation:o(593).default,UtilsLoading:o(589).default})},605:function(t,e,o){var content=o(624);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(59).default)("4001548f",content,!0,{sourceMap:!1})},623:function(t,e,o){"use strict";o(605)},624:function(t,e,o){var n=o(58)(!1);n.push([t.i,'.card[data-v-94c4f8c8]{position:relative;width:255px;height:360px;border-radius:32px;border:2px solid #89238a;background-blend-mode:multiply;overflow:hidden;margin-bottom:35px}.menu-card[data-v-94c4f8c8]{right:20px}.author-info .resume[data-v-94c4f8c8]{display:block;text-align:justify;font:14px "Poppins Regular";width:100%;height:140px;overflow-y:auto;color:#8a8c92}.author-image[data-v-94c4f8c8]{height:100px;text-align:center;border-radius:50%;margin:0 auto}.author-image img[data-v-94c4f8c8]{width:100px;height:100px;-o-object-fit:cover;object-fit:cover;border-radius:50%}',""]),t.exports=n},655:function(t,e,o){var content=o(686);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(59).default)("6edbe9b7",content,!0,{sourceMap:!1})},664:function(t,e,o){"use strict";o.r(e);var n={props:{author:{type:Object,default:null}},asyncComputed:{image:function(){return this.$getFileAWS(this.author.image)}},methods:{edit:function(){this.$emit("open-modal",this.author.id)},remove:function(){this.$emit("open-delete",this.author)}}},r=(o(623),o(44)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-card",[n("div",{staticClass:"card-content"},[n("b-dropdown",{staticClass:"menu-card position-absolute",attrs:{right:"","toggle-class":"btn-menu btn-white squad"},scopedSlots:t._u([{key:"button-content",fn:function(){return[n("img",{attrs:{src:o(599),alt:"author"}})]},proxy:!0}])},[t._v(" "),n("b-dropdown-item",{on:{click:t.edit}},[n("i",{staticClass:"share-ico mr-1"}),t._v("Editar")]),t._v(" "),n("b-dropdown-item",{on:{click:t.remove}},[n("i",{staticClass:"trash-ico mr-1"}),t._v("Remover")])],1),t._v(" "),t.image?n("div",{staticClass:"author-image"},[n("img",{staticClass:"mr-auto ml-auto",attrs:{src:t.image,alt:"author"}})]):t._e(),t._v(" "),n("div",{staticClass:"author-info"},[n("h6",{staticClass:"pt-3 pb-3 text-center",domProps:{textContent:t._s(t.author.name)}}),t._v(" "),n("span",{staticClass:"resume mb-3",domProps:{textContent:t._s(t.author.description)}})])],1)])}),[],!1,null,"94c4f8c8",null);e.default=component.exports},685:function(t,e,o){"use strict";o(655)},686:function(t,e,o){var n=o(58)(!1);n.push([t.i,".filter-bar[data-v-f54fbd24]{position:relative;display:flex;justify-content:space-between;width:100%;padding:24px 0}",""]),t.exports=n},712:function(t,e,o){"use strict";o.r(e);o(4),o(3),o(1),o(5),o(2),o(6);var n=o(0);o(12),o(24);function r(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var c={head:function(){return{title:"Autores - Masters"}},data:function(){return{loadingContent:!1,authorEdit:{name:"",description:"",image:""},authorDelete:{name:""},nameSearch:null,authors:[],currentPage:1,total:0,perPage:10,image:"../../assets/img/course-test/img-author.svg"}},watch:{nameSearch:function(){this.getAuthors()}},methods:{openModalAuthor:function(t){var e=this;"string"==typeof t&&this.$axios.get("/author",{params:{id:t}}).then((function(t){e.$root.$emit("getAuthorData",function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?r(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):r(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},t.data.data))})),this.$bvModal.show("author")},getAuthors:function(){var t=this;this.loadingContent=!0;var e="direction=ASC&page=".concat(this.currentPage,"&size=").concat(this.perPage,"&orderBy=name");this.nameSearch&&(e+="&name=".concat(this.nameSearch)),this.$axios.$get("author/all?"+e).then((function(e){t.total=Math.ceil(e.total/t.perPage),t.authors=e.data})).catch((function(t){console.log(t)})).finally((function(){t.loadingContent=!1}))},getByPage:function(t){this.currentPage=t},deleteAuthor:function(){var t=this;this.$axios.$delete("author/"+this.authorDelete.id).then((function(e){t.getAuthors()})).catch((function(t){console.log(t)}))},openDelete:function(t){this.authorDelete=t,this.$bvModal.show("confirmation")},confirmed:function(){this.deleteAuthor()}},mounted:function(){var t=this;this.getAuthors(),this.$root.$on("refresh-authors",(function(){t.getAuthors()}))}},l=(o(685),o(44)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"content"},[o("h3",[t._v("Autores")]),t._v(" "),o("div",{staticClass:"filter-bar lg"},[o("b-form-input",{staticClass:"w-50",attrs:{placeholder:"Pesquisar por nome",debounce:"750"},model:{value:t.nameSearch,callback:function(e){t.nameSearch=e},expression:"nameSearch"}}),t._v(" "),o("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Adicionar autor",expression:"'Adicionar autor'"}],staticClass:"d-block btn-purple",on:{click:t.openModalAuthor}},[t._v("\n      Cadastrar autor\n    ")])],1),t._v(" "),o("div",[t.loadingContent?o("div",{staticClass:"loading-content"},[o("UtilsLoading",{attrs:{color:"dark",size:"large"}})],1):o("div",{staticClass:"d-flex flex-wrap pt-5",staticStyle:{gap:"40px"}},t._l(t.authors,(function(e,n){return o("AuthorCard",{key:n,attrs:{author:e},on:{"open-modal":t.openModalAuthor,"open-delete":function(o){return t.openDelete(e)}}})})),1)]),t._v(" "),t.authors.length>0?o("b-pagination",{staticClass:"paginate-style mt-4",attrs:{pills:"",align:"right","total-rows":t.total,"per-page":t.perPage},on:{change:t.getByPage},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}}):t._e(),t._v(" "),o("ModalAuthor",{on:{"refresh-authors":t.getAuthors}}),t._v(" "),o("ModalConfirmation",{attrs:{title:"Exclusão de autor",msg:"Deseja remover o autor "+t.authorDelete.name+"?"},on:{confirmed:t.confirmed}})],1)}),[],!1,null,"f54fbd24",null);e.default=component.exports;installComponents(component,{UtilsLoading:o(589).default,AuthorCard:o(664).default,ModalAuthor:o(665).default,ModalConfirmation:o(602).default})}}]);