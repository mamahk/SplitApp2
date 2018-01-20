sap.ui.define([
	"sap/m/Button"
	], function (Button) {
	"use strict";

	return Button.extend("extended_control.HoverButton", {
		
		metadata : {
			properties : {
				"hoverText" : { type : "string", defaultValue : "Hello World" }
			},
			
			events : {
				"hover" : {}
			}
		},
		
		onmouseover : function(evt){
			this.fireHover();
		},
		
		renderer : {}
		
	});

});
