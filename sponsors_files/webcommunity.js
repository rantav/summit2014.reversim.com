/*************************************************************************************************
 *
 *                                  Important !!!!!
 *
 *  We have changed the frame resizer code so it will always run natively without require or jquery
 *  When getting a new version check the end of the code where the function is being defined, leave
 *  only the native creation.
 *
 */
!function(){"use strict";function a(a,b,c){"addEventListener"in window?a.addEventListener(b,c,!1):"attachEvent"in window&&a.attachEvent("on"+b,c)}function b(){var a,b=["moz","webkit","o","ms"];for(a=0;a<b.length&&!w;a+=1)w=window[b[a]+"RequestAnimationFrame"];w||c(" RequestAnimationFrame not supported")}function c(a){y.log&&"object"==typeof console&&console.log(s+"[Host page"+u+"]"+a)}function d(a){function b(){function a(){h(w),f(),y.resizedCallback(w)}i(a,w,"resetPage")}function d(a){var b=a.id;c(" Removing iFrame: "+b),a.parentNode.removeChild(a),y.closedCallback(b),c(" --")}function e(){var a=v.substr(t).split(":");return{iframe:document.getElementById(a[0]),id:a[0],height:a[1],width:a[2],type:a[3]}}function j(a){var b=Number(y["max"+a]),d=Number(y["min"+a]),e=a.toLowerCase(),f=Number(w[e]);if(d>b)throw new Error("Value for min"+a+" can not be greater than max"+a);c(" Checking "+e+" is in range "+d+"-"+b),d>f&&(f=d,c(" Set "+e+" to min value")),f>b&&(f=b,c(" Set "+e+" to max value")),w[e]=""+f}function k(){var b=a.origin,d=w.iframe.src.split("/").slice(0,3).join("/");if(y.checkOrigin&&(c(" Checking connection is from: "+d),""+b!="null"&&b!==d))throw new Error("Unexpected message received from: "+b+" for "+w.iframe.id+". Message was: "+a.data+". This error can be disabled by adding the checkOrigin: false option.");return!0}function l(){return s===(""+v).substr(0,t)}function m(){var a=w.type in{"true":1,"false":1};return a&&c(" Ignoring init message from meta parent page"),a}function n(){var a=v.substr(v.indexOf(":")+r+6);c(" MessageCallback passed: {iframe: "+w.iframe.id+", message: "+a+"}"),y.messageCallback({iframe:w.iframe,message:a}),c(" --")}function o(){if(null===w.iframe)throw new Error("iFrame ("+w.id+") does not exist on "+u);return!0}function q(){switch(w.type){case"close":d(w.iframe),y.resizedCallback(w);break;case"message":n();break;case"reset":g(w);break;case"init":b(),y.initCallback(w.iframe);break;default:b()}}var v=a.data,w={};l()&&(c(" Received: "+v),w=e(),j("Height"),j("Width"),!m()&&o()&&k()&&(q(),p=!1))}function e(){null===v&&(v={x:void 0!==window.pageXOffset?window.pageXOffset:document.documentElement.scrollLeft,y:void 0!==window.pageYOffset?window.pageYOffset:document.documentElement.scrollTop},c(" Get position: "+v.x+","+v.y))}function f(){null!==v&&(window.scrollTo(v.x,v.y),c(" Set position: "+v.x+","+v.y),v=null)}function g(a){function b(){h(a),j("reset","reset",a.iframe)}c(" Size reset requested by "+("init"===a.type?"host page":"iFrame")),e(),i(b,a,"init")}function h(a){function b(b){a.iframe.style[b]=a[b]+"px",c(" IFrame ("+a.iframe.id+") "+b+" set to "+a[b]+"px")}y.sizeHeight&&b("height"),y.sizeWidth&&b("width")}function i(a,b,d){d!==b.type&&w?(c(" Requesting animation frame"),w(a)):a()}function j(a,b,d){c("["+a+"] Sending msg to iframe ("+b+")"),d.contentWindow.postMessage(s+b,"*")}function k(){function b(){function a(a){1/0!==y[a]&&0!==y[a]&&(k.style[a]=y[a]+"px",c(" Set "+a+" = "+y[a]+"px"))}a("maxHeight"),a("minHeight"),a("maxWidth"),a("minWidth")}function d(a){return""===a&&(k.id=a="iFrameResizer"+o++,c(" Added missing iframe ID: "+a)),a}function e(){c(" IFrame scrolling "+(y.scrolling?"enabled":"disabled")+" for "+l),k.style.overflow=!1===y.scrolling?"hidden":"auto",k.scrolling=!1===y.scrolling?"no":"yes"}function f(){("number"==typeof y.bodyMargin||"0"===y.bodyMargin)&&(y.bodyMarginV1=y.bodyMargin,y.bodyMargin=""+y.bodyMargin+"px")}function h(){return l+":"+y.bodyMarginV1+":"+y.sizeWidth+":"+y.log+":"+y.interval+":"+y.enablePublicMethods+":"+y.autoResize+":"+y.bodyMargin+":"+y.heightCalculationMethod+":"+y.bodyBackground+":"+y.bodyPadding+":"+y.tolerance}function i(b){a(k,"load",function(){var a=p;j("iFrame.onload",b,k),!a&&y.heightCalculationMethod in x&&g({iframe:k,height:0,width:0,type:"init"})}),j("init",b,k)}var k=this,l=d(k.id);e(),b(),f(),i(h())}function l(a){if("object"!=typeof a)throw new TypeError("Options is not an object.")}function m(){function a(a){if("IFRAME"!==a.tagName)throw new TypeError("Expected <IFRAME> tag, found <"+a.tagName+">.");k.call(a)}function b(a){a=a||{},l(a);for(var b in z)z.hasOwnProperty(b)&&(y[b]=a.hasOwnProperty(b)?a[b]:z[b])}return function(c,d){b(c),Array.prototype.forEach.call(document.querySelectorAll(d||"iframe"),a)}}function n(a){a.fn.iFrameResize=function(b){return l(b),y=a.extend({},z,b),this.filter("iframe").each(k).end()}}var o=0,p=!0,q="message",r=q.length,s="[iFrameSizer]",t=s.length,u="",v=null,w=window.requestAnimationFrame,x={max:1,scroll:1,bodyScroll:1,documentElementScroll:1},y={},z={autoResize:!0,bodyBackground:null,bodyMargin:null,bodyMarginV1:8,bodyPadding:null,checkOrigin:!0,enablePublicMethods:!1,heightCalculationMethod:"offset",interval:32,log:!1,maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,scrolling:!1,sizeHeight:!0,sizeWidth:!1,tolerance:0,closedCallback:function(){},initCallback:function(){},messageCallback:function(){},resizedCallback:function(){}};b(),a(window,"message",d),   window.iFrameResize=m()}();

(function(baseUrl) {
    baseUrl = baseUrl || 'https://events.bizzabo.com';

    var elements = document.getElementsByTagName('div');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (!element.getAttribute) {
            continue;
        }
        if (element.getAttribute('name') != 'bizzabo-web-community') {
            continue;
        }
        if (element.getAttribute('data-done') == 'done') {
            continue;
        }
        element.setAttribute('data-done', 'done');
        element.style.width = 100 + "%";
        element.style.overflow = "hidden";

        var id = ('bizzabo-web-community-iframe-' + i);
        var uniqueName = element.getAttribute('data-unique-name');
        var iframe = document.createElement("IFRAME");
        iframe.id = id;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('src',  baseUrl + '/' + uniqueName+ '/community?widget=true&url=' + encodeURIComponent(document.location));
        iframe.style.width = '100%';
        iframe.style.maxWidth = '1100px';
        iframe.style.height = '1000px';
        iframe.style.display = 'block';
        iframe.style.marginLeft = 'auto';
        iframe.style.marginRight = 'auto';
        element.appendChild(iframe);

        iFrameResize({}, ['#' + id]);
    }

})( /* [BASE_URL_PLACEHOLDER] */ );