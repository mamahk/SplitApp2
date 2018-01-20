sap.ui.define([ "sap/ui/core/Control" ], function(Control){
	"use strict";
	return Control.extend("sap.ui.demo.splitApp2.mks_style_control.HelloWorldText", {
		metadata : {
			properties : {
				"dummy" : "string"
			},
			
			events : {
				"click" : {}
			}
		},
		
		renderer : function(oRm, oControl){
			console.log(oRm);
			console.log(oControl);
			oRm.write("<br><div");
			oRm.writeControlData(oControl);		
			oRm.write(">Hello World!!!!</div>");
		},
		
		onclick : function(oEvt){
			this.fireClick();
		}
	});
});