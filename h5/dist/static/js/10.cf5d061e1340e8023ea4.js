webpackJsonp([10],{"8yhp":function(t,e,n){t.exports=n.p+"static/img/downTip.e1e7ec6.png"},UR0D:function(t,e,n){var i=n("odIf");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("9bfad052",i,!0,{})},odIf:function(t,e,n){var i=n("kxFB");(t.exports=n("FZ+f")(!1)).push([t.i,"\n.downTip {\n  position: fixed;\n  z-index: 998;\n  background: #fff;\n  top: 0;\n  animation: fadeIn 0.3s;\n  -webkit-animation: fadeIn 0.3s;\n}\n.page_set {\n  padding-top: 0.4rem;\n}\n.page_set .set_page {\n  color: #333;\n}\n.page_set .set_page .submit-button {\n  padding: 0.533333rem 0.8rem;\n}\n.page_set .set_page .submit-button button {\n  letter-spacing: 0.106667rem;\n}\n.page_set .set_page .tool_list {\n  width: 100%;\n  height: auto;\n  background: #FFFFFF;\n  padding: 0 0.4rem;\n}\n.page_set .set_page .tool_list ul {\n  width: 100%;\n  margin-bottom: 0.8rem;\n}\n.page_set .set_page .tool_list ul li {\n  font-size: 0.373333rem;\n  color: #666;\n  line-height: 1;\n  padding: 0.533333rem 0.026667rem;\n  text-align: left;\n  border-bottom: solid 0.026667rem #ebebeb;\n}\n.page_set .set_page .tool_list ul li span {\n  font-size: 0.4rem;\n  float: right;\n  color: #333;\n}\n.page_set .set_page .tool_list ul li:last-child {\n  border: none;\n}\n.page_set .set_page .tool_list ul .more {\n  width: 0.4rem;\n  height: 0.346667rem;\n  background: url("+i(n("5EIS"))+") no-repeat center center;\n  background-size: contain;\n  display: block;\n  float: right;\n  margin-left: 0.133333rem;\n}",""])},w0cm:function(t,e,n){var i=n("kxFB");(t.exports=n("FZ+f")(!1)).push([t.i,"\n.tipPage dl[data-v-67fe363c] {\n  width: 100%;\n}\n.tipPage dl dt[data-v-67fe363c] {\n  width: 100%;\n  height: 9.866667rem;\n  background: url("+i(n("8yhp"))+") no-repeat center center;\n  background-size: contain;\n}\n.tipPage dl dd p[data-v-67fe363c] {\n  font-size: 0.4rem;\n  color: #333333;\n  line-height: 1.8em;\n  text-align: center;\n}",""])},w8Lv:function(t,e,n){var i=n("w0cm");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("37d2e50b",i,!0,{})},zTY5:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("eOoE"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content_panel"},[e("cube-scroll",{ref:"scroll",staticClass:"page_full",attrs:{options:this.options}},[e("div",{staticClass:"tipPage"},[e("dl",[e("dt"),this._v(" "),e("dd",[e("p",[this._v("欢迎下载加油多多App")]),this._v(" "),e("p",[this._v("请使用"+this._s(this.isSafari)+"浏览器打开")])])])])])],1)},staticRenderFns:[]};var s=[{text:"保密",value:0},{text:"男",value:1},{text:"女",value:2}],o={name:"user-set",data:function(){return{phone:localStorage.getItem("hykPhone"),phoneTxt:"",shareId:localStorage.getItem("hykUserId"),sex:"0",birthday:"1970-1-1",options:{swipeBounceTime:400},isLoading:!0,isSafari:"",isShow:!1,token:localStorage.getItem("hykToken")}},mounted:function(){this.phoneTxt=this.phone.substr(0,3)+"****"+this.phone.substr(7),this.loadPage()},components:{appDown:n("VU/8")({name:"down-load",data:function(){return{options:{swipeBounceTime:400}}},props:["isSafari"]},a,!1,function(t){n("w8Lv")},"data-v-67fe363c",null).exports},methods:{downApp:function(){var t=navigator.userAgent.toLowerCase(),e=!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),n=navigator.userAgent.indexOf("Android")>-1||navigator.userAgent.indexOf("Adr")>-1;if(e){if(t.match(/MicroMessenger\/[0-9]/i)||t.match(/QQ\/[0-9]/i)||t.indexOf("safari")>0)return window.location.href="https://itunes.apple.com/app/id1446394113",!1;this.isSafari="Safari",this.isShow=!0}else if(n){if(t.match(/MicroMessenger\/[0-9]/i)||t.match(/QQ\/[0-9]/i))return this.isShow=!0,!1;window.location.href="https://www.huiucard.com/web/apk/hyk.apk"}else{if(t.indexOf("safari")>0&&t.indexOf("aliapp")>0)return this.isSafari="Safari",this.isShow=!0,!1;window.location.href="https://www.huiucard.com/web/apk/hyk.apk"}},goQR:function(){window.location.href="/web/mobile/activity/qrCode/index.html"},loadPage:function(){var t=this;Object(i.a)(this.HOST+"/mine/info",{token:t.token},t.isLoading).then(function(e){var n=e.data;if("200"!==n.code)return t.showToast(n.msg),!1;t.isLoading=!1,n.hykUser&&(t.sex=n.hykUser.sex,t.birthday=n.hykUser.registerDateStr2)})},updataSex:function(t){var e=this;Object(i.a)(this.HOST+"/mine/updateInfo",{token:e.token,sex:t},!1).then(function(t){var n=t.data;if("200"!==n.code)return e.showToast(n.msg),!1;e.loadPage()})},updataTime:function(t){var e=this;Object(i.a)(this.HOST+"/mine/updateInfo",{token:e.token,birthday:t},!1).then(function(t){var n=t.data;if("200"!==n.code)return e.showToast(n.msg),!1;e.loadPage()})},handleOutlogin:function(){localStorage.removeItem("hykToken"),localStorage.removeItem("hykUserId"),this.$router.replace("/userJoin")},selectSex:function(){this.picker||(this.picker=this.$createPicker({title:"请选择性别",data:[s],value:this.sex,onSelect:this.selectHandlesex})),this.picker.show()},selectBirthday:function(){this.datePicker||(this.datePicker=this.$createDatePicker({title:"请选择生日",min:new Date(1970,0,1),max:new Date(2020,9,20),value:new Date(this.birthday),onSelect:this.selectHandle})),this.datePicker.show()},selectHandlesex:function(t,e,n){this.updataSex(t[0])},selectHandle:function(t,e,n){this.updataTime(t)},showToast:function(t){this.$createToast({txt:t,type:"warn",time:1500}).show()}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content_panel"},[n("cube-scroll",{ref:"scroll",staticClass:"page_full bodyBg page_set",attrs:{options:t.options}},[n("div",{staticClass:"page set_page"},[n("div",{staticClass:"tool_list"},[n("ul",[n("li",[n("span",[t._v(t._s(t.phoneTxt))]),t._v("手机号码")]),t._v(" "),n("li",[n("span",[t._v(t._s(t.shareId))]),t._v("邀请码")]),t._v(" "),n("li",{on:{click:t.goQR}},[n("i",{staticClass:"more"}),t._v("我的二维码")]),t._v(" "),n("li",{on:{click:t.selectSex}},[n("i",{staticClass:"more"}),n("span",[t._v(t._s("0"===t.sex?"保密":"2"===t.sex?"女":"男"))]),t._v("性别")]),t._v(" "),n("li",{on:{click:t.selectBirthday}},[n("i",{staticClass:"more"}),n("span",[t._v(t._s(t.birthday))]),t._v("生日")]),t._v(" "),n("router-link",{attrs:{to:"/addressList",tag:"li"}},[n("i",{staticClass:"more"}),t._v("地址管理")]),t._v(" "),n("li",{on:{click:t.downApp}},[n("i",{staticClass:"more"}),n("span",[t._v("下载")]),t._v("客户端App")])],1)]),t._v(" "),n("div",{staticClass:"submit-button"},[n("cube-button",{on:{click:t.handleOutlogin}},[t._v("退出当前账户")])],1)])]),t._v(" "),t.isShow?n("app-down",{staticClass:"downTip",attrs:{isSafari:t.isSafari}}):t._e()],1)},staticRenderFns:[]};var l=n("VU/8")(o,r,!1,function(t){n("UR0D")},null,null);e.default=l.exports}});