sap.ui.define([
	"sap/ui/demo/splitApp2/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.splitApp2.controller.EmployeeList", {
		
		onInit : function(){
//			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//			oRouter.attachRouteMatched(function(oEvent){
//				console.log(oEvent);
//				alert("Route Matched called");
//			});
//			
//			oRouter.getRoute("employeeList").attachMatched(function(oEvent){
//				alert("Matched called");
//			});
			
			var oList = this.byId("employeeList");
			
//			setTimeout(function(){
				this.getListSelector().setBoundMasterList(oList);
//			}.bind(this), 3000);
			
				
		}, 
//		
		onListItemPressed : function(oEvent){
			var oItem, oCtx;

			oItem = oEvent.getParameter("listItem") || oEvent.getSource();
			oCtx = oItem.getBindingContext();

			this.getRouter().navTo("employee",{
				employeeId : oCtx.getProperty("EmployeeID")
			});

		}
	});

});
