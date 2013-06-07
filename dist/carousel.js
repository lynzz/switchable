define("arale/switchable/0.9.14/carousel",["./switchable","$","arale/easing/1.0.0/easing","arale/widget/1.1.0/widget","arale/base/1.1.0/base","arale/class/1.0.0/class","arale/events/1.1.0/events","./plugins/effects","./plugins/autoplay","./plugins/circular","./plugins/multiple","./const"],function(t,e,i){var s=t("./switchable"),n=t("$");i.exports=s.extend({attrs:{circular:!0,prevBtn:{getter:function(t){return n(t).eq(0)}},nextBtn:{getter:function(t){return n(t).eq(0)}},_isNext:!1},_parseRole:function(t){if(t=s.prototype._getDatasetRole.call(this)||{},t=this._getDatasetRole(t),s.prototype._parseRole.call(this,t),t){var e=this.get("prevBtn"),i=this.get("nextBtn");!e[0]&&t.prev&&(e=t.prev,this.set("prevBtn",e)),!i[0]&&t.next&&(i=t.next,this.set("nextBtn",i)),e.addClass(this.CONST.PREV_BTN_CLASS),i.addClass(this.CONST.NEXT_BTN_CLASS)}},_getDatasetRole:function(t){var e=!1,i=this.element,s=["next","prev"];return n.each(s,function(s,a){var r=n("[data-role="+a+"]",i);r.length&&(t[a]=r,e=!0)}),e?t:null},_initTriggers:function(){s.prototype._initTriggers.call(this);var t=this,e=this.get("circular");this.get("prevBtn").click(function(i){i.preventDefault(),(e||t.get("activeIndex")>0)&&(t.set("_isNext",!1),t.prev())}),this.get("nextBtn").click(function(i){i.preventDefault();var s=t.get("length")-1;(e||s>t.get("activeIndex"))&&(t.set("_isNext",!0),t.next())}),e||this.on("switch",function(e){t._updateButtonStatus(e)})},_updateButtonStatus:function(t){var e=this.get("prevBtn"),i=this.get("nextBtn");e.removeClass(this.CONST.DISABLED_BTN_CLASS),i.removeClass(this.CONST.DISABLED_BTN_CLASS),0===t?e.addClass(this.CONST.DISABLED_BTN_CLASS):t===this.get("length")-1&&i.addClass(this.CONST.DISABLED_BTN_CLASS)}})}),define("arale/switchable/0.9.14/switchable",["$","arale/easing/1.0.0/easing","arale/widget/1.1.0/widget","arale/base/1.1.0/base","arale/class/1.0.0/class","arale/events/1.1.0/events","arale/switchable/0.9.14/plugins/effects","arale/switchable/0.9.14/plugins/autoplay","arale/switchable/0.9.14/plugins/circular","arale/switchable/0.9.14/plugins/multiple","arale/switchable/0.9.14/const"],function(t,e,i){function s(t,e,i){for(var s=n("<ul>"),a=0;t>a;a++){var r=a===e?i:"";n("<li>",{"class":r,html:a+1}).appendTo(s)}return s}var n=t("$");t("arale/easing/1.0.0/easing");var a=t("arale/widget/1.1.0/widget"),r="ui-switchable",l=t("arale/switchable/0.9.14/plugins/effects"),c=t("arale/switchable/0.9.14/plugins/autoplay"),h=t("arale/switchable/0.9.14/plugins/circular"),o=t("arale/switchable/0.9.14/plugins/multiple"),g=a.extend({attrs:{triggers:{value:[],getter:function(t){return n(t)}},panels:{value:[],getter:function(t){return n(t)}},classPrefix:r,hasTriggers:!0,triggerType:"hover",delay:100,effect:"none",easing:"linear",duration:500,activeIndex:0,step:1,length:{readOnly:!0,getter:function(){return Math.ceil(this.panels.length/this.get("step"))}},viewSize:[],activeTriggerClass:r+"-active"},setup:function(){this._initConstClass(),this._parseRole(),this._initElement(),this._initPanels(),this._initTriggers(),this._initPlugins()},_initConstClass:function(){var e=this.get("classPrefix");this.CONST=t("arale/switchable/0.9.14/const")(e)},_parseRole:function(t){if(t=t||this._getDatasetRole()){var e=this.get("triggers"),i=this.get("panels");0===e.length&&(t.trigger||t.nav)&&(e=t.trigger||t.nav.find("> *")),0===i.length&&(t.panel||t.content)&&(i=t.panel||t.content.find("> *")),this.set("triggers",e),this.set("panels",i)}},_getDatasetRole:function(t){var e=this.element;t=t||{};var i=!1,s=["trigger","panel","nav","content"];return n.each(s,function(s,a){var r=n("[data-role="+a+"]",e);r.length&&(t[a]=r,i=!0)}),i?t:null},_initElement:function(){this.element.addClass(this.CONST.UI_SWITCHABLE)},_initPanels:function(){var t=this.panels=this.get("panels");if(0===t.length)throw Error("panels.length is ZERO");this.content=t.parent().addClass(this.CONST.CONTENT_CLASS),t.addClass(this.CONST.PANEL_CLASS)},_initTriggers:function(){var t=this.triggers=this.get("triggers");0===t.length&&this.get("hasTriggers")?(this.nav=s(this.get("length"),this.get("activeIndex"),this.get("activeTriggerClass")).appendTo(this.element),this.triggers=this.nav.children()):this.nav=t.parent(),this.triggers.addClass(this.CONST.TRIGGER_CLASS),this.nav.addClass(this.CONST.NAV_CLASS),this.triggers.each(function(t,e){n(e).data("value",t)}),this._bindTriggers()},_initPlugins:function(){this._plugins=[],this._plug(l),this._plug(c),this._plug(h),this._plug(o)},_bindTriggers:function(){function t(t){i._onFocusTrigger(t.type,n(this).data("value"))}function e(){clearTimeout(i._switchTimer)}var i=this;"click"===this.get("triggerType")?this.triggers.click(t):this.triggers.hover(t,e)},_onFocusTrigger:function(t,e){var i=this;"click"===t?this.switchTo(e):this._switchTimer=setTimeout(function(){i.switchTo(e)},this.get("delay"))},switchTo:function(t){return this.set("activeIndex",t),this},_onRenderActiveIndex:function(t,e){this._triggerIsValid(t,e)&&this._switchTo(t,e)},_switchTo:function(t,e){this.trigger("switch",t,e),this._switchTrigger(t,e),this._switchPanel(this._getPanelInfo(t,e)),this.trigger("switched",t,e)},_triggerIsValid:function(t,e){return t!==e},_switchTrigger:function(t,e){var i=this.triggers;1>i.length||(i.eq(e).removeClass(this.get("activeTriggerClass")),i.eq(t).addClass(this.get("activeTriggerClass")))},_switchPanel:function(t){t.fromPanels.hide(),t.toPanels.show()},_getPanelInfo:function(t,e){var i,s,a=this.panels.get(),r=this.get("step");if(e>-1){var l=e*r,c=(e+1)*r;i=a.slice(l,c)}return s=a.slice(t*r,(t+1)*r),{toIndex:t,fromIndex:e,toPanels:n(s),fromPanels:n(i)}},prev:function(){var t=this.get("activeIndex"),e=(t-1+this.get("length"))%this.get("length");this.switchTo(e)},next:function(){var t=this.get("activeIndex"),e=(t+1)%this.get("length");this.switchTo(e)},_plug:function(t){if(t.isNeeded.call(this)){var e=t.attrs,i=t.methods;if(e)for(var s in e)!e.hasOwnProperty(s)||s in this.attrs||this.set(s,e[s]);if(i)for(var n in i)i.hasOwnProperty(n)&&(this[n]=i[n]);t.install&&t.install.call(this),this._plugins.push(t)}},destroy:function(){n.each(this._plugins,function(t,e){e.destroy&&e.destroy.call(this)}),g.superclass.destroy.call(this)}});i.exports=g}),define("arale/switchable/0.9.14/plugins/effects",["$"],function(t,e,i){var s=t("$"),n="scrollx",a="scrolly",r="fade";i.exports={isNeeded:function(){return"none"!==this.get("effect")},install:function(){var t=this.panels;t.show();var e=this.get("effect"),i=this.get("step");if(0===e.indexOf("scroll")){var a=this.content,c=t.eq(0);a.css("position","relative"),"static"===a.parent().css("position")&&a.parent().css("position","relative"),e===n&&(t.css("float","left"),a.width("9999px"));var h=this.get("viewSize");if(h[0]||(h[0]=c.outerWidth()*i,h[1]=c.outerHeight()*i,this.set("viewSize",h)),!h[0])throw Error("Please specify viewSize manually")}else if(e===r){var o=this.get("activeIndex"),g=o*i,u=g+i-1;t.each(function(t,e){var i=t>=g&&u>=t;s(e).css({opacity:i?1:0,position:"absolute",zIndex:i?9:1})})}this._switchPanel=function(t){var e=this.get("effect"),i=s.isFunction(e)?e:l[e];i.call(this,t)}}};var l={fade:function(t){if(this.get("step")>1)throw Error('Effect "fade" only supports step === 1');var e=t.fromPanels.eq(0),i=t.toPanels.eq(0),s=this.anim;if(s&&s.stop(!1,!0),i.css("opacity",1),e[0]){var n=this.get("duration"),a=this.get("easing"),r=this;this.anim=e.animate({opacity:0},n,a,function(){r.anim=null,i.css("zIndex",9),e.css("zIndex",1)})}else i.css("zIndex",9)},scroll:function(t){var e=this.get("effect")===n,i=this.get("viewSize")[e?0:1]*t.toIndex,s={};if(s[e?"left":"top"]=-i+"px",this.anim&&this.anim.stop(),t.fromIndex>-1){var a=this,r=this.get("duration"),l=this.get("easing");this.anim=this.content.animate(s,r,l,function(){a.anim=null})}else this.content.css(s)}};l[a]=l.scroll,l[n]=l.scroll,i.exports.Effects=l}),define("arale/switchable/0.9.14/plugins/autoplay",["$"],function(t,e,i){function s(t,e){function i(){i.stop(),s=setTimeout(t,e)}e=e||200;var s;return i.stop=function(){s&&(clearTimeout(s),s=0)},i}function n(t){var e=r.scrollTop(),i=e+r.height(),s=t.offset().top,n=s+t.height();return i>s&&n>e}var a=t("$");i.exports={attrs:{autoplay:!0,interval:5e3,pauseOnScroll:!0,pauseOnHover:!0},isNeeded:function(){return this.get("autoplay")},install:function(){function t(){e(),h.paused=!1,i=setInterval(function(){h.paused||h.next()},c)}function e(){i&&(clearInterval(i),i=null),h.paused=!0}var i,a=this.element,l="."+this.cid,c=this.get("interval"),h=this;t(),this.stop=e,this.start=t,this.get("pauseOnScroll")&&(this._scrollDetect=s(function(){h[n(a)?"start":"stop"]()}),r.on("scroll"+l,this._scrollDetect)),this.get("pauseOnHover")&&this.element.hover(e,t)},destroy:function(){var t="."+this.cid;this.stop(),this._scrollDetect&&(this._scrollDetect.stop(),r.off("scroll"+t))}};var r=a(window)}),define("arale/switchable/0.9.14/plugins/circular",["$","arale/switchable/0.9.14/plugins/effects"],function(t,e,i){function s(t,e,i){var s=this.get("step"),n=this.get("length"),r=t?n-1:0,l=r*s,c=(r+1)*s,h=t?i:-i*n,o=t?-i*n:i*n,g=a(this.panels.get().slice(l,c));return g.css("position","relative"),g.css(e,o+"px"),h}function n(t,e,i){var s=this.get("step"),n=this.get("length"),r=t?n-1:0,l=r*s,c=(r+1)*s,h=a(this.panels.get().slice(l,c));h.css("position",""),h.css(e,""),this.content.css(e,t?-i*(n-1):"")}var a=t("$"),r="scrollx",l="scrolly",c=t("arale/switchable/0.9.14/plugins/effects").Effects;i.exports={isNeeded:function(){var t=this.get("effect"),e=this.get("circular");return e&&(t===r||t===l)},install:function(){this.set("scrollType",this.get("effect")),this.set("effect","scrollCircular")}},c.scrollCircular=function(t){var e=t.toIndex,i=t.fromIndex,a=this.get("length"),l=this.get("_isNext"),c=0===i&&e===a-1&&!l,h=i===a-1&&0===e&&l,o=c||!h&&i>e,g=c||h,u=this.get("scrollType")===r,f=u?"left":"top",p=this.get("viewSize")[u?0:1],v=-p*e;this.anim&&this.anim.stop(!1,!0),g&&(v=s.call(this,o,f,p));var d={};if(d[f]=v+"px",i>-1){var _=this.get("duration"),w=this.get("easing"),T=this;this.anim=this.content.animate(d,_,w,function(){T.anim=null,g&&n.call(T,o,f,p)})}else this.content.css(d)}}),define("arale/switchable/0.9.14/plugins/multiple",[],function(t,e,i){i.exports={isNeeded:function(){return this.get("multiple")},methods:{switchTo:function(t){this._switchTo(t,t)},_switchTrigger:function(t){this.triggers.eq(t).toggleClass(this.get("activeTriggerClass"))},_triggerIsValid:function(){return!0},_switchPanel:function(t){t.toPanels.toggle()}}}}),define("arale/switchable/0.9.14/const",[],function(t,e,i){i.exports=function(t){return{UI_SWITCHABLE:t||"",NAV_CLASS:t?t+"-nav":"",CONTENT_CLASS:t?t+"-content":"",TRIGGER_CLASS:t?t+"-trigger":"",PANEL_CLASS:t?t+"-panel":"",ACTIVE_CLASS:t?t+"-active":"",PREV_BTN_CLASS:t?t+"-prev-btn":"",NEXT_BTN_CLASS:t?t+"-next-btn":"",DISABLED_BTN_CLASS:t?t+"-disabled-btn":""}}});
