if("undefined"!==typeof YAHOO&&YAHOO){YAHOO.namespace("one.uh");YAHOO.one.uh.init=function(){var Q=YAHOO.util.Event;var R=YAHOO.util.Dom;var K=YAHOO.one.uh.hotlistInfo;var E=YAHOO.one.uh.translate;var V=1;var N=13;var D=27;var P=0;var C=0;var J=0;var I=navigator.userAgent.toLowerCase().indexOf("firefox")>0;var S=navigator.userAgent.match(/MSIE\s([^;]*)/);if(YAHOO.env&&YAHOO.env.ua){P=C=(YAHOO.env.ua.ie>=6);J=(parseInt(YAHOO.env.ua.ie,10)==6)}else{if(S&&S[1]){C=(parseFloat(S[1])>=6);P=parseFloat(S[1]);J=(parseInt(S[1],10)==6)}}var L=function(){if(typeof document!=="undefined"){return document}else{if(typeof document.documentElement!=="undefined"){return document.documentElement}}};var U=function(a){return K.rd+K.space+"/*"+a};var W=function(k,e,h){var g=L().createElement("ul");g.setAttribute("id",k);if("undefined"!=h){g.className=h.join(" ")}R.addClass(g,"hidden");for(var f=0;f<e.length;f++){var b=L().createElement("li");if((2==e[f].length||3==e[f].length)&&e[f][1].indexOf("http")>=0){var c=L().createElement("a");var j=L();c.href=U(e[f][1]);c.target=typeof e[f][2]=="undefined"?"_top":e[f][2];if(e[f][3]&&"string"==typeof e[f][3]){c.title=e[f][3]}c.appendChild(L().createTextNode(e[f][0]));b.appendChild(c)}else{if("string"==typeof e[f][0]){b.innerHTML=e[f][0];if(e[f][1]&&"string"==typeof e[f][1]){b.setAttribute("title",e[f][1])}}else{}}if(f==(e.length-1)){b.className="last-child"}g.appendChild(b)}return g};var F=function(b,a){return function(e){var d=R.getXY(a);var g=("left"==b[0])?d[0]:(R.getRegion(a).right-e);var f=0;if("container_bottom"==b[1]){var c=R.getXY(R.get("ygmabot"));f=c[1]}else{f=d[1]+a.offsetHeight}return[g,f]}};var H=function(f){if(!P){return false}var e=document.getElementsByTagName("select");var g=YAHOO.util.Dom,c=false;if(e[0]){for(var b=0;b<e.length;b++){if(e[b].style.display!="none"&&e[b].style.visiblity!="hidden"&&g.getRegion(f).intersect(g.getRegion(e[b]))){c=true;break}}}else{if(e&&"undefined"!=typeof e.style){if(e.style.display!="none"&&e.style.visiblity!="hidden"&&g.getRegion(f).intersect(g.getRegion(e))){c=true}}}var a=document.getElementById("ygmaIframeShim");if(c&&!a){a=document.createElement("iframe");a.id="ygmaIframeShim";a=f.parentNode.insertBefore(a,f)}if(c){a.style.zIndex=g.getStyle(f,"zIndex")-1;a.style.width=f.offsetWidth+"px";a.style.height=f.offsetHeight+"px"}f=a=null;return c};var O=[];YAHOO.one.uh.Menu=function(a,c,b){R.get(a).parentNode.appendChild(R.get(c));this.getTrigger=function(){return R.get(a)};this.getMenu=function(){return R.get(c)};this.getXYCalc=function(){return b};this.usingShim=false;Q.addListener(this.getMenu(),"mouseout",this.hideOnMouseOut,this,true);Q.addListener(this.getTrigger(),"mouseout",this.hideOnMouseOut,this,true);O.push(this)};YAHOO.one.uh.Menu.hideAll=function(){for(var a=0;a<O.length;a++){O[a].hide()}};YAHOO.one.uh.Menu.prototype={update:function(c){var b=this;var d=null;this.currentTarget=Q.getTarget(c);if("keydown"==c.type){d=window.event?c.keyCode:c.which}var a=function(){if(b.currentTarget==R.get(b.getTrigger())){b.show()}};if(Q.getTarget(c)==R.get(this.getTrigger())){if("mouseover"==c.type){setTimeout(a,100)}if("keydown"==c.type){if(N==d){a()}}}if("keydown"==c.type&&R.isAncestor(this.getMenu(),Q.getTarget(c))&&D==d){this.hide();this.getTrigger().focus()}},show:function(){YAHOO.one.uh.Menu.hideAll();if(!this.isVisible()){R.replaceClass(this.getMenu(),"hidden","visible");var a=this.getXYCalc()(this.getMenu().offsetWidth);R.setXY(this.getMenu(),[a[0],a[1]]);this.usingShim=H(this.getMenu());if(this.usingShim){R.replaceClass(R.get("ygmaIframeShim"),"hidden","visible");R.setXY(R.get("ygmaIframeShim"),[a[0],a[1]])}}},hide:function(){R.replaceClass(this.getMenu(),"visible","hidden");if(this.usingShim){R.replaceClass(R.get("ygmaIframeShim"),"visible","hidden")}},hideOnMouseOut:function(c){var d=R.getRegion(this.getTrigger());var a=R.getRegion(this.getMenu());var b=Q.getXY(c);if(!(R.isAncestor(this.getMenu(),Q.getRelatedTarget(c))||this.getMenu()==Q.getRelatedTarget(c))&&b[0]>1&&((b[1]>=(d.bottom)&&b[0]>=(a.right))||(b[1]>=(d.bottom)&&b[0]<=(a.left))||b[1]>=(d.bottom+5)||b[1]<=(d.top)||b[0]<=(d.left)||b[0]>=(d.right))){this.hide()}},isVisible:function(){return R.hasClass(this.getMenu(),"visible")}};YAHOO.one.uh.Promo=function(a,b){this.getElement=function(){return R.get(a)};this.getHandler=function(){return b}};YAHOO.one.uh.Promo.prototype={show:function(){R.replaceClass(this.getElement(),"hidden","visible")},hide:function(){R.replaceClass(this.getElement(),"visible","hidden")},update:function(a){var b=Q.getTarget(a);if(this.getHandler().eventType==a.type&&(this.getElement()==R.get(b)||R.isAncestor(this.getElement(),R.get(b)))){this.getHandler().callback()()}}};var M=null;if("undefined"!==typeof YAHOO.one.uh.yahooServices){M=new YAHOO.one.uh.Menu("ygmamore",W("ygmasubnav",YAHOO.one.uh.yahooServices,["menu","sprite_bg"]),F(["left","container_bottom"],"ygmamore"))}var Z=null;if("undefined"!==typeof YAHOO.one.uh.accountOptions&&R.get("ygmausername")){Z=new YAHOO.one.uh.Menu("ygmausername",W("ygmauseroptions",YAHOO.one.uh.accountOptions,["menu","sprite_bg"]),F(["left","container_bottom"],"ygmausername"))}var B=null;if("undefined"!==typeof YAHOO.one.uh.yahooHelp){B=new YAHOO.one.uh.Menu("ygmahelp",W("ygmahelpmenu",YAHOO.one.uh.yahooHelp,["menu","sprite_bg"]),F(["right","container_bottom"],"ygmahelp"));if(P&&C){B.show();B.hide()}}if(C){var A=L().createElement("a");A.style.behavior="url(#default#homepage)"}if(I){var T=L().createElement("div");T.className="shdw hidden";T.setAttribute("id","ygmashpd");T.innerHTML="<div class='bd'><div id='pnt' class='myyhpbg'></div><a class='ygmashp myyhpbg' href='"+E("yahoo_homepage")+"' title='Yahoo!'>Yahoo!</a><ol id='ygmahpinstr'><li>"+E("set_hp_firefox_instructions")[0]+"</li><li>"+E("set_hp_firefox_instructions")[1]+"</li><li>"+E("set_hp_firefox_instructions")[2]+"</li></ol><div class='hr'></hr><p>"+E("set_hp_alternative_instructions1")+"<a id='ygmashpdetails' class='ygmashps' href='"+encodeURI(E("set_hp_script"))+"'>"+E("detailed_set_hp_instructions")+"</a>"+E("set_hp_alternative_instructions2")+"</p><p><a id='ygmashpdclose' href='javascript:void(0);'>"+E("close_this_window")+"</a></p></div>";R.get("ygmatop").appendChild(T);Q.addListener("ygmashpdclose","click",function(){R.replaceClass(R.get("ygmashpd"),"visible","hidden")})}var Y=function(){if(C){A.setHomePage(E("yahoo_homepage"));var a=R.get("ygmatop").appendChild(L().createElement("iframe"));a.setAttribute("id","ygmaprocframe");a.setAttribute("name","ygmaprocframe");a.setAttribute("frameborder","0");a.style.width=0;a.style.height=0;window.ygmaprocframe.location.replace(encodeURI(E("hp_detect_script"))+"?hp="+encodeURI(E("yahoo_homepage"))+"&hpid=1&ygma_rd="+encodeURI(K.rd)+"&ygma_space="+encodeURI(K.space)+"&ygma_space2="+encodeURI(K.space)+"&ygma_space3="+encodeURI(K.space)+"&ygma_adid="+encodeURI(K.adid)+"&ygma_prop="+encodeURI(K.prop))}else{window.location=R.get("ygmamyyhp").href}};var X=function(){var c=R.getXY(R.get("ygmamyyhp"));var b=R.get("ygmashpd");if(R.hasClass(b,"hidden")){R.replaceClass(b,"hidden","visible");R.setXY(b,[c[0]-200,c[1]+20]);var a=new Image();a.src=encodeURI(K.rd)+encodeURI(K.space)+"/*"+encodeURI(E("set_hp_script"))+"?adid="+encodeURI(K.adid)+"&prop="+encodeURI(K.prop)+"&browser=ff"}else{R.replaceClass(b,"visible","hidden")}};var G=new YAHOO.one.uh.Promo("ygmamyyhp",{eventType:"click",callback:function(){if(P){return Y}if(I){return X}return function(){window.location=R.get("ygmamyyhp").href}}});YAHOO.one.uh.Header=function(){return{observers:[M,Z,G,B],init:function(b){for(var a=0;a<this.observers.length;a++){if(this.observers[a]){this.observers[a].update(b)}}}}}()};(function(){if("undefined"!==typeof YAHOO.one.uh.hotlistInfo){YAHOO.one.uh.init()}else{setTimeout(arguments.callee,100)}})()};