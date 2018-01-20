sap.ui.define([
	"sap/ui/demo/splitApp2/controller/BaseController",
	"sap/ui/core/message/Message"
], function (Controller, Message) {
	"use strict";

	return Controller.extend("sap.ui.demo.splitApp2.controller.messageTesting", {
		onInit : function(){
//			alert("Message Testing Controller is called");
			this.oMessageManager = sap.ui.getCore().getMessageManager();
			this.oMessageProcessor = new sap.ui.core.message.ControlMessageProcessor();
			
			this.oMessageManager.registerMessageProcessor(this.oMessageProcessor);
			
			
			var oDummyModel = new sap.ui.model.json.JSONModel("./localService/mockdata/DummyJson2.json");
			this.getView().setModel(oDummyModel, "Dummy");
			
//			this.oMessageManager.registerObject(this.getView(), true);
		},
		
		onValueChange : function(oEvent){
			var oInput = this.getView().byId("IMT");
			
			this.oMessageManager.addMessages(	
					new Message({
						message : "Changed",
						description : "Ha???",
						type : sap.ui.core.MessageType.Error,
						target : oInput.getId()+"/value",
						processor : this.oMessageProcessor,
						presistent : true
					})
			);
			
		},
		
		onHover : function(oEvent){
			sap.m.MessageToast.show("Hover Button Test");
		},
		
		onHelloWorldClick : function(oEvent){
			sap.m.MessageToast.show("Clicked Hello World");
		}
		
		
	

	});

});
