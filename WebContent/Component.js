sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/splitApp2/controller/ListSelector"
], function (UIComponent, Device, JSONModel, ListSelector) {
	"use strict";
	
	jQuery.sap.registerModulePath("extended_control", "./extended_control"); 
	
	return UIComponent.extend("sap.ui.demo.splitApp2.Component", {

		metadata: {
			manifest: "json"
		},

		init: function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			
			this.oListSelector = new ListSelector();
			
			this.setModel(new JSONModel(Device), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();
		}

	});

});
