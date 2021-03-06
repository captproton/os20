// swap out yahoo refs where not needed or get simplified, open source version of this script
YAHOO.util.Attribute=function(B,A){if(A){this.owner=A;
	this.configure(B,true);}};YAHOO.util.Attribute.prototype={name:undefined,value:null,owner:null,readOnly:false,writeOnce:false,_initialConfig:null,_written:false,method:null,validator:null,getValue:function(){return this.value;},setValue:function(F,B){var E;
	var A=this.owner;
	var C=this.name;
	var D={type:C,prevValue:this.getValue(),newValue:F};
	if(this.readOnly||(this.writeOnce&&this._written)){return false;}if(this.validator&&!this.validator.call(A,F)){return false;}if(!B){E=A.fireBeforeChangeEvent(D);
	if(E===false){return false;}}if(this.method){this.method.call(A,F);}this.value=F;
	this._written=true;D.type=C;
	if(!B){this.owner.fireChangeEvent(D);}return true;},configure:function(B,C){B=B||{};
	this._written=false;
	this._initialConfig=this._initialConfig||{};for(var A in B){if(A&&YAHOO.lang.hasOwnProperty(B,A)){this[A]=B[A];
	if(C){this._initialConfig[A]=B[A];}}}},resetValue:function(){return this.setValue(this._initialConfig.value);},resetConfig:function(){this.configure(this._initialConfig);},refresh:function(A){this.setValue(this.value,A);}};(function(){var A=YAHOO.util.Lang;YAHOO.util.AttributeProvider=function(){};YAHOO.util.AttributeProvider.prototype={_configs:null,get:function(C){this._configs=this._configs||{};
	var B=this._configs[C];
	if(!B){return undefined;}return B.value;},set:function(D,E,B){this._configs=this._configs||{};
	var C=this._configs[D];
	if(!C){return false;}return C.setValue(E,B);},getAttributeKeys:function(){this._configs=this._configs;
	var D=[];
	var B;for(var C in this._configs){B=this._configs[C];
	if(A.hasOwnProperty(this._configs,C)&&!A.isUndefined(B)){D[D.length]=C;}}return D;},setAttributes:function(D,B){for(var C in D){if(A.hasOwnProperty(D,C)){this.set(C,D[C],B);}}},resetValue:function(C,B){this._configs=this._configs||{};
	if(this._configs[C]){this.set(C,this._configs[C]._initialConfig.value,B);return true;}return false;},refresh:function(E,C){this._configs=this._configs;E=((A.isString(E))?[E]:E)||this.getAttributeKeys();for(var D=0,B=E.length;D<B;++D){if(this._configs[E[D]]&&!A.isUndefined(this._configs[E[D]].value)&&!A.isNull(this._configs[E[D]].value)){this._configs[E[D]].refresh(C);}}},register:function(B,C){this.setAttributeConfig(B,C);},getAttributeConfig:function(C){this._configs=this._configs||{};
	var B=this._configs[C]||{};
	var D={};for(C in B){if(A.hasOwnProperty(B,C)){D[C]=B[C];}}return D;},setAttributeConfig:function(B,C,D){this._configs=this._configs||{};C=C||{};
	if(!this._configs[B]){C.name=B;
	this._configs[B]=this.createAttribute(C);}
	else{this._configs[B].configure(C,D);}},configureAttribute:function(B,C,D){this.setAttributeConfig(B,C,D);},resetAttributeConfig:function(B){this._configs=this._configs||{};
	this._configs[B].resetConfig();},subscribe:function(B,C){this._events=this._events||{};
	if(!(B in this._events)){this._events[B]=this.createEvent(B);}YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.subscribe.apply(this,arguments);},addListener:function(){this.subscribe.apply(this,arguments);},fireBeforeChangeEvent:function(C){var B="before";B+=C.type.charAt(0).toUpperCase()+C.type.substr(1)+"Change";C.type=B;return this.fireEvent(C.type,C);},fireChangeEvent:function(B){B.type+="Change";return this.fireEvent(B.type,B);},createAttribute:function(B){return new YAHOO.util.Attribute(B,this);}};YAHOO.augment(YAHOO.util.AttributeProvider,YAHOO.util.EventProvider);})();(function(){var D=YAHOO.util.Dom,F=YAHOO.util.AttributeProvider;YAHOO.util.Element=function(G,H){if(arguments.length){this.init(G,H);}};YAHOO.util.Element.prototype={DOM_EVENTS:null,appendChild:function(G){G=G.get?G.get("element"):G;
	this.get("element").appendChild(G);},getElementsByTagName:function(G){return this.get("element").getElementsByTagName(G);},hasChildNodes:function(){return this.get("element").hasChildNodes();},insertBefore:function(G,H){G=G.get?G.get("element"):G;H=(H&&H.get)?H.get("element"):H;
	this.get("element").insertBefore(G,H);},removeChild:function(G){G=G.get?G.get("element"):G;
	this.get("element").removeChild(G);return true;},replaceChild:function(G,H){G=G.get?G.get("element"):G;H=H.get?H.get("element"):H;return this.get("element").replaceChild(G,H);},initAttributes:function(G){},addListener:function(K,J,L,I){var H=this.get("element");I=I||this;H=this.get("id")||H;
	var G=this;
	if(!this._events[K]){if(this.DOM_EVENTS[K]){YAHOO.util.Event.addListener(H,K,function(M){if(M.srcElement&&!M.target){M.target=M.srcElement;}G.fireEvent(K,M);},L,I);}this.createEvent(K,this);}YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.addListener.apply(this,arguments);},subscribe:function(){this.addListener.apply(this,arguments);},removeListener:function(H,G){this.unsubscribe.apply(this,arguments);},addClass:function(G){D.addClass(this.get("element"),G);},getElementsByClassName:function(H,G){return D.getElementsByClassName(H,G,this.get("element"));},hasClass:function(G){return D.hasClass(this.get("element"),G);},removeClass:function(G){return D.removeClass(this.get("element"),G);},replaceClass:function(H,G){return D.replaceClass(this.get("element"),H,G);},setStyle:function(I,H){var G=this.get("element");
	if(!G){return this._queue[this._queue.length]=["setStyle",arguments];}return D.setStyle(G,I,H);},getStyle:function(G){return D.getStyle(this.get("element"),G);},fireQueue:function(){var H=this._queue;for(var I=0,G=H.length;I<G;++I){this[H[I][0]].apply(this,H[I][1]);}},appendTo:function(H,I){H=(H.get)?H.get("element"):D.get(H);
	this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:H});I=(I&&I.get)?I.get("element"):D.get(I);
	var G=this.get("element");
	if(!G){return false;}
if(!H){return false;}if(G.parent!=H){if(I){H.insertBefore(G,I);}

	
	else{H.appendChild(G);}}this.fireEvent("appendTo",{type:"appendTo",target:H});},get:function(G){var I=this._configs||{};
	var H=I.element;
	if(H&&!I[G]&&!YAHOO.lang.isUndefined(H.value[G])){return H.value[G];}return F.prototype.get.call(this,G);},setAttributes:function(L,H){var K=this.get("element");for(var J in L){if(!this._configs[J]&&!YAHOO.lang.isUndefined(K[J])){this.setAttributeConfig(J);}}for(var I=0,G=this._configOrder.length;I<G;++I){if(L[this._configOrder[I]]!==undefined){this.set(this._configOrder[I],L[this._configOrder[I]],H);}}},set:function(H,J,G){var I=this.get("element");
	if(!I){this._queue[this._queue.length]=["set",arguments];
	if(this._configs[H]){this._configs[H].value=J;}return;}if(!this._configs[H]&&!YAHOO.lang.isUndefined(I[H])){C.call(this,H);}return F.prototype.set.apply(this,arguments);},setAttributeConfig:function(G,I,J){var H=this.get("element");
	if(H&&!this._configs[G]&&!YAHOO.lang.isUndefined(H[G])){C.call(this,G,I);}
	
	else{F.prototype.setAttributeConfig.apply(this,arguments);}this._configOrder.push(G);},getAttributeKeys:function(){var H=this.get("element");
	var I=F.prototype.getAttributeKeys.call(this);for(var G in H){if(!this._configs[G]){I[G]=I[G]||H[G];}}return I;},createEvent:function(H,G){this._events[H]=true;F.prototype.createEvent.apply(this,arguments);},init:function(H,G){A.apply(this,arguments);}};
	var A=function(H,G){this._queue=this._queue||[];
	this._events=this._events||{};
	this._configs=this._configs||{};
	this._configOrder=[];G=G||{};G.element=G.element||H||null;
	this.DOM_EVENTS={"click":true,"dblclick":true,"keydown":true,"keypress":true,"keyup":true,"mousedown":true,"mousemove":true,"mouseout":true,"mouseover":true,"mouseup":true,"focus":true,"blur":true,"submit":true};
	var I=false;
	if(YAHOO.lang.isString(H)){C.call(this,"id",{value:G.element});}if(D.get(H)){I=true;E.call(this,G);B.call(this,G);}YAHOO.util.Event.onAvailable(G.element,function(){if(!I){E.call(this,G);}this.fireEvent("available",{type:"available",target:G.element});},this,true);YAHOO.util.Event.onContentReady(G.element,function(){if(!I){B.call(this,G);}this.fireEvent("contentReady",{type:"contentReady",target:G.element});},this,true);};
	var E=function(G){this.setAttributeConfig("element",{value:D.get(G.element),readOnly:true});};
	var B=function(G){this.initAttributes(G);
	this.setAttributes(G,true);
	this.fireQueue();};
	var C=function(G,I){var H=this.get("element");I=I||{};I.name=G;I.method=I.method||function(J){H[G]=J;};I.value=I.value||H[G];
	this._configs[G]=new YAHOO.util.Attribute(I,this);};YAHOO.augment(YAHOO.util.Element,F);})();YAHOO.register("element",YAHOO.util.Element,{version:"2.5.0",build:"897"});
	if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(E,C,K,F,H,J,L,G,A,D){if(!document.getElementById){return;}this.DETECT_KEY=D?D:"detectflash";
	this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);
	this.params=new Object();
	this.variables=new Object();
	this.attributes=new Array();
	if(E){this.setAttribute("swf",E);}if(C){this.setAttribute("id",C);}if(K){this.setAttribute("width",K);}if(F){this.setAttribute("height",F);}if(H){this.setAttribute("version",new deconcept.PlayerVersion(H.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();
	if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(J){this.addParam("bgcolor",J);}var B=L?L:"high";
	this.addParam("quality",B);
	this.setAttribute("useExpressInstall",false);
	this.setAttribute("doExpressInstall",false);
	var I=(G)?G:window.location;
	this.setAttribute("xiRedirectUrl",I);
	this.setAttribute("redirectUrl","");
	if(A){this.setAttribute("redirectUrl",A);}};deconcept.SWFObject.prototype={useExpressInstall:function(A){this.xiSWFPath=!A?"expressinstall.swf":A;
	this.setAttribute("useExpressInstall",true);},setAttribute:function(A,B){this.attributes[A]=B;},getAttribute:function(A){return this.attributes[A];},addParam:function(A,B){this.params[A]=B;},getParams:function(){return this.params;},addVariable:function(A,B){this.variables[A]=B;},getVariable:function(A){return this.variables[A];},getVariables:function(){return this.variables;},getVariablePairs:function(){var A=new Array();
	var B;
	var C=this.getVariables();for(B in C){A[A.length]=B+"="+C[B];}return A;},getSWFHTML:function(){var D="";
	if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");
	this.setAttribute("swf",this.xiSWFPath);}D='<embed type="application/x-shockwave-flash" src="'+this.getAttribute("swf")+'" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'" style="'+this.getAttribute("style")+'"';D+=' id="'+this.getAttribute("id")+'" name="'+this.getAttribute("id")+'" ';
	var C=this.getParams();for(var A in C){D+=[A]+'="'+C[A]+'" ';}var B=this.getVariablePairs().join("&");
	if(B.length>0){D+='flashvars="'+B+'"';}D+="/>";}
	
	else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");
	this.setAttribute("swf",this.xiSWFPath);}D='<object id="'+this.getAttribute("id")+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'" style="'+this.getAttribute("style")+'">';D+='<param name="movie" value="'+this.getAttribute("swf")+'" />';
	var C=this.getParams();for(var A in C){D+='<param name="'+A+'" value="'+C[A]+'" />';}var B=this.getVariablePairs().join("&");
	if(B.length>0){D+='<param name="flashvars" value="'+B+'" />';}D+="</object>";}return D;},write:function(A){if(this.getAttribute("useExpressInstall")){var B=new deconcept.PlayerVersion([6,0,65]);
	if(this.installedVer.versionIsValid(B)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);
	this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";
	this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var C=(typeof A=="string")?document.getElementById(A):A;C.innerHTML=this.getSWFHTML();return true;}
	
	else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var C=new deconcept.PlayerVersion([0,0,0]);
	if(navigator.plugins&&navigator.mimeTypes.length){var A=navigator.plugins["Shockwave Flash"];
	if(A&&A.description){C=new deconcept.PlayerVersion(A.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}
	
	else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var D=1;
	var B=3;while(D){try{B++;D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+B);C=new deconcept.PlayerVersion([B,0,0]);}catch(E){D=null;}}}
	else{try{var D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(E){try{var D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");C=new deconcept.PlayerVersion([6,0,21]);D.AllowScriptAccess="always";}catch(E){if(C.major==6){return C;}}try{D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(E){}}if(D!=null){C=new deconcept.PlayerVersion(D.GetVariable("$version").split(" ")[1].split(","));}}}return C;};deconcept.PlayerVersion=function(A){this.major=A[0]!=null?parseInt(A[0]):0;
	this.minor=A[1]!=null?parseInt(A[1]):0;
	this.rev=A[2]!=null?parseInt(A[2]):0;};
	deconcept.PlayerVersion.prototype.versionIsValid=function(A){
		if(this.major<A.major){return false;}
		if(this.major>A.major){return true;}
		if(this.minor<A.minor){return false;}
		if(this.minor>A.minor){return true;}
		if(this.rev<A.rev){return false;}
		return true;};
		deconcept.util=
		{
			getRequestParameter:function(D){
				var C=document.location.search||document.location.hash;
				if(D==null){return C;}
				if(C){var B=C.substring(1).split("&");
				for(var A=0;A<B.length;A++)
				{
					if(B[A].substring(0,B[A].indexOf("="))==D)
					{
						return B[A].substring((B[A].indexOf("=")+1));
					}
				}
			}
			return"";
		}
	};
	deconcept.SWFObjectUtil.cleanupSWFs=function()
	{
		var C=document.getElementsByTagName("OBJECT");
		for(var B=C.length-1;B>=0;B--)
		{
			C[B].style.display="none";for(var A in C[B])
			{
				if(typeof C[B][A]=="function"){C[B][A]=function(){};
			}
		}
	}
};
	if(deconcept.SWFObject.doPrepUnload)
	{			if(!deconcept.unloadSet)
		{
			deconcept.SWFObjectUtil.prepUnload=function(){
				__flash_unloadHandler=function(){
					
				};
				__flash_savedUnloadHandler=function(){
					
				};
				window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);
				};
				window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);
				deconcept.unloadSet=true;
				}
				}
				if(!document.getElementById&&document.all){
					document.getElementById=function(A){
						return document.all[A];
						};
						}
						var getQueryParamValue=deconcept.util.getRequestParameter;
						var FlashObject=deconcept.SWFObject;
						var SWFObject=deconcept.SWFObject;
						YAHOO.widget.FlashAdapter=function(C,A,B)
						{
							this._queue=this._queue||[];
							this._events=this._events||{};
							this._configs=this._configs||{};B=B||{};
							this._id=B.id=B.id||YAHOO.util.Dom.generateId(null,"yuigen");
							B.version=B.version||"9.0.45";B.
							backgroundColor=B.backgroundColor||"#ffffff";
							this._attributes=B;
							this._swfURL=C;
							this._embedSWF(this._swfURL,A,B.id,B.version,B.backgroundColor,B.expressInstall);
							this.createEvent("contentReady");
						};
						YAHOO.extend(YAHOO.widget.FlashAdapter,YAHOO.util.AttributeProvider,
							{
								_swfURL:null,_swf:null,_id:null,_attributes:null,toString:function(){return"FlashAdapter "+this._id;
								},
								_embedSWF:function(H,G,C,B,E,F){var D=new deconcept.SWFObject(H,C,"100%","100%",B,E,F);
								D.addParam("allowScriptAccess","always");
								D.addVariable("allowedDomain",document.location.hostname);
								D.addVariable("elementID",C);
								D.addVariable("eventHandler","YAHOO.widget.FlashAdapter.eventHandler");
								var A=YAHOO.util.Dom.get(G);
								var I=D.write(A);
								if(I)
									{
									this._swf=YAHOO.util.Dom.get(C);
									this._swf.owner=this;
									}
								},
								_eventHandler:function(B)
								{
									var A=B.type;
									switch(A){case"swfReady":this._loadHandler();
									return;case"log":return;
								}
								this.fireEvent(A,B);
								},
								_loadHandler:function()
								{
									this._initAttributes(this._attributes);
									this.setAttributes(this._attributes,true);
									this._attributes=null;
									this.fireEvent("contentReady");
								},
								_initAttributes:function(A)
								{
									this.getAttributeConfig("swfURL",
									{
										method:this._getSWFURL
									}
									);
								},
								_getSWFURL:function()
								{
									return this._swfURL;
								}
							}
							);
							YAHOO.widget.FlashAdapter.eventHandler=function(A,C){
								var B=YAHOO.util.Dom.get(A);
								if(!B.owner)
								{
									setTimeout(function()
									{
										YAHOO.widget.FlashAdapter.eventHandler(A,C);
									},
									0);
								}
								else{B.owner._eventHandler(C);
									}									
								};
								YAHOO.widget.Uploader=function(A)
								{
									YAHOO.widget.Uploader.superclass.constructor.call
									(
										this,YAHOO.widget.Uploader.SWFURL,A,null
									);
									this.createEvent("fileSelect");
									this.createEvent("uploadStart");
									this.createEvent("uploadProgress");
									this.createEvent("uploadCancel");
									this.createEvent("uploadComplete");
									this.createEvent("uploadCompleteData");
									this.createEvent("uploadError");
									};
									YAHOO.widget.Uploader.SWFURL="assets/uploader.swf";
									YAHOO.extend(YAHOO.widget.Uploader,YAHOO.widget.FlashAdapter,
									{
											browse:function(B,A)
											{
												this._swf.browse(B,A);
												},
												upload:function(A,B,E,C,D){
													this._swf.upload(A,B,E,C,D);
													},
													uploadAll:function(A,D,B,C){this._swf.uploadAll(A,D,B,C);},cancel:function(A){this._swf.cancel(A);},clearFileList:function(){this._swf.clearFileList();},removeFile:function(A){this._swf.removeFile(A);}});YAHOO.register("uploader",YAHOO.widget.Uploader,{version:"2.5.1",build:"984"});
	if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var A=YAHOO.util.Event;return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(D,C){for(var E in this.ids){for(var B in this.ids[E]){var F=this.ids[E][B];
	if(!this.isTypeOfDD(F)){continue;}F[D].apply(F,C);}}},_onLoad:function(){this.init();A.on(document,"mouseup",this.handleMouseUp,this,true);A.on(document,"mousemove",this.handleMouseMove,this,true);A.on(window,"unload",this._onUnload,this,true);A.on(window,"resize",this._onResize,this,true);},_onResize:function(B){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,fromTimeout:false,regDragDrop:function(C,B){if(!this.initialized){this.init();}if(!this.ids[B]){this.ids[B]={};}this.ids[B][C.id]=C;},removeDDFromGroup:function(D,B){if(!this.ids[B]){this.ids[B]={};}var C=this.ids[B];
	if(C&&C[D.id]){delete C[D.id];}},_remove:function(C){for(var B in C.groups){if(B&&this.ids[B][C.id]){delete this.ids[B][C.id];}}delete this.handleIds[C.id];},regHandle:function(C,B){if(!this.handleIds[C]){this.handleIds[C]={};}this.handleIds[C][B]=B;},isDragDrop:function(B){return(this.getDDById(B))?true:false;},getRelated:function(G,C){var F=[];for(var E in G.groups){for(var D in this.ids[E]){var B=this.ids[E][D];
	if(!this.isTypeOfDD(B)){continue;}if(!C||B.isTarget){F[F.length]=B;}}}return F;},isLegalTarget:function(F,E){var C=this.getRelated(F,true);for(var D=0,B=C.length;D<B;++D){if(C[D].id==E.id){return true;}}return false;},isTypeOfDD:function(B){return(B&&B.__ygDragDrop);},isHandle:function(C,B){return(this.handleIds[C]&&this.handleIds[C][B]);},getDDById:function(C){for(var B in this.ids){if(this.ids[B][C]){return this.ids[B][C];}}return null;},handleMouseDown:function(D,C){this.currentTarget=YAHOO.util.Event.getTarget(D);
	this.dragCurrent=C;
	var B=C.getEl();
	this.startX=YAHOO.util.Event.getPageX(D);
	this.startY=YAHOO.util.Event.getPageY(D);
	this.deltaX=this.startX-B.offsetLeft;
	this.deltaY=this.startY-B.offsetTop;
	this.dragThreshMet=false;
	this.clickTimeout=setTimeout(function(){var E=YAHOO.util.DDM;E.startDrag(E.startX,E.startY);E.fromTimeout=true;},this.clickTimeThresh);},startDrag:function(B,D){clearTimeout(this.clickTimeout);
	var C=this.dragCurrent;
	if(C&&C.events.b4StartDrag){C.b4StartDrag(B,D);C.fireEvent("b4StartDragEvent",{x:B,y:D});}if(C&&C.events.startDrag){C.startDrag(B,D);C.fireEvent("startDragEvent",{x:B,y:D});}this.dragThreshMet=true;},handleMouseUp:function(B){if(this.dragCurrent){clearTimeout(this.clickTimeout);
	if(this.dragThreshMet){if(this.fromTimeout){this.handleMouseMove(B);}this.fromTimeout=false;
	this.fireEvents(B,true);}
	else{}this.stopDrag(B);
	this.stopEvent(B);}},stopEvent:function(B){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(B);}if(this.preventDefault){YAHOO.util.Event.preventDefault(B);}},stopDrag:function(D,C){var B=this.dragCurrent;
	if(B&&!C){if(this.dragThreshMet){if(B.events.b4EndDrag){B.b4EndDrag(D);B.fireEvent("b4EndDragEvent",{e:D});}if(B.events.endDrag){B.endDrag(D);B.fireEvent("endDragEvent",{e:D});}}if(B.events.mouseUp){B.onMouseUp(D);B.fireEvent("mouseUpEvent",{e:D});}}this.dragCurrent=null;
	this.dragOvers={};},handleMouseMove:function(E){var B=this.dragCurrent;
	if(B){if(YAHOO.util.Event.isIE&&!E.button){this.stopEvent(E);return this.handleMouseUp(E);}
	else{if(E.clientX<0||E.clientY<0){}}if(!this.dragThreshMet){var D=Math.abs(this.startX-YAHOO.util.Event.getPageX(E));
	var C=Math.abs(this.startY-YAHOO.util.Event.getPageY(E));
	if(D>this.clickPixelThresh||C>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}if(this.dragThreshMet){if(B&&B.events.b4Drag){B.b4Drag(E);B.fireEvent("b4DragEvent",{e:E});}if(B&&B.events.drag){B.onDrag(E);B.fireEvent("dragEvent",{e:E});}if(B){this.fireEvents(E,false);}}this.stopEvent(E);}},fireEvents:function(U,K){var Z=this.dragCurrent;
	if(!Z||Z.isLocked()||Z.dragOnly){return;}var M=YAHOO.util.Event.getPageX(U),L=YAHOO.util.Event.getPageY(U),O=new YAHOO.util.Point(M,L),J=Z.getTargetCoord(O.x,O.y),E=Z.getDragEl(),D=["out","over","drop","enter"],T=new YAHOO.util.Region(J.y,J.x+E.offsetWidth,J.y+E.offsetHeight,J.x),H=[],C={},P=[],a={outEvts:[],overEvts:[],dropEvts:[],enterEvts:[]};for(var R in this.dragOvers){var c=this.dragOvers[R];
	if(!this.isTypeOfDD(c)){continue;}if(!this.isOverTarget(O,c,this.mode,T)){a.outEvts.push(c);}H[R]=true;delete this.dragOvers[R];}for(var Q in Z.groups){if("string"!=typeof Q){continue;}for(R in this.ids[Q]){var F=this.ids[Q][R];
	if(!this.isTypeOfDD(F)){continue;}if(F.isTarget&&!F.isLocked()&&F!=Z){if(this.isOverTarget(O,F,this.mode,T)){C[Q]=true;
	if(K){a.dropEvts.push(F);}
	else{if(!H[F.id]){a.enterEvts.push(F);}
	else{a.overEvts.push(F);}this.dragOvers[F.id]=F;}}}}}this.interactionInfo={out:a.outEvts,enter:a.enterEvts,over:a.overEvts,drop:a.dropEvts,point:O,draggedRegion:T,sourceRegion:this.locationCache[Z.id],validDrop:K};for(var B in C){P.push(B);}if(K&&!a.dropEvts.length){this.interactionInfo.validDrop=false;
	if(Z.events.invalidDrop){Z.onInvalidDrop(U);Z.fireEvent("invalidDropEvent",{e:U});}}for(R=0;R<D.length;R++){var X=null;
	if(a[D[R]+"Evts"]){X=a[D[R]+"Evts"];}if(X&&X.length){var G=D[R].charAt(0).toUpperCase()+D[R].substr(1),W="onDrag"+G,I="b4Drag"+G,N="drag"+G+"Event",V="drag"+G;
	if(this.mode){if(Z.events[I]){Z[I](U,X,P);Z.fireEvent(I+"Event",{event:U,info:X,group:P});}if(Z.events[V]){Z[W](U,X,P);Z.fireEvent(N,{event:U,info:X,group:P});}}
	else{for(var Y=0,S=X.length;Y<S;++Y){if(Z.events[I]){Z[I](U,X[Y].id,P[0]);Z.fireEvent(I+"Event",{event:U,info:X[Y].id,group:P[0]});}if(Z.events[V]){Z[W](U,X[Y].id,P[0]);Z.fireEvent(N,{event:U,info:X[Y].id,group:P[0]});}}}}}},getBestMatch:function(D){var F=null;
	var C=D.length;
	if(C==1){F=D[0];}
	else{for(var E=0;E<C;++E){var B=D[E];
	if(this.mode==this.INTERSECT&&B.cursorIsOver){F=B;break;}
	else{if(!F||!F.overlap||(B.overlap&&F.overlap.getArea()<B.overlap.getArea())){F=B;}}}}return F;},refreshCache:function(C){var E=C||this.ids;for(var B in E){if("string"!=typeof B){continue;}for(var D in this.ids[B]){var F=this.ids[B][D];
	if(this.isTypeOfDD(F)){var G=this.getLocation(F);
	if(G){this.locationCache[F.id]=G;}
	else{delete this.locationCache[F.id];}}}}},verifyEl:function(C){try{if(C){var B=C.offsetParent;
	if(B){return true;}}}catch(D){}return false;},getLocation:function(G){if(!this.isTypeOfDD(G)){return null;}var E=G.getEl(),J,D,C,L,K,M,B,I,F;try{J=YAHOO.util.Dom.getXY(E);}catch(H){}if(!J){return null;}D=J[0];C=D+E.offsetWidth;L=J[1];K=L+E.offsetHeight;M=L-G.padding[0];B=C+G.padding[1];I=K+G.padding[2];F=D-G.padding[3];return new YAHOO.util.Region(M,B,I,F);},isOverTarget:function(J,B,D,E){var F=this.locationCache[B.id];
	if(!F||!this.useCache){F=this.getLocation(B);
	this.locationCache[B.id]=F;}if(!F){return false;}B.cursorIsOver=F.contains(J);
	var I=this.dragCurrent;
	if(!I||(!D&&!I.constrainX&&!I.constrainY)){return B.cursorIsOver;}B.overlap=null;
	if(!E){var G=I.getTargetCoord(J.x,J.y);
	var C=I.getDragEl();E=new YAHOO.util.Region(G.y,G.x+C.offsetWidth,G.y+C.offsetHeight,G.x);}var H=E.intersect(F);
	if(H){B.overlap=H;return(D)?true:B.cursorIsOver;}
	else{return false;}},_onUnload:function(C,B){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();
	this.dragCurrent=null;}this._execOnAll("unreg",[]);
	this.ids={};},elementCache:{},getElWrapper:function(C){var B=this.elementCache[C];
	if(!B||!B.el){B=this.elementCache[C]=new this.ElementWrapper(YAHOO.util.Dom.get(C));}return B;},getElement:function(B){return YAHOO.util.Dom.get(B);},getCss:function(C){var B=YAHOO.util.Dom.get(C);return(B)?B.style:null;},ElementWrapper:function(B){this.el=B||null;
	this.id=this.el&&B.id;
	this.css=this.el&&B.style;},getPosX:function(B){return YAHOO.util.Dom.getX(B);},getPosY:function(B){return YAHOO.util.Dom.getY(B);},swapNode:function(D,B){if(D.swapNode){D.swapNode(B);}
	else{var E=B.parentNode;
	var C=B.nextSibling;
	if(C==D){E.insertBefore(D,B);}
	else{if(B==D.nextSibling){E.insertBefore(B,D);}
	else{D.parentNode.replaceChild(B,D);E.insertBefore(D,C);}}}},getScroll:function(){var D,B,E=document.documentElement,C=document.body;
	if(E&&(E.scrollTop||E.scrollLeft)){D=E.scrollTop;B=E.scrollLeft;}
	else{if(C){D=C.scrollTop;B=C.scrollLeft;}
	else{}}return{top:D,left:B};},getStyle:function(C,B){return YAHOO.util.Dom.getStyle(C,B);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(B,D){var C=YAHOO.util.Dom.getXY(D);YAHOO.util.Dom.setXY(B,C);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(C,B){return(C-B);},_timeoutCount:0,_addListeners:function(){var B=YAHOO.util.DDM;
	if(YAHOO.util.Event&&document){B._onLoad();}
	else{if(B._timeoutCount>2000){}
	else{setTimeout(B._addListeners,10);
	if(document&&document.body){B._timeoutCount+=1;}}}},handleWasClicked:function(B,D){if(this.isHandle(D,B.id)){return true;}
	else{var C=B.parentNode;while(C){if(this.isHandle(D,C.id)){return true;}
	else{C=C.parentNode;}}}return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}(function(){var A=YAHOO.util.Event;
	var B=YAHOO.util.Dom;YAHOO.util.DragDrop=function(E,C,D){if(E){this.init(E,C,D);}};YAHOO.util.DragDrop.prototype={events:null,on:function(){this.subscribe.apply(this,arguments);},id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,dragOnly:false,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(C,D){},startDrag:function(C,D){},b4Drag:function(C){},onDrag:function(C){},onDragEnter:function(C,D){},b4DragOver:function(C){},onDragOver:function(C,D){},b4DragOut:function(C){},onDragOut:function(C,D){},b4DragDrop:function(C){},onDragDrop:function(C,D){},onInvalidDrop:function(C){},b4EndDrag:function(C){},endDrag:function(C){},b4MouseDown:function(C){},onMouseDown:function(C){},onMouseUp:function(C){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=B.get(this.id);}return this._domRef;},getDragEl:function(){return B.get(this.dragElId);},init:function(F,C,D){this.initTarget(F,C,D);A.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true);for(var E in this.events){this.createEvent(E+"Event");}},initTarget:function(E,C,D){this.config=D||{};
	this.events={};
	this.DDM=YAHOO.util.DDM;
	this.groups={};
	if(typeof E!=="string"){this._domRef=E;E=B.generateId(E);}this.id=E;
	this.addToGroup((C)?C:"default");
	this.handleElId=E;A.onAvailable(E,this.handleOnAvailable,this,true);
	this.setDragElId(E);
	this.invalidHandleTypes={A:"A"};
	this.invalidHandleIds={};
	this.invalidHandleClasses=[];
	this.applyConfig();},applyConfig:function(){this.events={mouseDown:true,b4MouseDown:true,mouseUp:true,b4StartDrag:true,startDrag:true,b4EndDrag:true,endDrag:true,drag:true,b4Drag:true,invalidDrop:true,b4DragOut:true,dragOut:true,dragEnter:true,b4DragOver:true,dragOver:true,b4DragDrop:true,dragDrop:true};
	if(this.config.events){for(var C in this.config.events){if(this.config.events[C]===false){this.events[C]=false;}}}this.padding=this.config.padding||[0,0,0,0];
	this.isTarget=(this.config.isTarget!==false);
	this.maintainOffset=(this.config.maintainOffset);
	this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);
	this.dragOnly=((this.config.dragOnly===true)?true:false);},handleOnAvailable:function(){this.available=true;
	this.resetConstraints();
	this.onAvailable();},setPadding:function(E,C,F,D){if(!C&&0!==C){this.padding=[E,E,E,E];}
	else{if(!F&&0!==F){this.padding=[E,C,E,C];}
	else{this.padding=[E,C,F,D];}}},setInitPosition:function(F,E){var G=this.getEl();
	if(!this.DDM.verifyEl(G)){if(G&&G.style&&(G.style.display=="none")){}
	else{}return;}var D=F||0;
	var C=E||0;
	var H=B.getXY(G);
	this.initPageX=H[0]-D;
	this.initPageY=H[1]-C;
	this.lastPageX=H[0];
	this.lastPageY=H[1];
	this.setStartPosition(H);},setStartPosition:function(D){var C=D||B.getXY(this.getEl());
	this.deltaSetXY=null;
	this.startPageX=C[0];
	this.startPageY=C[1];},addToGroup:function(C){this.groups[C]=true;
	this.DDM.regDragDrop(this,C);},removeFromGroup:function(C){if(this.groups[C]){delete this.groups[C];}this.DDM.removeDDFromGroup(this,C);},setDragElId:function(C){this.dragElId=C;},setHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.handleElId=C;
	this.DDM.regHandle(this.id,C);},setOuterHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}A.on(C,"mousedown",this.handleMouseDown,this,true);
	this.setHandleElId(C);
	this.hasOuterHandles=true;},unreg:function(){A.removeListener(this.id,"mousedown",this.handleMouseDown);
	this._domRef=null;
	this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(H,G){var D=H.which||H.button;
	if(this.primaryButtonOnly&&D>1){return;}if(this.isLocked()){return;}var C=this.b4MouseDown(H);
	if(this.events.b4MouseDown){C=this.fireEvent("b4MouseDownEvent",H);}var E=this.onMouseDown(H);
	if(this.events.mouseDown){E=this.fireEvent("mouseDownEvent",H);}if((C===false)||(E===false)){return;}this.DDM.refreshCache(this.groups);
	var F=new YAHOO.util.Point(A.getPageX(H),A.getPageY(H));
	if(!this.hasOuterHandles&&!this.DDM.isOverTarget(F,this)){}
	else{if(this.clickValidator(H)){this.setStartPosition();
	this.DDM.handleMouseDown(H,this);
	this.DDM.stopEvent(H);}
	else{}}},clickValidator:function(D){var C=YAHOO.util.Event.getTarget(D);return(this.isValidHandleChild(C)&&(this.id==this.handleElId||this.DDM.handleWasClicked(C,this.id)));},getTargetCoord:function(E,D){var C=E-this.deltaX;
	var F=D-this.deltaY;
	if(this.constrainX){if(C<this.minX){C=this.minX;}if(C>this.maxX){C=this.maxX;}}if(this.constrainY){if(F<this.minY){F=this.minY;}if(F>this.maxY){F=this.maxY;}}C=this.getTick(C,this.xTicks);F=this.getTick(F,this.yTicks);return{x:C,y:F};},addInvalidHandleType:function(C){var D=C.toUpperCase();
	this.invalidHandleTypes[D]=D;},addInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.invalidHandleIds[C]=C;},addInvalidHandleClass:function(C){this.invalidHandleClasses.push(C);},removeInvalidHandleType:function(C){var D=C.toUpperCase();delete this.invalidHandleTypes[D];},removeInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}delete this.invalidHandleIds[C];},removeInvalidHandleClass:function(D){for(var E=0,C=this.invalidHandleClasses.length;E<C;++E){if(this.invalidHandleClasses[E]==D){delete this.invalidHandleClasses[E];}}},isValidHandleChild:function(F){var E=true;
	var H;try{H=F.nodeName.toUpperCase();}catch(G){H=F.nodeName;}E=E&&!this.invalidHandleTypes[H];E=E&&!this.invalidHandleIds[F.id];for(var D=0,C=this.invalidHandleClasses.length;E&&D<C;++D){E=!B.hasClass(F,this.invalidHandleClasses[D]);}return E;},setXTicks:function(F,C){this.xTicks=[];
	this.xTickSize=C;
	var E={};for(var D=this.initPageX;D>=this.minX;D=D-C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}for(D=this.initPageX;D<=this.maxX;D=D+C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(F,C){this.yTicks=[];
	this.yTickSize=C;
	var E={};for(var D=this.initPageY;D>=this.minY;D=D-C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}for(D=this.initPageY;D<=this.maxY;D=D+C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(E,D,C){this.leftConstraint=parseInt(E,10);
	this.rightConstraint=parseInt(D,10);
	this.minX=this.initPageX-this.leftConstraint;
	this.maxX=this.initPageX+this.rightConstraint;
	if(C){this.setXTicks(this.initPageX,C);}this.constrainX=true;},clearConstraints:function(){this.constrainX=false;
	this.constrainY=false;
	this.clearTicks();},clearTicks:function(){this.xTicks=null;
	this.yTicks=null;
	this.xTickSize=0;
	this.yTickSize=0;},setYConstraint:function(C,E,D){this.topConstraint=parseInt(C,10);
	this.bottomConstraint=parseInt(E,10);
	this.minY=this.initPageY-this.topConstraint;
	this.maxY=this.initPageY+this.bottomConstraint;
	if(D){this.setYTicks(this.initPageY,D);}this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var D=(this.maintainOffset)?this.lastPageX-this.initPageX:0;
	var C=(this.maintainOffset)?this.lastPageY-this.initPageY:0;
	this.setInitPosition(D,C);}
	else{this.setInitPosition();}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(I,F){if(!F){return I;}
	else{if(F[0]>=I){return F[0];}
	else{for(var D=0,C=F.length;D<C;++D){var E=D+1;
	if(F[E]&&F[E]>=I){var H=I-F[D];
	var G=F[E]-I;return(G>H)?F[D]:F[E];}}return F[F.length-1];}}},toString:function(){return("DragDrop "+this.id);}};YAHOO.augment(YAHOO.util.DragDrop,YAHOO.util.EventProvider);})();YAHOO.util.DD=function(C,A,B){if(C){this.init(C,A,B);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(C,B){var A=C-this.startPageX;
	var D=B-this.startPageY;
	this.setDelta(A,D);},setDelta:function(B,A){this.deltaX=B;
	this.deltaY=A;},setDragElPos:function(C,B){var A=this.getDragEl();
	this.alignElWithMouse(A,C,B);},alignElWithMouse:function(C,G,F){var E=this.getTargetCoord(G,F);
	if(!this.deltaSetXY){var H=[E.x,E.y];YAHOO.util.Dom.setXY(C,H);
	var D=parseInt(YAHOO.util.Dom.getStyle(C,"left"),10);
	var B=parseInt(YAHOO.util.Dom.getStyle(C,"top"),10);
	this.deltaSetXY=[D-E.x,B-E.y];}
	else{YAHOO.util.Dom.setStyle(C,"left",(E.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(C,"top",(E.y+this.deltaSetXY[1])+"px");}this.cachePosition(E.x,E.y);
	var A=this;setTimeout(function(){A.autoScroll.call(A,E.x,E.y,C.offsetHeight,C.offsetWidth);},0);},cachePosition:function(B,A){if(B){this.lastPageX=B;
	this.lastPageY=A;}
	else{var C=YAHOO.util.Dom.getXY(this.getEl());
	this.lastPageX=C[0];
	this.lastPageY=C[1];}},autoScroll:function(J,I,E,K){if(this.scroll){var L=this.DDM.getClientHeight();
	var B=this.DDM.getClientWidth();
	var N=this.DDM.getScrollTop();
	var D=this.DDM.getScrollLeft();
	var H=E+I;
	var M=K+J;
	var G=(L+N-I-this.deltaY);
	var F=(B+D-J-this.deltaX);
	var C=40;
	var A=(document.all)?80:30;
	if(H>L&&G<C){window.scrollTo(D,N+A);}if(I<N&&N>0&&I-N<C){window.scrollTo(D,N-A);}if(M>B&&F<C){window.scrollTo(D+A,N);}if(J<D&&D>0&&J-D<C){window.scrollTo(D-A,N);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);
	this.scroll=(this.config.scroll!==false);},b4MouseDown:function(A){this.setStartPosition();
	this.autoOffset(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},b4Drag:function(A){this.setDragElPos(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(C,A,B){if(C){this.init(C,A,B);
	this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var B=this,A=document.body;
	if(!A||!A.firstChild){setTimeout(function(){B.createFrame();},50);return;}var G=this.getDragEl(),E=YAHOO.util.Dom;
	if(!G){G=document.createElement("div");G.id=this.dragElId;
	var D=G.style;D.position="absolute";D.visibility="hidden";D.cursor="move";D.border="2px solid #aaa";D.zIndex=999;D.height="25px";D.width="25px";
	var C=document.createElement("div");E.setStyle(C,"height","100%");E.setStyle(C,"width","100%");E.setStyle(C,"background-color","#ccc");E.setStyle(C,"opacity","0");G.appendChild(C);
	if(YAHOO.env.ua.ie){var F=document.createElement("iframe");F.setAttribute("src","about:blank");F.setAttribute("scrolling","no");F.setAttribute("frameborder","0");G.insertBefore(F,G.firstChild);E.setStyle(F,"height","100%");E.setStyle(F,"width","100%");E.setStyle(F,"position","absolute");E.setStyle(F,"top","0");E.setStyle(F,"left","0");E.setStyle(F,"opacity","0");E.setStyle(F,"zIndex","-1");E.setStyle(F.nextSibling,"zIndex","2");}A.insertBefore(G,A.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);
	this.resizeFrame=(this.config.resizeFrame!==false);
	this.centerFrame=(this.config.centerFrame);
	this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(E,D){var C=this.getEl();
	var A=this.getDragEl();
	var B=A.style;
	this._resizeProxy();
	if(this.centerFrame){this.setDelta(Math.round(parseInt(B.width,10)/2),Math.round(parseInt(B.height,10)/2));}this.setDragElPos(E,D);YAHOO.util.Dom.setStyle(A,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var H=YAHOO.util.Dom;
	var B=this.getEl();
	var C=this.getDragEl();
	var G=parseInt(H.getStyle(C,"borderTopWidth"),10);
	var I=parseInt(H.getStyle(C,"borderRightWidth"),10);
	var F=parseInt(H.getStyle(C,"borderBottomWidth"),10);
	var D=parseInt(H.getStyle(C,"borderLeftWidth"),10);
	if(isNaN(G)){G=0;}if(isNaN(I)){I=0;}if(isNaN(F)){F=0;}if(isNaN(D)){D=0;}var E=Math.max(0,B.offsetWidth-I-D);
	var A=Math.max(0,B.offsetHeight-G-F);H.setStyle(C,"width",E+"px");H.setStyle(C,"height",A+"px");}},b4MouseDown:function(B){this.setStartPosition();
	var A=YAHOO.util.Event.getPageX(B);
	var C=YAHOO.util.Event.getPageY(B);
	this.autoOffset(A,C);},b4StartDrag:function(A,B){this.showFrame(A,B);},b4EndDrag:function(A){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(D){var C=YAHOO.util.Dom;
	var B=this.getEl();
	var A=this.getDragEl();C.setStyle(A,"visibility","");C.setStyle(B,"visibility","hidden");YAHOO.util.DDM.moveToEl(B,A);C.setStyle(A,"visibility","hidden");C.setStyle(B,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(C,A,B){if(C){this.initTarget(C,A,B);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.5.1",build:"984"});(function(){var B=YAHOO.util.Dom,A=YAHOO.util.Event;YAHOO.widget.MenuManager=function(){var N=false,F={},Q={},J={},E={"click":"clickEvent","mousedown":"mouseDownEvent","mouseup":"mouseUpEvent","mouseover":"mouseOverEvent","mouseout":"mouseOutEvent","keydown":"keyDownEvent","keyup":"keyUpEvent","keypress":"keyPressEvent"},K=null;function D(S){var R;
	if(S&&S.tagName){switch(S.tagName.toUpperCase()){case"DIV":R=S.parentNode;
	if((B.hasClass(S,"hd")||B.hasClass(S,"bd")||B.hasClass(S,"ft"))&&R&&R.tagName&&R.tagName.toUpperCase()=="DIV"){return R;}
	else{return S;}break;case"LI":return S;default:R=S.parentNode;
	if(R){return D(R);}break;}}}function G(V){var R=A.getTarget(V),S=D(R),X,T,U,Z,Y;
	if(S){T=S.tagName.toUpperCase();
	if(T=="LI"){U=S.id;
	if(U&&J[U]){Z=J[U];Y=Z.parent;}}
	else{if(T=="DIV"){if(S.id){Y=F[S.id];}}}}if(Y){X=E[V.type];
	if(Z&&!Z.cfg.getProperty("disabled")){Z[X].fire(V);
	if(V.type=="keyup"||V.type=="mousedown"){if(K!=Z){if(K){K.blurEvent.fire();}Z.focusEvent.fire();}}}Y[X].fire(V,Z);}
	else{if(V.type=="mousedown"){if(K){K.blurEvent.fire();K=null;}for(var W in Q){if(YAHOO.lang.hasOwnProperty(Q,W)){Y=Q[W];
	if(Y.cfg.getProperty("clicktohide")&&!(Y instanceof YAHOO.widget.MenuBar)&&Y.cfg.getProperty("position")=="dynamic"){Y.hide();}
	else{Y.clearActiveItem(true);}}}}
	else{if(V.type=="keyup"){if(K){K.blurEvent.fire();K=null;}}}}}function P(S,R,T){if(F[T.id]){this.removeMenu(T);}}function M(S,R){var T=R[0];
	if(T){K=T;}}function H(S,R){K=null;}function C(T,S){var R=S[0],U=this.id;
	if(R){Q[U]=this;}
	else{if(Q[U]){delete Q[U];}}}function L(S,R){O(this);}function O(S){var R=S.id;
	if(R&&J[R]){if(K==S){K=null;}delete J[R];S.destroyEvent.unsubscribe(L);}}function I(S,R){var U=R[0],T;
	if(U instanceof YAHOO.widget.MenuItem){T=U.id;
	if(!J[T]){J[T]=U;U.destroyEvent.subscribe(L);}}}return{addMenu:function(S){var R;
	if(S instanceof YAHOO.widget.Menu&&S.id&&!F[S.id]){F[S.id]=S;
	if(!N){R=document;A.on(R,"mouseover",G,this,true);A.on(R,"mouseout",G,this,true);A.on(R,"mousedown",G,this,true);A.on(R,"mouseup",G,this,true);A.on(R,"click",G,this,true);A.on(R,"keydown",G,this,true);A.on(R,"keyup",G,this,true);A.on(R,"keypress",G,this,true);N=true;}S.cfg.subscribeToConfigEvent("visible",C);S.destroyEvent.subscribe(P,S,this);S.itemAddedEvent.subscribe(I);S.focusEvent.subscribe(M);S.blurEvent.subscribe(H);}},removeMenu:function(U){var S,R,T;
	if(U){S=U.id;
	if(F[S]==U){R=U.getItems();
	if(R&&R.length>0){T=R.length-1;do{O(R[T]);}while(T--);}delete F[S];
	if(Q[S]==U){delete Q[S];}if(U.cfg){U.cfg.unsubscribeFromConfigEvent("visible",C);}U.destroyEvent.unsubscribe(P,U);U.itemAddedEvent.unsubscribe(I);U.focusEvent.unsubscribe(M);U.blurEvent.unsubscribe(H);}}},hideVisible:function(){var R;for(var S in Q){if(YAHOO.lang.hasOwnProperty(Q,S)){R=Q[S];
	if(!(R instanceof YAHOO.widget.MenuBar)&&R.cfg.getProperty("position")=="dynamic"){R.hide();}}}},getVisible:function(){return Q;},getMenus:function(){return F;},getMenu:function(S){var R=F[S];
	if(R){return R;}},getMenuItem:function(R){var S=J[R];
	if(S){return S;}},getMenuItemGroup:function(U){var S=B.get(U),R,W,V,T;
	if(S&&S.tagName&&S.tagName.toUpperCase()=="UL"){W=S.firstChild;
	if(W){R=[];do{T=W.id;
	if(T){V=this.getMenuItem(T);
	if(V){R[R.length]=V;}}}while((W=W.nextSibling));
	if(R.length>0){return R;}}}},getFocusedMenuItem:function(){return K;},getFocusedMenu:function(){if(K){return(K.parent.getRoot());}},toString:function(){return"MenuManager";}};}();})();(function(){YAHOO.widget.Menu=function(O,N){if(N){this.parent=N.parent;
	this.lazyLoad=N.lazyLoad||N.lazyload;
	this.itemData=N.itemData||N.itemdata;}YAHOO.widget.Menu.superclass.constructor.call(this,O,N);};function I(N){if(typeof N=="string"){return("dynamic,static".indexOf((N.toLowerCase()))!=-1);}}var C=YAHOO.util.Dom,M=YAHOO.util.Event,D=YAHOO.widget.Module,B=YAHOO.widget.Overlay,F=YAHOO.widget.Menu,K=YAHOO.widget.MenuManager,L=YAHOO.util.CustomEvent,E=YAHOO.lang,H=YAHOO.env.ua,G,A={"MOUSE_OVER":"mouseover","MOUSE_OUT":"mouseout","MOUSE_DOWN":"mousedown","MOUSE_UP":"mouseup","CLICK":"click","KEY_PRESS":"keypress","KEY_DOWN":"keydown","KEY_UP":"keyup","FOCUS":"focus","BLUR":"blur","ITEM_ADDED":"itemAdded","ITEM_REMOVED":"itemRemoved"},J={"VISIBLE":{key:"visible",value:false,validator:E.isBoolean},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:true,validator:E.isBoolean,supercedes:["iframe","x","y","xy"]},"POSITION":{key:"position",value:"dynamic",validator:I,supercedes:["visible","iframe"]},"SUBMENU_ALIGNMENT":{key:"submenualignment",value:["tl","tr"],suppressEvent:true},"AUTO_SUBMENU_DISPLAY":{key:"autosubmenudisplay",value:true,validator:E.isBoolean,suppressEvent:true},"SHOW_DELAY":{key:"showdelay",value:250,validator:E.isNumber,suppressEvent:true},"HIDE_DELAY":{key:"hidedelay",value:0,validator:E.isNumber,suppressEvent:true},"SUBMENU_HIDE_DELAY":{key:"submenuhidedelay",value:250,validator:E.isNumber,suppressEvent:true},"CLICK_TO_HIDE":{key:"clicktohide",value:true,validator:E.isBoolean,suppressEvent:true},"CONTAINER":{key:"container",suppressEvent:true},"SCROLL_INCREMENT":{key:"scrollincrement",value:1,validator:E.isNumber,supercedes:["maxheight"],suppressEvent:true},"MIN_SCROLL_HEIGHT":{key:"minscrollheight",value:90,validator:E.isNumber,supercedes:["maxheight"],suppressEvent:true},"MAX_HEIGHT":{key:"maxheight",value:0,validator:E.isNumber,supercedes:["iframe"],suppressEvent:true},"CLASS_NAME":{key:"classname",value:null,validator:E.isString,suppressEvent:true},"DISABLED":{key:"disabled",value:false,validator:E.isBoolean,suppressEvent:true}};YAHOO.lang.extend(F,B,{CSS_CLASS_NAME:"yuimenu",ITEM_TYPE:null,GROUP_TITLE_TAG_NAME:"h6",OFF_SCREEN_POSITION:[-10000,-10000],_nHideDelayId:null,_nShowDelayId:null,_nSubmenuHideDelayId:null,_nBodyScrollId:null,_bHideDelayEventHandlersAssigned:false,_bHandledMouseOverEvent:false,_bHandledMouseOutEvent:false,_aGroupTitleElements:null,_aItemGroups:null,_aListElements:null,_nCurrentMouseX:0,_bStopMouseEventHandlers:false,_sClassName:null,lazyLoad:false,itemData:null,activeItem:null,parent:null,srcElement:null,mouseOverEvent:null,mouseOutEvent:null,mouseDownEvent:null,mouseUpEvent:null,clickEvent:null,keyPressEvent:null,keyDownEvent:null,keyUpEvent:null,itemAddedEvent:null,itemRemovedEvent:null,init:function(P,O){this._aItemGroups=[];
	this._aListElements=[];
	this._aGroupTitleElements=[];
	if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.MenuItem;}var N;
	if(typeof P=="string"){N=document.getElementById(P);}
	else{if(P.tagName){N=P;}}if(N&&N.tagName){switch(N.tagName.toUpperCase()){case"DIV":this.srcElement=N;
	if(!N.id){N.setAttribute("id",C.generateId());}F.superclass.init.call(this,N);
	this.beforeInitEvent.fire(F);break;case"SELECT":this.srcElement=N;F.superclass.init.call(this,C.generateId());
	this.beforeInitEvent.fire(F);break;}}
	else{F.superclass.init.call(this,P);
	this.beforeInitEvent.fire(F);}if(this.element){C.addClass(this.element,this.CSS_CLASS_NAME);
	this.initEvent.subscribe(this._onInit);
	this.beforeRenderEvent.subscribe(this._onBeforeRender);
	this.renderEvent.subscribe(this._onRender);
	this.renderEvent.subscribe(this.onRender);
	this.beforeShowEvent.subscribe(this._onBeforeShow);
	this.hideEvent.subscribe(this.positionOffScreen);
	this.showEvent.subscribe(this._onShow);
	this.beforeHideEvent.subscribe(this._onBeforeHide);
	this.mouseOverEvent.subscribe(this._onMouseOver);
	this.mouseOutEvent.subscribe(this._onMouseOut);
	this.clickEvent.subscribe(this._onClick);
	this.keyDownEvent.subscribe(this._onKeyDown);
	this.keyPressEvent.subscribe(this._onKeyPress);
	if(H.gecko||H.webkit){this.cfg.subscribeToConfigEvent("y",this._onYChange);}if(O){this.cfg.applyConfig(O,true);}K.addMenu(this);
	this.initEvent.fire(F);}},_initSubTree:function(){var O=this.srcElement,N,Q,T,U,S,R,P;
	if(O){N=(O.tagName&&O.tagName.toUpperCase());
	if(N=="DIV"){U=this.body.firstChild;
	if(U){Q=0;T=this.GROUP_TITLE_TAG_NAME.toUpperCase();do{if(U&&U.tagName){switch(U.tagName.toUpperCase()){case T:this._aGroupTitleElements[Q]=U;break;case"UL":this._aListElements[Q]=U;
	this._aItemGroups[Q]=[];Q++;break;}}}while((U=U.nextSibling));
	if(this._aListElements[0]){C.addClass(this._aListElements[0],"first-of-type");}}}U=null;
	if(N){switch(N){case"DIV":S=this._aListElements;R=S.length;
	if(R>0){P=R-1;do{U=S[P].firstChild;
	if(U){do{if(U&&U.tagName&&U.tagName.toUpperCase()=="LI"){this.addItem(new this.ITEM_TYPE(U,{parent:this}),P);}}while((U=U.nextSibling));}}while(P--);}break;case"SELECT":U=O.firstChild;do{if(U&&U.tagName){switch(U.tagName.toUpperCase()){case"OPTGROUP":case"OPTION":this.addItem(new this.ITEM_TYPE(U,{parent:this}));break;}}}while((U=U.nextSibling));break;}}}},_getFirstEnabledItem:function(){var N=this.getItems(),Q=N.length,P;for(var O=0;O<Q;O++){P=N[O];
	if(P&&!P.cfg.getProperty("disabled")&&P.element.style.display!="none"){return P;}}},_addItemToGroup:function(S,T,W){var U,X,Q,V,R,O,P;function N(Y,Z){return(Y[Z]||N(Y,(Z+1)));}if(T instanceof this.ITEM_TYPE){U=T;U.parent=this;}
	else{if(typeof T=="string"){U=new this.ITEM_TYPE(T,{parent:this});}
	else{if(typeof T=="object"){T.parent=this;U=new this.ITEM_TYPE(T.text,T);}}}if(U){if(U.cfg.getProperty("selected")){this.activeItem=U;}X=typeof S=="number"?S:0;Q=this._getItemGroup(X);
	if(!Q){Q=this._createItemGroup(X);}if(typeof W=="number"){R=(W>=Q.length);
	if(Q[W]){Q.splice(W,0,U);}
	else{Q[W]=U;}V=Q[W];
	if(V){if(R&&(!V.element.parentNode||V.element.parentNode.nodeType==11)){this._aListElements[X].appendChild(V.element);}
	else{O=N(Q,(W+1));
	if(O&&(!V.element.parentNode||V.element.parentNode.nodeType==11)){this._aListElements[X].insertBefore(V.element,O.element);}}V.parent=this;
	this._subscribeToItemEvents(V);
	this._configureSubmenu(V);
	this._updateItemProperties(X);
	this.itemAddedEvent.fire(V);
	this.changeContentEvent.fire();return V;}}
	else{P=Q.length;Q[P]=U;V=Q[P];
	if(V){if(!C.isAncestor(this._aListElements[X],V.element)){this._aListElements[X].appendChild(V.element);}V.element.setAttribute("groupindex",X);V.element.setAttribute("index",P);V.parent=this;V.index=P;V.groupIndex=X;
	this._subscribeToItemEvents(V);
	this._configureSubmenu(V);
	if(P===0){C.addClass(V.element,"first-of-type");}this.itemAddedEvent.fire(V);
	this.changeContentEvent.fire();return V;}}}},_removeItemFromGroupByIndex:function(Q,O){var P=typeof Q=="number"?Q:0,R=this._getItemGroup(P),T,S,N;
	if(R){T=R.splice(O,1);S=T[0];
	if(S){this._updateItemProperties(P);
	if(R.length===0){N=this._aListElements[P];
	if(this.body&&N){this.body.removeChild(N);}this._aItemGroups.splice(P,1);
	this._aListElements.splice(P,1);N=this._aListElements[0];
	if(N){C.addClass(N,"first-of-type");}}this.itemRemovedEvent.fire(S);
	this.changeContentEvent.fire();return S;}}},_removeItemFromGroupByValue:function(P,N){var R=this._getItemGroup(P),S,Q,O;
	if(R){S=R.length;Q=-1;
	if(S>0){O=S-1;do{if(R[O]==N){Q=O;break;}}while(O--);
	if(Q>-1){return(this._removeItemFromGroupByIndex(P,Q));}}}},_updateItemProperties:function(O){var P=this._getItemGroup(O),S=P.length,R,Q,N;
	if(S>0){N=S-1;do{R=P[N];
	if(R){Q=R.element;R.index=N;R.groupIndex=O;Q.setAttribute("groupindex",O);Q.setAttribute("index",N);C.removeClass(Q,"first-of-type");}}while(N--);
	if(Q){C.addClass(Q,"first-of-type");}}},_createItemGroup:function(O){var N;
	if(!this._aItemGroups[O]){this._aItemGroups[O]=[];N=document.createElement("ul");
	this._aListElements[O]=N;return this._aItemGroups[O];}},_getItemGroup:function(O){var N=((typeof O=="number")?O:0);return this._aItemGroups[N];},_configureSubmenu:function(N){var O=N.cfg.getProperty("submenu");
	if(O){this.cfg.configChangedEvent.subscribe(this._onParentMenuConfigChange,O,true);
	this.renderEvent.subscribe(this._onParentMenuRender,O,true);O.beforeShowEvent.subscribe(this._onSubmenuBeforeShow);}},_subscribeToItemEvents:function(N){N.focusEvent.subscribe(this._onMenuItemFocus);N.blurEvent.subscribe(this._onMenuItemBlur);N.destroyEvent.subscribe(this._onMenuItemDestroy,N,this);N.cfg.configChangedEvent.subscribe(this._onMenuItemConfigChange,N,this);},_onVisibleChange:function(P,O){var N=O[0];
	if(N){C.addClass(this.element,"visible");}
	else{C.removeClass(this.element,"visible");}},_cancelHideDelay:function(){var N=this.getRoot();
	if(N._nHideDelayId){window.clearTimeout(N._nHideDelayId);}},_execHideDelay:function(){this._cancelHideDelay();
	var O=this.getRoot(),P=this;function N(){if(O.activeItem){O.clearActiveItem();}if(O==P&&!(P instanceof YAHOO.widget.MenuBar)&&P.cfg.getProperty("position")=="dynamic"){P.hide();}}O._nHideDelayId=window.setTimeout(N,O.cfg.getProperty("hidedelay"));},_cancelShowDelay:function(){var N=this.getRoot();
	if(N._nShowDelayId){window.clearTimeout(N._nShowDelayId);}},_execShowDelay:function(P){var O=this.getRoot();function N(){if(P.parent.cfg.getProperty("selected")){P.show();}}O._nShowDelayId=window.setTimeout(N,O.cfg.getProperty("showdelay"));},_execSubmenuHideDelay:function(Q,O,N){var P=this;Q._nSubmenuHideDelayId=window.setTimeout(function(){if(P._nCurrentMouseX>(O+10)){Q._nSubmenuHideDelayId=window.setTimeout(function(){Q.hide();},N);}
	else{Q.hide();}},50);},_disableScrollHeader:function(){if(!this._bHeaderDisabled){C.addClass(this.header,"topscrollbar_disabled");
	this._bHeaderDisabled=true;}},_disableScrollFooter:function(){if(!this._bFooterDisabled){C.addClass(this.footer,"bottomscrollbar_disabled");
	this._bFooterDisabled=true;}},_enableScrollHeader:function(){if(this._bHeaderDisabled){C.removeClass(this.header,"topscrollbar_disabled");
	this._bHeaderDisabled=false;}},_enableScrollFooter:function(){if(this._bFooterDisabled){C.removeClass(this.footer,"bottomscrollbar_disabled");
	this._bFooterDisabled=false;}},_onMouseOver:function(W,R){if(this._bStopMouseEventHandlers){return false;}var X=R[0],V=R[1],N=M.getTarget(X),O,Q,U,P,T,S;
	if(!this._bHandledMouseOverEvent&&(N==this.element||C.isAncestor(this.element,N))){this._nCurrentMouseX=0;M.on(this.element,"mousemove",this._onMouseMove,this,true);
	if(!C.isAncestor(V.element,M.getRelatedTarget(X))){this.clearActiveItem();}if(this.parent&&this._nSubmenuHideDelayId){window.clearTimeout(this._nSubmenuHideDelayId);
	this.parent.cfg.setProperty("selected",true);O=this.parent.parent;O._bHandledMouseOutEvent=true;O._bHandledMouseOverEvent=false;}this._bHandledMouseOverEvent=true;
	this._bHandledMouseOutEvent=false;}if(V&&!V.handledMouseOverEvent&&!V.cfg.getProperty("disabled")&&(N==V.element||C.isAncestor(V.element,N))){Q=this.cfg.getProperty("showdelay");U=(Q>0);
	if(U){this._cancelShowDelay();}P=this.activeItem;
	if(P){P.cfg.setProperty("selected",false);}T=V.cfg;T.setProperty("selected",true);
	if(this.hasFocus()){V.focus();}if(this.cfg.getProperty("autosubmenudisplay")){S=T.getProperty("submenu");
	if(S){if(U){this._execShowDelay(S);}
	else{S.show();}}}V.handledMouseOverEvent=true;V.handledMouseOutEvent=false;}},_onMouseOut:function(V,P){if(this._bStopMouseEventHandlers){return false;}var W=P[0],T=P[1],Q=M.getRelatedTarget(W),U=false,S,R,N,O;
	if(T&&!T.cfg.getProperty("disabled")){S=T.cfg;R=S.getProperty("submenu");
	if(R&&(Q==R.element||C.isAncestor(R.element,Q))){U=true;}if(!T.handledMouseOutEvent&&((Q!=T.element&&!C.isAncestor(T.element,Q))||U)){if(!U){T.cfg.setProperty("selected",false);
	if(R){N=this.cfg.getProperty("submenuhidedelay");O=this.cfg.getProperty("showdelay");
	if(!(this instanceof YAHOO.widget.MenuBar)&&N>0&&O>=N){this._execSubmenuHideDelay(R,M.getPageX(W),N);}
	else{R.hide();}}}T.handledMouseOutEvent=true;T.handledMouseOverEvent=false;}}if(!this._bHandledMouseOutEvent&&((Q!=this.element&&!C.isAncestor(this.element,Q))||U)){M.removeListener(this.element,"mousemove",this._onMouseMove);
	this._nCurrentMouseX=M.getPageX(W);
	this._bHandledMouseOutEvent=true;
	this._bHandledMouseOverEvent=false;}},_onMouseMove:function(O,N){if(this._bStopMouseEventHandlers){return false;}this._nCurrentMouseX=M.getPageX(O);},_onClick:function(Y,Q){var W=YAHOO.util.Event,P=YAHOO.util.Dom,Z=Q[0],T=Q[1],R,V=false,O,N,S,U,X;
	if(T){if(T.cfg.getProperty("disabled")){W.preventDefault(Z);}
	else{R=T.cfg.getProperty("submenu");S=T.cfg.getProperty("url");
	if(S){U=S.indexOf("#");X=S.length;
	if(U!=-1){S=S.substr(U,X);X=S.length;
	if(X>1){N=S.substr(1,X);V=P.isAncestor(this.element,N);}
	else{if(X===1){V=true;}}}}if(V&&!T.cfg.getProperty("target")){W.preventDefault(Z);T.focus();}if(!R){O=this.getRoot();
	if(O instanceof YAHOO.widget.MenuBar||O.cfg.getProperty("position")=="static"){O.clearActiveItem();}
	else{O.hide();}}}}},_onKeyDown:function(b,V){var Y=V[0],X=V[1],f=this,U,Z,O,S,c,N,e,R,a,Q,W,d,T;function P(){f._bStopMouseEventHandlers=true;window.setTimeout(function(){f._bStopMouseEventHandlers=false;},10);}if(X&&!X.cfg.getProperty("disabled")){Z=X.cfg;O=this.parent;switch(Y.keyCode){case 38:case 40:c=(Y.keyCode==38)?X.getPreviousEnabledSibling():X.getNextEnabledSibling();
	if(c){this.clearActiveItem();c.cfg.setProperty("selected",true);c.focus();
	if(this.cfg.getProperty("maxheight")>0){N=this.body;e=N.scrollTop;R=N.offsetHeight;a=this.getItems();Q=a.length-1;W=c.element.offsetTop;
	if(Y.keyCode==40){if(W>=(R+e)){N.scrollTop=W-R;}
	else{if(W<=e){N.scrollTop=0;}}if(c==a[Q]){N.scrollTop=c.element.offsetTop;}}
	else{if(W<=e){N.scrollTop=W-c.element.offsetHeight;}
	else{if(W>=(e+R)){N.scrollTop=W;}}if(c==a[0]){N.scrollTop=0;}}e=N.scrollTop;d=N.scrollHeight-N.offsetHeight;
	if(e===0){this._disableScrollHeader();
	this._enableScrollFooter();}
	else{if(e==d){this._enableScrollHeader();
	this._disableScrollFooter();}
	else{this._enableScrollHeader();
	this._enableScrollFooter();}}}}M.preventDefault(Y);P();break;case 39:U=Z.getProperty("submenu");
	if(U){if(!Z.getProperty("selected")){Z.setProperty("selected",true);}U.show();U.setInitialFocus();U.setInitialSelection();}
	else{S=this.getRoot();
	if(S instanceof YAHOO.widget.MenuBar){c=S.activeItem.getNextEnabledSibling();
	if(c){S.clearActiveItem();c.cfg.setProperty("selected",true);U=c.cfg.getProperty("submenu");
	if(U){U.show();}c.focus();}}}M.preventDefault(Y);P();break;case 37:if(O){T=O.parent;
	if(T instanceof YAHOO.widget.MenuBar){c=T.activeItem.getPreviousEnabledSibling();
	if(c){T.clearActiveItem();c.cfg.setProperty("selected",true);U=c.cfg.getProperty("submenu");
	if(U){U.show();}c.focus();}}
	else{this.hide();O.focus();}}M.preventDefault(Y);P();break;}}if(Y.keyCode==27){if(this.cfg.getProperty("position")=="dynamic"){this.hide();
	if(this.parent){this.parent.focus();}}
	else{if(this.activeItem){U=this.activeItem.cfg.getProperty("submenu");
	if(U&&U.cfg.getProperty("visible")){U.hide();
	this.activeItem.focus();}
	else{this.activeItem.blur();
	this.activeItem.cfg.setProperty("selected",false);}}}M.preventDefault(Y);}},_onKeyPress:function(P,O){var N=O[0];
	if(N.keyCode==40||N.keyCode==38){M.preventDefault(N);}},_onYChange:function(O,N){var Q=this.parent,S,P,R;
	if(Q){S=Q.parent.body.scrollTop;
	if(S>0){R=(this.cfg.getProperty("y")-S);C.setY(this.element,R);P=this.iframe;
	if(P){C.setY(P,R);}this.cfg.setProperty("y",R,true);}}},_onScrollTargetMouseOver:function(T,W){this._cancelHideDelay();
	var P=M.getTarget(T),R=this.body,V=this,Q=this.cfg.getProperty("scrollincrement"),N,O;function U(){var X=R.scrollTop;
	if(X<N){R.scrollTop=(X+Q);V._enableScrollHeader();}
	else{R.scrollTop=N;window.clearInterval(V._nBodyScrollId);V._disableScrollFooter();}}function S(){var X=R.scrollTop;
	if(X>0){R.scrollTop=(X-Q);V._enableScrollFooter();}
	else{R.scrollTop=0;window.clearInterval(V._nBodyScrollId);V._disableScrollHeader();}}if(C.hasClass(P,"hd")){O=S;}
	else{N=R.scrollHeight-R.offsetHeight;O=U;}this._nBodyScrollId=window.setInterval(O,10);},_onScrollTargetMouseOut:function(O,N){window.clearInterval(this._nBodyScrollId);
	this._cancelHideDelay();},_onInit:function(O,N){this.cfg.subscribeToConfigEvent("visible",this._onVisibleChange);
	var P=!this.parent,Q=this.lazyLoad;
	if(((P&&!Q)||(P&&(this.cfg.getProperty("visible")||this.cfg.getProperty("position")=="static"))||(!P&&!Q))&&this.getItemGroups().length===0){if(this.srcElement){this._initSubTree();}if(this.itemData){this.addItems(this.itemData);}}
	else{if(Q){this.cfg.fireQueue();}}},_onBeforeRender:function(Q,P){var R=this.element,U=this._aListElements.length,O=true,T=0,N,S;
	if(U>0){do{N=this._aListElements[T];
	if(N){if(O){C.addClass(N,"first-of-type");O=false;}if(!C.isAncestor(R,N)){this.appendToBody(N);}S=this._aGroupTitleElements[T];
	if(S){if(!C.isAncestor(R,S)){N.parentNode.insertBefore(S,N);}C.addClass(N,"hastitle");}}T++;}while(T<U);}},_onRender:function(O,N){if(this.cfg.getProperty("position")=="dynamic"){if(!this.cfg.getProperty("visible")){this.positionOffScreen();}}},_onBeforeShow:function(W,R){var V,O,S,Q,T;
	if(this.lazyLoad&&this.getItemGroups().length===0){if(this.srcElement){this._initSubTree();}if(this.itemData){if(this.parent&&this.parent.parent&&this.parent.parent.srcElement&&this.parent.parent.srcElement.tagName.toUpperCase()=="SELECT"){V=this.itemData.length;for(O=0;O<V;O++){if(this.itemData[O].tagName){this.addItem((new this.ITEM_TYPE(this.itemData[O])));}}}
	else{this.addItems(this.itemData);}}T=this.srcElement;
	if(T){if(T.tagName.toUpperCase()=="SELECT"){if(C.inDocument(T)){this.render(T.parentNode);}
	else{this.render(this.cfg.getProperty("container"));}}
	else{this.render();}}
	else{if(this.parent){this.render(this.parent.element);}
	else{this.render(this.cfg.getProperty("container"));}}}var P=this.cfg.getProperty("maxheight"),N=this.cfg.getProperty("minscrollheight"),U=this.cfg.getProperty("position")=="dynamic";
	if(!this.parent&&U){this.cfg.refireEvent("xy");}function X(){this.cfg.setProperty("maxheight",0);
	this.hideEvent.unsubscribe(X);}if(!(this instanceof YAHOO.widget.MenuBar)&&U){if(P===0){S=C.getViewportHeight();
	if(this.parent&&this.parent.parent instanceof YAHOO.widget.MenuBar){Q=YAHOO.util.Region.getRegion(this.parent.element);S=(S-Q.bottom);}if(this.element.offsetHeight>=S){P=(S-(B.VIEWPORT_OFFSET*2));
	if(P<N){P=N;}this.cfg.setProperty("maxheight",P);
	this.hideEvent.subscribe(X);}}}},_onShow:function(Q,P){var T=this.parent,S,N,O;function R(V){var U;
	if(V.type=="mousedown"||(V.type=="keydown"&&V.keyCode==27)){U=M.getTarget(V);
	if(U!=S.element||!C.isAncestor(S.element,U)){S.cfg.setProperty("autosubmenudisplay",false);M.removeListener(document,"mousedown",R);M.removeListener(document,"keydown",R);}}}if(T){S=T.parent;N=S.cfg.getProperty("submenualignment");O=this.cfg.getProperty("submenualignment");
	if((N[0]!=O[0])&&(N[1]!=O[1])){this.cfg.setProperty("submenualignment",[N[0],N[1]]);}if(!S.cfg.getProperty("autosubmenudisplay")&&(S instanceof YAHOO.widget.MenuBar||S.cfg.getProperty("position")=="static")){S.cfg.setProperty("autosubmenudisplay",true);M.on(document,"mousedown",R);M.on(document,"keydown",R);}}},_onBeforeHide:function(P,O){var N=this.activeItem,R,Q;
	if(N){R=N.cfg;R.setProperty("selected",false);Q=R.getProperty("submenu");
	if(Q){Q.hide();}}if(this.getRoot()==this){this.blur();}},_onParentMenuConfigChange:function(O,N,R){var P=N[0][0],Q=N[0][1];switch(P){case"iframe":case"constraintoviewport":case"hidedelay":case"showdelay":case"submenuhidedelay":case"clicktohide":case"effect":case"classname":case"scrollincrement":case"minscrollheight":R.cfg.setProperty(P,Q);break;}},_onParentMenuRender:function(O,N,S){var P=S.parent.parent.cfg,Q={constraintoviewport:P.getProperty("constraintoviewport"),xy:[0,0],clicktohide:P.getProperty("clicktohide"),effect:P.getProperty("effect"),showdelay:P.getProperty("showdelay"),hidedelay:P.getProperty("hidedelay"),submenuhidedelay:P.getProperty("submenuhidedelay"),classname:P.getProperty("classname"),scrollincrement:P.getProperty("scrollincrement"),minscrollheight:P.getProperty("minscrollheight"),iframe:P.getProperty("iframe")},R;S.cfg.applyConfig(Q);
	if(!this.lazyLoad){R=this.parent.element;
	if(this.element.parentNode==R){this.render();}
	else{this.render(R);}}},_onSubmenuBeforeShow:function(P,O){var Q=this.parent,N=Q.parent.cfg.getProperty("submenualignment");
	if(!this.cfg.getProperty("context")){this.cfg.setProperty("context",[Q.element,N[0],N[1]]);}
	else{this.align();}},_onMenuItemFocus:function(O,N){this.parent.focusEvent.fire(this);},_onMenuItemBlur:function(O,N){this.parent.blurEvent.fire(this);},_onMenuItemDestroy:function(P,O,N){this._removeItemFromGroupByValue(N.groupIndex,N);},_onMenuItemConfigChange:function(P,O,N){var R=O[0][0],S=O[0][1],Q;switch(R){case"selected":if(S===true){this.activeItem=N;}break;case"submenu":Q=O[0][1];
	if(Q){this._configureSubmenu(N);}break;}},enforceConstraints:function(Q,P,W){var j=this.parent,f=B.VIEWPORT_OFFSET,b=this.element,S=this.cfg,T=P[0],R=b.offsetHeight,c=b.offsetWidth,i=C.getViewportWidth(),a=C.getViewportHeight(),Z=(j&&j.parent instanceof YAHOO.widget.MenuBar)?0:f,d=S.getProperty("context"),X=d?d[0]:null,Y,h,O,N,g,e,V,U;
	if(c<i){V=T[0];g=C.getDocumentScrollLeft();h=g+Z;N=g+i-c-Z;
	if(V<f){V=h;}
	else{if((V+c)>i){if(X&&((V-X.offsetWidth)>c)){if(j&&j.parent instanceof YAHOO.widget.MenuBar){V=(V-(c-X.offsetWidth));}
	else{V=(V-(X.offsetWidth+c));}}
	else{V=N;}}}}if(R<a){U=T[1];e=C.getDocumentScrollTop();Y=e+Z;O=e+a-R-Z;
	if(U<f){U=Y;}
	else{if(U>O){if(X&&(U>R)){U=((U+X.offsetHeight)-R);}
	else{U=O;}}}}S.setProperty("x",V,true);S.setProperty("y",U,true);S.setProperty("xy",[V,U],true);},configVisible:function(P,O,Q){var N,R;
	if(this.cfg.getProperty("position")=="dynamic"){F.superclass.configVisible.call(this,P,O,Q);}
	else{N=O[0];R=C.getStyle(this.element,"display");C.setStyle(this.element,"visibility","visible");
	if(N){if(R!="block"){this.beforeShowEvent.fire();C.setStyle(this.element,"display","block");
	this.showEvent.fire();}}
	else{if(R=="block"){this.beforeHideEvent.fire();C.setStyle(this.element,"display","none");
	this.hideEvent.fire();}}}},configPosition:function(P,O,S){var R=this.element,Q=O[0]=="static"?"static":"absolute",T=this.cfg,N;C.setStyle(R,"position",Q);
	if(Q=="static"){C.setStyle(R,"display","block");T.setProperty("visible",true);}
	else{C.setStyle(R,"visibility","hidden");}if(Q=="absolute"){N=T.getProperty("zindex");
	if(!N||N===0){N=this.parent?(this.parent.parent.cfg.getProperty("zindex")+1):1;T.setProperty("zindex",N);}}},configIframe:function(O,N,P){if(this.cfg.getProperty("position")=="dynamic"){F.superclass.configIframe.call(this,O,N,P);}},configHideDelay:function(O,N,R){var T=N[0],S=this.mouseOutEvent,P=this.mouseOverEvent,Q=this.keyDownEvent;
	if(T>0){if(!this._bHideDelayEventHandlersAssigned){S.subscribe(this._execHideDelay);P.subscribe(this._cancelHideDelay);Q.subscribe(this._cancelHideDelay);
	this._bHideDelayEventHandlersAssigned=true;}}
	else{S.unsubscribe(this._execHideDelay);P.unsubscribe(this._cancelHideDelay);Q.unsubscribe(this._cancelHideDelay);
	this._bHideDelayEventHandlersAssigned=false;}},configContainer:function(O,N,Q){var P=N[0];
	if(typeof P=="string"){this.cfg.setProperty("container",document.getElementById(P),true);}},_setMaxHeight:function(O,N,P){this.cfg.setProperty("maxheight",P);
	this.renderEvent.unsubscribe(this._setMaxHeight);},configMaxHeight:function(a,U,X){var T=U[0],Q=this.element,R=this.body,Y=this.header,O=this.footer,W=this._onScrollTargetMouseOver,b=this._onScrollTargetMouseOut,N=this.cfg.getProperty("minscrollheight"),V,S,P;
	if(T!==0&&T<N){T=N;}if(this.lazyLoad&&!R){this.renderEvent.unsubscribe(this._setMaxHeight);
	if(T>0){this.renderEvent.subscribe(this._setMaxHeight,T,this);}return;}C.setStyle(R,"height","");C.removeClass(R,"yui-menu-body-scrolled");
	var Z=((H.gecko&&this.parent&&this.parent.parent&&this.parent.parent.cfg.getProperty("position")=="dynamic")||H.ie);
	if(Z){if(!this.cfg.getProperty("width")){S=Q.offsetWidth;Q.style.width=S+"px";P=(S-(Q.offsetWidth-S))+"px";
	this.cfg.setProperty("width",P);}}if(!Y&&!O){this.setHeader("&#32;");
	this.setFooter("&#32;");Y=this.header;O=this.footer;C.addClass(Y,"topscrollbar");C.addClass(O,"bottomscrollbar");Q.insertBefore(Y,R);Q.appendChild(O);}V=(T-(Y.offsetHeight+Y.offsetHeight));
	if(V>0&&(R.offsetHeight>T)){C.addClass(R,"yui-menu-body-scrolled");C.setStyle(R,"height",(V+"px"));M.on(Y,"mouseover",W,this,true);M.on(Y,"mouseout",b,this,true);M.on(O,"mouseover",W,this,true);M.on(O,"mouseout",b,this,true);
	this._disableScrollHeader();
	this._enableScrollFooter();}
	else{if(Y&&O){if(Z){this.cfg.setProperty("width","");}this._enableScrollHeader();
	this._enableScrollFooter();M.removeListener(Y,"mouseover",W);M.removeListener(Y,"mouseout",b);M.removeListener(O,"mouseover",W);M.removeListener(O,"mouseout",b);Q.removeChild(Y);Q.removeChild(O);
	this.header=null;
	this.footer=null;}}this.cfg.refireEvent("iframe");},configClassName:function(P,O,Q){var N=O[0];
	if(this._sClassName){C.removeClass(this.element,this._sClassName);}C.addClass(this.element,N);
	this._sClassName=N;},_onItemAdded:function(O,N){var P=N[0];
	if(P){P.cfg.setProperty("disabled",true);}},configDisabled:function(P,O,S){var R=O[0],N=this.getItems(),T,Q;
	if(E.isArray(N)){T=N.length;
	if(T>0){Q=T-1;do{N[Q].cfg.setProperty("disabled",R);}while(Q--);}if(R){this.clearActiveItem(true);C.addClass(this.element,"disabled");
	this.itemAddedEvent.subscribe(this._onItemAdded);}
	else{C.removeClass(this.element,"disabled");
	this.itemAddedEvent.unsubscribe(this._onItemAdded);}}},onRender:function(R,Q){function S(){var W=this.element,V=this._shadow;
	if(V&&W){V.style.width=(W.offsetWidth+6)+"px";V.style.height=(W.offsetHeight+1)+"px";}}function U(){this.element.appendChild(this._shadow);}function O(){C.addClass(this._shadow,"yui-menu-shadow-visible");}function N(){C.removeClass(this._shadow,"yui-menu-shadow-visible");}function T(){var W=this._shadow,V,X;
	if(!W){V=this.element;X=this;
	if(!G){G=document.createElement("div");G.className="yui-menu-shadow yui-menu-shadow-visible";}W=G.cloneNode(false);V.appendChild(W);
	this._shadow=W;
	this.beforeShowEvent.subscribe(O);
	this.beforeHideEvent.subscribe(N);
	if(H.ie){window.setTimeout(function(){S.call(X);X.syncIframe();},0);
	this.cfg.subscribeToConfigEvent("width",S);
	this.cfg.subscribeToConfigEvent("height",S);
	this.cfg.subscribeToConfigEvent("maxheight",S);
	this.changeContentEvent.subscribe(S);D.textResizeEvent.subscribe(S,X,true);
	this.destroyEvent.subscribe(function(){D.textResizeEvent.unsubscribe(S,X);});}this.cfg.subscribeToConfigEvent("maxheight",U);}}function P(){T.call(this);
	this.beforeShowEvent.unsubscribe(P);}if(this.cfg.getProperty("position")=="dynamic"){if(this.cfg.getProperty("visible")){T.call(this);}
	else{this.beforeShowEvent.subscribe(P);}}},initEvents:function(){F.superclass.initEvents.call(this);
	var N=L.LIST;
	this.mouseOverEvent=this.createEvent(A.MOUSE_OVER);
	this.mouseOverEvent.signature=N;
	this.mouseOutEvent=this.createEvent(A.MOUSE_OUT);
	this.mouseOutEvent.signature=N;
	this.mouseDownEvent=this.createEvent(A.MOUSE_DOWN);
	this.mouseDownEvent.signature=N;
	this.mouseUpEvent=this.createEvent(A.MOUSE_UP);
	this.mouseUpEvent.signature=N;
	this.clickEvent=this.createEvent(A.CLICK);
	this.clickEvent.signature=N;
	this.keyPressEvent=this.createEvent(A.KEY_PRESS);
	this.keyPressEvent.signature=N;
	this.keyDownEvent=this.createEvent(A.KEY_DOWN);
	this.keyDownEvent.signature=N;
	this.keyUpEvent=this.createEvent(A.KEY_UP);
	this.keyUpEvent.signature=N;
	this.focusEvent=this.createEvent(A.FOCUS);
	this.focusEvent.signature=N;
	this.blurEvent=this.createEvent(A.BLUR);
	this.blurEvent.signature=N;
	this.itemAddedEvent=this.createEvent(A.ITEM_ADDED);
	this.itemAddedEvent.signature=N;
	this.itemRemovedEvent=this.createEvent(A.ITEM_REMOVED);
	this.itemRemovedEvent.signature=N;},positionOffScreen:function(){var O=this.iframe,N=this.OFF_SCREEN_POSITION;C.setXY(this.element,N);
	if(O){C.setXY(O,N);}},getRoot:function(){var O=this.parent,N;
	if(O){N=O.parent;return N?N.getRoot():this;}
	else{return this;}},toString:function(){var O="Menu",N=this.id;
	if(N){O+=(" "+N);}return O;},setItemGroupTitle:function(S,R){var Q,P,O,N;
	if(typeof S=="string"&&S.length>0){Q=typeof R=="number"?R:0;P=this._aGroupTitleElements[Q];
	if(P){P.innerHTML=S;}
	else{P=document.createElement(this.GROUP_TITLE_TAG_NAME);P.innerHTML=S;
	this._aGroupTitleElements[Q]=P;}O=this._aGroupTitleElements.length-1;do{if(this._aGroupTitleElements[O]){C.removeClass(this._aGroupTitleElements[O],"first-of-type");N=O;}}while(O--);
	if(N!==null){C.addClass(this._aGroupTitleElements[N],"first-of-type");}this.changeContentEvent.fire();}},addItem:function(N,O){if(N){return this._addItemToGroup(O,N);}},addItems:function(Q,P){var S,N,R,O;
	if(E.isArray(Q)){S=Q.length;N=[];for(O=0;O<S;O++){R=Q[O];
	if(R){if(E.isArray(R)){N[N.length]=this.addItems(R,O);}
	else{N[N.length]=this._addItemToGroup(P,R);}}}if(N.length){return N;}}},insertItem:function(N,O,P){if(N){return this._addItemToGroup(P,N,O);}},removeItem:function(N,O){var P;
	if(typeof N!="undefined"){if(N instanceof YAHOO.widget.MenuItem){P=this._removeItemFromGroupByValue(O,N);}
	else{if(typeof N=="number"){P=this._removeItemFromGroupByIndex(O,N);}}if(P){P.destroy();return P;}}},getItems:function(){var P=this._aItemGroups,O,N=[];
	if(E.isArray(P)){O=P.length;return((O==1)?P[0]:(Array.prototype.concat.apply(N,P)));}},getItemGroups:function(){return this._aItemGroups;},getItem:function(N,O){var P;
	if(typeof N=="number"){P=this._getItemGroup(O);
	if(P){return P[N];}}},getSubmenus:function(){var O=this.getItems(),S=O.length,N,P,R,Q;
	if(S>0){N=[];for(Q=0;Q<S;Q++){R=O[Q];
	if(R){P=R.cfg.getProperty("submenu");
	if(P){N[N.length]=P;}}}}return N;},clearContent:function(){var R=this.getItems(),O=R.length,P=this.element,Q=this.body,V=this.header,N=this.footer,U,T,S;
	if(O>0){S=O-1;do{U=R[S];
	if(U){T=U.cfg.getProperty("submenu");
	if(T){this.cfg.configChangedEvent.unsubscribe(this._onParentMenuConfigChange,T);
	this.renderEvent.unsubscribe(this._onParentMenuRender,T);}this.removeItem(U);}}while(S--);}if(V){M.purgeElement(V);P.removeChild(V);}if(N){M.purgeElement(N);P.removeChild(N);}if(Q){M.purgeElement(Q);Q.innerHTML="";}this.activeItem=null;
	this._aItemGroups=[];
	this._aListElements=[];
	this._aGroupTitleElements=[];
	this.cfg.setProperty("width",null);},destroy:function(){this.clearContent();
	this._aItemGroups=null;
	this._aListElements=null;
	this._aGroupTitleElements=null;F.superclass.destroy.call(this);},setInitialFocus:function(){var N=this._getFirstEnabledItem();
	if(N){N.focus();}},setInitialSelection:function(){var N=this._getFirstEnabledItem();
	if(N){N.cfg.setProperty("selected",true);}},clearActiveItem:function(P){if(this.cfg.getProperty("showdelay")>0){this._cancelShowDelay();}var N=this.activeItem,Q,O;
	if(N){Q=N.cfg;
	if(P){N.blur();}Q.setProperty("selected",false);O=Q.getProperty("submenu");
	if(O){O.hide();}this.activeItem=null;}},focus:function(){if(!this.hasFocus()){this.setInitialFocus();}},blur:function(){var N;
	if(this.hasFocus()){N=K.getFocusedMenuItem();
	if(N){N.blur();}}},hasFocus:function(){return(K.getFocusedMenu()==this.getRoot());},subscribe:function(){function Q(V,U,X){var Y=U[0],W=Y.cfg.getProperty("submenu");
	if(W){W.subscribe.apply(W,X);}}function T(V,U,X){var W=this.cfg.getProperty("submenu");
	if(W){W.subscribe.apply(W,X);}}F.superclass.subscribe.apply(this,arguments);F.superclass.subscribe.call(this,"itemAdded",Q,arguments);
	var N=this.getItems(),S,R,O,P;
	if(N){S=N.length;
	if(S>0){P=S-1;do{R=N[P];O=R.cfg.getProperty("submenu");
	if(O){O.subscribe.apply(O,arguments);}
	else{R.cfg.subscribeToConfigEvent("submenu",T,arguments);}}while(P--);}}},initDefaultConfig:function(){F.superclass.initDefaultConfig.call(this);
	var N=this.cfg;N.addProperty(J.VISIBLE.key,{handler:this.configVisible,value:J.VISIBLE.value,validator:J.VISIBLE.validator});N.addProperty(J.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:J.CONSTRAIN_TO_VIEWPORT.value,validator:J.CONSTRAIN_TO_VIEWPORT.validator,supercedes:J.CONSTRAIN_TO_VIEWPORT.supercedes});N.addProperty(J.POSITION.key,{handler:this.configPosition,value:J.POSITION.value,validator:J.POSITION.validator,supercedes:J.POSITION.supercedes});N.addProperty(J.SUBMENU_ALIGNMENT.key,{value:J.SUBMENU_ALIGNMENT.value,suppressEvent:J.SUBMENU_ALIGNMENT.suppressEvent});N.addProperty(J.AUTO_SUBMENU_DISPLAY.key,{value:J.AUTO_SUBMENU_DISPLAY.value,validator:J.AUTO_SUBMENU_DISPLAY.validator,suppressEvent:J.AUTO_SUBMENU_DISPLAY.suppressEvent});N.addProperty(J.SHOW_DELAY.key,{value:J.SHOW_DELAY.value,validator:J.SHOW_DELAY.validator,suppressEvent:J.SHOW_DELAY.suppressEvent});N.addProperty(J.HIDE_DELAY.key,{handler:this.configHideDelay,value:J.HIDE_DELAY.value,validator:J.HIDE_DELAY.validator,suppressEvent:J.HIDE_DELAY.suppressEvent});N.addProperty(J.SUBMENU_HIDE_DELAY.key,{value:J.SUBMENU_HIDE_DELAY.value,validator:J.SUBMENU_HIDE_DELAY.validator,suppressEvent:J.SUBMENU_HIDE_DELAY.suppressEvent});N.addProperty(J.CLICK_TO_HIDE.key,{value:J.CLICK_TO_HIDE.value,validator:J.CLICK_TO_HIDE.validator,suppressEvent:J.CLICK_TO_HIDE.suppressEvent});N.addProperty(J.CONTAINER.key,{handler:this.configContainer,value:document.body,suppressEvent:J.CONTAINER.suppressEvent});N.addProperty(J.SCROLL_INCREMENT.key,{value:J.SCROLL_INCREMENT.value,validator:J.SCROLL_INCREMENT.validator,supercedes:J.SCROLL_INCREMENT.supercedes,suppressEvent:J.SCROLL_INCREMENT.suppressEvent});N.addProperty(J.MIN_SCROLL_HEIGHT.key,{value:J.MIN_SCROLL_HEIGHT.value,validator:J.MIN_SCROLL_HEIGHT.validator,supercedes:J.MIN_SCROLL_HEIGHT.supercedes,suppressEvent:J.MIN_SCROLL_HEIGHT.suppressEvent});N.addProperty(J.MAX_HEIGHT.key,{handler:this.configMaxHeight,value:J.MAX_HEIGHT.value,validator:J.MAX_HEIGHT.validator,suppressEvent:J.MAX_HEIGHT.suppressEvent,supercedes:J.MAX_HEIGHT.supercedes});N.addProperty(J.CLASS_NAME.key,{handler:this.configClassName,value:J.CLASS_NAME.value,validator:J.CLASS_NAME.validator,supercedes:J.CLASS_NAME.supercedes});N.addProperty(J.DISABLED.key,{handler:this.configDisabled,value:J.DISABLED.value,validator:J.DISABLED.validator,suppressEvent:J.DISABLED.suppressEvent});}});})();(function(){YAHOO.widget.MenuItem=function(K,J){if(K){if(J){this.parent=J.parent;
	this.value=J.value;
	this.id=J.id;}this.init(K,J);}};
	var B=YAHOO.util.Dom,C=YAHOO.widget.Module,E=YAHOO.widget.Menu,H=YAHOO.widget.MenuItem,I=YAHOO.util.CustomEvent,F=YAHOO.lang,D,A={"MOUSE_OVER":"mouseover","MOUSE_OUT":"mouseout","MOUSE_DOWN":"mousedown","MOUSE_UP":"mouseup","CLICK":"click","KEY_PRESS":"keypress","KEY_DOWN":"keydown","KEY_UP":"keyup","ITEM_ADDED":"itemAdded","ITEM_REMOVED":"itemRemoved","FOCUS":"focus","BLUR":"blur","DESTROY":"destroy"},G={"TEXT":{key:"text",value:"",validator:F.isString,suppressEvent:true},"HELP_TEXT":{key:"helptext",supercedes:["text"],suppressEvent:true},"URL":{key:"url",value:"#",suppressEvent:true},"TARGET":{key:"target",suppressEvent:true},"EMPHASIS":{key:"emphasis",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text"]},"STRONG_EMPHASIS":{key:"strongemphasis",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text"]},"CHECKED":{key:"checked",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["disabled","selected"]},"SUBMENU":{key:"submenu",suppressEvent:true,supercedes:["disabled","selected"]},"DISABLED":{key:"disabled",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text","selected"]},"SELECTED":{key:"selected",value:false,validator:F.isBoolean,suppressEvent:true},"ONCLICK":{key:"onclick",suppressEvent:true},"CLASS_NAME":{key:"classname",value:null,validator:F.isString,suppressEvent:true}};H.prototype={CSS_CLASS_NAME:"yuimenuitem",CSS_LABEL_CLASS_NAME:"yuimenuitemlabel",SUBMENU_TYPE:null,_oAnchor:null,_oHelpTextEM:null,_oSubmenu:null,_oOnclickAttributeValue:null,_sClassName:null,constructor:H,index:null,groupIndex:null,parent:null,element:null,srcElement:null,value:null,browser:C.prototype.browser,id:null,destroyEvent:null,mouseOverEvent:null,mouseOutEvent:null,mouseDownEvent:null,mouseUpEvent:null,clickEvent:null,keyPressEvent:null,keyDownEvent:null,keyUpEvent:null,focusEvent:null,blurEvent:null,init:function(J,R){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=E;}this.cfg=new YAHOO.util.Config(this);
	this.initDefaultConfig();
	var O=I.LIST,N=this.cfg,P="#",Q,K,M,L;
	if(F.isString(J)){this._createRootNodeStructure();N.queueProperty("text",J);}
	else{if(J&&J.tagName){switch(J.tagName.toUpperCase()){case"OPTION":this._createRootNodeStructure();N.queueProperty("text",J.text);N.queueProperty("disabled",J.disabled);
	this.value=J.value;
	this.srcElement=J;break;case"OPTGROUP":this._createRootNodeStructure();N.queueProperty("text",J.label);N.queueProperty("disabled",J.disabled);
	this.srcElement=J;
	this._initSubTree();break;case"LI":Q=B.getFirstChild(J);
	if(Q){P=Q.getAttribute("href");K=Q.getAttribute("target");M=Q.innerHTML;}this.srcElement=J;
	this.element=J;
	this._oAnchor=Q;N.setProperty("text",M,true);N.setProperty("url",P,true);N.setProperty("target",K,true);
	this._initSubTree();break;}}}if(this.element){L=(this.srcElement||this.element).id;
	if(!L){L=this.id||B.generateId();
	this.element.id=L;}this.id=L;B.addClass(this.element,this.CSS_CLASS_NAME);B.addClass(this._oAnchor,this.CSS_LABEL_CLASS_NAME);
	this.mouseOverEvent=this.createEvent(A.MOUSE_OVER);
	this.mouseOverEvent.signature=O;
	this.mouseOutEvent=this.createEvent(A.MOUSE_OUT);
	this.mouseOutEvent.signature=O;
	this.mouseDownEvent=this.createEvent(A.MOUSE_DOWN);
	this.mouseDownEvent.signature=O;
	this.mouseUpEvent=this.createEvent(A.MOUSE_UP);
	this.mouseUpEvent.signature=O;
	this.clickEvent=this.createEvent(A.CLICK);
	this.clickEvent.signature=O;
	this.keyPressEvent=this.createEvent(A.KEY_PRESS);
	this.keyPressEvent.signature=O;
	this.keyDownEvent=this.createEvent(A.KEY_DOWN);
	this.keyDownEvent.signature=O;
	this.keyUpEvent=this.createEvent(A.KEY_UP);
	this.keyUpEvent.signature=O;
	this.focusEvent=this.createEvent(A.FOCUS);
	this.focusEvent.signature=O;
	this.blurEvent=this.createEvent(A.BLUR);
	this.blurEvent.signature=O;
	this.destroyEvent=this.createEvent(A.DESTROY);
	this.destroyEvent.signature=O;
	if(R){N.applyConfig(R);}N.fireQueue();}},_createRootNodeStructure:function(){var J,K;
	if(!D){D=document.createElement("li");D.innerHTML="<a href=\"#\"></a>";}J=D.cloneNode(true);J.className=this.CSS_CLASS_NAME;K=J.firstChild;K.className=this.CSS_LABEL_CLASS_NAME;
	this.element=J;
	this._oAnchor=K;},_initSubTree:function(){var P=this.srcElement,L=this.cfg,N,M,K,J,O;
	if(P.childNodes.length>0){if(this.parent.lazyLoad&&this.parent.srcElement&&this.parent.srcElement.tagName.toUpperCase()=="SELECT"){L.setProperty("submenu",{id:B.generateId(),itemdata:P.childNodes});}
	else{N=P.firstChild;M=[];do{if(N&&N.tagName){switch(N.tagName.toUpperCase()){case"DIV":L.setProperty("submenu",N);break;case"OPTION":M[M.length]=N;break;}}}while((N=N.nextSibling));K=M.length;
	if(K>0){J=new this.SUBMENU_TYPE(B.generateId());L.setProperty("submenu",J);for(O=0;O<K;O++){J.addItem((new J.ITEM_TYPE(M[O])));}}}}},configText:function(S,L,N){var K=L[0],M=this.cfg,Q=this._oAnchor,J=M.getProperty("helptext"),R="",O="",P="";
	if(K){if(J){R="<em class=\"helptext\">"+J+"</em>";}if(M.getProperty("emphasis")){O="<em>";P="</em>";}if(M.getProperty("strongemphasis")){O="<strong>";P="</strong>";}Q.innerHTML=(O+K+P+R);}},configHelpText:function(L,K,J){this.cfg.refireEvent("text");},configURL:function(L,K,J){var N=K[0];
	if(!N){N="#";}var M=this._oAnchor;
	if(YAHOO.env.ua.opera){M.removeAttribute("href");}M.setAttribute("href",N);},configTarget:function(M,L,K){var J=L[0],N=this._oAnchor;
	if(J&&J.length>0){N.setAttribute("target",J);}
	else{N.removeAttribute("target");}},configEmphasis:function(L,K,J){var N=K[0],M=this.cfg;
	if(N&&M.getProperty("strongemphasis")){M.setProperty("strongemphasis",false);}M.refireEvent("text");},configStrongEmphasis:function(M,L,K){var J=L[0],N=this.cfg;
	if(J&&N.getProperty("emphasis")){N.setProperty("emphasis",false);}N.refireEvent("text");},configChecked:function(S,M,O){var R=M[0],K=this.element,Q=this._oAnchor,N=this.cfg,J="-checked",L=this.CSS_CLASS_NAME+J,P=this.CSS_LABEL_CLASS_NAME+J;
	if(R){B.addClass(K,L);B.addClass(Q,P);}
	else{B.removeClass(K,L);B.removeClass(Q,P);}N.refireEvent("text");
	if(N.getProperty("disabled")){N.refireEvent("disabled");}if(N.getProperty("selected")){N.refireEvent("selected");}},configDisabled:function(X,R,a){var Z=R[0],L=this.cfg,P=L.getProperty("submenu"),O=L.getProperty("checked"),S=this.element,V=this._oAnchor,U="-disabled",W="-checked"+U,Y="-hassubmenu"+U,M=this.CSS_CLASS_NAME+U,N=this.CSS_LABEL_CLASS_NAME+U,T=this.CSS_CLASS_NAME+W,Q=this.CSS_LABEL_CLASS_NAME+W,K=this.CSS_CLASS_NAME+Y,J=this.CSS_LABEL_CLASS_NAME+Y;
	if(Z){if(L.getProperty("selected")){L.setProperty("selected",false);}B.addClass(S,M);B.addClass(V,N);
	if(P){B.addClass(S,K);B.addClass(V,J);}if(O){B.addClass(S,T);B.addClass(V,Q);}}
	else{B.removeClass(S,M);B.removeClass(V,N);
	if(P){B.removeClass(S,K);B.removeClass(V,J);}if(O){B.removeClass(S,T);B.removeClass(V,Q);}}},configSelected:function(X,R,a){var L=this.cfg,Y=R[0],S=this.element,V=this._oAnchor,O=L.getProperty("checked"),P=L.getProperty("submenu"),U="-selected",W="-checked"+U,Z="-hassubmenu"+U,M=this.CSS_CLASS_NAME+U,N=this.CSS_LABEL_CLASS_NAME+U,T=this.CSS_CLASS_NAME+W,Q=this.CSS_LABEL_CLASS_NAME+W,K=this.CSS_CLASS_NAME+Z,J=this.CSS_LABEL_CLASS_NAME+Z;
	if(YAHOO.env.ua.opera){V.blur();}if(Y&&!L.getProperty("disabled")){B.addClass(S,M);B.addClass(V,N);
	if(P){B.addClass(S,K);B.addClass(V,J);}if(O){B.addClass(S,T);B.addClass(V,Q);}}
	else{B.removeClass(S,M);B.removeClass(V,N);
	if(P){B.removeClass(S,K);B.removeClass(V,J);}if(O){B.removeClass(S,T);B.removeClass(V,Q);}}if(this.hasFocus()&&YAHOO.env.ua.opera){V.focus();}},_onSubmenuBeforeHide:function(M,L){var N=this.parent,J;function K(){N._oAnchor.blur();J.beforeHideEvent.unsubscribe(K);}if(N.hasFocus()){J=N.parent;J.beforeHideEvent.subscribe(K);}},configSubmenu:function(V,O,R){var Q=O[0],P=this.cfg,K=this.element,T=this._oAnchor,N=this.parent&&this.parent.lazyLoad,J="-hassubmenu",L=this.CSS_CLASS_NAME+J,S=this.CSS_LABEL_CLASS_NAME+J,U,W,M;
	if(Q){if(Q instanceof E){U=Q;U.parent=this;U.lazyLoad=N;}
	else{if(typeof Q=="object"&&Q.id&&!Q.nodeType){W=Q.id;M=Q;M.lazyload=N;M.parent=this;U=new this.SUBMENU_TYPE(W,M);P.setProperty("submenu",U,true);}
	else{U=new this.SUBMENU_TYPE(Q,{lazyload:N,parent:this});P.setProperty("submenu",U,true);}}if(U){B.addClass(K,L);B.addClass(T,S);
	this._oSubmenu=U;
	if(YAHOO.env.ua.opera){U.beforeHideEvent.subscribe(this._onSubmenuBeforeHide);}}}
	else{B.removeClass(K,L);B.removeClass(T,S);
	if(this._oSubmenu){this._oSubmenu.destroy();}}if(P.getProperty("disabled")){P.refireEvent("disabled");}if(P.getProperty("selected")){P.refireEvent("selected");}},configOnClick:function(L,K,J){var M=K[0];
	if(this._oOnclickAttributeValue&&(this._oOnclickAttributeValue!=M)){this.clickEvent.unsubscribe(this._oOnclickAttributeValue.fn,this._oOnclickAttributeValue.obj);
	this._oOnclickAttributeValue=null;}if(!this._oOnclickAttributeValue&&typeof M=="object"&&typeof M.fn=="function"){this.clickEvent.subscribe(M.fn,((!YAHOO.lang.isUndefined(M.obj))?M.obj:this),M.scope);
	this._oOnclickAttributeValue=M;}},configClassName:function(M,L,K){var J=L[0];
	if(this._sClassName){B.removeClass(this.element,this._sClassName);}B.addClass(this.element,J);
	this._sClassName=J;},initDefaultConfig:function(){var J=this.cfg;J.addProperty(G.TEXT.key,{handler:this.configText,value:G.TEXT.value,validator:G.TEXT.validator,suppressEvent:G.TEXT.suppressEvent});J.addProperty(G.HELP_TEXT.key,{handler:this.configHelpText,supercedes:G.HELP_TEXT.supercedes,suppressEvent:G.HELP_TEXT.suppressEvent});J.addProperty(G.URL.key,{handler:this.configURL,value:G.URL.value,suppressEvent:G.URL.suppressEvent});J.addProperty(G.TARGET.key,{handler:this.configTarget,suppressEvent:G.TARGET.suppressEvent});J.addProperty(G.EMPHASIS.key,{handler:this.configEmphasis,value:G.EMPHASIS.value,validator:G.EMPHASIS.validator,suppressEvent:G.EMPHASIS.suppressEvent,supercedes:G.EMPHASIS.supercedes});J.addProperty(G.STRONG_EMPHASIS.key,{handler:this.configStrongEmphasis,value:G.STRONG_EMPHASIS.value,validator:G.STRONG_EMPHASIS.validator,suppressEvent:G.STRONG_EMPHASIS.suppressEvent,supercedes:G.STRONG_EMPHASIS.supercedes});J.addProperty(G.CHECKED.key,{handler:this.configChecked,value:G.CHECKED.value,validator:G.CHECKED.validator,suppressEvent:G.CHECKED.suppressEvent,supercedes:G.CHECKED.supercedes});J.addProperty(G.DISABLED.key,{handler:this.configDisabled,value:G.DISABLED.value,validator:G.DISABLED.validator,suppressEvent:G.DISABLED.suppressEvent});J.addProperty(G.SELECTED.key,{handler:this.configSelected,value:G.SELECTED.value,validator:G.SELECTED.validator,suppressEvent:G.SELECTED.suppressEvent});J.addProperty(G.SUBMENU.key,{handler:this.configSubmenu,supercedes:G.SUBMENU.supercedes,suppressEvent:G.SUBMENU.suppressEvent});J.addProperty(G.ONCLICK.key,{handler:this.configOnClick,suppressEvent:G.ONCLICK.suppressEvent});J.addProperty(G.CLASS_NAME.key,{handler:this.configClassName,value:G.CLASS_NAME.value,validator:G.CLASS_NAME.validator,suppressEvent:G.CLASS_NAME.suppressEvent});},getNextEnabledSibling:function(){var L,O,J,N,M;function K(P,Q){return P[Q]||K(P,(Q+1));}if(this.parent instanceof E){L=this.groupIndex;O=this.parent.getItemGroups();
	if(this.index<(O[L].length-1)){J=K(O[L],(this.index+1));}
	else{if(L<(O.length-1)){N=L+1;}
	else{N=0;}M=K(O,N);J=K(M,0);}return(J.cfg.getProperty("disabled")||J.element.style.display=="none")?J.getNextEnabledSibling():J;}},getPreviousEnabledSibling:function(){var N,P,K,J,M;function O(Q,R){return Q[R]||O(Q,(R-1));}function L(Q,R){return Q[R]?R:L(Q,(R+1));}if(this.parent instanceof E){N=this.groupIndex;P=this.parent.getItemGroups();
	if(this.index>L(P[N],0)){K=O(P[N],(this.index-1));}
	else{if(N>L(P,0)){J=N-1;}
	else{J=P.length-1;}M=O(P,J);K=O(M,(M.length-1));}return(K.cfg.getProperty("disabled")||K.element.style.display=="none")?K.getPreviousEnabledSibling():K;}},focus:function(){var N=this.parent,M=this._oAnchor,J=N.activeItem,L=this;function K(){try{if(YAHOO.env.ua.ie&&!document.hasFocus()){return;}if(J){J.blurEvent.fire();}M.focus();L.focusEvent.fire();}catch(O){}}if(!this.cfg.getProperty("disabled")&&N&&N.cfg.getProperty("visible")&&this.element.style.display!="none"){window.setTimeout(K,0);}},blur:function(){var K=this.parent;
	if(!this.cfg.getProperty("disabled")&&K&&K.cfg.getProperty("visible")){var J=this;window.setTimeout(function(){try{J._oAnchor.blur();J.blurEvent.fire();}catch(L){}},0);}},hasFocus:function(){return(YAHOO.widget.MenuManager.getFocusedMenuItem()==this);},destroy:function(){var L=this.element,K,J;
	if(L){K=this.cfg.getProperty("submenu");
	if(K){K.destroy();}this.mouseOverEvent.unsubscribeAll();
	this.mouseOutEvent.unsubscribeAll();
	this.mouseDownEvent.unsubscribeAll();
	this.mouseUpEvent.unsubscribeAll();
	this.clickEvent.unsubscribeAll();
	this.keyPressEvent.unsubscribeAll();
	this.keyDownEvent.unsubscribeAll();
	this.keyUpEvent.unsubscribeAll();
	this.focusEvent.unsubscribeAll();
	this.blurEvent.unsubscribeAll();
	this.cfg.configChangedEvent.unsubscribeAll();J=L.parentNode;
	if(J){J.removeChild(L);
	this.destroyEvent.fire();}this.destroyEvent.unsubscribeAll();}},toString:function(){var K="MenuItem",J=this.id;
	if(J){K+=(" "+J);}return K;}};F.augmentProto(H,YAHOO.util.EventProvider);})();(function(){YAHOO.widget.ContextMenu=function(G,F){YAHOO.widget.ContextMenu.superclass.constructor.call(this,G,F);};
	var B=YAHOO.util.Event,E=YAHOO.widget.ContextMenu,D={"TRIGGER_CONTEXT_MENU":"triggerContextMenu","CONTEXT_MENU":(YAHOO.env.ua.opera?"mousedown":"contextmenu"),"CLICK":"click"},C={"TRIGGER":{key:"trigger",suppressEvent:true}};function A(G,F,H){this.cfg.setProperty("xy",H);
	this.beforeShowEvent.unsubscribe(A,H);}YAHOO.lang.extend(E,YAHOO.widget.Menu,{_oTrigger:null,_bCancelled:false,contextEventTarget:null,triggerContextMenuEvent:null,init:function(G,F){E.superclass.init.call(this,G);
	this.beforeInitEvent.fire(E);
	if(F){this.cfg.applyConfig(F,true);}this.initEvent.fire(E);},initEvents:function(){E.superclass.initEvents.call(this);
	this.triggerContextMenuEvent=this.createEvent(D.TRIGGER_CONTEXT_MENU);
	this.triggerContextMenuEvent.signature=YAHOO.util.CustomEvent.LIST;},cancel:function(){this._bCancelled=true;},_removeEventHandlers:function(){var F=this._oTrigger;
	if(F){B.removeListener(F,D.CONTEXT_MENU,this._onTriggerContextMenu);
	if(YAHOO.env.ua.opera){B.removeListener(F,D.CLICK,this._onTriggerClick);}}},_onTriggerClick:function(G,F){if(G.ctrlKey){B.stopEvent(G);}},_onTriggerContextMenu:function(H,F){if(H.type=="mousedown"&&!H.ctrlKey){return;}var G;B.stopEvent(H);
	this.contextEventTarget=B.getTarget(H);
	this.triggerContextMenuEvent.fire(H);YAHOO.widget.MenuManager.hideVisible();
	if(!this._bCancelled){G=B.getXY(H);
	if(!YAHOO.util.Dom.inDocument(this.element)){this.beforeShowEvent.subscribe(A,G);}
	else{this.cfg.setProperty("xy",G);}this.show();}this._bCancelled=false;},toString:function(){var G="ContextMenu",F=this.id;
	if(F){G+=(" "+F);}return G;},initDefaultConfig:function(){E.superclass.initDefaultConfig.call(this);
	this.cfg.addProperty(C.TRIGGER.key,{handler:this.configTrigger,suppressEvent:C.TRIGGER.suppressEvent});},destroy:function(){this._removeEventHandlers();E.superclass.destroy.call(this);},configTrigger:function(G,F,I){var H=F[0];
	if(H){if(this._oTrigger){this._removeEventHandlers();}this._oTrigger=H;B.on(H,D.CONTEXT_MENU,this._onTriggerContextMenu,this,true);
	if(YAHOO.env.ua.opera){B.on(H,D.CLICK,this._onTriggerClick,this,true);}}
	else{this._removeEventHandlers();}}});}());YAHOO.widget.ContextMenuItem=YAHOO.widget.MenuItem;(function(){YAHOO.widget.MenuBar=function(F,E){YAHOO.widget.MenuBar.superclass.constructor.call(this,F,E);};function D(E){if(typeof E=="string"){return("dynamic,static".indexOf((E.toLowerCase()))!=-1);}}var B=YAHOO.util.Event,A=YAHOO.widget.MenuBar,C={"POSITION":{key:"position",value:"static",validator:D,supercedes:["visible"]},"SUBMENU_ALIGNMENT":{key:"submenualignment",value:["tl","bl"],suppressEvent:true},"AUTO_SUBMENU_DISPLAY":{key:"autosubmenudisplay",value:false,validator:YAHOO.lang.isBoolean,suppressEvent:true}};YAHOO.lang.extend(A,YAHOO.widget.Menu,{init:function(F,E){if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.MenuBarItem;}A.superclass.init.call(this,F);
	this.beforeInitEvent.fire(A);
	if(E){this.cfg.applyConfig(E,true);}this.initEvent.fire(A);},CSS_CLASS_NAME:"yuimenubar",_onKeyDown:function(G,F,K){var E=F[0],L=F[1],I,J,H;
	if(L&&!L.cfg.getProperty("disabled")){J=L.cfg;switch(E.keyCode){case 37:case 39:if(L==this.activeItem&&!J.getProperty("selected")){J.setProperty("selected",true);}
	else{H=(E.keyCode==37)?L.getPreviousEnabledSibling():L.getNextEnabledSibling();
	if(H){this.clearActiveItem();H.cfg.setProperty("selected",true);
	if(this.cfg.getProperty("autosubmenudisplay")){I=H.cfg.getProperty("submenu");
	if(I){I.show();}}H.focus();}}B.preventDefault(E);break;case 40:if(this.activeItem!=L){this.clearActiveItem();J.setProperty("selected",true);L.focus();}I=J.getProperty("submenu");
	if(I){if(I.cfg.getProperty("visible")){I.setInitialSelection();I.setInitialFocus();}
	else{I.show();}}B.preventDefault(E);break;}}if(E.keyCode==27&&this.activeItem){I=this.activeItem.cfg.getProperty("submenu");
	if(I&&I.cfg.getProperty("visible")){I.hide();
	this.activeItem.focus();}
	else{this.activeItem.cfg.setProperty("selected",false);
	this.activeItem.blur();}B.preventDefault(E);}},_onClick:function(L,G,J){A.superclass._onClick.call(this,L,G,J);
	var K=G[1],M,E,F,H,I;
	if(K&&!K.cfg.getProperty("disabled")){M=G[0];E=B.getTarget(M);F=this.activeItem;H=this.cfg;
	if(F&&F!=K){this.clearActiveItem();}K.cfg.setProperty("selected",true);I=K.cfg.getProperty("submenu");
	if(I){if(I.cfg.getProperty("visible")){I.hide();}
	else{I.show();}}}},toString:function(){var F="MenuBar",E=this.id;
	if(E){F+=(" "+E);}return F;},initDefaultConfig:function(){A.superclass.initDefaultConfig.call(this);
	var E=this.cfg;E.addProperty(C.POSITION.key,{handler:this.configPosition,value:C.POSITION.value,validator:C.POSITION.validator,supercedes:C.POSITION.supercedes});E.addProperty(C.SUBMENU_ALIGNMENT.key,{value:C.SUBMENU_ALIGNMENT.value,suppressEvent:C.SUBMENU_ALIGNMENT.suppressEvent});E.addProperty(C.AUTO_SUBMENU_DISPLAY.key,{value:C.AUTO_SUBMENU_DISPLAY.value,validator:C.AUTO_SUBMENU_DISPLAY.validator,suppressEvent:C.AUTO_SUBMENU_DISPLAY.suppressEvent});}});}());YAHOO.widget.MenuBarItem=function(B,A){YAHOO.widget.MenuBarItem.superclass.constructor.call(this,B,A);};YAHOO.lang.extend(YAHOO.widget.MenuBarItem,YAHOO.widget.MenuItem,{init:function(B,A){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=YAHOO.widget.Menu;}YAHOO.widget.MenuBarItem.superclass.init.call(this,B);
	var C=this.cfg;
	if(A){C.applyConfig(A,true);}C.fireQueue();},CSS_CLASS_NAME:"yuimenubaritem",CSS_LABEL_CLASS_NAME:"yuimenubaritemlabel",toString:function(){var A="MenuBarItem";
	if(this.cfg&&this.cfg.getProperty("text")){A+=(": "+this.cfg.getProperty("text"));}return A;}});YAHOO.register("menu",YAHOO.widget.Menu,{version:"2.5.0",build:"897"});(function(){var G=YAHOO.util.Dom,L=YAHOO.util.Event,I=YAHOO.lang,B=YAHOO.widget.Overlay,J=YAHOO.widget.Menu,D={},K=null,E=null,C=null;function F(N,M,Q,O){var R,P;
	if(I.isString(N)&&I.isString(M)){if(YAHOO.env.ua.ie){P="<input type=\""+N+"\" name=\""+M+"\"";
	if(O){P+=" checked";}P+=">";R=document.createElement(P);}
	else{R=document.createElement("input");R.name=M;R.type=N;
	if(O){R.checked=true;}}R.value=Q;return R;}}function H(N,T){var M=N.nodeName.toUpperCase(),R=this,S,O,P;function U(V){if(!(V in T)){S=N.getAttributeNode(V);
	if(S&&("value"in S)){T[V]=S.value;}}}function Q(){U("type");
	if(T.type=="button"){T.type="push";}if(!("disabled"in T)){T.disabled=N.disabled;}U("name");U("value");U("title");}switch(M){case"A":T.type="link";U("href");U("target");break;case"INPUT":Q();
	if(!("checked"in T)){T.checked=N.checked;}break;case"BUTTON":Q();O=N.parentNode.parentNode;
	if(G.hasClass(O,this.CSS_CLASS_NAME+"-checked")){T.checked=true;}if(G.hasClass(O,this.CSS_CLASS_NAME+"-disabled")){T.disabled=true;}N.removeAttribute("value");N.setAttribute("type","button");break;}N.removeAttribute("id");N.removeAttribute("name");
	if(!("tabindex"in T)){T.tabindex=N.tabIndex;}if(!("label"in T)){P=M=="INPUT"?N.value:N.innerHTML;
	if(P&&P.length>0){T.label=P;}}}function A(O){var N=O.attributes,M=N.srcelement,Q=M.nodeName.toUpperCase(),P=this;
	if(Q==this.NODE_NAME){O.element=M;O.id=M.id;G.getElementsBy(function(R){switch(R.nodeName.toUpperCase()){case"BUTTON":case"A":case"INPUT":H.call(P,R,N);break;}},"*",M);}
	else{switch(Q){case"BUTTON":case"A":case"INPUT":H.call(this,M,N);break;}}}YAHOO.widget.Button=function(Q,N){if(!B&&YAHOO.widget.Overlay){B=YAHOO.widget.Overlay;}if(!J&&YAHOO.widget.Menu){J=YAHOO.widget.Menu;}var P=YAHOO.widget.Button.superclass.constructor,O,M;
	if(arguments.length==1&&!I.isString(Q)&&!Q.nodeName){if(!Q.id){Q.id=G.generateId();}P.call(this,(this.createButtonElement(Q.type)),Q);}
	else{O={element:null,attributes:(N||{})};
	if(I.isString(Q)){M=G.get(Q);
	if(M){if(!O.attributes.id){O.attributes.id=Q;}O.attributes.srcelement=M;A.call(this,O);
	if(!O.element){O.element=this.createButtonElement(O.attributes.type);}P.call(this,O.element,O.attributes);}}
	else{if(Q.nodeName){if(!O.attributes.id){if(Q.id){O.attributes.id=Q.id;}
	else{O.attributes.id=G.generateId();}}O.attributes.srcelement=Q;A.call(this,O);
	if(!O.element){O.element=this.createButtonElement(O.attributes.type);}P.call(this,O.element,O.attributes);}}}};YAHOO.extend(YAHOO.widget.Button,YAHOO.util.Element,{_button:null,_menu:null,_hiddenFields:null,_onclickAttributeValue:null,_activationKeyPressed:false,_activationButtonPressed:false,_hasKeyEventHandlers:false,_hasMouseEventHandlers:false,NODE_NAME:"SPAN",CHECK_ACTIVATION_KEYS:[32],ACTIVATION_KEYS:[13,32],OPTION_AREA_WIDTH:20,CSS_CLASS_NAME:"yui-button",RADIO_DEFAULT_TITLE:"Unchecked.  Click to check.",RADIO_CHECKED_TITLE:"Checked.  Click another button to uncheck",CHECKBOX_DEFAULT_TITLE:"Unchecked.  Click to check.",CHECKBOX_CHECKED_TITLE:"Checked.  Click to uncheck.",MENUBUTTON_DEFAULT_TITLE:"Menu collapsed.  Click to expand.",MENUBUTTON_MENU_VISIBLE_TITLE:"Menu expanded.  Click or press Esc to collapse.",SPLITBUTTON_DEFAULT_TITLE:("Menu collapsed.  Click inside option region or press Ctrl + Shift + M to show the menu."),SPLITBUTTON_OPTION_VISIBLE_TITLE:"Menu expanded.  Press Esc or Ctrl + Shift + M to hide the menu.",SUBMIT_TITLE:"Click to submit form.",_setType:function(M){if(M=="split"){this.on("option",this._onOption);}},_setLabel:function(M){this._button.innerHTML=M;
	var O,N;
	if(YAHOO.env.ua.gecko&&G.inDocument(this.get("element"))){N=this;O=this.CSS_CLASS_NAME;
	this.removeClass(O);window.setTimeout(function(){N.addClass(O);},0);}},_setTabIndex:function(M){this._button.tabIndex=M;},_setTitle:function(N){var M=N;
	if(this.get("type")!="link"){if(!M){switch(this.get("type")){case"radio":M=this.RADIO_DEFAULT_TITLE;break;case"checkbox":M=this.CHECKBOX_DEFAULT_TITLE;break;case"menu":M=this.MENUBUTTON_DEFAULT_TITLE;break;case"split":M=this.SPLITBUTTON_DEFAULT_TITLE;break;case"submit":M=this.SUBMIT_TITLE;break;}}this._button.title=M;}},_setDisabled:function(M){if(this.get("type")!="link"){if(M){if(this._menu){this._menu.hide();}if(this.hasFocus()){this.blur();}this._button.setAttribute("disabled","disabled");
	this.addStateCSSClasses("disabled");
	this.removeStateCSSClasses("hover");
	this.removeStateCSSClasses("active");
	this.removeStateCSSClasses("focus");}
	else{this._button.removeAttribute("disabled");
	this.removeStateCSSClasses("disabled");}}},_setHref:function(M){if(this.get("type")=="link"){this._button.href=M;}},_setTarget:function(M){if(this.get("type")=="link"){this._button.setAttribute("target",M);}},_setChecked:function(N){var O=this.get("type"),M;
	if(O=="checkbox"||O=="radio"){if(N){this.addStateCSSClasses("checked");M=(O=="radio")?this.RADIO_CHECKED_TITLE:this.CHECKBOX_CHECKED_TITLE;}
	else{this.removeStateCSSClasses("checked");M=(O=="radio")?this.RADIO_DEFAULT_TITLE:this.CHECKBOX_DEFAULT_TITLE;}this.set("title",M);}},_setMenu:function(W){var Q=this.get("lazyloadmenu"),T=this.get("element"),M,Y=false,Z,P,S,O,N,V,R;
	if(!B){return false;}if(J){M=J.prototype.CSS_CLASS_NAME;}function X(){Z.render(T.parentNode);
	this.removeListener("appendTo",X);}function U(){if(Z){G.addClass(Z.element,this.get("menuclassname"));G.addClass(Z.element,"yui-"+this.get("type")+"-button-menu");Z.showEvent.subscribe(this._onMenuShow,null,this);Z.hideEvent.subscribe(this._onMenuHide,null,this);Z.renderEvent.subscribe(this._onMenuRender,null,this);
	if(J&&Z instanceof J){Z.keyDownEvent.subscribe(this._onMenuKeyDown,this,true);Z.subscribe("click",this._onMenuClick,this,true);Z.itemAddedEvent.subscribe(this._onMenuItemAdded,this,true);S=Z.srcElement;
	if(S&&S.nodeName.toUpperCase()=="SELECT"){S.style.display="none";S.parentNode.removeChild(S);}}
	else{if(B&&Z instanceof B){if(!K){K=new YAHOO.widget.OverlayManager();}K.register(Z);}}this._menu=Z;
	if(!Y){if(Q&&J&&!(Z instanceof J)){Z.beforeShowEvent.subscribe(this._onOverlayBeforeShow,null,this);}
	else{if(!Q){if(G.inDocument(T)){Z.render(T.parentNode);}
	else{this.on("appendTo",X);}}}}}}if(W&&J&&(W instanceof J)){Z=W;O=Z.getItems();N=O.length;Y=true;
	if(N>0){R=N-1;do{V=O[R];
	if(V){V.cfg.subscribeToConfigEvent("selected",this._onMenuItemSelected,V,this);}}while(R--);}U.call(this);}
	else{if(B&&W&&(W instanceof B)){Z=W;Y=true;Z.cfg.setProperty("visible",false);Z.cfg.setProperty("context",[T,"tl","bl"]);U.call(this);}
	else{if(J&&I.isArray(W)){this.on("appendTo",function(){Z=new J(G.generateId(),{lazyload:Q,itemdata:W});U.call(this);});}
	else{if(I.isString(W)){P=G.get(W);
	if(P){if(J&&G.hasClass(P,M)||P.nodeName.toUpperCase()=="SELECT"){Z=new J(W,{lazyload:Q});U.call(this);}
	else{if(B){Z=new B(W,{visible:false,context:[T,"tl","bl"]});U.call(this);}}}}
	else{if(W&&W.nodeName){if(J&&G.hasClass(W,M)||W.nodeName.toUpperCase()=="SELECT"){Z=new J(W,{lazyload:Q});U.call(this);}
	else{if(B){if(!W.id){G.generateId(W);}Z=new B(W,{visible:false,context:[T,"tl","bl"]});U.call(this);}}}}}}}},_setOnClick:function(M){if(this._onclickAttributeValue&&(this._onclickAttributeValue!=M)){this.removeListener("click",this._onclickAttributeValue.fn);
	this._onclickAttributeValue=null;}if(!this._onclickAttributeValue&&I.isObject(M)&&I.isFunction(M.fn)){this.on("click",M.fn,M.obj,M.scope);
	this._onclickAttributeValue=M;}},_setSelectedMenuItem:function(N){var M=this._menu,O;
	if(J&&M&&M instanceof J){O=M.getItem(N);
	if(O&&!O.cfg.getProperty("selected")){O.cfg.setProperty("selected",true);}}},_isActivationKey:function(M){var Q=this.get("type"),N=(Q=="checkbox"||Q=="radio")?this.CHECK_ACTIVATION_KEYS:this.ACTIVATION_KEYS,P=N.length,O;
	if(P>0){O=P-1;do{if(M==N[O]){return true;}}while(O--);}},_isSplitButtonOptionKey:function(M){return(M.ctrlKey&&M.shiftKey&&L.getCharCode(M)==77);},_addListenersToForm:function(){var S=this.getForm(),R=YAHOO.widget.Button.onFormKeyPress,Q,M,P,O,N;
	if(S){L.on(S,"reset",this._onFormReset,null,this);L.on(S,"submit",this.createHiddenFields,null,this);M=this.get("srcelement");
	if(this.get("type")=="submit"||(M&&M.type=="submit")){P=L.getListeners(S,"keypress");Q=false;
	if(P){O=P.length;
	if(O>0){N=O-1;do{if(P[N].fn==R){Q=true;break;}}while(N--);}}if(!Q){L.on(S,"keypress",R);}}}},_showMenu:function(R){if(YAHOO.widget.MenuManager){YAHOO.widget.MenuManager.hideVisible();}if(K){K.hideAll();}var P=B.VIEWPORT_OFFSET,Y=this._menu,W=this,Z=W.get("element"),T=false,V=G.getY(Z),U=G.getDocumentScrollTop(),M,Q,b;
	if(U){V=V-U;}var O=V,N=(G.getViewportHeight()-(V+Z.offsetHeight));function S(){if(T){return(O-P);}
	else{return(N-P);}}function a(){var c=S();
	if(Q>c){M=Y.cfg.getProperty("minscrollheight");
	if(c>M){Y.cfg.setProperty("maxheight",c);
	if(T){Y.align("bl","tl");}}if(c<M){if(T){Y.cfg.setProperty("context",[Z,"tl","bl"],true);Y.align("tl","bl");}
	else{Y.cfg.setProperty("context",[Z,"bl","tl"],true);Y.align("bl","tl");T=true;return a();}}}}if(J&&Y&&(Y instanceof J)){Y.cfg.applyConfig({context:[Z,"tl","bl"],clicktohide:false,visible:true});Y.cfg.fireQueue();Y.cfg.setProperty("maxheight",0);Y.align("tl","bl");
	if(R.type=="mousedown"){L.stopPropagation(R);}Q=Y.element.offsetHeight;b=Y.element.lastChild;a();
	if(this.get("focusmenu")){this._menu.focus();}}
	else{if(B&&Y&&(Y instanceof B)){Y.show();Y.align("tl","bl");
	var X=S();Q=Y.element.offsetHeight;
	if(X<Q){Y.align("bl","tl");T=true;X=S();
	if(X<Q){Y.align("tl","bl");}}}}},_hideMenu:function(){var M=this._menu;
	if(M){M.hide();}},_onMouseOver:function(M){if(!this._hasMouseEventHandlers){this.on("mouseout",this._onMouseOut);
	this.on("mousedown",this._onMouseDown);
	this.on("mouseup",this._onMouseUp);
	this._hasMouseEventHandlers=true;}this.addStateCSSClasses("hover");
	if(this._activationButtonPressed){this.addStateCSSClasses("active");}if(this._bOptionPressed){this.addStateCSSClasses("activeoption");}if(this._activationButtonPressed||this._bOptionPressed){L.removeListener(document,"mouseup",this._onDocumentMouseUp);}},_onMouseOut:function(M){this.removeStateCSSClasses("hover");
	if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}if(this._activationButtonPressed||this._bOptionPressed){L.on(document,"mouseup",this._onDocumentMouseUp,null,this);}},_onDocumentMouseUp:function(O){this._activationButtonPressed=false;
	this._bOptionPressed=false;
	var P=this.get("type"),M,N;
	if(P=="menu"||P=="split"){M=L.getTarget(O);N=this._menu.element;
	if(M!=N&&!G.isAncestor(N,M)){this.removeStateCSSClasses((P=="menu"?"active":"activeoption"));
	this._hideMenu();}}L.removeListener(document,"mouseup",this._onDocumentMouseUp);},_onMouseDown:function(P){var R,N,Q,O;function M(){this._hideMenu();
	this.removeListener("mouseup",M);}if((P.which||P.button)==1){if(!this.hasFocus()){this.focus();}R=this.get("type");
	if(R=="split"){N=this.get("element");Q=L.getPageX(P)-G.getX(N);
	if((N.offsetWidth-this.OPTION_AREA_WIDTH)<Q){this.fireEvent("option",P);}
	else{this.addStateCSSClasses("active");
	this._activationButtonPressed=true;}}
	else{if(R=="menu"){if(this.isActive()){this._hideMenu();
	this._activationButtonPressed=false;}
	else{this._showMenu(P);
	this._activationButtonPressed=true;}}
	else{this.addStateCSSClasses("active");
	this._activationButtonPressed=true;}}if(R=="split"||R=="menu"){O=this;
	this._hideMenuTimerId=window.setTimeout(function(){O.on("mouseup",M);},250);}}},_onMouseUp:function(M){var N=this.get("type");
	if(this._hideMenuTimerId){window.clearTimeout(this._hideMenuTimerId);}if(N=="checkbox"||N=="radio"){this.set("checked",!(this.get("checked")));}this._activationButtonPressed=false;
	if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}},_onFocus:function(N){var M;
	this.addStateCSSClasses("focus");
	if(this._activationKeyPressed){this.addStateCSSClasses("active");}C=this;
	if(!this._hasKeyEventHandlers){M=this._button;L.on(M,"blur",this._onBlur,null,this);L.on(M,"keydown",this._onKeyDown,null,this);L.on(M,"keyup",this._onKeyUp,null,this);
	this._hasKeyEventHandlers=true;}this.fireEvent("focus",N);},_onBlur:function(M){this.removeStateCSSClasses("focus");
	if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}if(this._activationKeyPressed){L.on(document,"keyup",this._onDocumentKeyUp,null,this);}C=null;
	this.fireEvent("blur",M);},_onDocumentKeyUp:function(M){if(this._isActivationKey(L.getCharCode(M))){this._activationKeyPressed=false;L.removeListener(document,"keyup",this._onDocumentKeyUp);}},_onKeyDown:function(N){var M=this._menu;
	if(this.get("type")=="split"&&this._isSplitButtonOptionKey(N)){this.fireEvent("option",N);}
	else{if(this._isActivationKey(L.getCharCode(N))){if(this.get("type")=="menu"){this._showMenu(N);}
	else{this._activationKeyPressed=true;
	this.addStateCSSClasses("active");}}}if(M&&M.cfg.getProperty("visible")&&L.getCharCode(N)==27){M.hide();
	this.focus();}},_onKeyUp:function(M){var N;
	if(this._isActivationKey(L.getCharCode(M))){N=this.get("type");
	if(N=="checkbox"||N=="radio"){this.set("checked",!(this.get("checked")));}this._activationKeyPressed=false;
	if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}}},_onClick:function(P){var S=this.get("type"),M,Q,N,O,R;switch(S){case"radio":case"checkbox":if(this.get("checked")){M=(S=="radio")?this.RADIO_CHECKED_TITLE:this.CHECKBOX_CHECKED_TITLE;}
	else{M=(S=="radio")?this.RADIO_DEFAULT_TITLE:this.CHECKBOX_DEFAULT_TITLE;}this.set("title",M);break;case"submit":this.submitForm();break;case"reset":Q=this.getForm();
	if(Q){Q.reset();}break;case"menu":M=this._menu.cfg.getProperty("visible")?this.MENUBUTTON_MENU_VISIBLE_TITLE:this.MENUBUTTON_DEFAULT_TITLE;
	this.set("title",M);break;case"split":O=this.get("element");R=L.getPageX(P)-G.getX(O);
	if((O.offsetWidth-this.OPTION_AREA_WIDTH)<R){return false;}
	else{this._hideMenu();N=this.get("srcelement");
	if(N&&N.type=="submit"){this.submitForm();}}M=this._menu.cfg.getProperty("visible")?this.SPLITBUTTON_OPTION_VISIBLE_TITLE:this.SPLITBUTTON_DEFAULT_TITLE;
	this.set("title",M);break;}},_onAppendTo:function(N){var M=this;window.setTimeout(function(){M._addListenersToForm();},0);},_onFormReset:function(N){var O=this.get("type"),M=this._menu;
	if(O=="checkbox"||O=="radio"){this.resetValue("checked");}if(J&&M&&(M instanceof J)){this.resetValue("selectedMenuItem");}},_onDocumentMouseDown:function(P){var M=L.getTarget(P),O=this.get("element"),N=this._menu.element;
	if(M!=O&&!G.isAncestor(O,M)&&M!=N&&!G.isAncestor(N,M)){this._hideMenu();L.removeListener(document,"mousedown",this._onDocumentMouseDown);}},_onOption:function(M){if(this.hasClass("yui-split-button-activeoption")){this._hideMenu();
	this._bOptionPressed=false;}
	else{this._showMenu(M);
	this._bOptionPressed=true;}},_onOverlayBeforeShow:function(N){var M=this._menu;M.render(this.get("element").parentNode);M.beforeShowEvent.unsubscribe(this._onOverlayBeforeShow);},_onMenuShow:function(N){L.on(document,"mousedown",this._onDocumentMouseDown,null,this);
	var M,O;
	if(this.get("type")=="split"){M=this.SPLITBUTTON_OPTION_VISIBLE_TITLE;O="activeoption";}
	else{M=this.MENUBUTTON_MENU_VISIBLE_TITLE;O="active";}this.addStateCSSClasses(O);
	this.set("title",M);},_onMenuHide:function(O){var N=this._menu,M,P;
	if(this.get("type")=="split"){M=this.SPLITBUTTON_DEFAULT_TITLE;P="activeoption";}
	else{M=this.MENUBUTTON_DEFAULT_TITLE;P="active";}this.removeStateCSSClasses(P);
	this.set("title",M);
	if(this.get("type")=="split"){this._bOptionPressed=false;}},_onMenuKeyDown:function(O,N){var M=N[0];
	if(L.getCharCode(M)==27){this.focus();
	if(this.get("type")=="split"){this._bOptionPressed=false;}}},_onMenuRender:function(N){var P=this.get("element"),M=P.parentNode,O=this._menu.element;
	if(M!=O.parentNode){M.appendChild(O);}this.set("selectedMenuItem",this.get("selectedMenuItem"));},_onMenuItemSelected:function(O,N,M){var P=N[0];
	if(P){this.set("selectedMenuItem",M);}},_onMenuItemAdded:function(O,N,M){var P=N[0];P.cfg.subscribeToConfigEvent("selected",this._onMenuItemSelected,P,this);},_onMenuClick:function(N,M){var P=M[1],O;
	if(P){O=this.get("srcelement");
	if(O&&O.type=="submit"){this.submitForm();}this._hideMenu();}},createButtonElement:function(M){var O=this.NODE_NAME,N=document.createElement(O);N.innerHTML="<"+O+" class=\"first-child\">"+(M=="link"?"<a></a>":"<button type=\"button\"></button>")+"</"+O+">";return N;},addStateCSSClasses:function(M){var N=this.get("type");
	if(I.isString(M)){if(M!="activeoption"){this.addClass(this.CSS_CLASS_NAME+("-"+M));}this.addClass("yui-"+N+("-button-"+M));}},removeStateCSSClasses:function(M){var N=this.get("type");
	if(I.isString(M)){this.removeClass(this.CSS_CLASS_NAME+("-"+M));
	this.removeClass("yui-"+N+("-button-"+M));}},createHiddenFields:function(){this.removeHiddenFields();
	var R=this.getForm(),U,N,P,S,T,O,Q,M;
	if(R&&!this.get("disabled")){N=this.get("type");P=(N=="checkbox"||N=="radio");
	if(P||(E==this)){U=F((P?N:"hidden"),this.get("name"),this.get("value"),this.get("checked"));
	if(U){if(P){U.style.display="none";}R.appendChild(U);}}S=this._menu;
	if(J&&S&&(S instanceof J)){M=S.srcElement;T=this.get("selectedMenuItem");
	if(T){if(M&&M.nodeName.toUpperCase()=="SELECT"){R.appendChild(M);M.selectedIndex=T.index;}
	else{Q=(T.value===null||T.value==="")?T.cfg.getProperty("text"):T.value;O=this.get("name");
	if(Q&&O){M=F("hidden",(O+"_options"),Q);R.appendChild(M);}}}}if(U&&M){this._hiddenFields=[U,M];}
	else{if(!U&&M){this._hiddenFields=M;}
	else{if(U&&!M){this._hiddenFields=U;}}}return this._hiddenFields;}},removeHiddenFields:function(){var P=this._hiddenFields,N,O;function M(Q){if(G.inDocument(Q)){Q.parentNode.removeChild(Q);}}if(P){if(I.isArray(P)){N=P.length;
	if(N>0){O=N-1;do{M(P[O]);}while(O--);}}
	else{M(P);}this._hiddenFields=null;}},submitForm:function(){var P=this.getForm(),O=this.get("srcelement"),N=false,M;
	if(P){if(this.get("type")=="submit"||(O&&O.type=="submit")){E=this;}if(YAHOO.env.ua.ie){N=P.fireEvent("onsubmit");}
	else{M=document.createEvent("HTMLEvents");M.initEvent("submit",true,true);N=P.dispatchEvent(M);}if((YAHOO.env.ua.ie||YAHOO.env.ua.webkit)&&N){P.submit();}}return N;},init:function(M,T){var O=T.type=="link"?"a":"button",Q=T.srcelement,S=M.getElementsByTagName(O)[0],R;
	if(!S){R=M.getElementsByTagName("input")[0];
	if(R){S=document.createElement("button");S.setAttribute("type","button");R.parentNode.replaceChild(S,R);}}this._button=S;YAHOO.widget.Button.superclass.init.call(this,M,T);D[this.get("id")]=this;
	this.addClass(this.CSS_CLASS_NAME);
	this.addClass("yui-"+this.get("type")+"-button");L.on(this._button,"focus",this._onFocus,null,this);
	this.on("mouseover",this._onMouseOver);
	this.on("click",this._onClick);
	this.on("appendTo",this._onAppendTo);
	var V=this.get("container"),N=this.get("element"),U=G.inDocument(N),P;
	if(V){if(Q&&Q!=N){P=Q.parentNode;
	if(P){P.removeChild(Q);}}if(I.isString(V)){L.onContentReady(V,function(){this.appendTo(V);},null,this);}
	else{this.appendTo(V);}}
	else{if(!U&&Q&&Q!=N){P=Q.parentNode;
	if(P){this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:P});P.replaceChild(N,Q);
	this.fireEvent("appendTo",{type:"appendTo",target:P});}}
	else{if(this.get("type")!="link"&&U&&Q&&Q==N){this._addListenersToForm();}}}},initAttributes:function(N){var M=N||{};YAHOO.widget.Button.superclass.initAttributes.call(this,M);
	this.setAttributeConfig("type",{value:(M.type||"push"),validator:I.isString,writeOnce:true,method:this._setType});
	this.setAttributeConfig("label",{value:M.label,validator:I.isString,method:this._setLabel});
	this.setAttributeConfig("value",{value:M.value});
	this.setAttributeConfig("name",{value:M.name,validator:I.isString});
	this.setAttributeConfig("tabindex",{value:M.tabindex,validator:I.isNumber,method:this._setTabIndex});
	this.configureAttribute("title",{value:M.title,validator:I.isString,method:this._setTitle});
	this.setAttributeConfig("disabled",{value:(M.disabled||false),validator:I.isBoolean,method:this._setDisabled});
	this.setAttributeConfig("href",{value:M.href,validator:I.isString,method:this._setHref});
	this.setAttributeConfig("target",{value:M.target,validator:I.isString,method:this._setTarget});
	this.setAttributeConfig("checked",{value:(M.checked||false),validator:I.isBoolean,method:this._setChecked});
	this.setAttributeConfig("container",{value:M.container,writeOnce:true});
	this.setAttributeConfig("srcelement",{value:M.srcelement,writeOnce:true});
	this.setAttributeConfig("menu",{value:null,method:this._setMenu,writeOnce:true});
	this.setAttributeConfig("lazyloadmenu",{value:(M.lazyloadmenu===false?false:true),validator:I.isBoolean,writeOnce:true});
	this.setAttributeConfig("menuclassname",{value:(M.menuclassname||"yui-button-menu"),validator:I.isString,method:this._setMenuClassName,writeOnce:true});
	this.setAttributeConfig("selectedMenuItem",{value:null,method:this._setSelectedMenuItem});
	this.setAttributeConfig("onclick",{value:M.onclick,method:this._setOnClick});
	this.setAttributeConfig("focusmenu",{value:(M.focusmenu===false?false:true),validator:I.isBoolean});},focus:function(){if(!this.get("disabled")){this._button.focus();}},blur:function(){if(!this.get("disabled")){this._button.blur();}},hasFocus:function(){return(C==this);},isActive:function(){return this.hasClass(this.CSS_CLASS_NAME+"-active");},getMenu:function(){return this._menu;},getForm:function(){return this._button.form;},getHiddenFields:function(){return this._hiddenFields;},destroy:function(){var O=this.get("element"),N=O.parentNode,M=this._menu,Q;
	if(M){if(K&&K.find(M)){K.remove(M);}M.destroy();}L.purgeElement(O);L.purgeElement(this._button);L.removeListener(document,"mouseup",this._onDocumentMouseUp);L.removeListener(document,"keyup",this._onDocumentKeyUp);L.removeListener(document,"mousedown",this._onDocumentMouseDown);
	var P=this.getForm();
	if(P){L.removeListener(P,"reset",this._onFormReset);L.removeListener(P,"submit",this.createHiddenFields);}this.unsubscribeAll();
	if(N){N.removeChild(O);}delete D[this.get("id")];Q=G.getElementsByClassName(this.CSS_CLASS_NAME,this.NODE_NAME,P);
	if(I.isArray(Q)&&Q.length===0){L.removeListener(P,"keypress",YAHOO.widget.Button.onFormKeyPress);}},fireEvent:function(N,M){var O=arguments[0];
	if(this.DOM_EVENTS[O]&&this.get("disabled")){return;}return YAHOO.widget.Button.superclass.fireEvent.apply(this,arguments);},toString:function(){return("Button "+this.get("id"));}});YAHOO.widget.Button.onFormKeyPress=function(Q){var O=L.getTarget(Q),R=L.getCharCode(Q),P=O.nodeName&&O.nodeName.toUpperCase(),M=O.type,S=false,U,V,N,W;function T(Z){var Y,X;switch(Z.nodeName.toUpperCase()){case"INPUT":case"BUTTON":if(Z.type=="submit"&&!Z.disabled){if(!S&&!N){N=Z;}if(V&&!W){W=Z;}}break;default:Y=Z.id;
	if(Y){U=D[Y];
	if(U){S=true;
	if(!U.get("disabled")){X=U.get("srcelement");
	if(!V&&(U.get("type")=="submit"||(X&&X.type=="submit"))){V=U;}}}}break;}}if(R==13&&((P=="INPUT"&&(M=="text"||M=="password"||M=="checkbox"||M=="radio"||M=="file"))||P=="SELECT")){G.getElementsBy(T,"*",this);
	if(N){N.focus();}
	else{if(!N&&V){if(W){L.preventDefault(Q);}V.submitForm();}}}};YAHOO.widget.Button.addHiddenFieldsToForm=function(M){var R=G.getElementsByClassName(YAHOO.widget.Button.prototype.CSS_CLASS_NAME,"*",M),P=R.length,Q,N,O;
	if(P>0){for(O=0;O<P;O++){N=R[O].id;
	if(N){Q=D[N];
	if(Q){Q.createHiddenFields();}}}}};YAHOO.widget.Button.getButton=function(M){var N=D[M];
	if(N){return N;}};})();(function(){var C=YAHOO.util.Dom,B=YAHOO.util.Event,D=YAHOO.lang,A=YAHOO.widget.Button,E={};YAHOO.widget.ButtonGroup=function(J,H){var I=YAHOO.widget.ButtonGroup.superclass.constructor,K,G,F;
	if(arguments.length==1&&!D.isString(J)&&!J.nodeName){if(!J.id){F=C.generateId();J.id=F;}I.call(this,(this._createGroupElement()),J);}
	else{if(D.isString(J)){G=C.get(J);
	if(G){if(G.nodeName.toUpperCase()==this.NODE_NAME){I.call(this,G,H);}}}
	else{K=J.nodeName.toUpperCase();
	if(K&&K==this.NODE_NAME){if(!J.id){J.id=C.generateId();}I.call(this,J,H);}}}};YAHOO.extend(YAHOO.widget.ButtonGroup,YAHOO.util.Element,{_buttons:null,NODE_NAME:"DIV",CSS_CLASS_NAME:"yui-buttongroup",_createGroupElement:function(){var F=document.createElement(this.NODE_NAME);return F;},_setDisabled:function(G){var H=this.getCount(),F;
	if(H>0){F=H-1;do{this._buttons[F].set("disabled",G);}while(F--);}},_onKeyDown:function(K){var G=B.getTarget(K),I=B.getCharCode(K),H=G.parentNode.parentNode.id,J=E[H],F=-1;
	if(I==37||I==38){F=(J.index===0)?(this._buttons.length-1):(J.index-1);}
	else{if(I==39||I==40){F=(J.index===(this._buttons.length-1))?0:(J.index+1);}}if(F>-1){this.check(F);
	this.getButton(F).focus();}},_onAppendTo:function(H){var I=this._buttons,G=I.length,F;for(F=0;F<G;F++){I[F].appendTo(this.get("element"));}},_onButtonCheckedChange:function(G,F){var I=G.newValue,H=this.get("checkedButton");
	if(I&&H!=F){if(H){H.set("checked",false,true);}this.set("checkedButton",F);
	this.set("value",F.get("value"));}
	else{if(H&&!H.set("checked")){H.set("checked",true,true);}}},init:function(I,H){this._buttons=[];YAHOO.widget.ButtonGroup.superclass.init.call(this,I,H);
	this.addClass(this.CSS_CLASS_NAME);
	var J=this.getElementsByClassName("yui-radio-button");
	if(J.length>0){this.addButtons(J);}function F(K){return(K.type=="radio");}J=C.getElementsBy(F,"input",this.get("element"));
	if(J.length>0){this.addButtons(J);}this.on("keydown",this._onKeyDown);
	this.on("appendTo",this._onAppendTo);
	var G=this.get("container");
	if(G){if(D.isString(G)){B.onContentReady(G,function(){this.appendTo(G);},null,this);}
	else{this.appendTo(G);}}},initAttributes:function(G){var F=G||{};YAHOO.widget.ButtonGroup.superclass.initAttributes.call(this,F);
	this.setAttributeConfig("name",{value:F.name,validator:D.isString});
	this.setAttributeConfig("disabled",{value:(F.disabled||false),validator:D.isBoolean,method:this._setDisabled});
	this.setAttributeConfig("value",{value:F.value});
	this.setAttributeConfig("container",{value:F.container,writeOnce:true});
	this.setAttributeConfig("checkedButton",{value:null});},addButton:function(J){var L,K,G,F,H,I;
	if(J instanceof A&&J.get("type")=="radio"){L=J;}
	else{if(!D.isString(J)&&!J.nodeName){J.type="radio";L=new A(J);}
	else{L=new A(J,{type:"radio"});}}if(L){F=this._buttons.length;H=L.get("name");I=this.get("name");L.index=F;
	this._buttons[F]=L;E[L.get("id")]=L;
	if(H!=I){L.set("name",I);}if(this.get("disabled")){L.set("disabled",true);}if(L.get("checked")){this.set("checkedButton",L);}K=L.get("element");G=this.get("element");
	if(K.parentNode!=G){G.appendChild(K);}L.on("checkedChange",this._onButtonCheckedChange,L,this);return L;}},addButtons:function(G){var H,I,J,F;
	if(D.isArray(G)){H=G.length;J=[];
	if(H>0){for(F=0;F<H;F++){I=this.addButton(G[F]);
	if(I){J[J.length]=I;}}if(J.length>0){return J;}}}},removeButton:function(H){var I=this.getButton(H),G,F;
	if(I){this._buttons.splice(H,1);delete E[I.get("id")];I.removeListener("checkedChange",this._onButtonCheckedChange);I.destroy();G=this._buttons.length;
	if(G>0){F=this._buttons.length-1;do{this._buttons[F].index=F;}while(F--);}}},getButton:function(F){if(D.isNumber(F)){return this._buttons[F];}},getButtons:function(){return this._buttons;},getCount:function(){return this._buttons.length;},focus:function(H){var I,G,F;
	if(D.isNumber(H)){I=this._buttons[H];
	if(I){I.focus();}}
	else{G=this.getCount();for(F=0;F<G;F++){I=this._buttons[F];
	if(!I.get("disabled")){I.focus();break;}}}},check:function(F){var G=this.getButton(F);
	if(G){G.set("checked",true);}},destroy:function(){var I=this._buttons.length,H=this.get("element"),F=H.parentNode,G;
	if(I>0){G=this._buttons.length-1;do{this._buttons[G].destroy();}while(G--);}B.purgeElement(H);F.removeChild(H);},toString:function(){return("ButtonGroup "+this.get("id"));}});})();YAHOO.register("button",YAHOO.widget.Button,{version:"2.5.0",build:"897"});(function(){var B=YAHOO.util.Dom,A=YAHOO.util.Event,C=YAHOO.lang;
	if(YAHOO.widget.Button){YAHOO.widget.ToolbarButtonAdvanced=YAHOO.widget.Button;YAHOO.widget.ToolbarButtonAdvanced.prototype.buttonType="rich";YAHOO.widget.ToolbarButtonAdvanced.prototype.checkValue=function(F){var E=this.getMenu().getItems();
	if(E.length===0){this.getMenu()._onBeforeShow();E=this.getMenu().getItems();}for(var D=0;D<E.length;D++){E[D].cfg.setProperty("checked",false);
	if(E[D].value==F){E[D].cfg.setProperty("checked",true);}}};}
	else{YAHOO.widget.ToolbarButtonAdvanced=function(){};}YAHOO.widget.ToolbarButton=function(E,D){if(C.isObject(arguments[0])&&!B.get(E).nodeType){D=E;}var G=(D||{});
	var F={element:null,attributes:G};
	if(!F.attributes.type){F.attributes.type="push";}F.element=document.createElement("span");F.element.setAttribute("unselectable","on");F.element.className="yui-button yui-"+F.attributes.type+"-button";F.element.innerHTML="<span class=\"first-child\"><a href=\"#\">LABEL</a></span>";F.attributes.id=B.generateId();YAHOO.widget.ToolbarButton.superclass.constructor.call(this,F.element,F.attributes);};YAHOO.extend(YAHOO.widget.ToolbarButton,YAHOO.util.Element,{buttonType:"normal",_handleMouseOver:function(){if(!this.get("disabled")){this.addClass("yui-button-hover");
	this.addClass("yui-"+this.get("type")+"-button-hover");}},_handleMouseOut:function(){this.removeClass("yui-button-hover");
	this.removeClass("yui-"+this.get("type")+"-button-hover");},checkValue:function(F){if(this.get("type")=="menu"){var E=this._button.options;for(var D=0;D<E.length;D++){if(E[D].value==F){E.selectedIndex=D;}}}},init:function(E,D){YAHOO.widget.ToolbarButton.superclass.init.call(this,E,D);
	this.on("mouseover",this._handleMouseOver,this,true);
	this.on("mouseout",this._handleMouseOut,this,true);},initAttributes:function(D){YAHOO.widget.ToolbarButton.superclass.initAttributes.call(this,D);
	this.setAttributeConfig("value",{value:D.value});
	this.setAttributeConfig("menu",{value:D.menu||false});
	this.setAttributeConfig("type",{value:D.type,writeOnce:true,method:function(H){var G,F;
	if(!this._button){this._button=this.get("element").getElementsByTagName("a")[0];}switch(H){case"select":case"menu":G=document.createElement("select");
	var I=this.get("menu");for(var E=0;E<I.length;E++){F=document.createElement("option");F.innerHTML=I[E].text;F.value=I[E].value;
	if(I[E].checked){F.selected=true;}G.appendChild(F);}this._button.parentNode.replaceChild(G,this._button);A.on(G,"change",this._handleSelect,this,true);
	this._button=G;break;}}});
	this.setAttributeConfig("disabled",{value:D.disabled||false,method:function(E){if(E){this.addClass("yui-button-disabled");
	this.addClass("yui-"+this.get("type")+"-button-disabled");}
	else{this.removeClass("yui-button-disabled");
	this.removeClass("yui-"+this.get("type")+"-button-disabled");}if(this.get("type")=="menu"){this._button.disabled=E;}}});
	this.setAttributeConfig("label",{value:D.label,method:function(E){if(!this._button){this._button=this.get("element").getElementsByTagName("a")[0];}if(this.get("type")=="push"){this._button.innerHTML=E;}}});
	this.setAttributeConfig("title",{value:D.title});
	this.setAttributeConfig("container",{value:null,writeOnce:true,method:function(E){this.appendTo(E);}});},_handleSelect:function(E){var D=A.getTarget(E);
	var F=D.options[D.selectedIndex].value;
	this.fireEvent("change",{type:"change",value:F});},getMenu:function(){return this.get("menu");},fireEvent:function(E,D){if(this.DOM_EVENTS[E]&&this.get("disabled")){return;}YAHOO.widget.ToolbarButton.superclass.fireEvent.call(this,E,D);},toString:function(){return"ToolbarButton ("+this.get("id")+")";}});})();(function(){var B=YAHOO.util.Dom,A=YAHOO.util.Event,D=YAHOO.lang;YAHOO.widget.Toolbar=function(G,F){if(D.isObject(arguments[0])&&!B.get(G).nodeType){F=G;}var I=(F||{});
	var H={element:null,attributes:I};
	if(D.isString(G)&&B.get(G)){H.element=B.get(G);}
	else{if(D.isObject(G)&&B.get(G)&&B.get(G).nodeType){H.element=B.get(G);}}if(!H.element){H.element=document.createElement("DIV");H.element.id=B.generateId();
	if(I.container&&B.get(I.container)){B.get(I.container).appendChild(H.element);}}if(!H.element.id){H.element.id=((D.isString(G))?G:B.generateId());}var E=document.createElement("DIV");H.attributes.cont=E;B.addClass(E,"yui-toolbar-subcont");H.element.appendChild(E);H.attributes.element=H.element;H.attributes.id=H.element.id;YAHOO.widget.Toolbar.superclass.constructor.call(this,H.element,H.attributes);};function C(H,E,I){B.addClass(this.element,"yui-toolbar-"+I.get("value")+"-menu");
	if(B.hasClass(I._button.parentNode.parentNode,"yui-toolbar-select")){B.addClass(this.element,"yui-toolbar-select-menu");}var F=this.getItems();for(var G=0;G<F.length;G++){B.addClass(F[G].element,"yui-toolbar-"+I.get("value")+"-"+((F[G].value)?F[G].value.replace(/ /g,"-").toLowerCase():F[G]._oText.nodeValue.replace(/ /g,"-").toLowerCase()));B.addClass(F[G].element,"yui-toolbar-"+I.get("value")+"-"+((F[G].value)?F[G].value.replace(/ /g,"-"):F[G]._oText.nodeValue.replace(/ /g,"-")));}}YAHOO.extend(YAHOO.widget.Toolbar,YAHOO.util.Element,{buttonType:YAHOO.widget.ToolbarButton,dd:null,_colorData:{"#111111":"Obsidian","#2D2D2D":"Dark Gray","#434343":"Shale","#5B5B5B":"Flint","#737373":"Gray","#8B8B8B":"Concrete","#A2A2A2":"Gray","#B9B9B9":"Titanium","#000000":"Black","#D0D0D0":"Light Gray","#E6E6E6":"Silver","#FFFFFF":"White","#BFBF00":"Pumpkin","#FFFF00":"Yellow","#FFFF40":"Banana","#FFFF80":"Pale Yellow","#FFFFBF":"Butter","#525330":"Raw Siena","#898A49":"Mildew","#AEA945":"Olive","#7F7F00":"Paprika","#C3BE71":"Earth","#E0DCAA":"Khaki","#FCFAE1":"Cream","#60BF00":"Cactus","#80FF00":"Chartreuse","#A0FF40":"Green","#C0FF80":"Pale Lime","#DFFFBF":"Light Mint","#3B5738":"Green","#668F5A":"Lime Gray","#7F9757":"Yellow","#407F00":"Clover","#8A9B55":"Pistachio","#B7C296":"Light Jade","#E6EBD5":"Breakwater","#00BF00":"Spring Frost","#00FF80":"Pastel Green","#40FFA0":"Light Emerald","#80FFC0":"Sea Foam","#BFFFDF":"Sea Mist","#033D21":"Dark Forrest","#438059":"Moss","#7FA37C":"Medium Green","#007F40":"Pine","#8DAE94":"Yellow Gray Green","#ACC6B5":"Aqua Lung","#DDEBE2":"Sea Vapor","#00BFBF":"Fog","#00FFFF":"Cyan","#40FFFF":"Turquoise Blue","#80FFFF":"Light Aqua","#BFFFFF":"Pale Cyan","#033D3D":"Dark Teal","#347D7E":"Gray Turquoise","#609A9F":"Green Blue","#007F7F":"Seaweed","#96BDC4":"Green Gray","#B5D1D7":"Soapstone","#E2F1F4":"Light Turquoise","#0060BF":"Summer Sky","#0080FF":"Sky Blue","#40A0FF":"Electric Blue","#80C0FF":"Light Azure","#BFDFFF":"Ice Blue","#1B2C48":"Navy","#385376":"Biscay","#57708F":"Dusty Blue","#00407F":"Sea Blue","#7792AC":"Sky Blue Gray","#A8BED1":"Morning Sky","#DEEBF6":"Vapor","#0000BF":"Deep Blue","#0000FF":"Blue","#4040FF":"Cerulean Blue","#8080FF":"Evening Blue","#BFBFFF":"Light Blue","#212143":"Deep Indigo","#373E68":"Sea Blue","#444F75":"Night Blue","#00007F":"Indigo Blue","#585E82":"Dockside","#8687A4":"Blue Gray","#D2D1E1":"Light Blue Gray","#6000BF":"Neon Violet","#8000FF":"Blue Violet","#A040FF":"Violet Purple","#C080FF":"Violet Dusk","#DFBFFF":"Pale Lavender","#302449":"Cool Shale","#54466F":"Dark Indigo","#655A7F":"Dark Violet","#40007F":"Violet","#726284":"Smoky Violet","#9E8FA9":"Slate Gray","#DCD1DF":"Violet White","#BF00BF":"Royal Violet","#FF00FF":"Fuchsia","#FF40FF":"Magenta","#FF80FF":"Orchid","#FFBFFF":"Pale Magenta","#4A234A":"Dark Purple","#794A72":"Medium Purple","#936386":"Cool Granite","#7F007F":"Purple","#9D7292":"Purple Moon","#C0A0B6":"Pale Purple","#ECDAE5":"Pink Cloud","#BF005F":"Hot Pink","#FF007F":"Deep Pink","#FF409F":"Grape","#FF80BF":"Electric Pink","#FFBFDF":"Pink","#451528":"Purple Red","#823857":"Purple Dino","#A94A76":"Purple Gray","#7F003F":"Rose","#BC6F95":"Antique Mauve","#D8A5BB":"Cool Marble","#F7DDE9":"Pink Granite","#C00000":"Apple","#FF0000":"Fire Truck","#FF4040":"Pale Red","#FF8080":"Salmon","#FFC0C0":"Warm Pink","#441415":"Sepia","#82393C":"Rust","#AA4D4E":"Brick","#800000":"Brick Red","#BC6E6E":"Mauve","#D8A3A4":"Shrimp Pink","#F8DDDD":"Shell Pink","#BF5F00":"Dark Orange","#FF7F00":"Orange","#FF9F40":"Grapefruit","#FFBF80":"Canteloupe","#FFDFBF":"Wax","#482C1B":"Dark Brick","#855A40":"Dirt","#B27C51":"Tan","#7F3F00":"Nutmeg","#C49B71":"Mustard","#E1C4A8":"Pale Tan","#FDEEE0":"Marble"},_colorPicker:null,STR_COLLAPSE:"Collapse Toolbar",STR_SPIN_LABEL:"Spin Button with value {VALUE}. Use Control Shift Up Arrow and Control Shift Down arrow keys to increase or decrease the value.",STR_SPIN_UP:"Click to increase the value of this input",STR_SPIN_DOWN:"Click to decrease the value of this input",_titlebar:null,browser:YAHOO.env.ua,_buttonList:null,_buttonGroupList:null,_sep:null,_sepCount:null,_dragHandle:null,_toolbarConfigs:{renderer:true},CLASS_CONTAINER:"yui-toolbar-container",CLASS_DRAGHANDLE:"yui-toolbar-draghandle",CLASS_SEPARATOR:"yui-toolbar-separator",CLASS_DISABLED:"yui-toolbar-disabled",CLASS_PREFIX:"yui-toolbar",init:function(F,E){YAHOO.widget.Toolbar.superclass.init.call(this,F,E);},initAttributes:function(E){YAHOO.widget.Toolbar.superclass.initAttributes.call(this,E);
	this.addClass(this.CLASS_CONTAINER);
	this.setAttributeConfig("buttonType",{value:E.buttonType||"basic",writeOnce:true,validator:function(F){switch(F){case"advanced":case"basic":return true;}return false;},method:function(F){if(F=="advanced"){if(YAHOO.widget.Button){this.buttonType=YAHOO.widget.ToolbarButtonAdvanced;}
	else{this.buttonType=YAHOO.widget.ToolbarButton;}}
	else{this.buttonType=YAHOO.widget.ToolbarButton;}}});
	this.setAttributeConfig("buttons",{value:[],writeOnce:true,method:function(G){for(var F in G){if(D.hasOwnProperty(G,F)){if(G[F].type=="separator"){this.addSeparator();}
	else{if(G[F].group!==undefined){this.addButtonGroup(G[F]);}
	else{this.addButton(G[F]);}}}}}});
	this.setAttributeConfig("disabled",{value:false,method:function(F){if(this.get("disabled")===F){return false;}if(F){this.addClass(this.CLASS_DISABLED);
	this.set("draggable",false);
	this.disableAllButtons();}
	else{this.removeClass(this.CLASS_DISABLED);
	if(this._configs.draggable._initialConfig.value){this.set("draggable",true);}this.resetAllButtons();}}});
	this.setAttributeConfig("cont",{value:E.cont,readOnly:true});
	this.setAttributeConfig("grouplabels",{value:((E.grouplabels===false)?false:true),method:function(F){if(F){B.removeClass(this.get("cont"),(this.CLASS_PREFIX+"-nogrouplabels"));}
	else{B.addClass(this.get("cont"),(this.CLASS_PREFIX+"-nogrouplabels"));}}});
	this.setAttributeConfig("titlebar",{value:false,method:function(G){if(G){if(this._titlebar&&this._titlebar.parentNode){this._titlebar.parentNode.removeChild(this._titlebar);}this._titlebar=document.createElement("DIV");B.addClass(this._titlebar,this.CLASS_PREFIX+"-titlebar");
	if(D.isString(G)){var F=document.createElement("h2");F.tabIndex="-1";F.innerHTML=G;
	this._titlebar.appendChild(F);}if(this.get("firstChild")){this.insertBefore(this._titlebar,this.get("firstChild"));}
	else{this.appendChild(this._titlebar);}if(this.get("collapse")){this.set("collapse",true);}}
	else{if(this._titlebar){if(this._titlebar&&this._titlebar.parentNode){this._titlebar.parentNode.removeChild(this._titlebar);}}}}});
	this.setAttributeConfig("collapse",{value:false,method:function(H){if(this._titlebar){var G=null;
	var F=B.getElementsByClassName("collapse","span",this._titlebar);
	if(H){if(F.length>0){return true;}G=document.createElement("SPAN");G.innerHTML="X";G.title=this.STR_COLLAPSE;B.addClass(G,"collapse");
	this._titlebar.appendChild(G);A.addListener(G,"click",function(){if(B.hasClass(this.get("cont").parentNode,"yui-toolbar-container-collapsed")){this.collapse(false);}
	else{this.collapse();}},this,true);}
	else{G=B.getElementsByClassName("collapse","span",this._titlebar);
	if(G[0]){if(B.hasClass(this.get("cont").parentNode,"yui-toolbar-container-collapsed")){this.collapse(false);}G[0].parentNode.removeChild(G[0]);}}}}});
	this.setAttributeConfig("draggable",{value:(E.draggable||false),method:function(F){if(F&&!this.get("titlebar")){if(!this._dragHandle){this._dragHandle=document.createElement("SPAN");
	this._dragHandle.innerHTML="|";
	this._dragHandle.setAttribute("title","Click to drag the toolbar");
	this._dragHandle.id=this.get("id")+"_draghandle";B.addClass(this._dragHandle,this.CLASS_DRAGHANDLE);
	if(this.get("cont").hasChildNodes()){this.get("cont").insertBefore(this._dragHandle,this.get("cont").firstChild);}
	else{this.get("cont").appendChild(this._dragHandle);}this.dd=new YAHOO.util.DD(this.get("id"));
	this.dd.setHandleElId(this._dragHandle.id);}}
	else{if(this._dragHandle){this._dragHandle.parentNode.removeChild(this._dragHandle);
	this._dragHandle=null;
	this.dd=null;}}if(this._titlebar){if(F){this.dd=new YAHOO.util.DD(this.get("id"));
	this.dd.setHandleElId(this._titlebar);B.addClass(this._titlebar,"draggable");}
	else{B.removeClass(this._titlebar,"draggable");
	if(this.dd){this.dd.unreg();
	this.dd=null;}}}},validator:function(G){var F=true;
	if(!YAHOO.util.DD){F=false;}return F;}});},addButtonGroup:function(I){if(!this.get("element")){this._queue[this._queue.length]=["addButtonGroup",arguments];return false;}if(!this.hasClass(this.CLASS_PREFIX+"-grouped")){this.addClass(this.CLASS_PREFIX+"-grouped");}var J=document.createElement("DIV");B.addClass(J,this.CLASS_PREFIX+"-group");B.addClass(J,this.CLASS_PREFIX+"-group-"+I.group);
	if(I.label){var F=document.createElement("h3");F.innerHTML=I.label;J.appendChild(F);}if(!this.get("grouplabels")){B.addClass(this.get("cont"),this.CLASS_PREFIX,"-nogrouplabels");}this.get("cont").appendChild(J);
	var H=document.createElement("ul");J.appendChild(H);
	if(!this._buttonGroupList){this._buttonGroupList={};}this._buttonGroupList[I.group]=H;for(var G=0;G<I.buttons.length;G++){var E=document.createElement("li");E.className=this.CLASS_PREFIX+"-groupitem";H.appendChild(E);
	if((I.buttons[G].type!==undefined)&&I.buttons[G].type=="separator"){this.addSeparator(E);}
	else{I.buttons[G].container=E;
	this.addButton(I.buttons[G]);}}},addButtonToGroup:function(G,H,I){var F=this._buttonGroupList[H];
	var E=document.createElement("li");E.className=this.CLASS_PREFIX+"-groupitem";G.container=E;
	this.addButton(G,I);F.appendChild(E);},addButton:function(J,I){if(!this.get("element")){this._queue[this._queue.length]=["addButton",arguments];return false;}if(!this._buttonList){this._buttonList=[];}if(!J.container){J.container=this.get("cont");}if((J.type=="menu")||(J.type=="split")||(J.type=="select")){if(D.isArray(J.menu)){for(var P in J.menu){if(D.hasOwnProperty(J.menu,P)){var V={fn:function(Y,W,X){if(!J.menucmd){J.menucmd=J.value;}J.value=((X.value)?X.value:X._oText.nodeValue);},scope:this};J.menu[P].onclick=V;}}}}var Q={},N=false;for(var L in J){if(D.hasOwnProperty(J,L)){if(!this._toolbarConfigs[L]){Q[L]=J[L];}}}if(J.type=="select"){Q.type="menu";}if(J.type=="spin"){Q.type="push";}if(Q.type=="color"){if(YAHOO.widget.Overlay){Q=this._makeColorButton(Q);}
	else{N=true;}}if(Q.menu){if((YAHOO.widget.Overlay)&&(J.menu instanceof YAHOO.widget.Overlay)){J.menu.showEvent.subscribe(function(){this._button=Q;});}
	else{for(var O=0;O<Q.menu.length;O++){if(!Q.menu[O].value){Q.menu[O].value=Q.menu[O].text;}}if(this.browser.webkit){Q.focusmenu=false;}}}if(N){J=false;}
	else{this._configs.buttons.value[this._configs.buttons.value.length]=J;
	var T=new this.buttonType(Q);
	if(!T.buttonType){T.buttonType="rich";T.checkValue=function(Y){var X=this.getMenu().getItems();
	if(X.length===0){this.getMenu()._onBeforeShow();X=this.getMenu().getItems();}for(var W=0;W<X.length;W++){X[W].cfg.setProperty("checked",false);
	if(X[W].value==Y){X[W].cfg.setProperty("checked",true);}}};}if(this.get("disabled")){T.set("disabled",true);}if(!J.id){J.id=T.get("id");}if(I){var F=T.get("element");
	var M=null;
	if(I.get){M=I.get("element").nextSibling;}
	else{if(I.nextSibling){M=I.nextSibling;}}if(M){M.parentNode.insertBefore(F,M);}}T.addClass(this.CLASS_PREFIX+"-"+T.get("value"));
	var S=document.createElement("span");S.className=this.CLASS_PREFIX+"-icon";T.get("element").insertBefore(S,T.get("firstChild"));
	if(T._button.tagName.toLowerCase()=="button"){T.get("element").setAttribute("unselectable","on");
	var U=document.createElement("a");U.innerHTML=T._button.innerHTML;U.href="#";A.on(U,"click",function(W){A.stopEvent(W);});T._button.parentNode.replaceChild(U,T._button);T._button=U;}if(J.type=="select"){if(T._button.tagName.toLowerCase()=="select"){S.parentNode.removeChild(S);
	var G=T._button;
	var R=T.get("element");R.parentNode.replaceChild(G,R);}
	else{T.addClass(this.CLASS_PREFIX+"-select");}}if(J.type=="spin"){if(!D.isArray(J.range)){J.range=[10,100];}this._makeSpinButton(T,J);}T.get("element").setAttribute("title",T.get("label"));
	if(J.type!="spin"){if((YAHOO.widget.Overlay)&&(Q.menu instanceof YAHOO.widget.Overlay)){var H=function(Y){var W=true;
	if(Y.keyCode&&(Y.keyCode==9)){W=false;}if(W){if(this._colorPicker){this._colorPicker._button=J.value;}var X=T.getMenu().element;
	if(B.getStyle(X,"visibility")=="hidden"){T.getMenu().show();}
	else{T.getMenu().hide();}}YAHOO.util.Event.stopEvent(Y);};T.on("mousedown",H,J,this);T.on("keydown",H,J,this);}
	else{if((J.type!="menu")&&(J.type!="select")){T.on("keypress",this._buttonClick,J,this);T.on("mousedown",function(W){YAHOO.util.Event.stopEvent(W);
	this._buttonClick(W,J);},J,this);T.on("click",function(W){YAHOO.util.Event.stopEvent(W);});}
	else{T.on("mousedown",function(W){YAHOO.util.Event.stopEvent(W);});T.on("click",function(W){YAHOO.util.Event.stopEvent(W);});T.on("change",function(W){if(!J.menucmd){J.menucmd=J.value;}J.value=W.value;
	this._buttonClick(W,J);},this,true);
	var K=this;
	if(T.getMenu().mouseDownEvent){T.getMenu().mouseDownEvent.subscribe(function(Y,X){var W=X[1];YAHOO.util.Event.stopEvent(X[0]);T._onMenuClick(X[0],T);
	if(!J.menucmd){J.menucmd=J.value;}J.value=((W.value)?W.value:W._oText.nodeValue);K._buttonClick.call(K,X[1],J);T._hideMenu();return false;});T.getMenu().clickEvent.subscribe(function(X,W){YAHOO.util.Event.stopEvent(W[0]);});T.getMenu().mouseUpEvent.subscribe(function(X,W){YAHOO.util.Event.stopEvent(W[0]);});}}}}
	else{T.on("mousedown",function(W){YAHOO.util.Event.stopEvent(W);});T.on("click",function(W){YAHOO.util.Event.stopEvent(W);});}if(this.browser.ie){T.DOM_EVENTS.focusin=true;T.DOM_EVENTS.focusout=true;T.on("focusin",function(W){YAHOO.util.Event.stopEvent(W);},J,this);T.on("focusout",function(W){YAHOO.util.Event.stopEvent(W);},J,this);T.on("click",function(W){YAHOO.util.Event.stopEvent(W);},J,this);}if(this.browser.webkit){T.hasFocus=function(){return true;};}this._buttonList[this._buttonList.length]=T;
	if((J.type=="menu")||(J.type=="split")||(J.type=="select")){if(D.isArray(J.menu)){var E=T.getMenu();
	if(E.renderEvent){E.renderEvent.subscribe(C,T);
	if(J.renderer){E.renderEvent.subscribe(J.renderer,T);}}}}}return J;},addSeparator:function(E,H){if(!this.get("element")){this._queue[this._queue.length]=["addSeparator",arguments];return false;}var F=((E)?E:this.get("cont"));
	if(!this.get("element")){this._queue[this._queue.length]=["addSeparator",arguments];return false;}if(this._sepCount===null){this._sepCount=0;}if(!this._sep){this._sep=document.createElement("SPAN");B.addClass(this._sep,this.CLASS_SEPARATOR);
	this._sep.innerHTML="|";}var G=this._sep.cloneNode(true);
	this._sepCount++;B.addClass(G,this.CLASS_SEPARATOR+"-"+this._sepCount);
	if(H){var I=null;
	if(H.get){I=H.get("element").nextSibling;}
	else{if(H.nextSibling){I=H.nextSibling;}
	else{I=H;}}if(I){if(I==H){I.parentNode.appendChild(G);}
	else{I.parentNode.insertBefore(G,I);}}}
	else{F.appendChild(G);}return G;},_createColorPicker:function(H){if(B.get(H+"_colors")){B.get(H+"_colors").parentNode.removeChild(B.get(H+"_colors"));}var E=document.createElement("div");E.className="yui-toolbar-colors";E.id=H+"_colors";E.style.display="none";A.on(window,"load",function(){document.body.appendChild(E);},this,true);
	this._colorPicker=E;
	var G="";for(var F in this._colorData){if(D.hasOwnProperty(this._colorData,F)){G+="<a style=\"background-color: "+F+"\" href=\"#\">"+F.replace("#","")+"</a>";}}G+="<span><em>X</em><strong></strong></span>";window.setTimeout(function(){E.innerHTML=G;},0);A.on(E,"mouseover",function(M){var K=this._colorPicker;
	var L=K.getElementsByTagName("em")[0];
	var J=K.getElementsByTagName("strong")[0];
	var I=A.getTarget(M);
	if(I.tagName.toLowerCase()=="a"){L.style.backgroundColor=I.style.backgroundColor;J.innerHTML=this._colorData["#"+I.innerHTML]+"<br>"+I.innerHTML;}},this,true);A.on(E,"focus",function(I){A.stopEvent(I);});A.on(E,"click",function(I){A.stopEvent(I);});A.on(E,"mousedown",function(J){A.stopEvent(J);
	var I=A.getTarget(J);
	if(I.tagName.toLowerCase()=="a"){var L=this.fireEvent("colorPickerClicked",{type:"colorPickerClicked",target:this,button:this._colorPicker._button,color:I.innerHTML,colorName:this._colorData["#"+I.innerHTML]});
	if(L!==false){var K={color:I.innerHTML,colorName:this._colorData["#"+I.innerHTML],value:this._colorPicker._button};
	this.fireEvent("buttonClick",{type:"buttonClick",target:this.get("element"),button:K});}this.getButtonByValue(this._colorPicker._button).getMenu().hide();}},this,true);},_resetColorPicker:function(){var F=this._colorPicker.getElementsByTagName("em")[0];
	var E=this._colorPicker.getElementsByTagName("strong")[0];F.style.backgroundColor="transparent";E.innerHTML="";},_makeColorButton:function(E){if(!this._colorPicker){this._createColorPicker(this.get("id"));}E.type="color";E.menu=new YAHOO.widget.Overlay(this.get("id")+"_"+E.value+"_menu",{visible:false,position:"absolute",iframe:true});E.menu.setBody("");E.menu.render(this.get("cont"));B.addClass(E.menu.element,"yui-button-menu");B.addClass(E.menu.element,"yui-color-button-menu");E.menu.beforeShowEvent.subscribe(function(){E.menu.cfg.setProperty("zindex",5);E.menu.cfg.setProperty("context",[this.getButtonById(E.id).get("element"),"tl","bl"]);
	this._resetColorPicker();
	var F=this._colorPicker;
	if(F.parentNode){F.parentNode.removeChild(F);}E.menu.setBody("");E.menu.appendToBody(F);
	this._colorPicker.style.display="block";},this,true);return E;},_makeSpinButton:function(R,L){R.addClass(this.CLASS_PREFIX+"-spinbutton");
	var S=this,N=R._button.parentNode.parentNode,I=L.range,H=document.createElement("a"),G=document.createElement("a");H.href="#";G.href="#";H.className="up";H.title=this.STR_SPIN_UP;H.innerHTML=this.STR_SPIN_UP;G.className="down";G.title=this.STR_SPIN_DOWN;G.innerHTML=this.STR_SPIN_DOWN;N.appendChild(H);N.appendChild(G);
	var M=YAHOO.lang.substitute(this.STR_SPIN_LABEL,{VALUE:R.get("label")});R.set("title",M);
	var Q=function(T){T=((T<I[0])?I[0]:T);T=((T>I[1])?I[1]:T);return T;};
	var P=this.browser;
	var F=false;
	var K=this.STR_SPIN_LABEL;
	if(this._titlebar&&this._titlebar.firstChild){F=this._titlebar.firstChild;}var E=function(U){YAHOO.util.Event.stopEvent(U);
	if(!R.get("disabled")&&(U.keyCode!=9)){var V=parseInt(R.get("label"),10);V++;V=Q(V);R.set("label",""+V);
	var T=YAHOO.lang.substitute(K,{VALUE:R.get("label")});R.set("title",T);
	if(!P.webkit&&F){}S._buttonClick(U,L);}};
	var O=function(U){YAHOO.util.Event.stopEvent(U);
	if(!R.get("disabled")&&(U.keyCode!=9)){var V=parseInt(R.get("label"),10);V--;V=Q(V);R.set("label",""+V);
	var T=YAHOO.lang.substitute(K,{VALUE:R.get("label")});R.set("title",T);
	if(!P.webkit&&F){}S._buttonClick(U,L);}};
	var J=function(T){if(T.keyCode==38){E(T);}
	else{if(T.keyCode==40){O(T);}
	else{if(T.keyCode==107&&T.shiftKey){E(T);}
	else{if(T.keyCode==109&&T.shiftKey){O(T);}}}}};R.on("keydown",J,this,true);A.on(H,"mousedown",function(T){A.stopEvent(T);},this,true);A.on(G,"mousedown",function(T){A.stopEvent(T);},this,true);A.on(H,"click",E,this,true);A.on(G,"click",O,this,true);},_buttonClick:function(L,F){var E=true;
	if(L&&L.type=="keypress"){if(L.keyCode==9){E=false;}
	else{if((L.keyCode===13)||(L.keyCode===0)||(L.keyCode===32)){}
	else{E=false;}}}if(E){var N=true,H=false;
	if(F.value){H=this.fireEvent(F.value+"Click",{type:F.value+"Click",target:this.get("element"),button:F});
	if(H===false){N=false;}}if(F.menucmd&&N){H=this.fireEvent(F.menucmd+"Click",{type:F.menucmd+"Click",target:this.get("element"),button:F});
	if(H===false){N=false;}}if(N){this.fireEvent("buttonClick",{type:"buttonClick",target:this.get("element"),button:F});}if(F.type=="select"){var K=this.getButtonById(F.id);
	if(K.buttonType=="rich"){var J=F.value;for(var I=0;I<F.menu.length;I++){if(F.menu[I].value==F.value){J=F.menu[I].text;break;}}K.set("label","<span class=\"yui-toolbar-"+F.menucmd+"-"+(F.value).replace(/ /g,"-").toLowerCase()+"\">"+J+"</span>");
	var M=K.getMenu().getItems();for(var G=0;G<M.length;G++){if(M[G].value.toLowerCase()==F.value.toLowerCase()){M[G].cfg.setProperty("checked",true);}
	else{M[G].cfg.setProperty("checked",false);}}}}}if(L){A.stopEvent(L);}},getButtonById:function(G){var E=this._buttonList.length;for(var F=0;F<E;F++){if(this._buttonList[F].get("id")==G){return this._buttonList[F];}}return false;},getButtonByValue:function(K){var H=this.get("buttons");
	var F=H.length;for(var I=0;I<F;I++){if(H[I].group!==undefined){for(var E=0;E<H[I].buttons.length;E++){if((H[I].buttons[E].value==K)||(H[I].buttons[E].menucmd==K)){return this.getButtonById(H[I].buttons[E].id);}if(H[I].buttons[E].menu){for(var J=0;J<H[I].buttons[E].menu.length;J++){if(H[I].buttons[E].menu[J].value==K){return this.getButtonById(H[I].buttons[E].id);}}}}}
	else{if((H[I].value==K)||(H[I].menucmd==K)){return this.getButtonById(H[I].id);}if(H[I].menu){for(var G=0;G<H[I].menu.length;G++){if(H[I].menu[G].value==K){return this.getButtonById(H[I].id);}}}}}return false;},getButtonByIndex:function(E){if(this._buttonList[E]){return this._buttonList[E];}
	else{return false;}},getButtons:function(){return this._buttonList;},disableButton:function(F){var E=F;
	if(D.isString(F)){E=this.getButtonById(F);}if(D.isNumber(F)){E=this.getButtonByIndex(F);}if((!(E instanceof YAHOO.widget.ToolbarButton))&&(!(E instanceof YAHOO.widget.ToolbarButtonAdvanced))){E=this.getButtonByValue(F);}if((E instanceof YAHOO.widget.ToolbarButton)||(E instanceof YAHOO.widget.ToolbarButtonAdvanced)){E.set("disabled",true);}
	else{return false;}},enableButton:function(F){if(this.get("disabled")){return false;}var E=F;
	if(D.isString(F)){E=this.getButtonById(F);}if(D.isNumber(F)){E=this.getButtonByIndex(F);}if((!(E instanceof YAHOO.widget.ToolbarButton))&&(!(E instanceof YAHOO.widget.ToolbarButtonAdvanced))){E=this.getButtonByValue(F);}if((E instanceof YAHOO.widget.ToolbarButton)||(E instanceof YAHOO.widget.ToolbarButtonAdvanced)){if(E.get("disabled")){E.set("disabled",false);}}
	else{return false;}},selectButton:function(I,G){var F=I;
	if(I){if(D.isString(I)){F=this.getButtonById(I);}if(D.isNumber(I)){F=this.getButtonByIndex(I);}if((!(F instanceof YAHOO.widget.ToolbarButton))&&(!(F instanceof YAHOO.widget.ToolbarButtonAdvanced))){F=this.getButtonByValue(I);}if((F instanceof YAHOO.widget.ToolbarButton)||(F instanceof YAHOO.widget.ToolbarButtonAdvanced)){F.addClass("yui-button-selected");F.addClass("yui-button-"+F.get("value")+"-selected");
	if(G){if(F.buttonType=="rich"){var H=F.getMenu().getItems();for(var E=0;E<H.length;E++){if(H[E].value==G){H[E].cfg.setProperty("checked",true);F.set("label","<span class=\"yui-toolbar-"+F.get("value")+"-"+(G).replace(/ /g,"-").toLowerCase()+"\">"+H[E]._oText.nodeValue+"</span>");}
	else{H[E].cfg.setProperty("checked",false);}}}}}
	else{return false;}}},deselectButton:function(F){var E=F;
	if(D.isString(F)){E=this.getButtonById(F);}if(D.isNumber(F)){E=this.getButtonByIndex(F);}if((!(E instanceof YAHOO.widget.ToolbarButton))&&(!(E instanceof YAHOO.widget.ToolbarButtonAdvanced))){E=this.getButtonByValue(F);}if((E instanceof YAHOO.widget.ToolbarButton)||(E instanceof YAHOO.widget.ToolbarButtonAdvanced)){E.removeClass("yui-button-selected");E.removeClass("yui-button-"+E.get("value")+"-selected");E.removeClass("yui-button-hover");}
	else{return false;}},deselectAllButtons:function(){var E=this._buttonList.length;for(var F=0;F<E;F++){this.deselectButton(this._buttonList[F]);}},disableAllButtons:function(){if(this.get("disabled")){return false;}var E=this._buttonList.length;for(var F=0;F<E;F++){this.disableButton(this._buttonList[F]);}},enableAllButtons:function(){if(this.get("disabled")){return false;}var E=this._buttonList.length;for(var F=0;F<E;F++){this.enableButton(this._buttonList[F]);}},resetAllButtons:function(I){if(!D.isObject(I)){I={};}if(this.get("disabled")){return false;}var E=this._buttonList.length;for(var F=0;F<E;F++){var H=this._buttonList[F];
	var G=H._configs.disabled._initialConfig.value;
	if(I[H.get("id")]){this.enableButton(H);
	this.selectButton(H);}
	else{if(G){this.disableButton(H);}
	else{this.enableButton(H);}this.deselectButton(H);}}},destroyButton:function(I){var G=I;
	if(D.isString(I)){G=this.getButtonById(I);}if(D.isNumber(I)){G=this.getButtonByIndex(I);}if((!(G instanceof YAHOO.widget.ToolbarButton))&&(!(G instanceof YAHOO.widget.ToolbarButtonAdvanced))){G=this.getButtonByValue(I);}if((G instanceof YAHOO.widget.ToolbarButton)||(G instanceof YAHOO.widget.ToolbarButtonAdvanced)){var H=G.get("id");G.destroy();
	var E=this._buttonList.length;for(var F=0;F<E;F++){if(this._buttonList[F].get("id")==H){this._buttonList[F]=null;}}}
	else{return false;}},destroy:function(){this.get("element").innerHTML="";
	this.get("element").className="";for(var E in this){if(D.hasOwnProperty(this,E)){this[E]=null;}}return true;},collapse:function(F){var E=B.getElementsByClassName("collapse","span",this._titlebar);
	if(F===false){B.removeClass(this.get("cont").parentNode,"yui-toolbar-container-collapsed");
	if(E[0]){B.removeClass(E[0],"collapsed");}this.fireEvent("toolbarExpanded",{type:"toolbarExpanded",target:this});}
	else{if(E[0]){B.addClass(E[0],"collapsed");}B.addClass(this.get("cont").parentNode,"yui-toolbar-container-collapsed");
	this.fireEvent("toolbarCollapsed",{type:"toolbarCollapsed",target:this});}},toString:function(){return"Toolbar (#"+this.get("element").id+") with "+this._buttonList.length+" buttons.";}});})();(function(){var C=YAHOO.util.Dom,A=YAHOO.util.Event,D=YAHOO.lang,B=YAHOO.widget.Toolbar;YAHOO.widget.SimpleEditor=function(I,N){var H={};
	if(D.isObject(I)&&(!I.tagName)&&!N){D.augmentObject(H,I);I=document.createElement("textarea");
	this.DOMReady=true;
	if(H.container){var L=C.get(H.container);L.appendChild(I);}
	else{document.body.appendChild(I);}}
	else{D.augmentObject(H,N);}var J={element:null,attributes:H},G=null;
	if(D.isString(I)){G=I;}
	else{if(J.attributes.id){G=J.attributes.id;}
	else{G=C.generateId(I);}}J.element=I;
	var K=document.createElement("DIV");J.attributes.element_cont=new YAHOO.util.Element(K,{id:G+"_container"});
	var F=document.createElement("div");C.addClass(F,"first-child");J.attributes.element_cont.appendChild(F);
	if(!J.attributes.toolbar_cont){J.attributes.toolbar_cont=document.createElement("DIV");J.attributes.toolbar_cont.id=G+"_toolbar";F.appendChild(J.attributes.toolbar_cont);}var M=document.createElement("DIV");F.appendChild(M);J.attributes.editor_wrapper=M;YAHOO.widget.SimpleEditor.superclass.constructor.call(this,J.element,J.attributes);};function E(F){return F.replace(/ /g,"-").toLowerCase();}YAHOO.extend(YAHOO.widget.SimpleEditor,YAHOO.util.Element,{_docType:"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">",editorDirty:null,_defaultCSS:"html { height: 95%; } body { padding: 7px; background-color: #fff; font:13px/1.22 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small; } a { color: blue; text-decoration: underline; cursor: pointer; } .warning-localfile { border-bottom: 1px dashed red !important; } .yui-busy { cursor: wait !important; } img.selected { border: 2px dotted #808080; } img { cursor: pointer !important; border: none; }",_defaultToolbar:null,_lastButton:null,_baseHREF:function(){var F=document.location.href;
	if(F.indexOf("?")!==-1){F=F.substring(0,F.indexOf("?"));}F=F.substring(0,F.lastIndexOf("/"))+"/";return F;}(),_lastImage:null,_blankImageLoaded:null,_fixNodesTimer:null,_nodeChangeTimer:null,_lastNodeChangeEvent:null,_lastNodeChange:0,_rendered:null,DOMReady:null,_selection:null,_mask:null,_showingHiddenElements:null,currentWindow:null,currentEvent:null,operaEvent:null,currentFont:null,currentElement:null,dompath:null,beforeElement:null,afterElement:null,invalidHTML:{form:true,input:true,button:true,select:true,link:true,html:true,body:true,iframe:true,script:true,style:true,textarea:true},toolbar:null,_contentTimer:null,_contentTimerCounter:0,_disabled:["createlink","fontname","fontsize","forecolor","backcolor"],_alwaysDisabled:{},_alwaysEnabled:{},_semantic:{"bold":true,"italic":true,"underline":true},_tag2cmd:{"b":"bold","strong":"bold","i":"italic","em":"italic","u":"underline","sup":"superscript","sub":"subscript","img":"insertimage","a":"createlink","ul":"insertunorderedlist","ol":"insertorderedlist"},_createIframe:function(){var J=document.createElement("iframe");J.id=this.get("id")+"_editor";
	var H={border:"0",frameBorder:"0",marginWidth:"0",marginHeight:"0",leftMargin:"0",topMargin:"0",allowTransparency:"true",width:"100%"};
	if(this.get("autoHeight")){H.scrolling="no";}for(var I in H){if(D.hasOwnProperty(H,I)){J.setAttribute(I,H[I]);}}var G="javascript:;";
	if(this.browser.ie){G="about:blank";}J.setAttribute("src",G);
	var F=new YAHOO.util.Element(J);return F;},_isElement:function(G,F){if(G&&G.tagName&&(G.tagName.toLowerCase()==F)){return true;}if(G&&G.getAttribute&&(G.getAttribute("tag")==F)){return true;}return false;},_hasParent:function(G,F){if(!G||!G.parentNode){return false;}while(G.parentNode){if(this._isElement(G,F)){return G;}if(G.parentNode){G=G.parentNode;}
	else{return false;}}return false;},_getDoc:function(){var F=false;
	if(this.get){if(this.get("iframe")){if(this.get("iframe").get){if(this.get("iframe").get("element")){try{if(this.get("iframe").get("element").contentWindow){if(this.get("iframe").get("element").contentWindow.document){F=this.get("iframe").get("element").contentWindow.document;return F;}}}catch(G){}}}}}return false;},_getWindow:function(){return this.get("iframe").get("element").contentWindow;},_focusWindow:function(F){if(this.browser.webkit){if(F){this._getSelection().setBaseAndExtent(this._getDoc().body.firstChild,0,this._getDoc().body.firstChild,1);
	if(this.browser.webkit3){this._getSelection().collapseToStart();}
	else{this._getSelection().collapse(false);}}
	else{this._getSelection().setBaseAndExtent(this._getDoc().body,1,this._getDoc().body,1);
	if(this.browser.webkit3){this._getSelection().collapseToStart();}
	else{this._getSelection().collapse(false);}}this._getWindow().focus();}
	else{this._getWindow().focus();}},_hasSelection:function(){var H=this._getSelection();
	var F=this._getRange();
	var G=false;
	if(!H||!F){return G;}if(this.browser.ie||this.browser.opera){if(F.text){G=true;}if(F.html){G=true;}}
	else{if(this.browser.webkit){if(H+""!==""){G=true;}}
	else{if(H&&(H.toString()!=="")&&(H!==undefined)){G=true;}}}return G;},_getSelection:function(){var F=null;
	if(this._getDoc()&&this._getWindow()){if(this._getDoc().selection){F=this._getDoc().selection;}
	else{F=this._getWindow().getSelection();}if(this.browser.webkit){if(F.baseNode){this._selection={};
	this._selection.baseNode=F.baseNode;
	this._selection.baseOffset=F.baseOffset;
	this._selection.extentNode=F.extentNode;
	this._selection.extentOffset=F.extentOffset;}
	else{if(this._selection!==null){F=this._getWindow().getSelection();F.setBaseAndExtent(this._selection.baseNode,this._selection.baseOffset,this._selection.extentNode,this._selection.extentOffset);
	this._selection=null;}}}}return F;},_selectNode:function(G){if(!G){return false;}var H=this._getSelection(),F=null;
	if(this.browser.ie){try{F=this._getDoc().body.createTextRange();F.moveToElementText(G);F.select();}catch(I){}}
	else{if(this.browser.webkit){H.setBaseAndExtent(G,0,G,G.innerText.length);}
	else{if(this.browser.opera){H=this._getWindow().getSelection();F=this._getDoc().createRange();F.selectNode(G);H.removeAllRanges();H.addRange(F);}
	else{F=this._getDoc().createRange();F.selectNodeContents(G);H.removeAllRanges();H.addRange(F);}}}},_getRange:function(){var F=this._getSelection();
	if(F===null){return null;}if(this.browser.webkit&&!F.getRangeAt){var H=this._getDoc().createRange();try{H.setStart(F.anchorNode,F.anchorOffset);H.setEnd(F.focusNode,F.focusOffset);}catch(G){H=this._getWindow().getSelection()+"";}return H;}if(this.browser.ie||this.browser.opera){try{return F.createRange();}catch(G){return null;}}if(F.rangeCount>0){return F.getRangeAt(0);}return null;},_setDesignMode:function(F){try{var H=true;
	if(this.browser.ie&&(F.toLowerCase()=="off")){H=false;}if(H){this._getDoc().designMode=F;}}catch(G){}},_toggleDesignMode:function(){var G=this._getDoc().designMode.toLowerCase(),F="on";
	if(G=="on"){F="off";}this._setDesignMode(F);return F;},_initEditor:function(){if(this.browser.ie){this._getDoc().body.style.margin="0";}if(!this.get("disabled")){if(this._getDoc().designMode.toLowerCase()!="on"){this._setDesignMode("on");
	this._contentTimerCounter=0;}}if(!this._getDoc().body){this._contentTimerCounter=0;
	this._checkLoaded();return false;}this.toolbar.on("buttonClick",this._handleToolbarClick,this,true);A.on(this._getDoc(),"mouseup",this._handleMouseUp,this,true);A.on(this._getDoc(),"mousedown",this._handleMouseDown,this,true);A.on(this._getDoc(),"click",this._handleClick,this,true);A.on(this._getDoc(),"dblclick",this._handleDoubleClick,this,true);A.on(this._getDoc(),"keypress",this._handleKeyPress,this,true);A.on(this._getDoc(),"keyup",this._handleKeyUp,this,true);A.on(this._getDoc(),"keydown",this._handleKeyDown,this,true);
	if(!this.get("disabled")){this.toolbar.set("disabled",false);}this.fireEvent("editorContentLoaded",{type:"editorLoaded",target:this});
	if(this.get("dompath")){var F=this;setTimeout(function(){F._writeDomPath.call(F);},150);}this.nodeChange(true);
	this._setBusy(true);},_checkLoaded:function(){this._contentTimerCounter++;
	if(this._contentTimer){clearTimeout(this._contentTimer);}if(this._contentTimerCounter>500){return false;}var H=false;try{if(this._getDoc()&&this._getDoc().body){if(this.browser.ie){if(this._getDoc().body.readyState=="complete"){H=true;}}
	else{if(this._getDoc().body._rteLoaded===true){H=true;}}}}catch(G){H=false;}if(H===true){this._initEditor();}
	else{var F=this;
	this._contentTimer=setTimeout(function(){F._checkLoaded.call(F);},20);}},_setInitialContent:function(){var G=D.substitute(this.get("html"),{TITLE:this.STR_TITLE,CONTENT:this._cleanIncomingHTML(this.get("element").value),CSS:this.get("css"),HIDDEN_CSS:((this.get("hiddencss"))?this.get("hiddencss"):"/* No Hidden CSS */"),EXTRA_CSS:((this.get("extracss"))?this.get("extracss"):"/* No Extra CSS */")}),F=true;
	if(document.compatMode!="BackCompat"){G=this._docType+"\n"+G;}
	else{}if(this.browser.ie||this.browser.webkit||this.browser.opera||(navigator.userAgent.indexOf("Firefox/1.5")!=-1)){try{this._getDoc().open();
	this._getDoc().write(G);
	this._getDoc().close();}catch(H){F=false;}}
	else{this.get("iframe").get("element").src="data:text/html;charset=utf-8,"+encodeURIComponent(G);}if(F){this._checkLoaded();}},_setMarkupType:function(F){switch(this.get("markup")){case"css":this._setEditorStyle(true);break;case"default":this._setEditorStyle(false);break;case"semantic":case"xhtml":if(this._semantic[F]){this._setEditorStyle(false);}
	else{this._setEditorStyle(true);}break;}},_setEditorStyle:function(G){try{this._getDoc().execCommand("useCSS",false,!G);}catch(F){}},_getSelectedElement:function(){var I=this._getDoc(),F=null,G=null,J=null;
	if(this.browser.ie){this.currentEvent=this._getWindow().event;F=this._getRange();
	if(F){J=F.item?F.item(0):F.parentElement();
	if(J==I.body){J=null;}}if((this.currentEvent!==null)&&(this.currentEvent.keyCode===0)){J=A.getTarget(this.currentEvent);}}
	else{G=this._getSelection();F=this._getRange();
	if(!G||!F){return null;}if(!this._hasSelection()){if(G.anchorNode&&(G.anchorNode.nodeType==3)){if(G.anchorNode.parentNode){J=G.anchorNode.parentNode;}if(G.anchorNode.nextSibling!=G.focusNode.nextSibling){J=G.anchorNode.nextSibling;}}if(this._isElement(J,"br")){J=null;}if(!J){J=F.commonAncestorContainer;
	if(!F.collapsed){if(F.startContainer==F.endContainer){if(F.startOffset-F.endOffset<2){if(F.startContainer.hasChildNodes()){J=F.startContainer.childNodes[F.startOffset];}}}}}}}if(this.currentEvent!==null){try{switch(this.currentEvent.type){case"click":case"mousedown":case"mouseup":J=A.getTarget(this.currentEvent);break;default:break;}}catch(H){}}
	else{if((this.currentElement&&this.currentElement[0])&&(!this.browser.ie)){J=this.currentElement[0];}}if(this.browser.opera||this.browser.webkit){if(this.currentEvent&&!J){J=YAHOO.util.Event.getTarget(this.currentEvent);}}if(!J||!J.tagName){J=I.body;}if(this._isElement(J,"html")){J=I.body;}if(this._isElement(J,"body")){J=I.body;}if(J&&!J.parentNode){J=I.body;}if(J===undefined){J=null;}return J;},_getDomPath:function(F){if(!F){F=this._getSelectedElement();}var G=[];while(F!==null){if(F.ownerDocument!=this._getDoc()){F=null;break;}if(F.nodeName&&F.nodeType&&(F.nodeType==1)){G[G.length]=F;}if(this._isElement(F,"body")){break;}F=F.parentNode;}if(G.length===0){if(this._getDoc()&&this._getDoc().body){G[0]=this._getDoc().body;}}return G.reverse();},_writeDomPath:function(){var L=this._getDomPath(),J=[],H="",M="";for(var F=0;F<L.length;F++){var N=L[F].tagName.toLowerCase();
	if((N=="ol")&&(L[F].type)){N+=":"+L[F].type;}if(C.hasClass(L[F],"yui-tag")){N=L[F].getAttribute("tag");}if((this.get("markup")=="semantic")||(this.get("markup")=="xhtml")){switch(N){case"b":N="strong";break;case"i":N="em";break;}}if(!C.hasClass(L[F],"yui-non")){if(C.hasClass(L[F],"yui-tag")){M=N;}
	else{H=((L[F].className!=="")?"."+L[F].className.replace(/ /g,"."):"");
	if((H.indexOf("yui")!=-1)||(H.toLowerCase().indexOf("apple-style-span")!=-1)){H="";}M=N+((L[F].id)?"#"+L[F].id:"")+H;}switch(N){case"a":if(L[F].getAttribute("href",2)){M+=":"+L[F].getAttribute("href",2).replace("mailto:","").replace("http://","").replace("https://","");}break;case"img":var G=L[F].height;
	var K=L[F].width;
	if(L[F].style.height){G=parseInt(L[F].style.height,10);}if(L[F].style.width){K=parseInt(L[F].style.width,10);}M+="("+G+"x"+K+")";break;}if(M.length>10){M="<span title=\""+M+"\">"+M.substring(0,10)+"...</span>";}
	else{M="<span title=\""+M+"\">"+M+"</span>";}J[J.length]=M;}}var I=J.join(" "+this.SEP_DOMPATH+" ");
	if(this.dompath.innerHTML!=I){this.dompath.innerHTML=I;}},_fixNodes:function(){var K=this._getDoc(),I=[];for(var F in this.invalidHTML){if(YAHOO.lang.hasOwnProperty(this.invalidHTML,F)){if(F.toLowerCase()!="span"){var G=K.body.getElementsByTagName(F);
	if(G.length){for(var H=0;H<G.length;H++){I.push(G[H]);}}}}}for(var J=0;J<I.length;J++){if(I[J].parentNode){if(D.isObject(this.invalidHTML[I[J].tagName.toLowerCase()])&&this.invalidHTML[I[J].tagName.toLowerCase()].keepContents){this._swapEl(I[J],"span",function(M){M.className="yui-non";});}
	else{I[J].parentNode.removeChild(I[J]);}}}var L=this._getDoc().getElementsByTagName("img");C.addClass(L,"yui-img");},_isNonEditable:function(H){if(this.get("allowNoEdit")){var G=A.getTarget(H);
	if(this._isElement(G,"html")){G=null;}var J=this._getDomPath(G);for(var F=(J.length-1);F>-1;F--){if(C.hasClass(J[F],this.CLASS_NOEDIT)){try{this._getDoc().execCommand("enableObjectResizing",false,"false");}catch(I){}this.nodeChange();A.stopEvent(H);return true;}}try{this._getDoc().execCommand("enableObjectResizing",false,"true");}catch(I){}}return false;},_setCurrentEvent:function(F){this.currentEvent=F;},_handleClick:function(G){if(this._isNonEditable(G)){return false;}this._setCurrentEvent(G);
	if(this.currentWindow){this.closeWindow();}if(YAHOO.widget.EditorInfo.window.win&&YAHOO.widget.EditorInfo.window.scope){YAHOO.widget.EditorInfo.window.scope.closeWindow.call(YAHOO.widget.EditorInfo.window.scope);}if(this.browser.webkit){var F=A.getTarget(G);
	if(this._isElement(F,"a")||this._isElement(F.parentNode,"a")){A.stopEvent(G);
	this.nodeChange();}}
	else{this.nodeChange();}},_handleMouseUp:function(G){if(this._isNonEditable(G)){return false;}var F=this;
	if(this.browser.opera){var H=A.getTarget(G);
	if(this._isElement(H,"img")){this.nodeChange();
	if(this.operaEvent){clearTimeout(this.operaEvent);
	this.operaEvent=null;
	this._handleDoubleClick(G);}
	else{this.operaEvent=window.setTimeout(function(){F.operaEvent=false;},700);}}}if(this.browser.webkit||this.browser.opera){if(this.browser.webkit){A.stopEvent(G);}}this.nodeChange();
	this.fireEvent("editorMouseUp",{type:"editorMouseUp",target:this,ev:G});},_handleMouseDown:function(F){if(this._isNonEditable(F)){return false;}this._setCurrentEvent(F);
	var G=A.getTarget(F);
	if(this.browser.webkit&&this._hasSelection()){var H=this._getSelection();
	if(!this.browser.webkit3){H.collapse(true);}
	else{H.collapseToStart();}}if(this.browser.webkit&&this._lastImage){C.removeClass(this._lastImage,"selected");
	this._lastImage=null;}if(this._isElement(G,"img")||this._isElement(G,"a")){if(this.browser.webkit){A.stopEvent(F);
	if(this._isElement(G,"img")){C.addClass(G,"selected");
	this._lastImage=G;}}this.nodeChange();}this.fireEvent("editorMouseDown",{type:"editorMouseDown",target:this,ev:F});},_handleDoubleClick:function(F){if(this._isNonEditable(F)){return false;}this._setCurrentEvent(F);
	var G=A.getTarget(F);
	if(this._isElement(G,"img")){this.currentElement[0]=G;
	this.toolbar.fireEvent("insertimageClick",{type:"insertimageClick",target:this.toolbar});
	this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this});}
	else{if(this._hasParent(G,"a")){this.currentElement[0]=this._hasParent(G,"a");
	this.toolbar.fireEvent("createlinkClick",{type:"createlinkClick",target:this.toolbar});
	this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this});}}this.nodeChange();
	this.editorDirty=false;
	this.fireEvent("editorDoubleClick",{type:"editorDoubleClick",target:this,ev:F});},_handleKeyUp:function(G){if(this._isNonEditable(G)){return false;}this._setCurrentEvent(G);switch(G.keyCode){case 37:case 38:case 39:case 40:case 46:case 8:case 87:if((G.keyCode==87)&&this.currentWindow&&G.shiftKey&&G.ctrlKey){this.closeWindow();}
	else{if(!this.browser.ie){if(this._nodeChangeTimer){clearTimeout(this._nodeChangeTimer);}var F=this;
	this._nodeChangeTimer=setTimeout(function(){F._nodeChangeTimer=null;F.nodeChange.call(F);},100);}
	else{this.nodeChange();}this.editorDirty=true;}break;}this.fireEvent("editorKeyUp",{type:"editorKeyUp",target:this,ev:G});},_handleKeyPress:function(F){if(this.get("allowNoEdit")){if(F&&F.keyCode&&((F.keyCode==46)||F.keyCode==63272)){A.stopEvent(F);}}if(this._isNonEditable(F)){return false;}this._setCurrentEvent(F);
	if(this.browser.webkit){if(!this.browser.webkit3){if(F.keyCode&&(F.keyCode==122)&&(F.metaKey)){if(this._hasParent(this._getSelectedElement(),"li")){A.stopEvent(F);}}}this._listFix(F);}this.fireEvent("editorKeyPress",{type:"editorKeyPress",target:this,ev:F});},_listFix:function(L){var O=null,J=null,F=false,H=null;
	if(this.browser.webkit){if(L.keyCode&&(L.keyCode==13)){if(this._hasParent(this._getSelectedElement(),"li")){
		var I=this._hasParent(this._getSelectedElement(),"li");
		var N=this._getDoc().createElement("li");N.innerHTML="<span class=\"yui-non\">&nbsp;</span>&nbsp;";
		if(I.nextSibling){I.parentNode.insertBefore(N,I.nextSibling);}
		else{I.parentNode.appendChild(N);}this.currentElement[0]=N;
		this._selectNode(N.firstChild);
		if(!this.browser.webkit3)
		{
			I.parentNode.style.display="list-item";
			setTimeout(function(){I.parentNode.style.display="block";
		}
			,1);}A.stopEvent(L);}}}if(L.keyCode&&((!this.browser.webkit3&&(L.keyCode==25))||((this.browser.webkit3||!this.browser.webkit)&&((L.keyCode==9)&&L.shiftKey)))){O=this._getSelectedElement();
	if(this._hasParent(O,"li")){O=this._hasParent(O,"li");
	if(this._hasParent(O,"ul")||this._hasParent(O,"ol")){J=this._hasParent(O,"ul");
	if(!J){J=this._hasParent(O,"ol");}if(this._isElement(J.previousSibling,"li")){J.removeChild(O);J.parentNode.insertBefore(O,J.nextSibling);
	if(this.browser.ie){H=this._getDoc().body.createTextRange();H.moveToElementText(O);H.collapse(false);H.select();}if(this.browser.webkit){if(!this.browser.webkit3){J.style.display="list-item";J.parentNode.style.display="list-item";setTimeout(function(){J.style.display="block";J.parentNode.style.display="block";},1);}}A.stopEvent(L);}}}}if(L.keyCode&&((L.keyCode==9)&&(!L.shiftKey))){var G=this._getSelectedElement();
	if(this._hasParent(G,"li")){F=this._hasParent(G,"li").innerHTML;}if(this.browser.webkit){this._getDoc().execCommand("inserttext",false,"\t");}O=this._getSelectedElement();
	if(this._hasParent(O,"li")){J=this._hasParent(O,"li");
	var K=this._getDoc().createElement(J.parentNode.tagName.toLowerCase());
	if(this.browser.webkit){var M=C.getElementsByClassName("Apple-tab-span","span",J);
		if(M[0]){J.removeChild(M[0]);J.innerHTML=D.trim(J.innerHTML);
			if(F){J.innerHTML="<span class=\"yui-non\">"+F+"</span>&nbsp;";}
			else{J.innerHTML="<span class=\"yui-non\">&nbsp;</span>&nbsp;";}}}
		else{if(F){J.innerHTML=F+"&nbsp;";}
	else{J.innerHTML="&nbsp;";}}J.parentNode.replaceChild(K,J);K.appendChild(J);
	if(this.browser.webkit){this._getSelection().setBaseAndExtent(J.firstChild,1,J.firstChild,J.firstChild.innerText.length);
	if(!this.browser.webkit3){J.parentNode.parentNode.style.display="list-item";setTimeout(function(){J.parentNode.parentNode.style.display="block";},1);}}
	else{if(this.browser.ie){H=this._getDoc().body.createTextRange();H.moveToElementText(J);H.collapse(false);H.select();}
	else{this._selectNode(J);}}A.stopEvent(L);}if(this.browser.webkit){A.stopEvent(L);}this.nodeChange();}},_handleKeyDown:function(J){if(this._isNonEditable(J)){return false;}this._setCurrentEvent(J);
	if(this.currentWindow){this.closeWindow();}if(YAHOO.widget.EditorInfo.window.win&&YAHOO.widget.EditorInfo.window.scope){YAHOO.widget.EditorInfo.window.scope.closeWindow.call(YAHOO.widget.EditorInfo.window.scope);}var I=false,K=null,H=false;
	if(J.shiftKey&&J.ctrlKey){I=true;}switch(J.keyCode){case 84:if(J.shiftKey&&J.ctrlKey){this.toolbar._titlebar.firstChild.focus();A.stopEvent(J);I=false;}break;case 27:if(J.shiftKey){this.afterElement.focus();A.stopEvent(J);H=false;}break;case 76:if(this._hasSelection()){if(J.shiftKey&&J.ctrlKey){var G=true;
	if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("createlink")){G=false;}}if(G){this.execCommand("createlink","");
	this.toolbar.fireEvent("createlinkClick",{type:"createlinkClick",target:this.toolbar});
	this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this});I=false;}}}break;case 65:if(J.metaKey&&this.browser.webkit){A.stopEvent(J);
	this._getSelection().setBaseAndExtent(this._getDoc().body,1,this._getDoc().body,this._getDoc().body.innerHTML.length);}break;case 66:K="bold";break;case 73:K="italic";break;case 85:K="underline";break;case 13:if(this.browser.ie){var L=this._getRange();
	var F=this._getSelectedElement();
	if(!this._isElement(F,"li")){if(L){L.pasteHTML("<br>");L.collapse(false);L.select();}A.stopEvent(J);}}}if(this.browser.ie){this._listFix(J);}if(I&&K){this.execCommand(K,null);A.stopEvent(J);
	this.nodeChange();}this.fireEvent("editorKeyDown",{type:"editorKeyDown",target:this,ev:J});},nodeChange:function(G){var H=parseInt(this.get("nodeChangeThreshold"),10);
	var N=Math.round(new Date().getTime()/1000);
	if(G===true){this._lastNodeChange=0;}if((this._lastNodeChange+H)<N){var Q=this;
	if(this._fixNodesTimer===null){this._fixNodesTimer=window.setTimeout(function(){Q._fixNodes.call(Q);Q._fixNodesTimer=null;},0);}}this._lastNodeChange=N;
	if(this.currentEvent){this._lastNodeChangeEvent=this.currentEvent.type;}var Y=this.fireEvent("beforeNodeChange",{type:"beforeNodeChange",target:this});
	if(Y===false){return false;}if(this.get("dompath")){this._writeDomPath();}if(!this.get("disabled")){if(this.STOP_NODE_CHANGE){this.STOP_NODE_CHANGE=false;return false;}
	else{var S=this._getSelection(),P=this._getRange(),F=this._getSelectedElement(),L=this.toolbar.getButtonByValue("fontname"),K=this.toolbar.getButtonByValue("fontsize");
	if(G!==true){this.editorDirty=true;}var M={};
	if(this._lastButton){M[this._lastButton.id]=true;}if(!this._isElement(F,"body")){if(L){M[L.get("id")]=true;}if(K){M[K.get("id")]=true;}}this.toolbar.resetAllButtons(M);for(var Z=0;Z<this._disabled.length;Z++){var O=this.toolbar.getButtonByValue(this._disabled[Z]);
	if(O&&O.get){
		if(this._lastButton&&(O.get("id")===this._lastButton.id)){}
		else
		{
			if(!this._hasSelection())
			{
				switch(this._disabled[Z])
				{
					case"fontname":case"fontsize":break;default:this.toolbar.disableButton(O);
				}
			}
			else
			{
		if(!this._alwaysDisabled[this._disabled[Z]]){this.toolbar.enableButton(O);}
		}if(!this._alwaysEnabled[this._disabled[Z]]){this.toolbar.deselectButton(O);}}}}var R=this._getDomPath();
	var a=null,V=null;for(var W=0;W<R.length;W++){a=R[W].tagName.toLowerCase();
	if(R[W].getAttribute("tag")){a=R[W].getAttribute("tag").toLowerCase();}V=this._tag2cmd[a];
	if(V===undefined){V=[];}if(!D.isArray(V)){V=[V];}if(R[W].style.fontWeight.toLowerCase()=="bold"){V[V.length]="bold";}if(R[W].style.fontStyle.toLowerCase()=="italic"){V[V.length]="italic";}if(R[W].style.textDecoration.toLowerCase()=="underline"){V[V.length]="underline";}if(V.length>0){for(var U=0;U<V.length;U++){this.toolbar.selectButton(V[U]);
	this.toolbar.enableButton(V[U]);}}switch(R[W].style.textAlign.toLowerCase()){case"left":case"right":case"center":case"justify":var T=R[W].style.textAlign.toLowerCase();
	if(R[W].style.textAlign.toLowerCase()=="justify"){T="full";}this.toolbar.selectButton("justify"+T);
	this.toolbar.enableButton("justify"+T);break;}}if(L){var X=L._configs.label._initialConfig.value;L.set("label","<span class=\"yui-toolbar-fontname-"+E(X)+"\">"+X+"</span>");
	this._updateMenuChecked("fontname",X);}if(K){K.set("label",K._configs.label._initialConfig.value);}var J=this.toolbar.getButtonByValue("heading");
	if(J){J.set("label",J._configs.label._initialConfig.value);
	this._updateMenuChecked("heading","none");}var I=this.toolbar.getButtonByValue("insertimage");
	if(I&&this.currentWindow&&(this.currentWindow.name=="insertimage")){this.toolbar.disableButton(I);}}}this.fireEvent("afterNodeChange",{type:"afterNodeChange",target:this});},_updateMenuChecked:function(F,G,I){if(!I){I=this.toolbar;}var H=I.getButtonByValue(F);H.checkValue(G);},_handleToolbarClick:function(G){var I="";
	var J="";
	var H=G.button.value;
	if(G.button.menucmd){I=H;H=G.button.menucmd;}this._lastButton=G.button;
	if(this.STOP_EXEC_COMMAND){this.STOP_EXEC_COMMAND=false;return false;}
	else{this.execCommand(H,I);
	if(!this.browser.webkit){var F=this;setTimeout(function(){F._focusWindow.call(F);},5);}}A.stopEvent(G);},_setupAfterElement:function(){if(!this.beforeElement){this.beforeElement=document.createElement("h2");
	this.beforeElement.className="yui-editor-skipheader";
	this.beforeElement.tabIndex="-1";
	this.beforeElement.innerHTML=this.STR_BEFORE_EDITOR;
	this.get("element_cont").get("firstChild").insertBefore(this.beforeElement,this.toolbar.get("nextSibling"));}if(!this.afterElement){this.afterElement=document.createElement("h2");
	this.afterElement.className="yui-editor-skipheader";
	this.afterElement.tabIndex="-1";
	this.afterElement.innerHTML=this.STR_LEAVE_EDITOR;
	this.get("element_cont").get("firstChild").appendChild(this.afterElement);}},_disableEditor:function(G){if(G){if(!this._mask){if(!!this.browser.ie){this._setDesignMode("off");}if(this.toolbar){this.toolbar.set("disabled",true);}this._mask=document.createElement("DIV");C.setStyle(this._mask,"height","100%");C.setStyle(this._mask,"width","100%");C.setStyle(this._mask,"position","absolute");C.setStyle(this._mask,"top","0");C.setStyle(this._mask,"left","0");C.setStyle(this._mask,"opacity",".5");C.addClass(this._mask,"yui-editor-masked");
	this.get("iframe").get("parentNode").appendChild(this._mask);}}
	else{if(this._mask){this._mask.parentNode.removeChild(this._mask);
	this._mask=null;
	if(this.toolbar){this.toolbar.set("disabled",false);}this._setDesignMode("on");
	this._focusWindow();
	var F=this;
	window.setTimeout(function(){
		F.nodeChange.call(F);},100);}}},EDITOR_PANEL_ID:"yui-editor-panel",SEP_DOMPATH:"<",STR_LEAVE_EDITOR:"You have left the Rich Text Editor.",STR_BEFORE_EDITOR:"This text field can contain stylized text and graphics. To cycle through all formatting options, use the keyboard shortcut Control + Shift + T to place focus on the toolbar and navigate between option heading names. <h4>Common formatting keyboard shortcuts:</h4><ul><li>Control Shift B sets text to bold</li> <li>Control Shift I sets text to italic</li> <li>Control Shift U underlines text</li> <li>Control Shift L adds an HTML link</li> <li>To exit this text editor use the keyboard shortcut Control + Shift + ESC.</li></ul>",STR_TITLE:"Rich Text Area.",STR_IMAGE_HERE:"Image Url Here",STR_LINK_URL:"Link URL",STOP_EXEC_COMMAND:false,STOP_NODE_CHANGE:false,CLASS_NOEDIT:"yui-noedit",CLASS_CONTAINER:"yui-editor-container",CLASS_EDITABLE:"yui-editor-editable",CLASS_EDITABLE_CONT:"yui-editor-editable-container",CLASS_PREFIX:"yui-editor",browser:function(){var F=YAHOO.env.ua;
	if(F.webkit>420){F.webkit3=F.webkit;}
	else{F.webkit3=0;}return F;}(),init:function(G,F){if(!this._defaultToolbar){this._defaultToolbar={collapse:true,titlebar:"Text Editing Tools",draggable:false,buttons:[{group:"fontstyle",label:"Font Name and Size",buttons:[{type:"select",label:"Arial",value:"fontname",disabled:true,menu:[{text:"Arial",checked:true},{text:"Arial Black"},{text:"Comic Sans MS"},{text:"Courier New"},{text:"Lucida Console"},{text:"Tahoma"},{text:"Times New Roman"},{text:"Trebuchet MS"},{text:"Verdana"}]},{type:"spin",label:"13",value:"fontsize",range:[9,75],disabled:true}]},{type:"separator"},{group:"textstyle",label:"Font Style",buttons:[{type:"push",label:"Bold CTRL + SHIFT + B",value:"bold"},{type:"push",label:"Italic CTRL + SHIFT + I",value:"italic"},{type:"push",label:"Underline CTRL + SHIFT + U",value:"underline"},{type:"separator"},{type:"color",label:"Font Color",value:"forecolor",disabled:true},{type:"color",label:"Background Color",value:"backcolor",disabled:true}]},{type:"separator"},{group:"indentlist",label:"Lists",buttons:[{type:"push",label:"Create an Unordered List",value:"insertunorderedlist"},{type:"push",label:"Create an Ordered List",value:"insertorderedlist"}]},{type:"separator"},{group:"insertitem",label:"Insert Item",buttons:[{type:"push",label:"HTML Link CTRL + SHIFT + L",value:"createlink",disabled:true},{type:"push",label:"Insert Image",value:"insertimage"}]}]};}YAHOO.widget.SimpleEditor.superclass.init.call(this,G,F);YAHOO.widget.EditorInfo._instances[this.get("id")]=this;
	this.currentElement=[];
	this.on("contentReady",function(){this.DOMReady=true;
	this.fireQueue();},this,true);},initAttributes:function(F){YAHOO.widget.SimpleEditor.superclass.initAttributes.call(this,F);
	var G=this;
	this.setAttributeConfig("container",{writeOnce:true,value:F.container||false});
	this.setAttributeConfig("plainText",{writeOnce:true,value:F.plainText||false});
	this.setAttributeConfig("iframe",{value:null});
	this.setAttributeConfig("textarea",{value:null,writeOnce:true});
	this.setAttributeConfig("container",{readOnly:true,value:null});
	this.setAttributeConfig("nodeChangeThreshold",{value:F.nodeChangeThreshold||3,validator:YAHOO.lang.isNumber});
	this.setAttributeConfig("allowNoEdit",{value:F.allowNoEdit||false,validator:YAHOO.lang.isBoolean});
	this.setAttributeConfig("limitCommands",{value:F.limitCommands||false,validator:YAHOO.lang.isBoolean});
	this.setAttributeConfig("element_cont",{value:F.element_cont});
	this.setAttributeConfig("editor_wrapper",{value:F.editor_wrapper||null,writeOnce:true});
	this.setAttributeConfig("height",{value:F.height||C.getStyle(G.get("element"),"height"),method:function(H){if(this._rendered){if(this.get("animate")){var I=new YAHOO.util.Anim(this.get("iframe").get("parentNode"),{height:{to:parseInt(H,10)}},0.5);I.animate();}
	else{C.setStyle(this.get("iframe").get("parentNode"),"height",H);}}}});
	this.setAttributeConfig("autoHeight",{value:F.autoHeight||false,method:function(H){if(H){if(this.get("iframe")){this.get("iframe").get("element").setAttribute("scrolling","no");}this.on("afterNodeChange",this._handleAutoHeight,this,true);
	this.on("editorKeyDown",this._handleAutoHeight,this,true);
	this.on("editorKeyPress",this._handleAutoHeight,this,true);}
	else{if(this.get("iframe")){this.get("iframe").get("element").setAttribute("scrolling","auto");}this.unsubscribe("afterNodeChange",this._handleAutoHeight);
	this.unsubscribe("editorKeyDown",this._handleAutoHeight);
	this.unsubscribe("editorKeyPress",this._handleAutoHeight);}}});
	this.setAttributeConfig("width",{value:F.width||C.getStyle(this.get("element"),"width"),method:function(H){if(this._rendered){if(this.get("animate")){var I=new YAHOO.util.Anim(this.get("element_cont").get("element"),{width:{to:parseInt(H,10)}},0.5);I.animate();}
	else{this.get("element_cont").setStyle("width",H);}}}});
	this.setAttributeConfig("blankimage",{value:F.blankimage||this._getBlankImage()});
	this.setAttributeConfig("css",{value:F.css||this._defaultCSS,writeOnce:true});
	this.setAttributeConfig("html",{value:F.html||"<html><head><title>{TITLE}</title><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><base href=\""+this._baseHREF+"\"><style>{CSS}</style><style>{HIDDEN_CSS}</style><style>{EXTRA_CSS}</style></head><body onload=\"document.body._rteLoaded = true;\">{CONTENT}</body></html>",writeOnce:true});
	this.setAttributeConfig("extracss",{value:F.css||"",writeOnce:true});
	this.setAttributeConfig("handleSubmit",{value:F.handleSubmit||false,method:function(H){if(this.get("element").form){if(!this._formButtons){this._formButtons=[];}if(H){A.on(this.get("element").form,"submit",this._handleFormSubmit,this,true);
	var I=this.get("element").form.getElementsByTagName("input");for(var K=0;K<I.length;K++){var J=I[K].getAttribute("type");
	if(J&&(J.toLowerCase()=="submit")){A.on(I[K],"click",this._handleFormButtonClick,this,true);
	this._formButtons[this._formButtons.length]=I[K];}}}
	else{A.unsubscribe(this.get("element").form,"submit",this._handleFormSubmit);
	if(this._formButtons){A.unsubscribe(this._formButtons,"click",this._handleFormButtonClick);}}}}});
	this.setAttributeConfig("disabled",{value:false,method:function(H){if(this._rendered){this._disableEditor(H);}}});
	this.setAttributeConfig("toolbar_cont",{value:null,writeOnce:true});
	this.setAttributeConfig("toolbar",{value:F.toolbar||this._defaultToolbar,writeOnce:true,method:function(H){if(!H.buttonType){H.buttonType=this._defaultToolbar.buttonType;}this._defaultToolbar=H;}});
	this.setAttributeConfig("animate",{value:((F.animate)?((YAHOO.util.Anim)?true:false):false),validator:function(I){var H=true;
	if(!YAHOO.util.Anim){H=false;}return H;}});
	this.setAttributeConfig("panel",{value:null,writeOnce:true,validator:function(I){var H=true;
	if(!YAHOO.widget.Overlay){H=false;}return H;}});
	this.setAttributeConfig("focusAtStart",{value:F.focusAtStart||false,writeOnce:true,method:function(){this.on("editorContentLoaded",function(){var H=this;setTimeout(function(){H._focusWindow.call(H,true);H.editorDirty=false;},400);},this,true);}});
	this.setAttributeConfig("dompath",{value:F.dompath||false,method:function(H){if(H&&!this.dompath){this.dompath=document.createElement("DIV");
	this.dompath.id=this.get("id")+"_dompath";C.addClass(this.dompath,"dompath");
	this.get("element_cont").get("firstChild").appendChild(this.dompath);
	if(this.get("iframe")){this._writeDomPath();}}
	else{if(!H&&this.dompath){this.dompath.parentNode.removeChild(this.dompath);
	this.dompath=null;}}}});
	this.setAttributeConfig("markup",{value:F.markup||"semantic",validator:function(H){switch(H.toLowerCase()){case"semantic":case"css":case"default":case"xhtml":return true;}return false;}});
	this.setAttributeConfig("removeLineBreaks",{value:F.removeLineBreaks||false,validator:YAHOO.lang.isBoolean});
	this.on("afterRender",function(){this._renderPanel();});},_getBlankImage:function(){if(!this.DOMReady){this._queue[this._queue.length]=["_getBlankImage",arguments];return"";}var F="";
	if(!this._blankImageLoaded){var G=document.createElement("div");G.style.position="absolute";G.style.top="-9999px";G.style.left="-9999px";G.className=this.CLASS_PREFIX+"-blankimage";document.body.appendChild(G);F=YAHOO.util.Dom.getStyle(G,"background-image");F=F.replace("url(","").replace(")","").replace(/"/g,"");
	this.set("blankimage",F);
	this._blankImageLoaded=true;}
	else{F=this.get("blankimage");}return F;},_handleAutoHeight:function(){var J=this._getDoc(),G=J.body,K=J.documentElement;
	var F=parseInt(C.getStyle(this.get("editor_wrapper"),"height"),10);
	var H=G.scrollHeight;
	if(this.browser.webkit){H=K.scrollHeight;}if(H<parseInt(this.get("height"),10)){H=parseInt(this.get("height"),10);}if((F!=H)&&(H>=parseInt(this.get("height"),10))){C.setStyle(this.get("editor_wrapper"),"height",H+"px");
	if(this.browser.ie){this.get("iframe").setStyle("height","99%");
	this.get("iframe").setStyle("zoom","1");
	var I=this;window.setTimeout(function(){I.get("iframe").setStyle("height","100%");},1);}}},_formButtons:null,_formButtonClicked:null,_handleFormButtonClick:function(G){var F=A.getTarget(G);
	this._formButtonClicked=F;},_handleFormSubmit:function(I){A.stopEvent(I);
	this.saveHTML();
	var H=this.get("element").form;
	var F=this._formButtonClicked||false;
	var G=this;window.setTimeout(function(){YAHOO.util.Event.removeListener(H,"submit",G._handleFormSubmit);
	if(YAHOO.env.ua.ie){H.fireEvent("onsubmit");
	if(F){F.click();}}
	else{if(F){F.click();}
	else{var J=document.createEvent("HTMLEvents");J.initEvent("submit",true,true);H.dispatchEvent(J);
	if(YAHOO.env.ua.webkit){if(YAHOO.lang.isFunction(H.submit)){H.submit();}}}}},200);},_handleFontSize:function(H){var F=this.toolbar.getButtonById(H.button.id);
	var G=F.get("label")+"px";
	this.execCommand("fontsize",G);
	this.STOP_EXEC_COMMAND=true;},_handleColorPicker:function(H){var G=H.button;
	var F="#"+H.color;
	if((G=="forecolor")||(G=="backcolor")){this.execCommand(G,F);}},_handleAlign:function(I){var H=null;for(var F=0;F<I.button.menu.length;F++){if(I.button.menu[F].value==I.button.value){H=I.button.menu[F].value;}}var G=this._getSelection();
	this.execCommand(H,G);
	this.STOP_EXEC_COMMAND=true;},_handleAfterNodeChange:function(){var R=this._getDomPath(),M=null,I=null,N=null,G=false;
	var K=this.toolbar.getButtonByValue("fontname");
	var L=this.toolbar.getButtonByValue("fontsize");
	var F=this.toolbar.getButtonByValue("heading");for(var H=0;H<R.length;H++){M=R[H];
	var Q=M.tagName.toLowerCase();
	if(M.getAttribute("tag")){Q=M.getAttribute("tag");}I=M.getAttribute("face");
	if(C.getStyle(M,"font-family")){I=C.getStyle(M,"font-family");}if(Q.substring(0,1)=="h"){if(F){for(var J=0;J<F._configs.menu.value.length;J++){if(F._configs.menu.value[J].value.toLowerCase()==Q){F.set("label",F._configs.menu.value[J].text);}}this._updateMenuChecked("heading",Q);}}}if(K){for(var P=0;P<K._configs.menu.value.length;P++){if(I&&K._configs.menu.value[P].text.toLowerCase()==I.toLowerCase()){G=true;I=K._configs.menu.value[P].text;}}if(!G){I=K._configs.label._initialConfig.value;}var O="<span class=\"yui-toolbar-fontname-"+E(I)+"\">"+I+"</span>";
	if(K.get("label")!=O){K.set("label",O);
	this._updateMenuChecked("fontname",I);}}if(L){N=parseInt(C.getStyle(M,"fontSize"),10);
	if((N===null)||isNaN(N)){N=L._configs.label._initialConfig.value;}L.set("label",""+N);}if(!this._isElement(M,"body")&&!this._isElement(M,"img")){this.toolbar.enableButton(K);
	this.toolbar.enableButton(L);
	this.toolbar.enableButton("forecolor");
	this.toolbar.enableButton("backcolor");}if(this._isElement(M,"img")){if(YAHOO.widget.Overlay){this.toolbar.enableButton("createlink");}}if(this._isElement(M,"blockquote")){this.toolbar.selectButton("indent");
	this.toolbar.disableButton("indent");
	this.toolbar.enableButton("outdent");}if(this._hasParent(M,"ol")||this._hasParent(M,"ul")){this.toolbar.disableButton("indent");}this._lastButton=null;},_setBusy:function(F){},_handleInsertImageClick:function(){if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("insertimage")){return false;}}this.toolbar.set("disabled",true);
	this.on("afterExecCommand",function(){var F=this.currentElement[0],H="http://";
	if(!F){F=this._getSelectedElement();}if(F){if(F.getAttribute("src")){H=F.getAttribute("src",2);
	if(H.indexOf(this.get("blankimage"))!=-1){H=this.STR_IMAGE_HERE;}}}var G=prompt(this.STR_LINK_URL+": ",H);
	if((G!=="")&&(G!==null)){F.setAttribute("src",G);}
	else{if(G===null){F.parentNode.removeChild(F);
	this.currentElement=[];
	this.nodeChange();}}this.closeWindow();
	this.toolbar.set("disabled",false);},this,true);},_handleInsertImageWindowClose:function(){this.nodeChange();},_isLocalFile:function(F){if((F!=="")&&((F.indexOf("file:/")!=-1)||(F.indexOf(":\\")!=-1))){return true;}return false;},_handleCreateLinkClick:function(){if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("createlink")){return false;}}this.toolbar.set("disabled",true);
	this.on("afterExecCommand",function(){var H=this.currentElement[0],G="";
	if(H){if(H.getAttribute("href",2)!==null){G=H.getAttribute("href",2);}}var J=prompt(this.STR_LINK_URL+": ",G);
	if((J!=="")&&(J!==null)){var I=J;
	if((I.indexOf("://")==-1)&&(I.substring(0,1)!="/")&&(I.substring(0,6).toLowerCase()!="mailto")){if((I.indexOf("@")!=-1)&&(I.substring(0,6).toLowerCase()!="mailto")){I="mailto:"+I;}
	else{if(I.substring(0,1)!="#"){I="http://"+I;}}}H.setAttribute("href",I);}
	else{if(J!==null){var F=this._getDoc().createElement("span");F.innerHTML=H.innerHTML;C.addClass(F,"yui-non");H.parentNode.replaceChild(F,H);}}this.closeWindow();
	this.toolbar.set("disabled",false);});},_handleCreateLinkWindowClose:function(){this.nodeChange();
	this.currentElement=[];},render:function(){if(this._rendered){return false;}if(!this.DOMReady){this._queue[this._queue.length]=["render",arguments];return false;}this._rendered=true;
	var F=this;window.setTimeout(function(){F._render.call(F);},4);},_render:function(){this._setBusy();
	var F=this;
	this.set("textarea",this.get("element"));
	this.get("element_cont").setStyle("display","none");
	this.get("element_cont").addClass(this.CLASS_CONTAINER);
	this.set("iframe",this._createIframe());window.setTimeout(function(){F._setInitialContent.call(F);},10);
	this.get("editor_wrapper").appendChild(this.get("iframe").get("element"));
	if(this.get("disabled")){this._disableEditor(true);}var G=this.get("toolbar");
	if(G instanceof B){this.toolbar=G;
	this.toolbar.set("disabled",true);}
	else{G.disabled=true;
	this.toolbar=new B(this.get("toolbar_cont"),G);}this.fireEvent("toolbarLoaded",{type:"toolbarLoaded",target:this.toolbar});
	this.toolbar.on("toolbarCollapsed",function(){if(this.currentWindow){this.moveWindow();}},this,true);
	this.toolbar.on("toolbarExpanded",function(){if(this.currentWindow){this.moveWindow();}},this,true);
	this.toolbar.on("fontsizeClick",function(H){this._handleFontSize(H);},this,true);
	this.toolbar.on("colorPickerClicked",function(H){this._handleColorPicker(H);return false;},this,true);
	this.toolbar.on("alignClick",function(H){this._handleAlign(H);},this,true);
	this.on("afterNodeChange",function(){this._handleAfterNodeChange();},this,true);
	this.toolbar.on("insertimageClick",function(){this._handleInsertImageClick();},this,true);
	this.on("windowinsertimageClose",function(){this._handleInsertImageWindowClose();},this,true);
	this.toolbar.on("createlinkClick",function(){this._handleCreateLinkClick();},this,true);
	this.on("windowcreatelinkClose",function(){this._handleCreateLinkWindowClose();},this,true);
	this.get("parentNode").replaceChild(this.get("element_cont").get("element"),this.get("element"));
	this.setStyle("visibility","hidden");
	this.setStyle("position","absolute");
	this.setStyle("top","-9999px");
	this.setStyle("left","-9999px");
	this.get("element_cont").appendChild(this.get("element"));
	this.get("element_cont").setStyle("display","block");C.addClass(this.get("iframe").get("parentNode"),this.CLASS_EDITABLE_CONT);
	this.get("iframe").addClass(this.CLASS_EDITABLE);
	this.get("element_cont").setStyle("width",this.get("width"));C.setStyle(this.get("iframe").get("parentNode"),"height",this.get("height"));
	this.get("iframe").setStyle("width","100%");
	this.get("iframe").setStyle("height","100%");window.setTimeout(function(){F._setupAfterElement.call(F);},0);
	this.fireEvent("afterRender",{type:"afterRender",target:this});},execCommand:function(H,G){var K=this.fireEvent("beforeExecCommand",{type:"beforeExecCommand",target:this,args:arguments});
	if((K===false)||(this.STOP_EXEC_COMMAND)){this.STOP_EXEC_COMMAND=false;return false;}this._setMarkupType(H);
	if(this.browser.ie){this._getWindow().focus();}var F=true;
	if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue(H)){F=false;}}this.editorDirty=true;
	if((typeof this["cmd_"+H.toLowerCase()]=="function")&&F){var J=this["cmd_"+H.toLowerCase()](G);F=J[0];
	if(J[1]){H=J[1];}if(J[2]){G=J[2];}}if(F){try{this._getDoc().execCommand(H,false,G);}catch(I){}}
	else{}this.on("afterExecCommand",function(){this.unsubscribeAll("afterExecCommand");
	this.nodeChange();});
	this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this});},cmd_backcolor:function(I){var F=true,G=this._getSelectedElement(),H="backcolor";
	if(this.browser.gecko||this.browser.opera){this._setEditorStyle(true);H="hilitecolor";}if(!this._isElement(G,"body")){C.setStyle(G,"background-color",I);
	this._selectNode(G);F=false;}
	else{this._createCurrentElement("span",{backgroundColor:I});
	this._selectNode(this.currentElement[0]);F=false;}return[F,H];},cmd_forecolor:function(H){var F=true,G=this._getSelectedElement();
	if(!this._isElement(G,"body")){C.setStyle(G,"color",H);
	this._selectNode(G);F=false;}
	else{this._createCurrentElement("span",{color:H});
	this._selectNode(this.currentElement[0]);F=false;}return[F];},cmd_unlink:function(F){this._swapEl(this.currentElement[0],"span",function(G){G.className="yui-non";});return[false];},cmd_createlink:function(H){var G=this._getSelectedElement(),F=null;
	if(this._hasParent(G,"a")){this.currentElement[0]=this._hasParent(G,"a");}
	else{if(!this._isElement(G,"a")){this._createCurrentElement("a");F=this._swapEl(this.currentElement[0],"a");
	this.currentElement[0]=F;}
	else{this.currentElement[0]=G;}}return[false];},cmd_insertimage:function(K){var F=true,G=null,J="insertimage",I=this._getSelectedElement();
	if(K===""){K=this.get("blankimage");}if(this._isElement(I,"img")){this.currentElement[0]=I;F=false;}
	else{if(this._getDoc().queryCommandEnabled(J)){this._getDoc().execCommand("insertimage",false,K);
	var L=this._getDoc().getElementsByTagName("img");for(var H=0;H<L.length;H++){if(!YAHOO.util.Dom.hasClass(L[H],"yui-img")){YAHOO.util.Dom.addClass(L[H],"yui-img");
	this.currentElement[0]=L[H];}}F=false;}
	else{if(I==this._getDoc().body){G=this._getDoc().createElement("img");G.setAttribute("src",K);YAHOO.util.Dom.addClass(G,"yui-img");
	this._getDoc().body.appendChild(G);}
	else{this._createCurrentElement("img");G=this._getDoc().createElement("img");G.setAttribute("src",K);YAHOO.util.Dom.addClass(G,"yui-img");
	this.currentElement[0].parentNode.replaceChild(G,this.currentElement[0]);}this.currentElement[0]=G;F=false;}}return[F];},cmd_inserthtml:function(I){var F=true,H="inserthtml",G=null,J=null;
	if(this.browser.webkit&&!this._getDoc().queryCommandEnabled(H)){this._createCurrentElement("img");G=this._getDoc().createElement("span");G.innerHTML=I;
	this.currentElement[0].parentNode.replaceChild(G,this.currentElement[0]);F=false;}
	else{if(this.browser.ie){J=this._getRange();
	if(J.item){J.item(0).outerHTML=I;}
	else{J.pasteHTML(I);}F=false;}}return[F];},cmd_list:function(W){var Q=true,T=null,M=0,G=null,P="",U=this._getSelectedElement(),R="insertorderedlist";
	if(W=="ul"){R="insertunorderedlist";}if((this.browser.webkit&&!this._getDoc().queryCommandEnabled(R))){if(this._isElement(U,"li")&&this._isElement(U.parentNode,W)){G=U.parentNode;T=this._getDoc().createElement("span");YAHOO.util.Dom.addClass(T,"yui-non");P="";
	var F=G.getElementsByTagName("li");for(M=0;M<F.length;M++){P+="<div>"+F[M].innerHTML+"</div>";}T.innerHTML=P;
	this.currentElement[0]=G;
	this.currentElement[0].parentNode.replaceChild(T,this.currentElement[0]);}
	else{this._createCurrentElement(W.toLowerCase());T=this._getDoc().createElement(W);for(M=0;M<this.currentElement.length;M++){var J=this._getDoc().createElement("li");J.innerHTML=this.currentElement[M].innerHTML+"<span class=\"yui-non\">&nbsp;</span>&nbsp;";T.appendChild(J);
	if(M>0){this.currentElement[M].parentNode.removeChild(this.currentElement[M]);}}this.currentElement[0].parentNode.replaceChild(T,this.currentElement[0]);
	this.currentElement[0]=T;
	var H=this.currentElement[0].firstChild;H=C.getElementsByClassName("yui-non","span",H)[0];
	this._getSelection().setBaseAndExtent(H,1,H,H.innerText.length);}Q=false;}
	else{G=this._getSelectedElement();
	if(this._isElement(G,"li")&&this._isElement(G.parentNode,W)||(this.browser.ie&&this._isElement(this._getRange().parentElement,"li"))||(this.browser.ie&&this._isElement(G,"ul"))||(this.browser.ie&&this._isElement(G,"ol"))){if(this.browser.ie){if((this.browser.ie&&this._isElement(G,"ul"))||(this.browser.ie&&this._isElement(G,"ol"))){G=G.getElementsByTagName("li")[0];}P="";
	var I=G.parentNode.getElementsByTagName("li");for(var S=0;S<I.length;S++){P+=I[S].innerHTML+"<br>";}var V=this._getDoc().createElement("span");V.innerHTML=P;G.parentNode.parentNode.replaceChild(V,G.parentNode);}
	else{this.nodeChange();
	this._getDoc().execCommand(R,"",G.parentNode);
	this.nodeChange();}Q=false;}if(this.browser.opera){var O=this;window.setTimeout(function(){var X=O._getDoc().getElementsByTagName("li");for(var Y=0;Y<X.length;Y++){if(X[Y].innerHTML.toLowerCase()=="<br>"){X[Y].parentNode.parentNode.removeChild(X[Y].parentNode);}}},30);}if(this.browser.ie&&Q){var K="";
	if(this._getRange().html){K="<li>"+this._getRange().html+"</li>";}
	else{var L=this._getRange().text.split("\n");
	if(L.length>1){K="";for(var N=0;N<L.length;N++){K+="<li>"+L[N]+"</li>";}}
	else{K="<li>"+this._getRange().text+"</li>";}}this._getRange().pasteHTML("<"+W+">"+K+"</"+W+">");Q=false;}}return Q;},cmd_insertorderedlist:function(F){return[this.cmd_list("ol")];},cmd_insertunorderedlist:function(F){return[this.cmd_list("ul")];},cmd_fontname:function(H){var F=true,G=this._getSelectedElement();
	this.currentFont=H;
	if(G&&G.tagName&&!this._hasSelection()){YAHOO.util.Dom.setStyle(G,"font-family",H);F=false;}return[F];},cmd_fontsize:function(G){if(this.currentElement&&(this.currentElement.length>0)&&(!this._hasSelection())){YAHOO.util.Dom.setStyle(this.currentElement,"fontSize",G);}
	else{if(!this._isElement(this._getSelectedElement(),"body")){var F=this._getSelectedElement();YAHOO.util.Dom.setStyle(F,"fontSize",G);
	this._selectNode(F);}
	else{this._createCurrentElement("span",{"fontSize":G});
	this._selectNode(this.currentElement[0]);}}return[false];},_swapEl:function(G,F,I){var H=this._getDoc().createElement(F);H.innerHTML=G.innerHTML;
	if(typeof I=="function"){I.call(this,H);}G.parentNode.replaceChild(H,G);return H;},_createCurrentElement:function(H,U){H=((H)?H:"a");
	var b=null,G=[],I=this._getDoc();
	if(this.currentFont){if(!U){U={};}U.fontFamily=this.currentFont;
	this.currentFont=null;}this.currentElement=[];
	var X=function(){var f=null;switch(H){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":f=I.createElement(H);break;default:f=I.createElement("span");YAHOO.util.Dom.addClass(f,"yui-tag-"+H);YAHOO.util.Dom.addClass(f,"yui-tag");f.setAttribute("tag",H);for(var e in U){if(YAHOO.util.Lang.hasOwnProperty(U,e)){f.style[e]=U[e];}}break;}return f;};
	if(!this._hasSelection()){if(this._getDoc().queryCommandEnabled("insertimage")){this._getDoc().execCommand("insertimage",false,"yui-tmp-img");
	var W=this._getDoc().getElementsByTagName("img");for(var Z=0;Z<W.length;Z++){if(W[Z].getAttribute("src",2)=="yui-tmp-img"){G=X();W[Z].parentNode.replaceChild(G,W[Z]);
	this.currentElement[this.currentElement.length]=G;}}}
	else{if(this.currentEvent){b=YAHOO.util.Event.getTarget(this.currentEvent);}
	else{b=this._getDoc().body;}}if(b){G=X();
	if(this._isElement(b,"body")||this._isElement(b,"html")){if(this._isElement(b,"html")){b=this._getDoc().body;}b.appendChild(G);}
	else{if(b.nextSibling){b.parentNode.insertBefore(G,b.nextSibling);}
	else{b.parentNode.appendChild(G);}}this.currentElement[this.currentElement.length]=G;
	this.currentEvent=null;
	if(this.browser.webkit){this._getSelection().setBaseAndExtent(G,0,G,0);
	if(this.browser.webkit3){this._getSelection().collapseToStart();}
	else{this._getSelection().collapse(true);}}}}
	else{this._setEditorStyle(true);
	this._getDoc().execCommand("fontname",false,"yui-tmp");
	var F=[];
	var R=this._getDoc().getElementsByTagName("font");
	var P=this._getDoc().getElementsByTagName(this._getSelectedElement().tagName);
	var M=this._getDoc().getElementsByTagName("span");
	var L=this._getDoc().getElementsByTagName("i");
	var K=this._getDoc().getElementsByTagName("b");
	var J=this._getDoc().getElementsByTagName(this._getSelectedElement().parentNode.tagName);for(var V=0;V<R.length;V++){F[F.length]=R[V];}for(var N=0;N<J.length;N++){F[F.length]=J[N];}for(var T=0;T<P.length;T++){F[F.length]=P[T];}for(var S=0;S<M.length;S++){F[F.length]=M[S];}for(var Q=0;Q<L.length;Q++){F[F.length]=L[Q];}for(var O=0;O<K.length;O++){F[F.length]=K[O];}for(var a=0;a<F.length;a++){if((YAHOO.util.Dom.getStyle(F[a],"font-family")=="yui-tmp")||(F[a].face&&(F[a].face=="yui-tmp"))){G=X();G.innerHTML=F[a].innerHTML;
	if(this._isElement(F[a],"ol")||(this._isElement(F[a],"ul"))){var Y=F[a].getElementsByTagName("li")[0];F[a].style.fontFamily="inherit";Y.style.fontFamily="inherit";G.innerHTML=Y.innerHTML;Y.innerHTML="";Y.appendChild(G);
	this.currentElement[this.currentElement.length]=G;}
	else{if(this._isElement(F[a],"li")){F[a].innerHTML="";F[a].appendChild(G);F[a].style.fontFamily="inherit";
	this.currentElement[this.currentElement.length]=G;}
	else{if(F[a].parentNode){F[a].parentNode.replaceChild(G,F[a]);
	this.currentElement[this.currentElement.length]=G;
	this.currentEvent=null;
	if(this.browser.webkit){this._getSelection().setBaseAndExtent(G,0,G,0);
	if(this.browser.webkit3){this._getSelection().collapseToStart();}
	else{this._getSelection().collapse(true);}}if(this.browser.ie&&U&&U.fontSize){this._getSelection().empty();}if(this.browser.gecko){this._getSelection().collapseToStart();}}}}}}var c=this.currentElement.length;for(var d=0;d<c;d++){if((d+1)!=c){if(this.currentElement[d]&&this.currentElement[d].nextSibling){if(this._isElement(this.currentElement[d],"br")){this.currentElement[this.currentElement.length]=this.currentElement[d].nextSibling;}}}}}},saveHTML:function(){var F=this.cleanHTML();
	this.get("element").value=F;return F;},setEditorHTML:function(F){F=this._cleanIncomingHTML(F);
	this._getDoc().body.innerHTML=F;
	this.nodeChange();},getEditorHTML:function(){var F=this._getDoc().body;
	if(F===null){return null;}return this._getDoc().body.innerHTML;},show:function(){if(this.browser.gecko){this._setDesignMode("on");
	this._focusWindow();}if(this.browser.webkit){var F=this;window.setTimeout(function(){F._setInitialContent.call(F);},10);}if(YAHOO.widget.EditorInfo.window.win&&YAHOO.widget.EditorInfo.window.scope){YAHOO.widget.EditorInfo.window.scope.closeWindow.call(YAHOO.widget.EditorInfo.window.scope);}this.get("iframe").setStyle("position","static");
	this.get("iframe").setStyle("left","");},hide:function(){if(YAHOO.widget.EditorInfo.window.win&&YAHOO.widget.EditorInfo.window.scope){YAHOO.widget.EditorInfo.window.scope.closeWindow.call(YAHOO.widget.EditorInfo.window.scope);}if(this._fixNodesTimer){clearTimeout(this._fixNodesTimer);
	this._fixNodesTimer=null;}if(this._nodeChangeTimer){clearTimeout(this._nodeChangeTimer);
	this._nodeChangeTimer=null;}this._lastNodeChange=0;
	this.get("iframe").setStyle("position","absolute");
	this.get("iframe").setStyle("left","-9999px");},_cleanIncomingHTML:function(F){F=F.replace(/<strong([^>]*)>/gi,"<b$1>");F=F.replace(/<\/strong>/gi,"</b>");F=F.replace(/<embed([^>]*)>/gi,"<YUI_EMBED$1>");F=F.replace(/<\/embed>/gi,"</YUI_EMBED>");F=F.replace(/<em([^>]*)>/gi,"<i$1>");F=F.replace(/<\/em>/gi,"</i>");F=F.replace(/<YUI_EMBED([^>]*)>/gi,"<embed$1>");F=F.replace(/<\/YUI_EMBED>/gi,"</embed>");
	if(this.get("plainText")){F=F.replace(/\n/g,"<br>").replace(/\r/g,"<br>");F=F.replace(/  /gi,"&nbsp;&nbsp;");F=F.replace(/\t/gi,"&nbsp;&nbsp;&nbsp;&nbsp;");}F=F.replace(/<script([^>]*)>/gi,"<bad>");F=F.replace(/<\/script([^>]*)>/gi,"</bad>");F=F.replace(/&lt;script([^>]*)&gt;/gi,"<bad>");F=F.replace(/&lt;\/script([^>]*)&gt;/gi,"</bad>");F=F.replace(/\n/g,"<YUI_LF>").replace(/\r/g,"<YUI_LF>");F=F.replace(new RegExp("<bad([^>]*)>(.*?)</bad>","gi"),"");F=F.replace(/<YUI_LF>/g,"\n");return F;},cleanHTML:function(H){if(!H){H=this.getEditorHTML();}var G=this.get("markup");H=this.pre_filter_linebreaks(H,G);H=H.replace(/<img([^>]*)\/>/gi,"<YUI_IMG$1>");H=H.replace(/<img([^>]*)>/gi,"<YUI_IMG$1>");H=H.replace(/<input([^>]*)\/>/gi,"<YUI_INPUT$1>");H=H.replace(/<input([^>]*)>/gi,"<YUI_INPUT$1>");H=H.replace(/<ul([^>]*)>/gi,"<YUI_UL$1>");H=H.replace(/<\/ul>/gi,"</YUI_UL>");H=H.replace(/<blockquote([^>]*)>/gi,"<YUI_BQ$1>");H=H.replace(/<\/blockquote>/gi,"</YUI_BQ>");H=H.replace(/<embed([^>]*)>/gi,"<YUI_EMBED$1>");H=H.replace(/<\/embed>/gi,"</YUI_EMBED>");
	if((G=="semantic")||(G=="xhtml")){H=H.replace(/<i(\s+[^>]*)?>/gi,"<em$1>");H=H.replace(/<\/i>/gi,"</em>");H=H.replace(/<b([^>]*)>/gi,"<strong$1>");H=H.replace(/<\/b>/gi,"</strong>");}H=H.replace(/<strike/gi,'<span style="text-decoration: line-through;"');H=H.replace(/\/strike>/gi,'/span>');H=H.replace(/<font/gi,"<font");H=H.replace(/<\/font>/gi,"</font>");H=H.replace(/<span/gi,"<span");H=H.replace(/<\/span>/gi,"</span>");
	if((G=="semantic")||(G=="xhtml")||(G=="css")){H=H.replace(new RegExp("<font([^>]*)face=\"([^>]*)\">(.*?)</font>","gi"),"<span $1 style=\"font-family: $2;\">$3</span>");H=H.replace(/<u/gi,"<span style=\"text-decoration: underline;\"");H=H.replace(/\/u>/gi,"/span>");
	if(G=="css"){H=H.replace(/<em([^>]*)>/gi,"<i$1>");H=H.replace(/<\/em>/gi,"</i>");H=H.replace(/<strong([^>]*)>/gi,"<b$1>");H=H.replace(/<\/strong>/gi,"</b>");H=H.replace(/<b/gi,"<span style=\"font-weight: bold;\"");H=H.replace(/\/b>/gi,"/span>");H=H.replace(/<i/gi,"<span style=\"font-style: italic;\"");H=H.replace(/\/i>/gi,"/span>");}H=H.replace(/  /gi," ");}
	else{H=H.replace(/<u/gi,"<u");H=H.replace(/\/u>/gi,"/u>");}H=H.replace(/<ol([^>]*)>/gi,"<ol$1>");H=H.replace(/\/ol>/gi,"/ol>");H=H.replace(/<li/gi,"<li");H=H.replace(/\/li>/gi,"/li>");H=this.filter_safari(H);H=this.filter_internals(H);H=this.filter_all_rgb(H);H=this.post_filter_linebreaks(H,G);
	if(G=="xhtml"){H=H.replace(/<YUI_IMG([^>]*)>/g,"<img $1 />");H=H.replace(/<YUI_INPUT([^>]*)>/g,"<input $1 />");}
	else{H=H.replace(/<YUI_IMG([^>]*)>/g,"<img $1>");H=H.replace(/<YUI_INPUT([^>]*)>/g,"<input $1>");}H=H.replace(/<YUI_UL([^>]*)>/g,"<ul$1>");H=H.replace(/<\/YUI_UL>/g,"</ul>");H=this.filter_invalid_lists(H);H=H.replace(/<YUI_BQ([^>]*)>/g,"<blockquote$1>");H=H.replace(/<\/YUI_BQ>/g,"</blockquote>");H=H.replace(/<YUI_EMBED([^>]*)>/g,"<embed$1>");H=H.replace(/<\/YUI_EMBED>/g,"</embed>");H=YAHOO.lang.trim(H);
	if(this.get("removeLineBreaks")){H=H.replace(/\n/g,"").replace(/\r/g,"");H=H.replace(/  /gi," ");}if(H.substring(0,6).toLowerCase()=="<span>"){H=H.substring(6);
	if(H.substring(H.length-7,H.length).toLowerCase()=="</span>"){H=H.substring(0,H.length-7);}}for(var F in this.invalidHTML){if(YAHOO.lang.hasOwnProperty(this.invalidHTML,F)){if(D.isObject(F)&&F.keepContents){H=H.replace(new RegExp("<"+F+"([^>]*)>(.*?)</"+F+">","gi"),"$1");}
	else{H=H.replace(new RegExp("<"+F+"([^>]*)>(.*?)</"+F+">","gi"),"");}}}this.fireEvent("cleanHTML",{type:"cleanHTML",target:this,html:H});return H;},filter_invalid_lists:function(F){F=F.replace(/<\/li>\n/gi,"</li>");F=F.replace(/<\/li><ol>/gi,"</li><li><ol>");F=F.replace(/<\/ol>/gi,"</ol></li>");F=F.replace(/<\/ol><\/li>\n/gi,"</ol>\n");F=F.replace(/<\/li><ul>/gi,"</li><li><ul>");F=F.replace(/<\/ul>/gi,"</ul></li>");F=F.replace(/<\/ul><\/li>\n/gi,"</ul>\n");F=F.replace(/<\/li>/gi,"</li>\n");F=F.replace(/<\/ol>/gi,"</ol>\n");F=F.replace(/<ol>/gi,"<ol>\n");F=F.replace(/<ul>/gi,"<ul>\n");return F;},filter_safari:function(F){if(this.browser.webkit){F=F.replace(/Apple-style-span/gi,"");F=F.replace(/style="line-height: normal;"/gi,"");F=F.replace(/<li><\/li>/gi,"");F=F.replace(/<li> <\/li>/gi,"");F=F.replace(/<li>  <\/li>/gi,"");F=F.replace(/<div><\/div>/gi,"");F=F.replace(/<div> <\/div>/gi,"");}return F;},filter_internals:function(F){F=F.replace(/\r/g,"");F=F.replace(/<\/?(body|head|html)[^>]*>/gi,"");F=F.replace(/<YUI_BR><\/li>/gi,"</li>");F=F.replace(/yui-tag-span/gi,"");F=F.replace(/yui-tag/gi,"");F=F.replace(/yui-non/gi,"");F=F.replace(/yui-img/gi,"");F=F.replace(/ tag="span"/gi,"");F=F.replace(/ class=""/gi,"");F=F.replace(/ style=""/gi,"");F=F.replace(/ class=" "/gi,"");F=F.replace(/ class="  "/gi,"");F=F.replace(/ target=""/gi,"");F=F.replace(/ title=""/gi,"");
	if(this.browser.ie){F=F.replace(/ class= /gi,"");F=F.replace(/ class= >/gi,"");F=F.replace(/_height="([^>])"/gi,"");F=F.replace(/_width="([^>])"/gi,"");}return F;},filter_all_rgb:function(J){var I=new RegExp("rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)","gi");
	var F=J.match(I);
	if(D.isArray(F)){for(var H=0;H<F.length;H++){var G=this.filter_rgb(F[H]);J=J.replace(F[H].toString(),G);}}return J;},filter_rgb:function(H){if(H.toLowerCase().indexOf("rgb")!=-1){var K=new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)","gi");
	var G=H.replace(K,"$1,$2,$3,$4,$5").split(",");
	if(G.length==5){var J=parseInt(G[1],10).toString(16);
	var I=parseInt(G[2],10).toString(16);
	var F=parseInt(G[3],10).toString(16);J=J.length==1?"0"+J:J;I=I.length==1?"0"+I:I;F=F.length==1?"0"+F:F;H="#"+J+I+F;}}return H;},pre_filter_linebreaks:function(G,F){if(this.browser.webkit){G=G.replace(/<br class="khtml-block-placeholder">/gi,"<YUI_BR>");G=G.replace(/<br class="webkit-block-placeholder">/gi,"<YUI_BR>");}G=G.replace(/<br>/gi,"<YUI_BR>");G=G.replace(/<br (.*?)>/gi,"<YUI_BR>");G=G.replace(/<br\/>/gi,"<YUI_BR>");G=G.replace(/<br \/>/gi,"<YUI_BR>");G=G.replace(/<div><YUI_BR><\/div>/gi,"<YUI_BR>");G=G.replace(/<p>(&nbsp;|&#160;)<\/p>/g,"<YUI_BR>");G=G.replace(/<p><br>&nbsp;<\/p>/gi,"<YUI_BR>");G=G.replace(/<p>&nbsp;<\/p>/gi,"<YUI_BR>");G=G.replace(/<YUI_BR>$/,"");G=G.replace(/<YUI_BR><\/p>/g,"</p>");return G;},post_filter_linebreaks:function(G,F){if(F=="xhtml"){G=G.replace(/<YUI_BR>/g,"<br />");}
	else{G=G.replace(/<YUI_BR>/g,"<br>");}return G;},clearEditorDoc:function(){this._getDoc().body.innerHTML="&nbsp;";},_renderPanel:function(){},openWindow:function(F){},moveWindow:function(){},_closeWindow:function(){},closeWindow:function(){this.unsubscribeAll("afterExecCommand");
	this.toolbar.resetAllButtons();
	this._focusWindow();},destroy:function(){this.saveHTML();
	this.toolbar.destroy();
	this.setStyle("visibility","hidden");
	this.setStyle("position","absolute");
	this.setStyle("top","-9999px");
	this.setStyle("left","-9999px");
	var G=this.get("element");
	this.get("element_cont").get("parentNode").replaceChild(G,this.get("element_cont").get("element"));
	this.get("element_cont").get("element").innerHTML="";
	this.set("handleSubmit",false);for(var F in this){if(D.hasOwnProperty(this,F)){this[F]=null;}}return true;},toString:function(){var F="SimpleEditor";
	if(this.get&&this.get("element_cont")){F="SimpleEditor (#"+this.get("element_cont").get("id")+")"+((this.get("disabled")?" Disabled":""));}return F;}});YAHOO.widget.EditorInfo={_instances:{},window:{},panel:null,getEditorById:function(F){if(!YAHOO.lang.isString(F)){F=F.id;}if(this._instances[F]){return this._instances[F];}return false;},toString:function(){var F=0;for(var G in this._instances){F++;}return"Editor Info ("+F+" registered intance"+((F>1)?"s":"")+")";}};})();(function(){var C=YAHOO.util.Dom,A=YAHOO.util.Event,D=YAHOO.lang,B=YAHOO.widget.Toolbar;YAHOO.widget.Editor=function(G,F){YAHOO.widget.Editor.superclass.constructor.call(this,G,F);};function E(F){return F.replace(/ /g,"-").toLowerCase();}YAHOO.extend(YAHOO.widget.Editor,YAHOO.widget.SimpleEditor,{STR_BEFORE_EDITOR:"This text field can contain stylized text and graphics. To cycle through all formatting options, use the keyboard shortcut Control + Shift + T to place focus on the toolbar and navigate between option heading names. <h4>Common formatting keyboard shortcuts:</h4><ul><li>Control Shift B sets text to bold</li> <li>Control Shift I sets text to italic</li> <li>Control Shift U underlines text</li> <li>Control Shift [ aligns text left</li> <li>Control Shift | centers text</li> <li>Control Shift ] aligns text right</li> <li>Control Shift L adds an HTML link</li> <li>To exit this text editor use the keyboard shortcut Control + Shift + ESC.</li></ul>",STR_CLOSE_WINDOW:"Close Window",STR_CLOSE_WINDOW_NOTE:"To close this window use the Control + Shift + W key",STR_IMAGE_PROP_TITLE:"Image Options",STR_IMAGE_URL:"Image Url",STR_IMAGE_TITLE:"Description",STR_IMAGE_SIZE:"Size",STR_IMAGE_ORIG_SIZE:"Original Size",STR_IMAGE_COPY:"<span class=\"tip\"><span class=\"icon icon-info\"></span><strong>Note:</strong>To move this image just highlight it, cut, and paste where ever you'd like.</span>",STR_IMAGE_PADDING:"Padding",STR_IMAGE_BORDER:"Border",STR_IMAGE_TEXTFLOW:"Text Flow",STR_LOCAL_FILE_WARNING:"<span class=\"tip\"><span class=\"icon icon-warn\"></span><strong>Note:</strong>This image/link points to a file on your computer and will not be accessible to others on the internet.</span>",STR_LINK_PROP_TITLE:"Link Options",STR_LINK_PROP_REMOVE:"Remove link from text",STR_LINK_NEW_WINDOW:"Open in a new window.",STR_LINK_TITLE:"Description",CLASS_LOCAL_FILE:"warning-localfile",CLASS_HIDDEN:"yui-hidden",init:function(G,F){this._defaultToolbar={collapse:true,titlebar:"Text Editing Tools",draggable:false,buttonType:"advanced",buttons:[{group:"fontstyle",label:"Font Name and Size",buttons:[{type:"select",label:"Arial",value:"fontname",disabled:true,menu:[{text:"Arial",checked:true},{text:"Arial Black"},{text:"Comic Sans MS"},{text:"Courier New"},{text:"Lucida Console"},{text:"Tahoma"},{text:"Times New Roman"},{text:"Trebuchet MS"},{text:"Verdana"}]},{type:"spin",label:"13",value:"fontsize",range:[9,75],disabled:true}]},{type:"separator"},{group:"textstyle",label:"Font Style",buttons:[{type:"push",label:"Bold CTRL + SHIFT + B",value:"bold"},{type:"push",label:"Italic CTRL + SHIFT + I",value:"italic"},{type:"push",label:"Underline CTRL + SHIFT + U",value:"underline"},{type:"separator"},{type:"push",label:"Subscript",value:"subscript",disabled:true},{type:"push",label:"Superscript",value:"superscript",disabled:true},{type:"separator"},{type:"color",label:"Font Color",value:"forecolor",disabled:true},{type:"color",label:"Background Color",value:"backcolor",disabled:true},{type:"separator"},{type:"push",label:"Remove Formatting",value:"removeformat",disabled:true},{type:"push",label:"Show/Hide Hidden Elements",value:"hiddenelements"}]},{type:"separator"},{group:"alignment",label:"Alignment",buttons:[{type:"push",label:"Align Left CTRL + SHIFT + [",value:"justifyleft"},{type:"push",label:"Align Center CTRL + SHIFT + |",value:"justifycenter"},{type:"push",label:"Align Right CTRL + SHIFT + ]",value:"justifyright"},{type:"push",label:"Justify",value:"justifyfull"}]},{type:"separator"},{group:"parastyle",label:"Paragraph Style",buttons:[{type:"select",label:"Normal",value:"heading",disabled:true,menu:[{text:"Normal",value:"none",checked:true},{text:"Header 1",value:"h1"},{text:"Header 2",value:"h2"},{text:"Header 3",value:"h3"},{text:"Header 4",value:"h4"},{text:"Header 5",value:"h5"},{text:"Header 6",value:"h6"}]}]},{type:"separator"},{group:"indentlist",label:"Indenting and Lists",buttons:[{type:"push",label:"Indent",value:"indent",disabled:true},{type:"push",label:"Outdent",value:"outdent",disabled:true},{type:"push",label:"Create an Unordered List",value:"insertunorderedlist"},{type:"push",label:"Create an Ordered List",value:"insertorderedlist"}]},{type:"separator"},{group:"insertitem",label:"Insert Item",buttons:[{type:"push",label:"HTML Link CTRL + SHIFT + L",value:"createlink",disabled:true},{type:"push",label:"Insert Image",value:"insertimage"}]}]};YAHOO.widget.Editor.superclass.init.call(this,G,F);},initAttributes:function(F){YAHOO.widget.Editor.superclass.initAttributes.call(this,F);
	this.setAttributeConfig("localFileWarning",{value:F.locaFileWarning||true});
	this.setAttributeConfig("hiddencss",{value:F.hiddencss||".yui-hidden font, .yui-hidden strong, .yui-hidden b, .yui-hidden em, .yui-hidden i, .yui-hidden u, .yui-hidden div,.yui-hidden p,.yui-hidden span,.yui-hidden img, .yui-hidden ul, .yui-hidden ol, .yui-hidden li, .yui-hidden table { border: 1px dotted #ccc; } .yui-hidden .yui-non { border: none; } .yui-hidden img { padding: 2px; }",writeOnce:true});},_fixNodes:function(){YAHOO.widget.Editor.superclass._fixNodes.call(this);
	var I="";
	var J=this._getDoc().getElementsByTagName("img");for(var G=0;G<J.length;G++){if(J[G].getAttribute("href",2)){I=J[G].getAttribute("src",2);
	if(this._isLocalFile(I)){C.addClass(J[G],this.CLASS_LOCAL_FILE);}
	else{C.removeClass(J[G],this.CLASS_LOCAL_FILE);}}}var H=this._getDoc().body.getElementsByTagName("a");for(var F=0;F<H.length;F++){if(H[F].getAttribute("href",2)){I=H[F].getAttribute("href",2);
	if(this._isLocalFile(I)){C.addClass(H[F],this.CLASS_LOCAL_FILE);}
	else{C.removeClass(H[F],this.CLASS_LOCAL_FILE);}}}},_disabled:["createlink","forecolor","backcolor","fontname","fontsize","superscript","subscript","removeformat","heading","indent"],_alwaysDisabled:{"outdent":true},_alwaysEnabled:{hiddenelements:true},_handleKeyDown:function(H){YAHOO.widget.Editor.superclass._handleKeyDown.call(this,H);
	var G=false,I=null,F=false;
	if(H.shiftKey&&H.ctrlKey){G=true;}switch(H.keyCode){case 219:I="justifyleft";break;case 220:I="justifycenter";break;case 221:I="justifyright";break;}if(G&&I){this.execCommand(I,null);A.stopEvent(H);
	this.nodeChange();}},_handleCreateLinkClick:function(){var F=this._getSelectedElement();
	if(this._isElement(F,"img")){this.STOP_EXEC_COMMAND=true;
	this.currentElement[0]=F;
	this.toolbar.fireEvent("insertimageClick",{type:"insertimageClick",target:this.toolbar});
	this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this});return false;}if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("createlink")){return false;}}this.on("afterExecCommand",function(){var M=new YAHOO.widget.EditorWindow("createlink",{width:"350px"});
	var J=this.currentElement[0],I="",P="",N="",K=false;
	if(J){if(J.getAttribute("href",2)!==null){I=J.getAttribute("href",2);
	if(this._isLocalFile(I)){M.setFooter(this.STR_LOCAL_FILE_WARNING);K=true;}
	else{M.setFooter(" ");}}if(J.getAttribute("title")!==null){P=J.getAttribute("title");}if(J.getAttribute("target")!==null){N=J.getAttribute("target");}}var O="<label for=\"createlink_url\"><strong>"+this.STR_LINK_URL+":</strong> <input type=\"text\" name=\"createlink_url\" id=\"createlink_url\" value=\""+I+"\""+((K)?" class=\"warning\"":"")+"></label>";O+="<label for=\"createlink_target\"><strong>&nbsp;</strong><input type=\"checkbox\" name=\"createlink_target_\" id=\"createlink_target\" value=\"_blank\""+((N)?" checked":"")+"> "+this.STR_LINK_NEW_WINDOW+"</label>";O+="<label for=\"createlink_title\"><strong>"+this.STR_LINK_TITLE+":</strong> <input type=\"text\" name=\"createlink_title\" id=\"createlink_title\" value=\""+P+"\"></label>";
	var L=document.createElement("div");L.innerHTML=O;
	var H=document.createElement("div");H.className="removeLink";
	var G=document.createElement("a");G.href="#";G.innerHTML=this.STR_LINK_PROP_REMOVE;G.title=this.STR_LINK_PROP_REMOVE;A.on(G,"click",function(Q){A.stopEvent(Q);
	this.execCommand("unlink");
	this.closeWindow();},this,true);H.appendChild(G);L.appendChild(H);M.setHeader(this.STR_LINK_PROP_TITLE);M.setBody(L);A.onAvailable("createlink_url",function(){window.setTimeout(function(){try{YAHOO.util.Dom.get("createlink_url").focus();}catch(Q){}},50);A.on("createlink_url","blur",function(){var Q=C.get("createlink_url");
	if(this._isLocalFile(Q.value)){C.addClass(Q,"warning");
	this.get("panel").setFooter(this.STR_LOCAL_FILE_WARNING);}
	else{C.removeClass(Q,"warning");
	this.get("panel").setFooter(" ");}},this,true);},this,true);
	this.openWindow(M);});},_handleCreateLinkWindowClose:function(){var H=C.get("createlink_url"),J=C.get("createlink_target"),L=C.get("createlink_title"),I=this.currentElement[0],F=I;
	if(H&&H.value){var K=H.value;
	if((K.indexOf("://")==-1)&&(K.substring(0,1)!="/")&&(K.substring(0,6).toLowerCase()!="mailto")){if((K.indexOf("@")!=-1)&&(K.substring(0,6).toLowerCase()!="mailto")){K="mailto:"+K;}
	else{if(K.substring(0,1)!="#"){K="http://"+K;}}}I.setAttribute("href",K);
	if(J.checked){I.setAttribute("target",J.value);}
	else{I.setAttribute("target","");}I.setAttribute("title",((L.value)?L.value:""));}
	else{var G=this._getDoc().createElement("span");G.innerHTML=I.innerHTML;C.addClass(G,"yui-non");I.parentNode.replaceChild(G,I);}this.nodeChange();
	this.currentElement=[];},_handleInsertImageClick:function(){if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("insertimage")){return false;}}this._setBusy();
	this.on("afterExecCommand",function(){var I=this.currentElement[0],S=null,P="",e="",f="",O="",b="",V=75,Y=75,U=0,Q=0,N=0,W=false,M=new YAHOO.widget.EditorWindow("insertimage",{width:"415px"});
	if(!I){I=this._getSelectedElement();}if(I){if(I.getAttribute("src")){O=I.getAttribute("src",2);
	if(O.indexOf(this.get("blankimage"))!=-1){O=this.STR_IMAGE_HERE;W=true;}}if(I.getAttribute("alt",2)){f=I.getAttribute("alt",2);}if(I.getAttribute("title",2)){f=I.getAttribute("title",2);}if(I.parentNode&&this._isElement(I.parentNode,"a")){P=I.parentNode.getAttribute("href",2);
	if(I.parentNode.getAttribute("target")!==null){e=I.parentNode.getAttribute("target");}}V=parseInt(I.height,10);Y=parseInt(I.width,10);
	if(I.style.height){V=parseInt(I.style.height,10);}if(I.style.width){Y=parseInt(I.style.width,10);}if(I.style.margin){U=parseInt(I.style.margin,10);}if(!I._height){I._height=V;}if(!I._width){I._width=Y;}Q=I._height;N=I._width;}var Z="<label for=\"insertimage_url\"><strong>"+this.STR_IMAGE_URL+":</strong> <input type=\"text\" id=\"insertimage_url\" value=\""+O+"\" size=\"40\"></label>";S=document.createElement("div");S.innerHTML=Z;
	var K=document.createElement("div");K.id="img_toolbar";S.appendChild(K);
	var F="<label for=\"insertimage_title\"><strong>"+this.STR_IMAGE_TITLE+":</strong> <input type=\"text\" id=\"insertimage_title\" value=\""+f+"\" size=\"40\"></label>";F+="<label for=\"insertimage_link\"><strong>"+this.STR_LINK_URL+":</strong> <input type=\"text\" name=\"insertimage_link\" id=\"insertimage_link\" value=\""+P+"\"></label>";F+="<label for=\"insertimage_target\"><strong>&nbsp;</strong><input type=\"checkbox\" name=\"insertimage_target_\" id=\"insertimage_target\" value=\"_blank\""+((e)?" checked":"")+"> "+this.STR_LINK_NEW_WINDOW+"</label>";
	var T=document.createElement("div");T.innerHTML=F;S.appendChild(T);M.cache=S;
	var H=new YAHOO.widget.Toolbar(K,{buttonType:this._defaultToolbar.buttonType,buttons:[{group:"textflow",label:this.STR_IMAGE_TEXTFLOW+":",buttons:[{type:"push",label:"Left",value:"left"},{type:"push",label:"Inline",value:"inline"},{type:"push",label:"Block",value:"block"},{type:"push",label:"Right",value:"right"}]},{type:"separator"},{group:"padding",label:this.STR_IMAGE_PADDING+":",buttons:[{type:"spin",label:""+U,value:"padding",range:[0,50]}]},{type:"separator"},{group:"border",label:this.STR_IMAGE_BORDER+":",buttons:[{type:"select",label:"Border Size",value:"bordersize",menu:[{text:"none",value:"0",checked:true},{text:"1px",value:"1"},{text:"2px",value:"2"},{text:"3px",value:"3"},{text:"4px",value:"4"},{text:"5px",value:"5"}]},{type:"select",label:"Border Type",value:"bordertype",disabled:true,menu:[{text:"Solid",value:"solid",checked:true},{text:"Dashed",value:"dashed"},{text:"Dotted",value:"dotted"}]},{type:"color",label:"Border Color",value:"bordercolor",disabled:true}]}]});
	var G="0";
	var X="solid";
	if(I.style.borderLeftWidth){G=parseInt(I.style.borderLeftWidth,10);}if(I.style.borderLeftStyle){X=I.style.borderLeftStyle;}var d=H.getButtonByValue("bordersize");
	var a=((parseInt(G,10)>0)?"":"none");d.set("label","<span class=\"yui-toolbar-bordersize-"+G+"\">"+a+"</span>");
	this._updateMenuChecked("bordersize",G,H);
	var R=H.getButtonByValue("bordertype");R.set("label","<span class=\"yui-toolbar-bordertype-"+X+"\"></span>");
	this._updateMenuChecked("bordertype",X,H);
	if(parseInt(G,10)>0){H.enableButton(R);H.enableButton(d);}var J=H.get("cont");
	var c=document.createElement("div");c.className="yui-toolbar-group yui-toolbar-group-height-width height-width";c.innerHTML="<h3>"+this.STR_IMAGE_SIZE+":</h3>";
	var L="";
	if((V!=Q)||(Y!=N)){L="<span class=\"info\">"+this.STR_IMAGE_ORIG_SIZE+"<br>"+N+" x "+Q+"</span>";}c.innerHTML+="<span><input type=\"text\" size=\"3\" value=\""+Y+"\" id=\"insertimage_width\"> x <input type=\"text\" size=\"3\" value=\""+V+"\" id=\"insertimage_height\"></span>"+L;J.insertBefore(c,J.firstChild);A.onAvailable("insertimage_width",function(){A.on("insertimage_width","blur",function(){var g=parseInt(C.get("insertimage_width").value,10);
	if(g>5){I.style.width=g+"px";
	this.moveWindow();}},this,true);},this,true);A.onAvailable("insertimage_height",function(){A.on("insertimage_height","blur",function(){var g=parseInt(C.get("insertimage_height").value,10);
	if(g>5){I.style.height=g+"px";
	this.moveWindow();}},this,true);},this,true);
	if((I.align=="right")||(I.align=="left")){H.selectButton(I.align);}
	else{if(I.style.display=="block"){H.selectButton("block");}
	else{H.selectButton("inline");}}if(parseInt(I.style.marginLeft,10)>0){H.getButtonByValue("padding").set("label",""+parseInt(I.style.marginLeft,10));}if(I.style.borderSize){H.selectButton("bordersize");H.selectButton(parseInt(I.style.borderSize,10));}H.on("colorPickerClicked",function(k){var h="1",j="solid",g="black";
	if(I.style.borderLeftWidth){h=parseInt(I.style.borderLeftWidth,10);}if(I.style.borderLeftStyle){j=I.style.borderLeftStyle;}if(I.style.borderLeftColor){g=I.style.borderLeftColor;}var i=h+"px "+j+" #"+k.color;I.style.border=i;},this.toolbar,true);H.on("buttonClick",function(m){var k=m.button.value,j="";
	if(m.button.menucmd){k=m.button.menucmd;}var h="1",i="solid",g="black";
	if(I.style.borderLeftWidth){h=parseInt(I.style.borderLeftWidth,10);}if(I.style.borderLeftStyle){i=I.style.borderLeftStyle;}if(I.style.borderLeftColor){g=I.style.borderLeftColor;}switch(k){case"bordersize":if(this.browser.webkit&&this._lastImage){C.removeClass(this._lastImage,"selected");
	this._lastImage=null;}j=parseInt(m.button.value,10)+"px "+i+" "+g;I.style.border=j;
	if(parseInt(m.button.value,10)>0){H.enableButton("bordertype");H.enableButton("bordercolor");}
	else{H.disableButton("bordertype");H.disableButton("bordercolor");}break;case"bordertype":if(this.browser.webkit&&this._lastImage){C.removeClass(this._lastImage,"selected");
	this._lastImage=null;}j=h+"px "+m.button.value+" "+g;I.style.border=j;break;case"right":case"left":H.deselectAllButtons();I.style.display="";I.align=m.button.value;break;case"inline":H.deselectAllButtons();I.style.display="";I.align="";break;case"block":H.deselectAllButtons();I.style.display="block";I.align="center";break;case"padding":var l=H.getButtonById(m.button.id);I.style.margin=l.get("label")+"px";break;}H.selectButton(m.button.value);
	this.moveWindow();},this,true);M.setHeader(this.STR_IMAGE_PROP_TITLE);M.setBody(S);
	if((this.browser.webkit&&!this.browser.webkit3)||this.browser.opera){M.setFooter(this.STR_IMAGE_COPY);}this.openWindow(M);A.onAvailable("insertimage_url",function(){this.toolbar.selectButton("insertimage");window.setTimeout(function(){YAHOO.util.Dom.get("insertimage_url").focus();
	if(W){YAHOO.util.Dom.get("insertimage_url").select();}},50);
	if(this.get("localFileWarning")){A.on("insertimage_link","blur",function(){var g=C.get("insertimage_link");
	if(this._isLocalFile(g.value)){C.addClass(g,"warning");
	this.get("panel").setFooter(this.STR_LOCAL_FILE_WARNING);}
	else{C.removeClass(g,"warning");
	this.get("panel").setFooter(" ");
	if((this.browser.webkit&&!this.browser.webkit3)||this.browser.opera){this.get("panel").setFooter(this.STR_IMAGE_COPY);}}},this,true);A.on("insertimage_url","blur",function(){var i=C.get("insertimage_url");
	if(this._isLocalFile(i.value)){C.addClass(i,"warning");
	this.get("panel").setFooter(this.STR_LOCAL_FILE_WARNING);}
	else{if(this.currentElement[0]){C.removeClass(i,"warning");
	this.get("panel").setFooter(" ");
	if((this.browser.webkit&&!this.browser.webkit3)||this.browser.opera){this.get("panel").setFooter(this.STR_IMAGE_COPY);}if(i&&i.value&&(i.value!=this.STR_IMAGE_HERE)){this.currentElement[0].setAttribute("src",i.value);
	var h=this,g=new Image();g.onerror=function(){i.value=h.STR_IMAGE_HERE;g.setAttribute("src",h.get("blankimage"));h.currentElement[0].setAttribute("src",h.get("blankimage"));YAHOO.util.Dom.get("insertimage_height").value=g.height;YAHOO.util.Dom.get("insertimage_width").value=g.width;};window.setTimeout(function(){YAHOO.util.Dom.get("insertimage_height").value=g.height;YAHOO.util.Dom.get("insertimage_width").value=g.width;
	if(h.currentElement&&h.currentElement[0]){if(!h.currentElement[0]._height){h.currentElement[0]._height=g.height;}if(!h.currentElement[0]._width){h.currentElement[0]._width=g.width;}}h.moveWindow();},200);
	if(i.value!=this.STR_IMAGE_HERE){g.src=i.value;}}}}},this,true);}},this,true);});},_handleInsertImageWindowClose:function(){var F=C.get("insertimage_url");
	var M=C.get("insertimage_title");
	var J=C.get("insertimage_link");
	var K=C.get("insertimage_target");
	var I=this.currentElement[0];
	if(F&&F.value&&(F.value!=this.STR_IMAGE_HERE)){I.setAttribute("src",F.value);I.setAttribute("title",M.value);I.setAttribute("alt",M.value);
	var H=I.parentNode;
	if(J.value){var L=J.value;
	if((L.indexOf("://")==-1)&&(L.substring(0,1)!="/")&&(L.substring(0,6).toLowerCase()!="mailto")){if((L.indexOf("@")!=-1)&&(L.substring(0,6).toLowerCase()!="mailto")){L="mailto:"+L;}
	else{L="http://"+L;}}if(H&&this._isElement(H,"a")){H.setAttribute("href",L);
	if(K.checked){H.setAttribute("target",K.value);}
	else{H.setAttribute("target","");}}
	else{var G=this._getDoc().createElement("a");G.setAttribute("href",L);
	if(K.checked){G.setAttribute("target",K.value);}
	else{G.setAttribute("target","");}I.parentNode.replaceChild(G,I);G.appendChild(I);}}
	else{if(H&&this._isElement(H,"a")){H.parentNode.replaceChild(I,H);}}}
	else{I.parentNode.removeChild(I);}this.currentElement=[];
	this.nodeChange();},_renderPanel:function(){var F=null;
	if(!YAHOO.widget.EditorInfo.panel){F=new YAHOO.widget.Overlay(this.EDITOR_PANEL_ID,{width:"300px",iframe:true,visible:false,underlay:"none",draggable:false,close:false});YAHOO.widget.EditorInfo.panel=F;}
	else{F=YAHOO.widget.EditorInfo.panel;}this.set("panel",F);
	this.get("panel").setBody("---");
	this.get("panel").setHeader(" ");
	this.get("panel").setFooter(" ");
	if(this.DOMReady){this.get("panel").render(document.body);C.addClass(this.get("panel").element,"yui-editor-panel");}
	else{A.onDOMReady(function(){this.get("panel").render(document.body);C.addClass(this.get("panel").element,"yui-editor-panel");},this,true);}this.get("panel").showEvent.subscribe(function(){YAHOO.util.Dom.setStyle(this.element,"display","block");});return this.get("panel");},openWindow:function(K){this.toolbar.set("disabled",true);A.on(document,"keypress",this._closeWindow,this,true);
	if(YAHOO.widget.EditorInfo.window.win&&YAHOO.widget.EditorInfo.window.scope){YAHOO.widget.EditorInfo.window.scope.closeWindow.call(YAHOO.widget.EditorInfo.window.scope);}YAHOO.widget.EditorInfo.window.win=K;YAHOO.widget.EditorInfo.window.scope=this;
	var P=this,L=C.getXY(this.currentElement[0]),U=C.getXY(this.get("iframe").get("element")),N=this.get("panel"),T=[(L[0]+U[0]-20),(L[1]+U[1]+10)],O=(parseInt(K.attrs.width,10)/2),R="center",M=null;
	this.fireEvent("beforeOpenWindow",{type:"beforeOpenWindow",win:K,panel:N});M=document.createElement("div");M.className=this.CLASS_PREFIX+"-body-cont";for(var V in this.browser){if(this.browser[V]){C.addClass(M,V);break;}}C.addClass(M,((YAHOO.widget.Button&&(this._defaultToolbar.buttonType=="advanced"))?"good-button":"no-button"));
	var S=document.createElement("h3");S.className="yui-editor-skipheader";S.innerHTML=this.STR_CLOSE_WINDOW_NOTE;M.appendChild(S);form=document.createElement("form");form.setAttribute("method","GET");
	var W=K.name;A.on(form,"submit",function(Y){var X="window"+W+"Submit";P.fireEvent(X,{type:X,target:this});A.stopEvent(Y);},this,true);M.appendChild(form);
	if(D.isObject(K.body)){form.appendChild(K.body);}
	else{var F=document.createElement("div");F.innerHTML=K.body;form.appendChild(F);}var J=document.createElement("span");J.innerHTML="X";J.title=this.STR_CLOSE_WINDOW;J.className="close";A.on(J,"click",function(){this.closeWindow();},this,true);
	var H=document.createElement("span");H.innerHTML="^";H.className="knob";K._knob=H;
	var I=document.createElement("h3");I.innerHTML=K.header;N.cfg.setProperty("width",K.attrs.width);N.setHeader(" ");N.appendToHeader(I);I.appendChild(J);I.appendChild(H);N.setBody(" ");N.setFooter(" ");
	if(K.footer!==null){N.setFooter(K.footer);C.addClass(N.footer,"open");}
	else{C.removeClass(N.footer,"open");}N.appendToBody(M);
	var Q=function(){N.bringToTop();A.on(N.element,"click",function(X){A.stopPropagation(X);});
	this._setBusy(true);N.showEvent.unsubscribe(Q);};N.showEvent.subscribe(Q,this,true);
	var G=function(){this.currentWindow=null;
	var X="window"+W+"Close";
	this.fireEvent(X,{type:X,target:this});N.hideEvent.unsubscribe(G);};N.hideEvent.subscribe(G,this,true);
	this.currentWindow=K;
	this.moveWindow(true);N.show();
	this.fireEvent("afterOpenWindow",{type:"afterOpenWindow",win:K,panel:N});},moveWindow:function(G){if(!this.currentWindow){return false;}var J=this.currentWindow,K=C.getXY(this.currentElement[0]),b=C.getXY(this.get("iframe").get("element")),P=this.get("panel"),Z=[(K[0]+b[0]),(K[1]+b[1])],S=(parseInt(J.attrs.width,10)/2),V="center",R=P.cfg.getProperty("xy"),H=J._knob,Y=0,M=0,U=false;Z[0]=((Z[0]-S)+20);Z[0]=Z[0]-C.getDocumentScrollLeft(this._getDoc());Z[1]=Z[1]-C.getDocumentScrollTop(this._getDoc());
	if(this._isElement(this.currentElement[0],"img")){if(this.currentElement[0].src.indexOf(this.get("blankimage"))!=-1){Z[0]=(Z[0]+(75/2));Z[1]=(Z[1]+75);}
	else{var O=parseInt(this.currentElement[0].width,10);
	var X=parseInt(this.currentElement[0].height,10);Z[0]=(Z[0]+(O/2));Z[1]=(Z[1]+X);}Z[1]=Z[1]+15;}
	else{var L=C.getStyle(this.currentElement[0],"fontSize");
	if(L&&L.indexOf&&L.indexOf("px")!=-1){Z[1]=Z[1]+parseInt(C.getStyle(this.currentElement[0],"fontSize"),10)+5;}
	else{Z[1]=Z[1]+20;}}if(Z[0]<b[0]){Z[0]=b[0]+5;V="left";}if((Z[0]+(S*2))>(b[0]+parseInt(this.get("iframe").get("element").clientWidth,10))){Z[0]=((b[0]+parseInt(this.get("iframe").get("element").clientWidth,10))-(S*2)-5);V="right";}try{Y=(Z[0]-R[0]);M=(Z[1]-R[1]);}catch(c){}var Q=b[1]+parseInt(this.get("height"),10);
	var I=b[0]+parseInt(this.get("width"),10);
	if(Z[1]>Q){Z[1]=Q;}if(Z[0]>I){Z[0]=(I/2);}Y=((Y<0)?(Y*-1):Y);M=((M<0)?(M*-1):M);
	if(((Y>10)||(M>10))||G){var T=0,W=0;
	if(this.currentElement[0].width){W=(parseInt(this.currentElement[0].width,10)/2);}var N=K[0]+b[0]+W;T=N-Z[0];
	if(T>(parseInt(J.attrs.width,10)-1)){T=parseInt(J.attrs.width,10)-1;}
	else{if(T<40){T=1;}}if(isNaN(T)){T=1;}if(G){if(H){H.style.left=T+"px";}if(this.get("animate")){C.setStyle(P.element,"opacity","0");U=new YAHOO.util.Anim(P.element,{opacity:{from:0,to:1}},0.1,YAHOO.util.Easing.easeOut);P.cfg.setProperty("xy",Z);U.onComplete.subscribe(function(){if(this.browser.ie){P.element.style.filter="none";}},this,true);U.animate();}
	else{P.cfg.setProperty("xy",Z);}}
	else{if(this.get("animate")){U=new YAHOO.util.Anim(P.element,{},0.5,YAHOO.util.Easing.easeOut);U.attributes={top:{to:Z[1]},left:{to:Z[0]}};U.onComplete.subscribe(function(){P.cfg.setProperty("xy",Z);});
	var a=new YAHOO.util.Anim(P.iframe,U.attributes,0.5,YAHOO.util.Easing.easeOut);
	var F=new YAHOO.util.Anim(H,{left:{to:T}},0.6,YAHOO.util.Easing.easeOut);U.animate();a.animate();F.animate();}
	else{H.style.left=T+"px";P.cfg.setProperty("xy",Z);}}}},_closeWindow:function(F){if((F.charCode==87)&&F.shiftKey&&F.ctrlKey){if(this.currentWindow){this.closeWindow();}}},closeWindow:function(){YAHOO.widget.EditorInfo.window={};
	this.fireEvent("closeWindow",{type:"closeWindow",win:this.currentWindow});
	this.currentWindow=null;
	this.get("panel").hide();
	this.get("panel").cfg.setProperty("xy",[-900,-900]);
	this.get("panel").syncIframe();
	this.unsubscribeAll("afterExecCommand");
	this.toolbar.set("disabled",false);
	this.toolbar.resetAllButtons();
	this._focusWindow();A.removeListener(document,"keypress",this._closeWindow);},cmd_heading:function(J){var G=true,H=null,I="heading",K=this._getSelection(),F=this._getSelectedElement();
	if(F){K=F;}if(this.browser.ie){I="formatblock";}if(J=="none"){if((K&&K.tagName&&(K.tagName.toLowerCase().substring(0,1)=="h"))||(K&&K.parentNode&&K.parentNode.tagName&&(K.parentNode.tagName.toLowerCase().substring(0,1)=="h"))){if(K.parentNode.tagName.toLowerCase().substring(0,1)=="h"){K=K.parentNode;}if(this._isElement(K,"html")){return[false];}H=this._swapEl(F,"span",function(L){L.className="yui-non";});
	this._selectNode(H);
	this.currentElement[0]=H;}G=false;}
	else{if(this._isElement(F,"h1")||this._isElement(F,"h2")||this._isElement(F,"h3")||this._isElement(F,"h4")||this._isElement(F,"h5")||this._isElement(F,"h6")){H=this._swapEl(F,J);
	this._selectNode(H);
	this.currentElement[0]=H;}
	else{this._createCurrentElement(J);
	this._selectNode(this.currentElement[0]);}G=false;}return[G,I];},cmd_hiddenelements:function(F){if(this._showingHiddenElements){this._lastButton=null;
	this._showingHiddenElements=false;
	this.toolbar.deselectButton("hiddenelements");C.removeClass(this._getDoc().body,this.CLASS_HIDDEN);}
	else{this._showingHiddenElements=true;C.addClass(this._getDoc().body,this.CLASS_HIDDEN);
	this.toolbar.selectButton("hiddenelements");}return[false];},cmd_removeformat:function(I){var G=true;
	if(this.browser.webkit&&!this._getDoc().queryCommandEnabled("removeformat")){var F=this._getSelection()+"";
	this._createCurrentElement("span");
	this.currentElement[0].className="yui-non";
	this.currentElement[0].innerHTML=F;for(var H=1;H<this.currentElement.length;H++){this.currentElement[H].parentNode.removeChild(this.currentElement[H]);}G=false;}return[G];},cmd_script:function(L,K){var H=true,F=L.toLowerCase().substring(0,3),I=null,G=this._getSelectedElement();
	if(this.browser.webkit){if(this._isElement(G,F)){I=this._swapEl(this.currentElement[0],"span",function(M){M.className="yui-non";});
	this._selectNode(I);}
	else{this._createCurrentElement(F);
	var J=this._swapEl(this.currentElement[0],F);
	this._selectNode(J);
	this.currentElement[0]=J;}H=false;}return H;},cmd_superscript:function(F){return[this.cmd_script("superscript",F)];},cmd_subscript:function(F){return[this.cmd_script("subscript",F)];},cmd_indent:function(I){var F=true,H=this._getSelectedElement(),J=null;
	if(this.browser.webkit||this.browser.ie||this.browser.gecko){if(this._isElement(H,"blockquote")){J=this._getDoc().createElement("blockquote");J.innerHTML=H.innerHTML;H.innerHTML="";H.appendChild(J);
	this._selectNode(J);}
	else{this._createCurrentElement("blockquote");for(var G=0;G<this.currentElement.length;G++){J=this._getDoc().createElement("blockquote");J.innerHTML=this.currentElement[G].innerHTML;
	this.currentElement[G].parentNode.replaceChild(J,this.currentElement[G]);
	this.currentElement[G]=J;}this._selectNode(this.currentElement[0]);}F=false;}
	else{I="blockquote";}return[F,"indent",I];},cmd_outdent:function(J){var F=true,I=this._getSelectedElement(),K=null,G=null;
	if(this.browser.webkit||this.browser.ie||this.browser.gecko){I=this._getSelectedElement();
	if(this._isElement(I,"blockquote")){var H=I.parentNode;
	if(this._isElement(I.parentNode,"blockquote")){H.innerHTML=I.innerHTML;
	this._selectNode(H);}
	else{G=this._getDoc().createElement("span");G.innerHTML=I.innerHTML;YAHOO.util.Dom.addClass(G,"yui-non");H.replaceChild(G,I);
	this._selectNode(G);}}
	else{}F=false;}
	else{J="blockquote";}return[F,"indent",J];},toString:function(){var F="Editor";
	if(this.get&&this.get("element_cont")){F="Editor (#"+this.get("element_cont").get("id")+")"+((this.get("disabled")?" Disabled":""));}return F;}});YAHOO.widget.EditorWindow=function(G,F){this.name=G.replace(" ","_");
	this.attrs=F;};YAHOO.widget.EditorWindow.prototype={_cache:null,header:null,body:null,footer:null,setHeader:function(F){this.header=F;},setBody:function(F){this.body=F;},setFooter:function(F){this.footer=F;},toString:function(){return"Editor Window ("+this.name+")";}};})();YAHOO.register("editor",YAHOO.widget.Editor,{version:"2.5.0",build:"897"});YAHOO.namespace('Lifestyles.ImageUploader');YAHOO.Lifestyles.ImageUploader=function(el,fields,oArgs){this.prefix=oArgs.prefix||"ylf-";
	this.modes=oArgs.modes||{"intro":{"title":"Introduction","step":0,"hidden":true},"upload":{"title":"Upload Photos","step":1},"detail":{"title":"Describe Photos","step":2},"order":{"title":"Sort Photos","step":3},"finish":{"title":"Finish","step":4}};
	this.steps=oArgs.steps||{"prev":{"title":"&lt;&lt; Go Back","mode":this.PREV_MODE},"next":{"title":"Next Step &gt;&gt;","mode":this.NEXT_MODE},"done":{"title":"I'm Finished","mode":"finish"}};
	this.mode=oArgs.mode||"stepped";
	this.lastMode=null;
	this.thumbStart=this.getTemplateMarkup(oArgs.elThumbStart||this.prefix+"thumb-start");
	this.thumbProgress=this.getTemplateMarkup(oArgs.elThumbProgress||this.prefix+"thumb-progress");
	this.thumbDone=this.getTemplateMarkup(oArgs.elThumbDone||this.prefix+"thumb-done");
	this.detailsTpl=this.getTemplateMarkup(oArgs.elDetails||this.prefix+"details-tpl");
	this.actionsTpl=this.getTemplateMarkup(oArgs.elActions||this.prefix+"actions-tpl");
	this.errorTpl=this.getTemplateMarkup(oArgs.elError||this.prefix+"error-tpl");
	this.maxSizeUploadError=this.getTemplateMarkup(oArgs.elmaxSizeUploadError||this.prefix+"maxSizeUploadError-tpl");
	this.fields=fields;
	this.fileList=YAHOO.util.Dom.get(el);
	this.wrapper=this.fileList.parentNode;YAHOO.util.Dom.addClass(this.fileList,"files");YAHOO.util.Event.addListener(this.fileList,"click",this.dispatchClick,this,true);
	this.uploader=new YAHOO.widget.Uploader(oArgs.elUploader);
	this.uploader.subscribe('fileSelect',this.addFiles,this,true);
	this.uploader.subscribe('uploadStart',this.startRow,this,true);
	this.uploader.subscribe('uploadProgress',this.updateProgress,this,true);
	this.uploader.subscribe('uploadComplete',this.uploadDone,this,true);
	this.uploader.subscribe('uploadCompleteData',this.processResponse,this,true);
	this.uploader.subscribe('uploadError',this.handleError,this,true);
	this.lockWhileUploading=(typeof oArgs.lockWhileUploading!="undefined")?oArgs.lockWhileUploading:true;
	this.filesInProgress={};
	this.filesInProgress.length=0;
	this.groupCount=0;
	this.completedCount=0;
	this.lastFocusedRow=null;
	this.alias=oArgs.alias;
	this.crb=oArgs.crb;
	this.totalUploadedCount=document.getElementsByName('original[]');
	if(this.totalUploadedCount.length>0){this.highestStepReached=4;}

	else{this.highestStepReached=0;}
this.maxUpload=oArgs.maxUpload;
	this.maxUploadError=oArgs.maxUploadError;
	this.statusBarId=oArgs.statusBarId;
	this.statusBarChildId=oArgs.statusBarChildId;
	this.cancelBtnId=oArgs.cancelBtnId;
	this.cancelBtnText=oArgs.cancelBtnText;
	this.uploadMoreBtnId=oArgs.uploadMoreBtnId;
	this.onChangeMode=new YAHOO.util.CustomEvent('onChangeMode',this,true,YAHOO.util.CustomEvent.FLAT);
	var i=0;
	var button;
	var buttons=document.createElement("div");buttons.id=this.prefix+"buttons";for(var m in this.modes){if(!this.lastMode){this.setMode(m);}
if(this.modes[m].hidden){continue;}
button=document.createElement("button");button.id=this.prefix+m+'-btn';button.name=button.className=m;
	if(this.highestStepReached<this.modes[m].step){button.className+=" disabled";button.disabled=true;}
button.innerHTML=(this.mode=="stepped"?++i+". ":"")+this.modes[m].title;YAHOO.util.Event.addListener(button,'click',function(e,uploader){uploader.setMode(this.name,true);},this);buttons.appendChild(button);button.setAttribute('type','button');}
this.wrapper.insertBefore(buttons,this.wrapper.firstChild);
	if(this.mode=='stepped'){for(i=0;i<2;i++){buttons=document.createElement("div");buttons.className="step-nav";buttons.innerHTML+='<span>- add Gallery to my post</span>';for(var s in this.steps){button=document.createElement("button");button.className=s;button.innerHTML=this.steps[s].title;YAHOO.util.Event.addListener(button,'click',function(e,args){args.uploader.setMode(args.mode);},{"uploader":this,"mode":this.steps[s].mode});buttons.appendChild(button);button.setAttribute('type','button');}
if(i==0){this.wrapper.insertBefore(buttons,this.wrapper.firstChild.nextSibling);}
	else{this.wrapper.appendChild(buttons);YAHOO.util.Dom.addClass(buttons,'bottom');}}}
buttons=button=null;
	if(oArgs.useFileHeader){this.addRow(this.fields,true);}
if(this.highestStepReached==4){this.setMode('upload');
	this.finalizeUpload(true);}};YAHOO.Lifestyles.ImageUploader.prototype.NEXT_MODE="next_mode";YAHOO.Lifestyles.ImageUploader.prototype.PREV_MODE="prev_mode";YAHOO.Lifestyles.ImageUploader.prototype.getTemplateMarkup=function(elId){var el=YAHOO.util.Dom.get(elId);return el?el.innerHTML.replace('<!--!','').replace('!-->',''):'';};YAHOO.Lifestyles.ImageUploader.prototype.addRow=function(oData,asHeader){var col,row,f,key,listNum=1;row=document.createElement("div");for(f in this.fields){col=document.createElement("div");key=this.fields[f].key;col.className="field "+key;col.innerHTML=asHeader?this.fields[f].label:oData[key];row.appendChild(col);}
if(asHeader){row.className="header cls";row.id=this.prefix+"file-header";
	this.wrapper.insertBefore(row,this.fileList);}
	else{col=document.createElement("div");col.className="actions";col.innerHTML=this.actionsTpl;row.appendChild(col);row.className="file cls";YAHOO.util.Dom.generateId(row,this.prefix+"file-");
	this.fileList.appendChild(row);
	if(row.previousSibling){listNum=parseInt(row.previousSibling.firstChild.innerHTML)+1;}
row.innerHTML='<div class="list">'+listNum+'</div>'+row.innerHTML;}
return row.id;};YAHOO.Lifestyles.ImageUploader.prototype.updateRow=function(rowId,oData){var row,col,f;row=YAHOO.util.Dom.get(rowId);
	if(!row){return false;}
for(f in oData){col=YAHOO.util.Dom.getElementsByClassName(f,"div",row);
	if(col.length==1){col[0].innerHTML=oData[f];}}
return true;};YAHOO.Lifestyles.ImageUploader.prototype.dispatchClick=function(e){var target=YAHOO.util.Event.getTarget(e);
	if(YAHOO.util.Dom.hasClass(target,'move')){this.moveRow(e);}
	else if(YAHOO.util.Dom.hasClass(target,'delete')){this.deleteRow(e);}};YAHOO.Lifestyles.ImageUploader.prototype.deleteRow=function(e,rowid){if(rowid){var row=YAHOO.util.Dom.get(rowid);row.parentNode.removeChild(row);}

	else{var row=YAHOO.util.Dom.getAncestorByClassName(YAHOO.util.Event.getTarget(e),'file');
	var confirmDeleteSSRow=new YAHOO.Lifestyles.PopUpConfirm();confirmDeleteSSRow.yesHandler=function(){row.parentNode.removeChild(row);
	this.confirmDialog.hide();YAHOO.Lifestyles.Uploader.finalizeUpload();YAHOO.Lifestyles.Uploader.reNumber();};confirmDeleteSSRow.init('delete',{'header':'Delete This Photo','body':'Are you sure you would like to delete this photo from your gallery?'});confirmDeleteSSRow.confirmDialog.show();}};YAHOO.Lifestyles.ImageUploader.prototype.reNumber=function(e){var getList=YAHOO.util.Dom.getElementsByClassName('list','div',this.fileList);for(var i=0,len=getList.length;i<len;i++){getList[i].innerHTML=i+1;}};YAHOO.Lifestyles.ImageUploader.prototype.cancelUpload=function(){var confirmCanelUploadSS=new YAHOO.Lifestyles.PopUpConfirm();confirmCanelUploadSS.yesHandler=function(e,uploader){var loading=YAHOO.util.Dom.getElementsByClassName('loading','img','ylf-files');for(var i=0,len=loading.length;i<len;i++){YAHOO.Lifestyles.Uploader.deleteRow(YAHOO.Lifestyles.Uploader,loading[i].parentNode.parentNode.id);}
this.confirmDialog.hide();YAHOO.Lifestyles.Uploader.finalizeUpload(true);YAHOO.Lifestyles.Uploader.reNumber();YAHOO.Lifestyles.Uploader.uploader.cancel();};confirmCanelUploadSS.init('delete',{'header':'Cancel This Upload','body':'Are you sure you would like to cancel the upload in progress?'});confirmCanelUploadSS.confirmDialog.show();}
YAHOO.Lifestyles.ImageUploader.prototype.moveRow=function(e){var target=YAHOO.util.Event.getTarget(e);
	if(YAHOO.util.Dom.hasClass(target,'move')){YAHOO.util.Event.preventDefault(e);
	var row=YAHOO.util.Dom.getAncestorByClassName(target,'file');
	if(YAHOO.util.Dom.hasClass(target,'up')){this.fileList.insertBefore(row,YAHOO.util.Dom.getPreviousSibling(row));}
	else if(YAHOO.util.Dom.hasClass(target,'down')){if(row==this.fileList.lastChild){YAHOO.util.Dom.insertBefore(row,this.fileList.firstChild);}
	else{YAHOO.util.Dom.insertAfter(row,YAHOO.util.Dom.getNextSibling(row));}}
this.reNumber();
	var nodeAnim=new YAHOO.util.Anim(row,{opacity:{from:0,to:1}},0.7,YAHOO.util.Easing.easeOut);nodeAnim.animate();}};YAHOO.Lifestyles.ImageUploader.prototype.stringToDom=function(str){var xmlDoc=null;
	if(YAHOO.env.ua.ie){xmlDoc=new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async="false";xmlDoc.loadXML(str);}
	else if(typeof DOMParser=="function"||typeof DOMParser=="object"){parser=new DOMParser();xmlDoc=parser.parseFromString(str,"text/xml");}
return xmlDoc;};YAHOO.Lifestyles.ImageUploader.prototype.addFiles=function(event){var fileInfo;
	if(this.lastMode!='upload'){this.setMode('upload');}
document.getElementById(this.prefix+'upload-btn').disabled=true;
	this.completedCount=this.groupCount=0;for(var i in event.fileList){if((this.totalUploadedCount.length+this.groupCount+1)<=this.maxUpload){fileInfo={'fileId':event.fileList[i]['id'],'size':event.fileList[i]['size'],'details':'<div class="filename">'+event.fileList[i]['name']+'</div>','thumb':this.thumbStart,'progress':"In Queue"};fileInfo.rowId=this.addRow(fileInfo);
	this.filesInProgress[fileInfo.fileId]={'rowId':fileInfo.rowId,'filename':event.fileList[i]['name']};
	this.filesInProgress.length++;
	this.upload(fileInfo.fileId);
	if(this.groupCount==0){if(YAHOO.util.Dom.get('statusWrapper')){YAHOO.util.Event.purgeElement('statusWrapper',true);
	this.wrapper.removeChild(YAHOO.util.Dom.get('statusWrapper'));}
statusDiv=document.createElement("div");statusDiv.id='statusWrapper';
	this.wrapper.insertBefore(statusDiv,this.wrapper.firstChild.nextSibling.nextSibling);statusDiv.innerHTML='<div id="statusOf">Starting Upload...</div><div id="'+this.statusBarId+'"><div id="'+this.statusBarChildId+'"></div></div><button type="button" id="'+this.cancelBtnId+'">'+this.cancelBtnText+'</button>';YAHOO.util.Event.on(this.cancelBtnId,'click',function(e,uploader){uploader.cancelUpload()},this);}
this.groupCount++;}}
YAHOO.util.Dom.addClass(this.wrapper,'uploading');};YAHOO.Lifestyles.ImageUploader.prototype.upload=function(id){this.uploader.upload(id,'/api/post/photo/upload','POST',{'title':'image','alias':this.alias,'u':escape(document.cookie),'crb':this.crb},'image');};YAHOO.Lifestyles.ImageUploader.prototype.startRow=function(event){this.updateRow(this.filesInProgress[event.id].rowId,{progress:"Starting...",thumb:this.thumbProgress});};YAHOO.Lifestyles.ImageUploader.prototype.updateProgress=function(event){var prog=Math.round(100*(event["bytesLoaded"]/event["bytesTotal"]));
	var progbar=(prog==100)?'Processing...':"<hr style=\"color: #f00; background-color: #f00; text-align:left; margin: 0 auto 0 0; height: 5px; width: "+prog+"px\"/>";
	this.updateRow(this.filesInProgress[event.id].rowId,{progress:progbar});};YAHOO.Lifestyles.ImageUploader.prototype.uploadDone=function(event){};YAHOO.Lifestyles.ImageUploader.prototype.processResponse=function(event){var photo_info={};photo_info.rowId=this.filesInProgress[event.id].rowId;photo_info.filename=this.filesInProgress[event.id].filename;
	var xml=this.stringToDom(event.data);try{var errorCode=xml.getElementsByTagName('error')[0].getAttribute('uploadErrorCode');}
catch(err){var errorCode="0"}
var respStatus=xml.getElementsByTagName('response')[0].getAttribute('stat');
	var fileStatus=respStatus==="1"?xml.getElementsByTagName('upload')[0].getAttribute('status'):0;
	if((respStatus==="1"&&fileStatus==="1"&&errorCode==="0")){var photo=xml.getElementsByTagName('photo_url')[0];photo_info.id=photo.getAttribute('photo_id');photo_info.thumb=photo.getElementsByTagName('url_thumb')[0].firstChild.nodeValue;photo_info.original=photo.getElementsByTagName('url_original')[0].firstChild.nodeValue;photo_info.width=xml.getElementsByTagName('ImageWidth')[0].firstChild.nodeValue;photo_info.height=xml.getElementsByTagName('ImageHeight')[0].firstChild.nodeValue;
	var completedPercentage=(Math.round(((this.completedCount+1)/this.groupCount)*100))+"%";YAHOO.util.Dom.setStyle(this.statusBarChildId,'width',completedPercentage);YAHOO.util.Dom.get('statusOf').innerHTML=(this.completedCount+1)+' of '+this.groupCount+' photos uploaded';
	this.updateRow(photo_info.rowId,{progress:'Done',thumb:YAHOO.lang.substitute(this.thumbDone,photo_info),details:YAHOO.lang.substitute(this.detailsTpl,photo_info)});}
	else{this.handleError(event,errorCode);}
this.finalizeUpload();};YAHOO.Lifestyles.ImageUploader.prototype.finalizeUpload=function(cancel){if(++this.completedCount>=this.groupCount||cancel){YAHOO.util.Dom.get(this.prefix+'upload-btn').disabled=false;YAHOO.util.Dom.addClass(this.wrapper,'files-uploaded');YAHOO.util.Dom.removeClass(this.wrapper,'uploading');
	this.filesInProgress={};
	this.filesInProgress.length=0;
	if((this.maxUpload-this.totalUploadedCount.length)>=0){var uploadcount=this.maxUpload-this.totalUploadedCount.length;}

	else{var uploadcount=0;}
if(this.maxUpload==uploadcount){this.setMode('intro');}

	else{if(!YAHOO.util.Dom.get('statusWrapper')){statusDiv=document.createElement("div");statusDiv.id='statusWrapper';
	this.wrapper.insertBefore(statusDiv,this.wrapper.firstChild.nextSibling.nextSibling);}
YAHOO.util.Dom.get('statusWrapper').innerHTML='You can <button id="'+this.uploadMoreBtnId+'" type="button">Upload '+uploadcount+' More Photo(s)</button>';
	if(uploadcount==0){YAHOO.util.Dom.get('statusWrapper').innerHTML=this.maxUploadError;}
YAHOO.util.Event.on(this.uploadMoreBtnId,'click',function(e,uploader){uploader.initUpload()},this);}}};YAHOO.Lifestyles.ImageUploader.prototype.stripTags=function(e){var target=YAHOO.util.Event.getTarget(e);
	if(target.nodeName.toLowerCase()!=='input'){return;}

	else{var tempvalue=target.value.replace(/(<([^>]+)>)/ig,"");target.value=tempvalue;}}
YAHOO.Lifestyles.ImageUploader.prototype.toggleDetails=function(e,args){for(var i=1,len=args.fields.length;i<len;i++){YAHOO.util.Dom.removeClass(args.fields[i],"hide");YAHOO.util.Dom.addClass(args.fields[i],"show");}
if(this.lastFocusedRow&&this.lastFocusedRow!=args.id){var fieldsToHide=YAHOO.util.Dom.getElementsByClassName("show","div",this.lastFocusedRow);YAHOO.util.Dom.batch(fieldsToHide,function(el){YAHOO.util.Dom.removeClass(el,"show");YAHOO.util.Dom.addClass(el,"hide");});}
this.lastFocusedRow=args.id;};YAHOO.Lifestyles.ImageUploader.prototype.handleError=function(event,errorCode){var newError,fileValue,temprowid;
	if(errorCode=="1"){newError=this.maxSizeUploadError;}

	else{newError=this.errorTpl;}
try{temprowid=this.filesInProgress[event.id].rowId;fileValue=YAHOO.util.Dom.getElementsByClassName('filename','div',temprowid);fileValue=fileValue[0].innerHTML;}
catch(err){fileValue='';}
newError=newError+fileValue;
	this.updateRow(this.filesInProgress[event.id].rowId,{progress:'Error',thumb:this.thumbStart,details:newError});};YAHOO.Lifestyles.ImageUploader.prototype.processMode=function(mode){if(mode&&this.lastMode!=mode){YAHOO.util.Dom.replaceClass(this.wrapper,this.lastMode,mode);
	if(this.modes[mode].step>this.highestStepReached){this.highestStepReached=this.modes[mode].step;}
this.onChangeMode.fire({'from':this.lastMode,'to':mode});
	this.lastMode=mode;
	var button;for(var m in this.modes){button=YAHOO.util.Dom.get(this.prefix+m+'-btn');
	if(button&&button.disabled&&this.modes[m].step<=this.highestStepReached){YAHOO.util.Dom.removeClass(button,"disabled");button.disabled=false;}}}};YAHOO.Lifestyles.ImageUploader.prototype.setMode=function(mode,clicked){if(this.lockWhileUploading&&this.filesInProgress.length){return;}
if(this.lastMode!=mode){var lastLoopMode,useModeOnNextLoop;for(var m in this.modes){if(m==mode||useModeOnNextLoop){if(!(this.modes[m].delayed&&clicked)||useModeOnNextLoop){this.processMode(m);mode=m;}
useModeOnNextLoop=false;}
	else if(!this.modes[mode]){if(this.NEXT_MODE===mode&&this.lastMode==m){useModeOnNextLoop=true;}
	else if(this.PREV_MODE===mode&&this.lastMode==m){this.processMode(lastLoopMode);mode=lastLoopMode;}}
lastLoopMode=m;}}
this.lockDrag();switch(mode){case"upload":break;case"detail":this.initMetadata();break;case"order":this.initDrag();
	this.unlockDrag();break;}};YAHOO.Lifestyles.ImageUploader.prototype.initUpload=function(){if(this.filesInProgress.length==0){this.uploader.clearFileList();
	this.uploader.browse(true,[{description:"Gallery Images (*.jpg, *.gif)",extensions:"*.jpeg;*.jpg;*.gif"}]);}};YAHOO.Lifestyles.ImageUploader.prototype.initMetadata=function(){YAHOO.util.Event.addListener(this.prefix+"files","mouseout",this.stripTags);};YAHOO.Lifestyles.ImageUploader.prototype.initDrag=function(){new YAHOO.util.DDTarget(this.fileList.id);
	var items=YAHOO.util.Dom.getElementsByClassName("file","div",this.fileList);for(var i=0,len=items.length;i<len;i++){new YAHOO.Lifestyles.ImageUploader.File(items[i].id);}};YAHOO.Lifestyles.ImageUploader.prototype.lockDrag=function(){YAHOO.util.DragDropMgr.lock();};YAHOO.Lifestyles.ImageUploader.prototype.unlockDrag=function(){YAHOO.util.DragDropMgr.unlock();};YAHOO.Lifestyles.ImageUploader.File=function(id,sGroup,config){YAHOO.Lifestyles.ImageUploader.File.superclass.constructor.call(this,id,sGroup,config);
	this.lastNode=this.lastNodeUp=this.lastNodeDown=null;
	this.goingUp=false;
	this.lastY=0;};YAHOO.extend(YAHOO.Lifestyles.ImageUploader.File,YAHOO.util.DDProxy,{startDrag:function(x,y){var dragEl=this.getDragEl();dragEl.className="proxy";
	var clickEl=this.getEl();YAHOO.util.Dom.addClass(clickEl,'dragged');},onDrag:function(e){var y=YAHOO.util.Event.getPageY(e);
	if(y<this.lastY){this.goingUp=true;}
	else if(y>this.lastY){this.goingUp=false;}
this.lastY=y;},onDragOver:function(e,id){var srcEl=this.getEl();
	var destEl=YAHOO.util.Dom.get(id);
	if(YAHOO.util.Dom.hasClass(destEl,'file')){this.lastNode=destEl;
	if(this.goingUp){this.setDragIndicators(destEl,'above');
	this.lastNodeUp=destEl;
	this.lastNodeDown=null;}
	else{this.setDragIndicators(destEl,'below');
	this.lastNodeDown=destEl;
	this.lastNodeUp=null;}
YAHOO.util.DragDropMgr.refreshCache();}},onDragDrop:function(e,id){if(YAHOO.util.DragDropMgr.interactionInfo.drop.length===1){var pt=YAHOO.util.DragDropMgr.interactionInfo.point;
	var region=YAHOO.util.DragDropMgr.interactionInfo.sourceRegion;
	if(!region.intersect(pt)){var destEl=YAHOO.util.Dom.get(id);
	var destDD=YAHOO.util.DragDropMgr.getDDById(id);destEl.appendChild(this.getEl());destDD.isEmpty=false;YAHOO.util.DragDropMgr.refreshCache();}}},endDrag:function(e){this.setDragIndicators();
	var srcEl=this.getEl();
	var proxy=this.getDragEl();
	var p=srcEl.parentNode;
	if(this.lastNode==this.lastNodeUp){p.insertBefore(srcEl,this.lastNode);}
	else if(this.lastNode==this.lastNodeDown){p.insertBefore(srcEl,this.lastNode.nextSibling);}
YAHOO.util.Dom.removeClass(srcEl,'dragged');YAHOO.util.Dom.removeClass(proxy,'proxy-hide');
	var a=new YAHOO.util.Motion(proxy,{points:{to:YAHOO.util.Dom.getXY(srcEl)}},0.2,YAHOO.util.Easing.easeOut);a.onComplete.subscribe(function(){YAHOO.util.Dom.addClass(proxy,'proxy-hide');});a.animate();YAHOO.Lifestyles.Uploader.reNumber();},setDragIndicators:function(el,elClass){YAHOO.util.Dom.removeClass(this.lastNodeUp,'above');YAHOO.util.Dom.removeClass(this.lastNodeDown,'below');
	if(el&&elClass)
YAHOO.util.Dom.addClass(el,elClass);}});YAHOO.Lifestyles.RTE=(function(){var myConfig={height:'300px',width:'630px',animate:true,dompath:true,focusAtStart:true,extracss:'img{display:block;margin:0 auto;}html{width:628px;overflow:hidden;}.yui-media {display:block; height: 100px; width: 100px; border: 1px solid black; background-color: #f2f2f2; cursor:pointer !important; background-image: url(http://l.yimg.com/jn/images/20081208112220/media_placeholder.gif); background-position: 50% 50%; background-repeat: no-repeat; }.yui-media *{display:none;height:0px; text-indent:-4999px; width:0px;overflow:hidden; /*height width and overflow for safari*/}',toolbar:{buttons:[{group:'textstyle',label:'Font Style',buttons:[{type:'push',label:'Bold CTRL + SHIFT + B',value:'bold'},{type:'push',label:'Italic CTRL + SHIFT + I',value:'italic'},{type:'push',label:'Strike Through',value:'strikethrough'},{type:'push',label:'Remove Formatting',value:'removeformat',disabled:true}]},{type:'separator'},{group:'indentlist',label:'Lists',buttons:[{type:'push',label:'Create an Unordered List',value:'insertunorderedlist'},{type:'push',label:'Create an Ordered List',value:'insertorderedlist'}]},{type:'separator'},{group:'insertitem',label:'Insert Item',buttons:[{type:'push',label:'Highlight words to add a link',value:'createlink',disabled:false},{type:'push',label:'Image Options',value:'insertimage'},{type:'push',label:'Media Options',value:'insertmedia'}]},{type:'separator'},{group:'insertfeature',label:'Insert Feature <b> &lt;NEW&gt;</b>',buttons:[{type:'push',label:'Gallery',value:'createslideshow',disabled:false}]}]}};
	var state='off';
	var myEditor=new YAHOO.widget.Editor('editor',myConfig);
	var Dom=YAHOO.util.Dom,Event=YAHOO.util.Event,Lang=YAHOO.lang;
	var blgChannel=Dom.get('channel'),blgEditor=Dom.get('editor'),blgTitle=Dom.get('blog_title');
	var leaveflag=false;
	var crumb=Dom.get('blogForm').getElementsByTagName('input')[0].value;
	var usrAlias=Dom.get('userAlias').value;
	var _handleWindowClose=function(){var el=this.currentElement[0];
	this.nodeChange();};
	var initGallery=function()
		{
			YAHOO.widget.Uploader.SWFURL="/static/uploader.swf";
			YAHOO.Lifestyles.Uploader=new YAHOO.Lifestyles.ImageUploader("ylf-files",
			[
				{key:"thumb",label:"Thumb"},
				{key:"details",label:"File Details"}
			],
				{elUploader:"ylf-uploader",
					caption:"Gallery Images",
					alias:usrAlias,crb:crumb,
					maxUpload:'20',
					maxUploadError:'<span class="error">You have uploaded 20 images.</span>',
					statusBarId:'statusBar',
					statusBarChildId:'statusBarFill',
					cancelBtnId:'cancelUploadSS',
					cancelBtnText:'Cancel Upload',
					uploadMoreBtnId:'uploadMoreSS'
				});
		}
var _handleMediaWindow=function(){var el=this._getSelectedElement(),win=new YAHOO.widget.EditorWindow('insertmedia',{width:'425px'}),body=document.createElement('span');
	var embedContent='';
	if(el.nodeName==="SPAN")
{if(Dom.hasClass(el,'yui-media')){embedContent=el.innerHTML;}}
body.innerHTML='<div id="media"><label for="embedplugin"><p><em>Want to add a video (or a poll) to your blog?</em> If it is hosted on another site, it will be easy to add to your blog.  Just paste the html <em>EMBED</em> tag into the box below.</p><div class="mediaView"><div id="media_cont">Media Preview Area</div><textarea id="embedplugin" rows="8" cols="25">'+embedContent+'</textarea></div><p class="mediaInstructions"><em><span>*</span>Yahoo! Video Users:</em><br />You can find this tag in the <em>Add to Site box</em>, at the bottom of the video</p><p class="mediaInstructions"><em><span>*</span>Flickr Video Users:</em><br />You can find this tag by clicking on the <em>&lt;/&gt; embed</em> button and selecting the HTML under step three</p><p class="mediaInstructions"><em><span>*</span>Bix Users:</em><br />You can find the embed tag after clicking on the <em>put on website</em> link under the Vote For Section in the embed box</p><p class="mediaInstructions"><em><span>*</span>YouTube Users:</em><br />You can find the <em>embed tag</em> under the About this Video Section in the embed box.</p></label><div id="doneCont"><button id="mediaDone">Done</button><button id="previewBtn">Preview</button></div></div>';win.setHeader('Edit Media');win.setBody(body);
	this.openWindow(win);Event.on('mediaDone','click',function(){myEditor.closeWindow();});Event.on('previewBtn','click',function(){var el=Dom.get('embedplugin');
	if(el&&el.value&&(el.value!=='')){try{var embedbox=Dom.get("embedplugin").value;
	var startemb=embedbox.indexOf("<embed");
	var endemb=embedbox.indexOf("</embed>");
	if(endemb==-1){endemb=embedbox.length;}
var newembed=embedbox.substring(startemb,endemb);Dom.get("media_cont").innerHTML=newembed;Dom.get("media_cont").getElementsByTagName("embed")[0].setAttribute('width','160');Dom.get("media_cont").getElementsByTagName("embed")[0].setAttribute('height','140');Dom.get("media_cont").getElementsByTagName("embed")[0].setAttribute('wmode','');Dom.setStyle('media_cont','display','block');}
catch(err){Dom.get("media_cont").innerHTML='<span>Make sure you have entered HTML containing an EMBED string.</span>';}
Event.on('codeBtn','click',function(){Dom.setStyle('media_cont','display','none');Dom.setStyle('media','display','block');});
	this.moveWindow();
	this.get('panel').syncIframe();}},this,true);
	this.on('afterOpenWindow',function(){this.get('panel').syncIframe();},this,true);};myEditor.on('windowinsertmediaClose',function(){_handleWindowClose.call(this);
	var el=this.currentElement[0];
	var embedbox=Dom.get("embedplugin").value;
	var startemb=embedbox.indexOf("<embed");
	var endemb=embedbox.indexOf("</embed>");
	if(endemb==-1){endemb=embedbox.length-8;}
var newembed=embedbox.substring(startemb,endemb+8);el.innerHTML=newembed;try{var emb_flashvars=el.getElementsByTagName("embed")[0].getAttribute("flashvars");
	var emb_src=el.getElementsByTagName("embed")[0].getAttribute("src");
	var emb_type=el.getElementsByTagName("embed")[0].getAttribute("type");
	var emb_width=el.getElementsByTagName("embed")[0].getAttribute("width");
	var emb_height=el.getElementsByTagName("embed")[0].getAttribute("height");
	if(emb_width>599){emb_width=600;}
el.innerHTML='<embed></embed>';el.getElementsByTagName("embed")[0].setAttribute('flashvars',emb_flashvars);el.getElementsByTagName("embed")[0].setAttribute('src',emb_src);el.getElementsByTagName("embed")[0].setAttribute('type',emb_type);el.getElementsByTagName("embed")[0].setAttribute('width',emb_width);el.getElementsByTagName("embed")[0].setAttribute('height',emb_height);el.getElementsByTagName("embed")[0].setAttribute('allowfullscreen','true');el.removeAttribute('style');}
catch(err){el.parentNode.removeChild(el);}},myEditor,true);myEditor.cmd_insertmedia=function(){this.execCommand('insertimage','none');
	var el=this._swapEl(this.currentElement[0],'span',function(el){el.className='yui-media';Dom.setStyle(el,'fontSize','100px');});
	this.currentElement=[el];_handleMediaWindow.call(this);};myEditor.on('editorDoubleClick',function(){var el=this._getSelectedElement();
	if(Dom.hasClass(el,'yui-media')){this.currentElement=[el];Dom.setStyle(el,'fontSize','100px');_handleMediaWindow.call(this);return false;}},myEditor,true);myEditor.on('afterNodeChange',function(){if(this._hasSelection()){this.toolbar.disableButton('insertmedia');}
	else{this.toolbar.enableButton('insertmedia');
	var el=this._getSelectedElement();
	if(Dom.hasClass(el,'yui-media')){this.toolbar.selectButton('insertmedia');}
	else{this.toolbar.deselectButton('insertmedia');}}},myEditor,true);myEditor.on('toolbarLoaded',function(){this.toolbar.on('insertmediaClick',function(){var el=this._getSelectedElement();
	if(Dom.hasClass(el,'yui-media')){this.currentElement=[el];_handleMediaWindow.call(this);return false;}},this,true);},myEditor,true);function yuiImgUploader(rte,upload_url,upload_image_name){rte.on('toolbarLoaded',function(){rte.toolbar.on('insertimageClick',function(o){try{var imgPanel=new YAHOO.util.Element('yui-editor-panel');imgPanel.on('contentReady',function(){try{while(!Dom.get('imageDone')){Dom.setStyle(Dom.get('img_toolbar').nextSibling,'display','none');
	var img_elem=Dom.get('insertimage_url');
	var imgHeight=Dom.get('insertimage_height');
	var imgLink=Dom.get('insertimage_link');
	var filediv=document.createElement('div');filediv.id="fileUploadField";filediv.innerHTML='<div style="clear:right;" class="menuTitle">Add an image from the web</div>';Dom.insertBefore(filediv,img_elem.parentNode);
	var editPhoto=document.createElement('div');editPhoto.innerHTML="Edit Your Image";editPhoto.className='menuTitle';Dom.insertAfter(editPhoto,img_elem.parentNode);
	var optDiv=document.createElement('div');optDiv.innerHTML='<br /><a href="#" id="imageOptions">More edit options »</a>';Dom.insertAfter(optDiv,imgHeight.parentNode.parentNode.parentNode);
	var doneDiv=document.createElement('div');doneDiv.id="doneCont";doneDiv.innerHTML='<button id="imageDone">Done</button>';Dom.insertAfter(doneDiv,Dom.get('img_toolbar').nextSibling);
	var linkDiv=document.createElement('div');linkDiv.innerHTML='Want to add a link to your image?';linkDiv.className="menuTitle";Dom.insertBefore(linkDiv,imgLink.parentNode);Event.on('imageDone','click',function(ev){myEditor.closeWindow();});Event.on('imageOptions','click',function(ev){Event.preventDefault(ev);
	if(Dom.getStyle(Dom.get('img_toolbar').nextSibling,"display")==="none")
{Dom.setStyle(Dom.get('img_toolbar').nextSibling,'display','block');}

	else
{Dom.setStyle(Dom.get('img_toolbar').nextSibling,'display','none');}});Event.on('insertimage_upload_btn','click',function(ev){Dom.setStyle(Dom.get('loadingArea').nextSibling,'display','none');
	var fileUpl=Dom.get('insertimage_upload').value;
	var fileLen=fileUpl.length;
	var fileExt=fileUpl.substr(fileLen-3,fileLen).toLowerCase();
	var fileExtWindows=fileUpl.substr(fileLen-4,fileLen).toLowerCase();
	if((fileUpl!=='')&&((fileExt==="jpg")||(fileExt==="gif")||(fileExtWindows==="jpeg"))){Event.stopEvent(ev);
	var callback={upload:function(o){var xml=o.responseXML;try{var medium=xml.getElementsByTagName("url_medium")[0].firstChild.nodeValue;
	var original=xml.getElementsByTagName("url_original")[0].firstChild.nodeValue;
	var width=xml.getElementsByTagName("ImageWidth")[0].firstChild.nodeValue;
	var height=xml.getElementsByTagName("ImageHeight")[0].firstChild.nodeValue;
	if(height>width){if(height<400){Dom.get('insertimage_url').value=original;}

	else{Dom.get('insertimage_url').value=medium;}}

	else{if(width<400){Dom.get('insertimage_url').value=original;}

	else{Dom.get('insertimage_url').value=medium;}}
Dom.get('insertimage_upload').value='';Dom.get('insertimage_url').focus();Dom.get('insertimage_upload').focus();Dom.get('loadingArea').innerHTML='';Dom.setStyle(Dom.get('fileUploadField'),'display','none');Dom.setStyle(Dom.get('fileUploadField').nextSibling,'display','none');
	var uploadConfirm=document.createElement('div');uploadConfirm.innerHTML='<p>Your image has been uploaded successfully!</p>';Dom.insertAfter(uploadConfirm,Dom.get('fileUploadField'));Dom.setStyle(Dom.get('fileUploadField').nextSibling.nextSibling,'display','none');Dom.get('img_toolbar').previousSibling.innerHTML="Want to edit your image?";}
catch(e){Dom.get('loadingArea').innerHTML='There was an error uploading your image. Please make sure your image meets the upload requirements.';Dom.setStyle(Dom.get('loadingArea').nextSibling,'display','block');}}};Dom.get('loadingArea').innerHTML='It could take up to 5 minutes for your image to upload.<br><img src="http://l.yimg.com/jn/images/20081208112220/ajax-loader2.gif"><br /><button id="insertimage_cancel_upload_btn">Cancel Upload</button>';
	var formObject=Dom.get('aForm');YAHOO.util.Connect.setForm(formObject,true);
	var cObj=YAHOO.util.Connect.asyncRequest('POST','/api/post/photo/upload',callback);Event.on('insertimage_cancel_upload_btn','click',function(){YAHOO.util.Connect.abort(cObj);Dom.get('loadingArea').innerHTML='Image upload has been cancelled.';Dom.setStyle(Dom.get('loadingArea').nextSibling,'display','block');});return false;}

	else if(fileUpl==='')
{Dom.get('loadingArea').innerHTML='Please Select a File to Upload.';Dom.setStyle(Dom.get('loadingArea').nextSibling,'display','block');}

	else
{Dom.get('loadingArea').innerHTML='Please upload an image with a "gif" or "jpg" file format.';Dom.setStyle(Dom.get('loadingArea').nextSibling,'display','block');}});}}catch(ee){YAHOO.log(ee.message,'error');}});}catch(e){YAHOO.log(e.message,'error');}});});}
function handleLinkWindow(rte){rte.on('toolbarLoaded',function(){rte.toolbar.on('createlinkClick',function(o){try{var lnkPanel=new YAHOO.util.Element('yui-editor-panel');lnkPanel.on('contentReady',function(){var linkDiv=document.createElement('div');linkDiv.innerHTML='<button id="linkDone">Done</button>';
	var lnk_elem=Dom.get('createlink_title');linkDiv.id="linkDoneCon";Dom.insertAfter(linkDiv,lnk_elem.parentNode.nextSibling);YAHOO.util.Event.on('linkDone','click',function(){rte.closeWindow();});});}catch(ee){YAHOO.log(ee.message,'error');}});});}
function handleSlideShow(rte){var confirmDeleteSS=new YAHOO.Lifestyles.PopUpConfirm();confirmDeleteSS.yesHandler=function(){Dom.get('ylf-files').innerHTML='';
	var elssholder=Dom.get('ssholder');elssholder.parentNode.removeChild(elssholder);YAHOO.Lifestyles.Uploader.setMode('intro');
	this.confirmDialog.hide();};confirmDeleteSS.init('delete',{'header':'Delete This Gallery','body':'Would you like to delete this gallery from your post?'});function showHideSlideShow(mode){if(Dom.get('ylf-uploader').getElementsByTagName('object')[0]||Dom.get('ylf-uploader').getElementsByTagName('embed')[0]){if(mode==true)
{Dom.removeClass('slideShow','on');Dom.removeClass('editorCont','off');}

	else{Dom.addClass('editorCont','off');Dom.addClass('slideShow','on');
	var nodeAni=new YAHOO.util.Anim(Dom.get('slideShow'),{opacity:{from:0,to:1}},0.7,YAHOO.util.Easing.easeOut);nodeAni.animate();}}

	else
{while(!Dom.get('ssholder')){var SSdiv=document.createElement('div');SSdiv.id="ssholder";SSdiv.innerHTML="This tool requires the latest Flash Player. Download at: <a href='http://www.adobe.com/go/getflashplayer'>Adobe Flash Player Download Center</a>";Dom.insertBefore(SSdiv,Dom.get('editor_dompath').previousSibling);}}}
function addSlideShowPlaceHolder(){if(document.getElementsByName('thumb[]').length>0){if(!Dom.get('ssholder')){var SSdiv=document.createElement('div');SSdiv.id="ssholder";}

	else{var SSdiv=Dom.get('ssholder');}
Event.purgeElement('ssholder',true);
	if(Dom.get('sstop').checked){SSdiv.innerHTML='Your gallery will be displayed above the text in this post  <span><a href="#" id="editss">Edit &raquo;</a> <a href="#" id="deletess">Delete &raquo;</a></span>';
	if(Dom.get('editor_dompath').previousSibling.id=='ssholder'){Dom.insertBefore(SSdiv,Dom.get('editor_dompath').previousSibling.previousSibling);}
	else{Dom.insertBefore(SSdiv,Dom.get('editor_dompath').previousSibling);}}

	else{SSdiv.innerHTML='Your gallery will be displayed below the text in this post  <span><a href="#" id="editss">Edit &raquo;</a> <a href="#" id="deletess">Delete &raquo;</a></span>';Dom.insertBefore(SSdiv,Dom.get('editor_dompath'));}
showHideSlideShow(true);Event.on('editss','click',function(e){Event.preventDefault(e);showHideSlideShow(false);});Event.on('deletess','click',function(e,obj){Event.preventDefault(e);obj.confirmDialog.show();},confirmDeleteSS);}}
rte.on('toolbarLoaded',function(){rte.toolbar.on('createslideshowClick',function(o){if(Dom.hasClass('slideShow','on'))
{Dom.removeClass('slideShow','on');Dom.removeClass('editorCont','off');}

	else
{showHideSlideShow(false);}
return});
	if(document.getElementsByName('thumb[]').length>0){Event.onContentReady('editor_dompath',addSlideShowPlaceHolder);}
Event.on('addSS','click',function(){addSlideShowPlaceHolder();});Event.on('uploadPhotosSS','click',function(){YAHOO.Lifestyles.Uploader.initUpload()});Event.on('addSS','click',function(){showHideSlideShow(true);addSlideShowPlaceHolder();});
	var returnLink=Dom.get('return_blog_ss');Event.on(returnLink,'click',function(e){Event.preventDefault(e);
	if(!Dom.hasClass('ylf-slideshow','uploading')){showHideSlideShow(true);addSlideShowPlaceHolder();}});});}
var resize=function(){var doc=this._getDoc(),body=doc.body,docEl=doc.documentElement;
	var height=Dom.getStyle(this.get('editor_wrapper'),'height');
	var pxHeight=((this.browser.ie)?body.scrollHeight:docEl.scrollHeight);
	var newHeight=pxHeight+'px';
	if((height!=newHeight)&&(pxHeight>='300')&&(Dom.getStyle('editor_editor','position')!=="absolute")){Dom.setStyle(this.get('editor_wrapper'),'height',newHeight);
	if(this.browser.ie){Dom.setStyle(Dom.get('editor_editor'),'height',newHeight);Dom.setStyle(Dom.get('editor_editor'),'overflow','hidden');}}};myEditor.on('toolbarLoaded',function(){var htmlbtn=Dom.get('htmlMode');
	var rtebtn=Dom.get('rteMode');Dom.removeClass(htmlbtn,"off");Dom.removeClass(rtebtn,"off");
	var RTEMode=function(e){var ta=myEditor.get('element'),iframe=myEditor.get('iframe').get('element');
	var target=Event.getTarget(e).id;
	if(target==="rteMode"){myEditor.toolbar.set('disabled',false);Dom.addClass(rtebtn,"rteOnSelect");Dom.removeClass(htmlbtn,"rteOnSelect");myEditor.setEditorHTML(ta.value);
	if(!myEditor.browser.ie){myEditor._setDesignMode('on');}
Dom.removeClass(iframe,'editor-hidden');Dom.addClass(ta,'editor-hidden');myEditor.show();myEditor._focusWindow();Event.preventDefault(e);}

	else{Dom.addClass(htmlbtn,"rteOnSelect");Dom.removeClass(rtebtn,"rteOnSelect");myEditor.cleanHTML();Dom.addClass(iframe,'editor-hidden');Dom.removeClass(ta,'editor-hidden');myEditor.toolbar.set('disabled',true);myEditor.dompath.innerHTML='Editing HTML Code';myEditor.hide();Event.preventDefault(e);}};Event.on("rteMode","click",RTEMode);Event.on("htmlMode","click",RTEMode);
	this.on('cleanHTML',function(ev){this.get('element').value=ev.html;},this,true);
	this.on('afterRender',function(){var wrapper=this.get('editor_wrapper');wrapper.appendChild(this.get('element'));
	this.setStyle('width','620px');
	this.setStyle('height','100%');
	this.setStyle('visibility','');
	this.setStyle('top','');
	this.setStyle('left','');
	this.setStyle('position','');
	this.addClass('editor-hidden');},this,true);},myEditor,true);myEditor.on('afterRender',function(){this.get('iframe').get('element').setAttribute('scrolling','no');},myEditor,true);myEditor.on('afterNodeChange',resize,myEditor,true);myEditor.on('editorKeyPress',resize,myEditor,true);myEditor.render();yuiImgUploader(myEditor,'/file_upload.php','');handleLinkWindow(myEditor);handleSlideShow(myEditor);myEditor.on('afterRender',function(){this.get('iframe').get('element').setAttribute('scrolling','no');},myEditor,true);
	var previewBlog=function(){var cidImage='http://us.i1.yimg.com/us.yimg.com/i/identity/nopic_32.gif';
	var avatar=Dom.get('avatar');
	if(avatar){if(avatar.getAttribute("longdesc")){cidImage=avatar.getAttribute("longdesc");}
	else{cidImage=avatar.getAttribute("src");}}
if(Dom.get('excerpt').value==='')
{Dom.setStyle("previewExcerpt",'display','none');Dom.setStyle("yourPost",'display','none');}

	else
{Dom.setStyle("previewExcerpt",'display','block');Dom.setStyle("yourPost",'display','block');Dom.get("excerpt_content_preview").innerHTML='<img src="http://l.yimg.com/jn/images/20081208112220/ajax-loader2.gif" style="margin: 0px auto">';}
Dom.get("blog_content_preview").innerHTML='<img src="http://l.yimg.com/jn/images/20081208112220/ajax-loader2.gif" style="margin: 0px auto">';
	var blogTags=Dom.get("blog_tags").value;
	var relatedLinks=Dom.getElementsByClassName('related','p','ylf-blogpost')[0];
	if(blogTags===''){Dom.setStyle(relatedLinks,'display','none');}
	else{Dom.setStyle(relatedLinks,'display','block');Dom.get("blog_tags_preview").innerHTML=blogTags;}
Dom.get("blog_title_preview").innerHTML=Dom.get("blog_title").value;Dom.get("cidAuth2").innerHTML=(Dom.get('nickName'))?Dom.get('nickName').innerHTML:'you';Dom.get("cidImage2").setAttribute("src",cidImage);Dom.setStyle("previewBlog",'display','block');Dom.setStyle("composeBlog",'display','none');Dom.setStyle("edit",'display','inline');Dom.setStyle("preview",'display','none');Dom.get('blog_gallery_preview_top').innerHTML='';Dom.get('blog_gallery_preview_bottom').innerHTML='';
	var thumbs=document.getElementsByName('thumb[]');
	if(thumbs.length>0){var original=document.getElementsByName('original[]')[0].value;
	var titless=document.getElementsByName('titless[]')[0].value.replace(/(<([^>]+)>)/ig,"");
	var desc=document.getElementsByName('desc[]')[0].value;
	var credit=document.getElementsByName('credit[]')[0].value;
	var orgHeight=document.getElementsByName('height[]')[0].value;
	var orgWidth=document.getElementsByName('width[]')[0].value;
	if(parseInt(orgHeight)>=parseInt(orgWidth)){var orgstr='http://l.yimg.com/jn/util/anysize/500y-86400,'+escape(original);}
	else{var orgstr='http://l.yimg.com/jn/util/anysize/630*500l-86400,'+escape(original);}
var looplen;
	if(thumbs.length>7){looplen=7;}
	else{looplen=thumbs.length;}
var thumbstr='';
	var thumbclass='';for(var i=0;i<looplen;i++){if(i==0){thumbclass=' class="yltasis active"';}

	else{thumbclass=' class="yltasis"';}
thumbstr+='<li><a><img height="75" width="75" src="http://l.yimg.com/jn/util/anysize/75*75l-86400,'+escape(thumbs[i].value)+'"'+thumbclass+'></a></li>';}
var max_num_thumbs=(thumbs.length>7)?7:thumbs.length;galleryHTML='<div class="post-gallery" class="cls"><div id="ypv-thumbs" class="hide"><div class="controls"><a class="prev yltasis"><span>Prev</span></a> <a class="next yltasis"><span>Next</span></a><div class="navigation">photos <span id="navRange">1 - '+max_num_thumbs+'</span> of '+thumbs.length+'</div></div><div class="viewer"><ul class="list"><li class="item"><ul>'+thumbstr+'<li></li><li></li><li></li><li></li><li></li><li></li></ul></li></ul></div></div><div id="ypv-current"><div id="ypv-photo"><div id="photo-nav">photo <span id="photo-count">1</span> of '+thumbs.length+'</div><div id="photo-cont"><div class="photo"><img src="'+orgstr+'" /></div></div><div id="photo-info" class="cls"><h4 id="photoTitle">'+titless+'</h4><p class="caption" id="photoCaption">'+desc+'</p><cite id="captionCite">'+credit+'</cite></div></div></div></div>';
	if(Dom.get('sstop').checked){Dom.get('blog_gallery_preview_top').innerHTML=galleryHTML;}

	else
{Dom.get('blog_gallery_preview_bottom').innerHTML=galleryHTML;
}}
var callback={success:function(o){var xml=o.responseXML;
	var requestContent=xml.getElementsByTagName("previewText")[0].firstChild.nodeValue;
	Dom.get("blog_content_preview").innerHTML=requestContent;
	if(Dom.get('excerpt').value!=='')
	{
		var requestExcerpt=xml.getElementsByTagName("excerptText")[0].firstChild.nodeValue;
		Dom.get("excerpt_content_preview").innerHTML=requestExcerpt;
	}}};YAHOO.util.Connect.setForm('blogForm');
	var cObject=YAHOO.util.Connect.asyncRequest('POST','/api/post/blog/postpreview',callback);
	Dom.get('p').focus();return false;
	};
	var editBlog=function(){Dom.setStyle("previewBlog",'display','none');
	Dom.setStyle("composeBlog",'display','block');
	Dom.setStyle("edit",'display','none');
	Dom.setStyle("preview",'display','inline');
	Dom.get('preview').focus();return false;
	};
	var resizeImageSetSize=function()
	{
		var doc=myEditor._getDoc(),body=doc.body;
		var imgs=body.getElementsByTagName('img');
		var elmHeight,elmWidth;for(var i=0;i<imgs.length;i++)
		{
			elmHeight=imgs[i].offsetHeight;elmWidth=imgs[i].offsetWidth;
			if(elmWidth>570&&elmWidth>elmHeight)
			{
				elmHeight=Math.round(elmHeight*(575/elmWidth));elmWidth=575;
			}

			else if(elmHeight>575&&elmHeight>elmWidth)
			{
				elmWidth=Math.round(elmWidth*(575/elmHeight));elmHeight=575;
			}
			if(elmWidth!='0'&&elmHeight!='0'&&elmWidth!='75'&&elmHeight!='75')
			{
				imgs[i].setAttribute('width',elmWidth);
				imgs[i].setAttribute('height',elmHeight);
			}
			elmHeight=null;
			elmWidth=null;
		}
	};
	myEditor.on('windowinsertimageClose',function()
	{
		resizeImageSetSize();
	});
	var saveRTE=function()
	{
		if(Dom.getStyle('editor_editor','position')!=="absolute"&&Dom.getStyle('composeBlog','display')!=="none")
		{
			resizeImageSetSize();
			myEditor.saveHTML();
		}
	};
	var displayAdvOpt=function(e){if(Dom.getStyle("adv_opt_dis","display")==="none")
{Dom.setStyle("adv_opt_dis",'display','block');Dom.get('excerpt').focus();Event.preventDefault(e);}

	else
{Dom.setStyle("adv_opt_dis",'display','none');Event.preventDefault(e);}
return false;};
	var displayAdvOptCopy=function(e){saveRTE();Dom.get('excerpt').value=myEditor.get('textarea').value;Dom.get('excerpt').focus();Event.preventDefault(e);return false;};
	var buttonSwitch=function(e){var target=Event.getTarget(e);
	if(target.nodeName.toLowerCase()!=='input'){return;}
if(Dom.getStyle('editor_editor','position')!=="absolute"){saveRTE();}
Dom.removeClass('channel-wrap','error');
Dom.removeClass('editor_container','error');
Dom.removeClass(blgTitle,'error');
	var hasError=false;
	var markError=function(focPt){Dom.addClass(focPt,'error');
	hasError=true;
	};
	if(blgTitle.value===''){
		markError('blog_title');
	}
	if(blgEditor.value==='')
	{
		markError('editor_container');
	}
	if(blgChannel.value==='')
	{
		markError('channel-wrap');
	}
	if(hasError){
		Event.preventDefault(e);
		if(Dom.hasClass('slideShow','on'))
		{
			Dom.removeClass('slideShow','on');
			Dom.removeClass('editorCont','off');
		}
		var errorArea=Dom.get('errorArea');
		errorArea.innerHTML='<img src="http://l.yimg.com/jn/images/20081208112220/error.gif"> <span>Please make sure the required fields are filled in:</span>';
		window.scrollTo(0,Dom.getY(errorArea));
		return false;
		}

		//Part of leave alert
		if((target.id==='preview'))
		{
			Event.preventDefault(e);
			previewBlog();
		}

		else if(target.id==='edit'||target.id==='edit2')
		{
			editBlog();
		}

		else if(Dom.hasClass(target,'post'))
		{
			leaveflag=true;
		}
	};
		var leaveWrite=function(e){
			saveRTE();
			if(leaveflag)
			{
				onbeforeunload=null;
			}

			else if(Dom.getStyle('previewBlog','display')==="block")
			{
				var pLeave='Are you sure you want to leave?  It looks like you are in the middle of previewing you blog post.';
				return pLeave;
			}

			else if(blgEditor.value!='')
			{
				var bLeave='Are you sure you want to leave?  It looks like you have a blog post under way.';
				return bLeave;
			}

			else if(document.getElementsByName('thumb[]').length>0)
			{
				var bLeave='Are you sure you want to leave?  It looks like you have a gallery under way.';
				return bLeave;
			}

			else
			{
				onbeforeunload=null;
			}
		};
		initGallery();
		myEditor.on('afterNodeChange',function()
		{
			var path=this._getDomPath();
			for(var i=0;i<path.length;i++)
			{
				if(path[i].style.textDecoration.toLowerCase()=='line-through')
				{
					this.toolbar.selectButton('strikethrough');
				}
			}
		},myEditor,true);
		Dom.removeClass('preview','previewNone');
		Event.on("adv_opt_copy","click",displayAdvOptCopy);
		Event.on("adv_opt","click",displayAdvOpt);
		Event.on("buttons","click",buttonSwitch);
		Event.on("buttons2","click",buttonSwitch);
		window.onbeforeunload=leaveWrite;
	}
)
();
	YAHOO.widget.SimpleEditor.prototype.filter_safari=function(html){
		if(this.browser.webkit){
			html=html.replace(/<span class="Apple-tab-span" style="white-space:pre">([^>])<\/span>/gi,'&nbsp;&nbsp;&nbsp;&nbsp;');html=html.replace(/Apple-style-span/gi,'');
	html=html.replace(/style="line-height: normal;"/gi,'');
	html=html.replace(/<li><\/li>/gi,'');
	html=html.replace(/<li> <\/li>/gi,'');
	html=html.replace(/<li>  <\/li>/gi,'');
	html=html.replace(/<div>/gi,'');
	html=html.replace(/<\/div>/gi,'<br>');}
return html;
	};