sap.ui.define([
	"sap/ui/demo/splitApp2/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.splitApp2.controller.Employee", {

		onInit: function () {
			var oRouter = this.getRouter();

			oRouter.getRoute("employee").attachMatched(this._onRouteMatched, this);

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

		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			var oModel = oView.getModel();
			if (oArgs.employeeId > oView.getModel().get ){
				var cxt = new sap.ui.model.Context(oModel, "/Employees("+  oArgs.employeeId  +")");
				oView.setBindingContext(cxt);
				oView.unbindElement();
				debugger;
				this.getListSelector().selectAListItem(cxt.getPath());
			} else {
				oView.bindElement({
					path : "/Employees(" + oArgs.employeeId + ")",
					events : {
						change: this._onBindingChange.bind(this),
						dataRequested: function (oEvent) {
							oView.setBusy(true);
						},
						dataReceived: function (oEvent) {
							oView.setBusy(false);
						}
					}
				});
			}
			
			
		},

		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
				this.getListSelector().clearMasterListSelection();
				return;
			}
			
			var oView = this.getView();
			var oElementBinding = oView.getElementBinding();
			var sPath = oElementBinding.getPath();
			this.getListSelector().selectAListItem(sPath);
		},
		
		onClick : function(oEvt){
			this.getRouter().navTo("newEmployee");

		}
		
//		,
//
//		onShowResume : function (oEvent) {
//			var oCtx = this.getView().getBindingContext();
//
//			this.getRouter().navTo("employeeResume", {
//				employeeId : oCtx.getProperty("EmployeeID")
//			});
//		}

	});

});
