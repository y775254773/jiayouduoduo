webpackJsonp([24],{enxr:function(t,e,n){var i=n("w4SW");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("3e38490c",i,!0,{})},lFou:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("eOoE"),o={name:"page",data:function(){return{id:this.$route.query.id,title:"",time:"",content:"",url:"",options:{swipeBounceTime:400}}},mounted:function(){this.loadPage()},updated:function(){var t=this,e=document.getElementsByClassName("content")[0].getElementsByTagName("img"),n=0,i=e.length;if(i)var o=setInterval(function(){n===i?(t.$refs.pageScroll.refresh(),clearInterval(o)):e[n].complete&&n++},100)},methods:{loadPage:function(){var t=this;Object(i.a)(this.HOST+"/find/getOneNews",{id:t.id}).then(function(e){var n=e.data;if("200"!==n.code)return t.showToast(n.msg),!1;t.title=n.list.title,t.time=n.list.createDateStr,t.url=n.list.url,t.content=t.escape2Html(n.list.content)})},escape2Html:function(t){var e={lt:"<",gt:">",nbsp:" ",amp:"&",quot:'"',ldquo:'"'};return t.replace(/&(lt|gt|nbsp|amp|quot|ldquo);/gi,function(t,n){return e[n]})},formatDate:function(t,e){var n=new Date(1e3*t),i={"M+":n.getMonth()+1,"d+":n.getDate(),"h+":n.getHours(),"m+":n.getMinutes(),"s+":n.getSeconds()};for(var o in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(n.getFullYear()+"").substr(4-RegExp.$1.length))),i)new RegExp("("+o+")").test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?i[o]:("00"+i[o]).substr((""+i[o]).length)));return e},showToast:function(t){this.$createToast({txt:t,type:"warn",time:1500}).show()}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content_panel"},[n("cube-scroll",{ref:"pageScroll",staticClass:"page_full",attrs:{options:t.options,data:[t.content]}},[n("div",{staticClass:"page notice_detail"},[n("div",{staticClass:"page_title"},[n("h2",[t._v(t._s(t.title))]),t._v(" "),n("p",[t._v(t._s(t.time))])]),t._v(" "),n("div",{staticClass:"content",domProps:{innerHTML:t._s(t.content)}}),t._v(" "),""!==t.url?n("div",{staticClass:"url"},[n("b",[t._v("原文地址：")]),n("a",{attrs:{href:t.url}},[t._v(t._s(t.url))])]):t._e()])])],1)},staticRenderFns:[]};var l=n("VU/8")(o,a,!1,function(t){n("enxr")},null,null);e.default=l.exports},w4SW:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.notice_detail {\n  color: #000000;\n  padding: 0.533333rem 0.4rem;\n}\n.notice_detail .page_title {\n  width: 100%;\n  padding-bottom: 0.4rem;\n}\n.notice_detail .page_title h2 {\n  font-size: 0.64rem;\n  padding-bottom: 0.266667rem;\n  text-align: left;\n  line-height: 1.3em;\n}\n.notice_detail .page_title p {\n  font-size: 0.32rem;\n  color: #999999;\n  text-align: left;\n}\n.notice_detail .url {\n  width: 100%;\n  font-size: 0.4rem;\n  color: #333333;\n  text-align: left;\n  padding-bottom: 0.266667rem;\n  line-height: 1.5em;\n}\n.notice_detail .url a {\n  color: #60A0FF;\n}\n.notice_detail .content {\n  width: 100%;\n  padding-bottom: 0.666667rem;\n}\n.notice_detail .content p {\n  text-align: left;\n  line-height: 1.5em;\n  font-size: 0.4rem;\n  color: #333333;\n  padding: 0.106667rem 0;\n}\n.notice_detail .content img {\n  width: 100% !important;\n  height: auto !important;\n}",""])}});