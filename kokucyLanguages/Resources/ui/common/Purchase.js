function Purchase(win, title, bgColor, currentPurchase, contentName, InAppProducts) {
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
	var top = 0;
	var back, buttonWidth, label, labelText, Purchase, purchase, row, rowPurchase, rows, 
		self, tableview, view;
	
	if(Ti.Platform.osname=='android'){
		var osname = Ti.Platform.osname,
		height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor,
		width = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
	}else{
		var osname = Ti.Platform.osname,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	}
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	function scale(dimension) {
		return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.App.Properties.getDouble('selfZoom') * Ti.Platform.displayCaps.platformWidth / 320);
	}
	
	view = Titanium.UI.createView({
		width:Ti.UI.FILL,
	    height:scale(60),
	    top:top,
	});
	self.add(view);
	
	label = Titanium.UI.createLabel({
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
		buttonWidth = width/2-10;
	}else{
		buttonWidth = scale(90);
	}
	
	back = Ti.UI.createButton({
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
		rows = [];
		
		labelText = L('title_') + contentName + '\n\n' +  L('state_') + L(purchaseStateToString(currentPurchase.state)) + '\n' 
			+  L('time_') + currentPurchase.time + '\n' +  L('order_') + currentPurchase.orderNumber + '\n' 
			+  L('quantity_') + currentPurchase.quantity;
			//+ '\n' + L('SKU_') + currentPurchase.SKU + '\n' + L('applicationPayload_') + currentPurchase.applicationPayload + '\n' +  L('purchaseToken_') + currentPurchase.purchaseToken;
		
		//arrayTitle = [L('state_') + L(purchaseStateToString(currentPurchase.state)), L('time_') + currentPurchase.time, L('order_') + currentPurchase.orderNumber, L('quantity_') + currentPurchase.quantity, L('SKU_') + currentPurchase.SKU, L('applicationPayload_') + currentPurchase.applicationPayload, L('purchaseToken_') + currentPurchase.purchaseToken];
		//arrayTitle = [L('title_') + contentName, L('state_') + L(purchaseStateToString(currentPurchase.state)), L('time_') + currentPurchase.time, L('order_') + currentPurchase.orderNumber, L('quantity_') + currentPurchase.quantity];
		
		//for(i=0; i<arrayTitle.length; i++){
			row = Ti.UI.createTableViewRow({
			    height:'auto',
			    backgroundColor:'#fff',
			    hasChild:false,
			});
			
			label = Titanium.UI.createLabel({
				color:'#000',
				backgroundColor:'transparent',
				text:labelText,
				font:{fontSize:scale(24),fontFamily:'Helvetica Neue',fontWeight:'bold'},
				textAlign:'left',
				width:width-scale(20),
				height:'auto',
				left:scale(10),
				top:scale(10),
				bottom:scale(10),
				//opacity:0.7,
			});
			row.add(label);
			
			rows.push(row);
		//}
		
		rowPurchase = Ti.UI.createTableViewRow({
		    height:scale(60),
		    backgroundColor:'red',
		    hasChild:true,
		});
		
		label = Titanium.UI.createLabel({
			color:'#fff',
			backgroundColor:'transparent',
			text:L("Original_Purchase"),
			font:{fontSize:scale(24),fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign:'left',
			width:width-scale(20),
			height:'auto',
			left:scale(10),
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
				
				Purchase = require('ui/common/Purchase');
				//construct UI
				purchase = new Purchase(win, 'Purchase1', bgColor, currentPurchase.originalPurchase, contentName, InAppProducts);
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