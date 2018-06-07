/** docReady is a single plain javascript function that provides a method of scheduling one or more javascript functions to run at some later point when the DOM has finished loading. */ 
!function(t,e){"use strict";function n(){if(!a){a=!0;for(var t=0;t<o.length;t++)o[t].fn.call(window,o[t].ctx);o=[]}}function d(){"complete"===document.readyState&&n()}t=t||"docReady",e=e||window;var o=[],a=!1,c=!1;e[t]=function(t,e){return a?void setTimeout(function(){t(e)},1):(o.push({fn:t,ctx:e}),void("complete"===document.readyState||!document.attachEvent&&"interactive"===document.readyState?setTimeout(n,1):c||(document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):(document.attachEvent("onreadystatechange",d),window.attachEvent("onload",n)),c=!0)))}}("docReady",window);

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function hideUnsub() {
	var u = getParameterByName('m'); 
	var uDiv = document.getElementsByClassName("unsubscribe")[0];
	if (u == 1) {
		 uDiv.style.display = "block";
	} else {
		uDiv.style.display = "none";		
	}	
}

docReady(function() {
	if (document.getElementsByClassName("unsubscribe")[0]) {
		hideUnsub();
	}
});