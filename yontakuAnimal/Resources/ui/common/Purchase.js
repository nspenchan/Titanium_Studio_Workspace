function Purchase(win, title, bgColor, currentPurchase, contentName, InAppProducts) {
	/* 1.Purchases.js/purchasesTableよりrowをクリック　引数purchaseObjects[e.index]  
		2.Purchase.js/originalPurchaseButtonをクリック　引数currentPurchase.originalPurchase
	*/
	/*
	updatePurchaseWindow = function(purchase) {
		ti.labels.purchaseState.text = "state: " +
					purchaseStateToString(purchase.state);
		ti.labels.purchaseDate.text = "time: " + purchase.time;
		ti.labels.purchaseID.text = "order#: " + purchase.orderNumber;
		ti.labels.purchaseQuantity.text = "quantity: " + purchase.quantity;
		ti.labels.purchaseProductID.text = "SKU: " + purchase.SKU;
	
		ti.labels.purchaseApplicationPayload.text = 
				"applicationPayload: " + purchase.applicationPayload;
		// purchaseToken is Android only	
		ti.labels.purchasePurchaseToken.text =
				"purchaseToken: " + purchase.purchaseToken;
	
		currentPurchase = purchase;
		
		if (currentPurchase.originalPurchase) {
			Ti.API.info('Purchase has original purchase.');
			ti.buttons.originalPurchase.visible = true; 
		} else {
			Ti.API.info('Purchase does not have original purchase.');
			ti.buttons.originalPurchase.visible = false;
		}
	};
	
	var buildPurchaseWindow = function() {
		ti.buttons.consume.title = "Consume Purchase";//android restore
		ti.buttons.originalPurchase.title = "Original Purchase";//ios restore
	
		ti.windows.purchase.add(ti.labels.purchaseState);
		ti.windows.purchase.add(ti.labels.purchaseDate);
		ti.windows.purchase.add(ti.labels.purchaseID);
		ti.windows.purchase.add(ti.labels.purchaseQuantity);
		ti.windows.purchase.add(ti.labels.purchaseProductID);
		ti.windows.purchase.add(ti.labels.purchaseApplicationPayload);
		ti.windows.purchase.add(ti.labels.purchasePurchaseToken);
		
		if (ANDROID) {
			ti.windows.purchase.add(ti.buttons.consume);//android restore
		} else {
			ti.windows.purchase.add(ti.buttons.originalPurchase);//ios restore
		}
	};
	*/
	var ANDROID = Ti.Platform.osname === "android";
	
	purchaseStateToString = function(state) {
		switch (state) {
			case InAppProducts.PURCHASE_STATE_PURCHASED:
				return 'purchased';
			case InAppProducts.PURCHASE_STATE_CANCELED:
				// Android only
				return 'canceled';
			case InAppProducts.PURCHASE_STATE_REFUNDED:
				// Android only
				return 'refunded';
			case InAppProducts.PURCHASE_STATE_PURCHASING:
				// iOS only
				return "purchasing";
			case InAppProducts.PURCHASE_STATE_FAILED:
				// iOS only
				return "failed";
			case InAppProducts.PURCHASE_STATE_RESTORED:
				// iOS only
				return "restored";
			default:
				return 'unknown';
		}
	};
	
	//UI
	var tableview;
	var top = 0;
	
	var height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	function scale(dimension) {
		return Math.round(dimension *  Titanium.App.Properties.getDouble('zoomTableview'));
	}
	
	var view = Titanium.UI.createView({
		width:Ti.UI.FILL,
	    height:scale(60),
	    top:top,
	});
	self.add(view);
	
	var label = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:bgColor,
		text:L(title),
		font:{fontSize:scale(25),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
	    height:scale(60),
	    top:top,
	});
	view.add(label);
	
	if(scale(90)>width/2-10){
		var buttonWidth = width/2-10;
	}else{
		var buttonWidth = scale(90);
	}
	
	var back = Ti.UI.createButton({
		color:'#fff',
		backgroundColor:bgColor,
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Back'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth,
		left:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
	});
	view.add(back);
		
	back.addEventListener('click', function(e){
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
		
	function createPurchaseWindow(){
		var rows = [];
		
		var labelText = L('title_') + contentName + '\n\n' +  L('state_') + L(purchaseStateToString(currentPurchase.state)) + '\n' 
			+  L('time_') + currentPurchase.time + '\n' +  L('order_') + currentPurchase.orderNumber + '\n' 
			+  L('quantity_') + currentPurchase.quantity;
			//+ '\n' + L('SKU_') + currentPurchase.SKU + '\n' + L('applicationPayload_') + currentPurchase.applicationPayload + '\n' +  L('purchaseToken_') + currentPurchase.purchaseToken;
		
		//var arrayTitle = [L('state_') + L(purchaseStateToString(currentPurchase.state)), L('time_') + currentPurchase.time, L('order_') + currentPurchase.orderNumber, L('quantity_') + currentPurchase.quantity, L('SKU_') + currentPurchase.SKU, L('applicationPayload_') + currentPurchase.applicationPayload, L('purchaseToken_') + currentPurchase.purchaseToken];
		//var arrayTitle = [L('title_') + contentName, L('state_') + L(purchaseStateToString(currentPurchase.state)), L('time_') + currentPurchase.time, L('order_') + currentPurchase.orderNumber, L('quantity_') + currentPurchase.quantity];
		
		//for(i=0; i<arrayTitle.length; i++){
			var row = Ti.UI.createTableViewRow({
			    height:'auto',
			    backgroundColor:'#fff',
			    hasChild:false,
			});
			
			var label = Titanium.UI.createLabel({
				color:'#000',
				backgroundColor:'transparent',
				//text:L(arrayTitle[i]),
				text:labelText,
				font:{fontSize:scale(24),fontFamily:'Helvetica Neue',fontWeight:'bold'},
				textAlign:'left',
				width:width-scale(80),
				height:'auto',
				left:scale(40),
				top:scale(10),
				bottom:scale(10),
				//opacity:0.7,
			});
			row.add(label);
			
			rows.push(row);
		//}
		
		var rowPurchase = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:'red',
		    hasChild:true,
		});
		
		var label = Titanium.UI.createLabel({
			color:'#fff',
			backgroundColor:'transparent',
			text:L("Original_Purchase"),
			font:{fontSize:scale(24),fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign:'left',
			width:width-scale(80),
			height:'auto',
			left:scale(40),
			top:scale(10),
			bottom:scale(10),
			//opacity:0.7,
		});
		rowPurchase.add(label);
		
		rowPurchase.addEventListener('click', function() {
			if (ANDROID) {
				currentPurchase.consume();//android restore
			}else{
				//updatePurchaseWindow(purchase.originalPurchase);//ios restore
				
				var Purchase = require('ui/common/Purchase');
				//construct UI
				var purchase = new Purchase(win, 'Purchase1', bgColor, currentPurchase.originalPurchase, contentName, InAppProducts);
				win.add(purchase);
				
				setTimeout(function(){
					win.remove(self);
				}, 100);
				
				/*
				self.remove(tableview);
				
				createPurchaseWindow();
				*/
			}
		});
		
		if (ANDROID) {
			label.text = L("Consume_Purchase");
			//rows.push(rowPurchase);
		}else{
			if (currentPurchase.originalPurchase) {
				Ti.API.info('Purchase has original purchase.');
				rows.push(rowPurchase);
			} else {
				Ti.API.info('Purchase does not have original purchase.');
			}
		}
		
		tableview = Titanium.UI.createTableView({top:top+scale(60)});
		
		tableview.addEventListener('click', function(e){
			Ti.API.info(JSON.stringify(e));
		});
		
	    tableview.startLayout();
	    tableview.setData(rows);
	    tableview.finishLayout();
	    
	    self.add(tableview);
	}
	
	createPurchaseWindow();
	
	return self;
}

module.exports = Purchase;