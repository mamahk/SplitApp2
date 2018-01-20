sap.ui.define([
	"sap/ui/demo/splitApp2/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.splitApp2.controller.NewEmployee", {

		onInit: function () {
			
			
			var oRouter = this.getRouter();
			
			oRouter.getRoute("newEmployee").attachMatched(this._onRouteMatched, this);

			// Hint: we don't want to do it this way
			/*
			 oRouter.attachRouteMatched(function (oEvent){
				 var sRouteName, oArgs, oView;

				 sRouteName = oEvent.getParameter("name");
				 if (sRouteName === "employee"){
				 	this._onRouteMatched(oEvent);
				 }
			 }, this);
			 */

		},
		
		_newObjectNeeded : true,

		_onRouteMatched : function (oEvent) {
			var oModel = this.getView().getModel();
			this.byId("employeePanel").setBusy(true);
			oModel.metadataLoaded().then(()=>{
				if(this._newObjectNeeded){
					this.getView().setBindingContext(oModel.createEntry("/Employees"));
					this._newObjectNeeded = false;
				}
				this.byId("employeePanel").setBusy(false);
			});
		},
		onClick : function(oEvt){
			var oModel = this.getView().getModel();
			
			oModel.submitChanges({
			success: (oData)=>{ console.log("Success"); 
				this._newObjectNeeded = true;
				this.getRouter().navTo("employee", { employeeId : oData["__batchResponses"][0]["__changeResponses"][0].data.EmployeeID });
			}, error: ()=>{ console.log("Error");}});
		}

	});

});
