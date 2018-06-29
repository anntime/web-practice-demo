/*	
 * jQuery mmenu v4.2.0
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://en.wikipedia.org/wiki/MIT_License
 * http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
!function(e){function n(n,t,s){if(s){if("object"!=typeof n&&(n={}),"boolean"!=typeof n.isMenu){var o=s.children();n.isMenu=1==o.length&&o.is(t.panelNodetype)}return n}return n=e.extend(!0,{},e[a].defaults,n),("top"==n.position||"bottom"==n.position)&&("back"==n.zposition||"next"==n.zposition)&&(e[a].deprecated('Using position "'+n.position+'" in combination with zposition "'+n.zposition+'"','zposition "front"'),n.zposition="front"),n}function t(n){return n=e.extend(!0,{},e[a].configuration,n),"string"!=typeof n.pageSelector&&(n.pageSelector="> "+n.pageNodetype),n}function s(){r.$wndw=e(window),r.$html=e("html"),r.$body=e("body"),r.$allMenus=e(),e.each([d,c,u],function(e,n){n.add=function(e){e=e.split(" ");for(var t in e)n[e[t]]=n.mm(e[t])}}),d.mm=function(e){return"mm-"+e},d.add("menu ismenu panel list subtitle selected label spacer current highest hidden page blocker modal background opened opening subopened subopen fullsubopen subclose"),d.umm=function(e){return"mm-"==e.slice(0,3)&&(e=e.slice(3)),e},c.mm=function(e){return"mm-"+e},c.add("parent style"),u.mm=function(e){return e+".mm"},u.add("toggle open opening opened close closing closed update setPage setSelected transitionend webkitTransitionEnd mousedown touchstart mouseup touchend scroll touchmove click keydown keyup resize"),r.$wndw.on(u.keydown,function(e){return r.$html.hasClass(d.opened)&&9==e.keyCode?(e.preventDefault(),!1):void 0});var n=0;r.$wndw.on(u.resize,function(e,t){if(t||r.$html.hasClass(d.opened)){var s=r.$wndw.height();s!=n&&(n=s,r.$page.css("min-height",s))}}),e[a]._c=d,e[a]._d=c,e[a]._e=u,e[a].glbl=r}function o(n,t){if(n.hasClass(d.current))return!1;var s=e("."+d.panel,t),o=s.filter("."+d.current);return s.removeClass(d.highest).removeClass(d.current).not(n).not(o).addClass(d.hidden),n.hasClass(d.opened)?o.addClass(d.highest).removeClass(d.opened).removeClass(d.subopened):(n.addClass(d.highest),o.addClass(d.subopened)),n.removeClass(d.hidden).removeClass(d.subopened).addClass(d.current).addClass(d.opened),"open"}function i(e,n,t){var s=!1,o=function(){s||n.call(e[0]),s=!0};e.one(u.transitionend,o),e.one(u.webkitTransitionEnd,o),setTimeout(o,1.1*t)}var a="mmenu",l="4.2.0";if(!e[a]){var r={$wndw:null,$html:null,$body:null,$page:null,$blck:null,$allMenus:null},d={},c={},u={},p=0,h=0;e[a]=function(e,n,t){return r.$allMenus=r.$allMenus.add(e),this.$menu=e,this.opts=n,this.conf=t,this.serialnr=p++,this._init(),this},e[a].prototype={open:function(){var e=this;return this._openSetup(),setTimeout(function(){e._openFinish()},50),"open"},_openSetup:function(){h=r.$wndw.scrollTop(),this.$menu.addClass(d.current),r.$allMenus.not(this.$menu).trigger(u.close),r.$page.data(c.style,r.$page.attr("style")||""),r.$wndw.trigger(u.resize,[!0]),this.opts.modal&&r.$html.addClass(d.modal),this.opts.moveBackground&&r.$html.addClass(d.background),"left"!=this.opts.position&&r.$html.addClass(d.mm(this.opts.position)),"back"!=this.opts.zposition&&r.$html.addClass(d.mm(this.opts.zposition)),this.opts.classes&&r.$html.addClass(this.opts.classes),r.$html.addClass(d.opened),this.$menu.addClass(d.opened)},_openFinish:function(){var e=this;i(r.$page,function(){e.$menu.trigger(u.opened)},this.conf.transitionDuration),r.$html.addClass(d.opening),this.$menu.trigger(u.opening)},close:function(){var e=this;return i(r.$page,function(){e.$menu.removeClass(d.current).removeClass(d.opened),r.$html.removeClass(d.opened).removeClass(d.modal).removeClass(d.background).removeClass(d.mm(e.opts.position)).removeClass(d.mm(e.opts.zposition)),e.opts.classes&&r.$html.removeClass(e.opts.classes),r.$wndw.off(u.resize).off(u.keydown),r.$page.attr("style",r.$page.data(c.style)),e.$menu.trigger(u.closed)},this.conf.transitionDuration),r.$html.removeClass(d.opening),this.$menu.trigger(u.closing),"close"},_init:function(){if(this.opts=n(this.opts,this.conf,this.$menu),this.direction=this.opts.slidingSubmenus?"horizontal":"vertical",this._initPage(r.$page),this._initMenu(),this._initBlocker(),this._initPanles(),this._initLinks(),this._initOpenClose(),this._bindCustomEvents(),e[a].addons)for(var t=0;t<e[a].addons.length;t++)"function"==typeof this["_addon_"+e[a].addons[t]]&&this["_addon_"+e[a].addons[t]]()},_bindCustomEvents:function(){var n=this;this.$menu.off(u.open+" "+u.close+" "+u.setPage+" "+u.update).on(u.open+" "+u.close+" "+u.setPage+" "+u.update,function(e){e.stopPropagation()}),this.$menu.on(u.open,function(t){return e(this).hasClass(d.current)?(t.stopImmediatePropagation(),!1):n.open()}).on(u.close,function(t){return e(this).hasClass(d.current)?n.close():(t.stopImmediatePropagation(),!1)}).on(u.setPage,function(e,t){n._initPage(t),n._initOpenClose()});var t=this.$menu.find(this.opts.isMenu&&"horizontal"!=this.direction?"ul, ol":"."+d.panel);t.off(u.toggle+" "+u.open+" "+u.close).on(u.toggle+" "+u.open+" "+u.close,function(e){e.stopPropagation()}),"horizontal"==this.direction?t.on(u.open,function(){return o(e(this),n.$menu)}):t.on(u.toggle,function(){var n=e(this);return n.triggerHandler(n.parent().hasClass(d.opened)?u.close:u.open)}).on(u.open,function(){return e(this).parent().addClass(d.opened),"open"}).on(u.close,function(){return e(this).parent().removeClass(d.opened),"close"})},_initBlocker:function(){var n=this;r.$blck||(r.$blck=e('<div id="'+d.blocker+'" />').appendTo(r.$body)),r.$blck.off(u.touchstart).on(u.touchstart,function(e){e.preventDefault(),e.stopPropagation(),r.$blck.trigger(u.mousedown)}).on(u.mousedown,function(e){e.preventDefault(),r.$html.hasClass(d.modal)||n.$menu.trigger(u.close)})},_initPage:function(n){n||(n=e(this.conf.pageSelector,r.$body),n.length>1&&(e[a].debug("Multiple nodes found for the page-node, all nodes are wrapped in one <"+this.conf.pageNodetype+">."),n=n.wrapAll("<"+this.conf.pageNodetype+" />").parent())),n.addClass(d.page),r.$page=n},_initMenu:function(){this.conf.clone&&(this.$menu=this.$menu.clone(!0),this.$menu.add(this.$menu.find("*")).filter("[id]").each(function(){e(this).attr("id",d.mm(e(this).attr("id")))})),this.$menu.contents().each(function(){3==e(this)[0].nodeType&&e(this).remove()}),this.$menu.prependTo("body").addClass(d.menu),this.$menu.addClass(d.mm(this.direction)),this.opts.classes&&this.$menu.addClass(this.opts.classes),this.opts.isMenu&&this.$menu.addClass(d.ismenu),"left"!=this.opts.position&&this.$menu.addClass(d.mm(this.opts.position)),"back"!=this.opts.zposition&&this.$menu.addClass(d.mm(this.opts.zposition))},_initPanles:function(){var n=this;this.__refactorClass(e("."+this.conf.listClass,this.$menu),"list"),this.opts.isMenu&&e("ul, ol",this.$menu).not(".mm-nolist").addClass(d.list);var t=e("."+d.list+" > li",this.$menu);this.__refactorClass(t.filter("."+this.conf.selectedClass),"selected"),this.__refactorClass(t.filter("."+this.conf.labelClass),"label"),this.__refactorClass(t.filter("."+this.conf.spacerClass),"spacer"),t.off(u.setSelected).on(u.setSelected,function(n,s){n.stopPropagation(),t.removeClass(d.selected),"boolean"!=typeof s&&(s=!0),s&&e(this).addClass(d.selected)}),this.__refactorClass(e("."+this.conf.panelClass,this.$menu),"panel"),this.$menu.children().filter(this.conf.panelNodetype).add(this.$menu.find("."+d.list).children().children().filter(this.conf.panelNodetype)).addClass(d.panel);var s=e("."+d.panel,this.$menu);s.each(function(t){var s=e(this),o=s.attr("id")||d.mm("m"+n.serialnr+"-p"+t);s.attr("id",o)}),s.find("."+d.panel).each(function(){var t=e(this),s=t.is("ul, ol")?t:t.find("ul ,ol").first(),o=t.parent(),i=o.find("> a, > span"),a=o.closest("."+d.panel);if(t.data(c.parent,o),o.parent().is("."+d.list)){var l=e('<a class="'+d.subopen+'" href="#'+t.attr("id")+'" />').insertBefore(i);i.is("a")||l.addClass(d.fullsubopen),"horizontal"==n.direction&&s.prepend('<li class="'+d.subtitle+'"><a class="'+d.subclose+'" href="#'+a.attr("id")+'">'+i.text()+"</a></li>")}});var o="horizontal"==this.direction?u.open:u.toggle;if(s.each(function(){var t=e(this),s=t.attr("id");e('a[href="#'+s+'"]',n.$menu).off(u.click).on(u.click,function(e){e.preventDefault(),t.trigger(o)})}),"horizontal"==this.direction){var i=e("."+d.list+" > li."+d.selected,this.$menu);i.add(i.parents("li")).parents("li").removeClass(d.selected).end().each(function(){var n=e(this),t=n.find("> ."+d.panel);t.length&&(n.parents("."+d.panel).addClass(d.subopened),t.addClass(d.opened))}).closest("."+d.panel).addClass(d.opened).parents("."+d.panel).addClass(d.subopened)}else e("li."+d.selected,this.$menu).addClass(d.opened).parents("."+d.selected).removeClass(d.selected);var a=s.filter("."+d.opened);a.length||(a=s.first()),a.addClass(d.opened).last().addClass(d.current),"horizontal"==this.direction&&s.find("."+d.panel).appendTo(this.$menu)},_initLinks:function(){var n=this;e("."+d.list+" > li > a",this.$menu).not("."+d.subopen).not("."+d.subclose).not('[rel="external"]').not('[target="_blank"]').off(u.click).on(u.click,function(t){var s=e(this),o=s.attr("href");n.__valueOrFn(n.opts.onClick.setSelected,s)&&s.parent().trigger(u.setSelected);var i=n.__valueOrFn(n.opts.onClick.preventDefault,s,"#"==o.slice(0,1));i&&t.preventDefault(),n.__valueOrFn(n.opts.onClick.blockUI,s,!i)&&r.$html.addClass(d.blocking),n.__valueOrFn(n.opts.onClick.close,s,i)&&n.$menu.triggerHandler(u.close)})},_initOpenClose:function(){var n=this,t=this.$menu.attr("id");t&&t.length&&(this.conf.clone&&(t=d.umm(t)),e('a[href="#'+t+'"]').off(u.click).on(u.click,function(e){e.preventDefault(),n.$menu.trigger(u.open)}));var t=r.$page.attr("id");t&&t.length&&e('a[href="#'+t+'"]').off(u.click).on(u.click,function(e){e.preventDefault(),n.$menu.trigger(u.close)})},__valueOrFn:function(e,n,t){return"function"==typeof e?e.call(n[0]):"undefined"==typeof e&&"undefined"!=typeof t?t:e},__refactorClass:function(e,n){e.removeClass(this.conf[n+"Class"]).addClass(d[n])}},e.fn[a]=function(o,i){return r.$wndw||s(),o=n(o,i),i=t(i),this.each(function(){var n=e(this);n.data(a)||n.data(a,new e[a](n,o,i))})},e[a].version=l,e[a].defaults={position:"left",zposition:"back",moveBackground:!0,slidingSubmenus:!0,modal:!1,classes:"",onClick:{setSelected:!0}},e[a].configuration={preventTabbing:!0,panelClass:"Panel",listClass:"List",selectedClass:"Selected",labelClass:"Label",spacerClass:"Spacer",pageNodetype:"div",panelNodetype:"ul, ol, div",transitionDuration:400},function(){var n=window.document,t=window.navigator.userAgent,s=(document.createElement("div").style,"ontouchstart"in n),o="WebkitOverflowScrolling"in n.documentElement.style,i=function(){return t.indexOf("Android")>=0?2.4>parseFloat(t.slice(t.indexOf("Android")+8)):!1}();e[a].support={touch:s,oldAndroidBrowser:i,overflowscrolling:function(){return s?o?!0:i?!1:!0:!0}()}}(),e[a].debug=function(){},e[a].deprecated=function(e,n){"undefined"!=typeof console&&"undefined"!=typeof console.warn&&console.warn("MMENU: "+e+" is deprecated, use "+n+" instead.")}}}(jQuery);