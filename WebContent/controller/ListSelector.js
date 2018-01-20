sap.ui.define(["sap/ui/base/Object"],
function(BaseObject){
	return BaseObject.extend("sap.ui.demo.splitApp2.controller.ListSelector", {
		constructor : function(){
			this._oWhenListHasBeenSet = new Promise(
				function(fnResolveListHasBeenSet) {		
					this._fnResolveListHasBeenSet = fnResolveListHasBeenSet;
				}.bind(this));
			
			this.oWhenListLoadingIsDone = new Promise(function(fnResolve, fnReject){
				this._oWhenListHasBeenSet.then(function(oList){
					this.someValue = 100;
					oList.getBinding("items").attachEventOnce("dataReceived", function(oData){
						if(!oData.getParameter("data")){
							fnReject({
								list : oList,
								error : true
							});
						}
						
						var oFirstListItem = oList.getItems()[0];
						if(oFirstListItem){
							fnResolve({
								list : oList, firstListitem : oFirstListItem
							})
						} else {
							fnReject({
								list : oList, error : false
							})
						}
					});
				}.bind(this))
			}.bind(this));
		},
		
		setBoundMasterList : function(oList){
			this._oList = oList;
			this._fnResolveListHasBeenSet(oList);
		},
		
		clearMasterListSelection : function(){
			this._oWhenListHasBeenSet.then(
				function(){
					console.log(this.someValue);
					this._oList.removeSelections(true);
				}.bind(this)
			);
		},
		
		
		waitForSecond : function(ms) {
		    var start = Date.now(),
		        now = start;
		    while (now - start < ms) {
		      now = Date.now();
		    }
		},
		
		selectAListItem : function(sBindingPath){
			this.oWhenListLoadingIsDone.then(function(){
				var oList = this._oList;
				
//				debugger;
//				
//				var oModel = oList.getModel();
//				var oContext = oModel.createEntry("/Employees");
				
				
				
				var oSelectedItem;
				
				if(oList.getMode==="None"){
					return;
				}
				
				oSelectedItem = oList.getSelectedItem();
				
				if(oSelectedItem && oSelectedItem.getBindingContext().getPath() === sBindingPath){
					return;
				}
				
				oList.getItems().some(
					function(oItem){
						if(oItem.getBindingContext() && oItem.getBindingContext().getPath() === sBindingPath){
							oList.setSelectedItem(oItem);
							return true;
						}
					}
				);
				
			}.bind(this));
		}
	});
});