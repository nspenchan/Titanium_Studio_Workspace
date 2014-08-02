//FirstView Component Constructor
function Inappproducts(win, purchase, label_pro) {
    
    var purchaseTitle = L('pro_ver');
    
	/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false*/

	var InAppProducts = require('com.logicallabs.inappproducts');
	
	// This call (or any other) may fail on Android if the module hasn't finished
	// its initialization routine yet -- always wait for the stateChange event!!!
	Ti.API.info('Module ready? ' + 
		(InAppProducts.getSupportStatus() !== InAppProducts.SUPPORT_STATUS_ERROR));
	
	// Note: These product IDs must match the product IDs you configure on
	// iTunes Connect and Android Developer Console!
	var productIDs = [purchase];
	
	var purchaseStateToString;
	
	Ti.API.info('Initializing app...');
	
	var message;
	switch(InAppProducts.getSupportStatus()) {
		case InAppProducts.SUPPORT_STATUS_NONE:
			message = L('STATUS_NONE');
			break;
		case InAppProducts.SUPPORT_STATUS_ONE_TIME:
			message = L('STATUS_ONE_TIME');
			break;
		case InAppProducts.SUPPORT_STATUS_SUBSCRIPTION:
			message = L('STATUS_SUBSCRIPTION');
			break;
		case InAppProducts.SUPPORT_STATUS_ALL:
			message = L('STATUS_ALL');
			break;
		case InAppProducts.SUPPORT_STATUS_ERROR:
			message = L('STATUS_ERROR');
			break;
	}
	alert(message);
	
	if (InAppProducts.getProducts({ SKUs: productIDs })) {
		Ti.API.info('getProducts request started successfully.');
	} else {
		alert(L('Error_getProducts'));
	}
	
	InAppProducts.addEventListener('stateChange', function(e) {
		Ti.API.info('Received stateChange event with state ' + e.state);
		switch(InAppProducts.state) {
			case InAppProducts.STATE_NOT_READY:
				alert(L('not_ready'));
			if (e.errorCode) {
				Ti.API.info('Initialization error code: ' + e.errorCode);
			}
			if (e.errorMessage) {
				Ti.API.info('Initialization error msg: ' + e.errorMessage);
			}
			break;
			case InAppProducts.STATE_READY:
				alert(L('ready'));
				break;
			case InAppProducts.STATE_NOT_SUPPORTED:
				alert('Simulator not supported! ' + 
					'Please run this test on an actual device!');
				break;
			default:
				alert(L('invalid_state'));
				break;
		}
	});
	
	InAppProducts.addEventListener('purchaseUpdate', function(e) {
		Ti.API.info('Received purchaseUpdate event');
		if (e.errorCode) {
			// This only happens on Android. On iOS, there is no error
			// condition associated with the purchaseUpdate event, although
			// the purchase itself may be in PURCHASE_STATE_FAILED state.
			alert(L('Purchase_attempt_failed') + e.errorCode + ')');
		} else {
			Ti.API.info('Product: ' + e.purchase.SKU + ' state: ' +
					purchaseStateToString(e.purchase.state));
			switch (e.purchase.state) {
				case InAppProducts.PURCHASE_STATE_PURCHASED:
					// This is a possible state on both iOS and Android
					//updatePurchaseWindow(e.purchase);
					//ti.tab.open(ti.windows.purchase);
					markProductAsPurchased(e.purchase.SKU);
					alert(L('Purchased_') + e.purchase.SKU);
					break;
				case InAppProducts.PURCHASE_STATE_CANCELED:
					// Android only
					alert(L('Purchase_canceled'));
					break;
				case InAppProducts.PURCHASE_STATE_REFUNDED:
					// Android only
					unCheckProductAsPurchased(e.purchase.SKU);
					break;
				case InAppProducts.PURCHASE_STATE_PURCHASING:
					// iOS only
					break;
				case InAppProducts.PURCHASE_STATE_FAILED:
					// iOS only
					alert(L('Purchase_failed'));
					break;
				case InAppProducts.PURCHASE_STATE_RESTORED:
					// iOS only
					markProductAsPurchased(e.purchase.SKU);
					alert(L('Restored_') + e.purchase.SKU);
					break;
			}
		}
	});
	InAppProducts.addEventListener('receivedPurchases', function(e) {
		var errorMsg;
		
		Ti.API.info('Received receivedPurchases event');
		
		if (e.errorCode !== undefined) {
			errorMsg = L('An_error_occurred') + e.errorCode +
							L('_message_') + e.errorMessage + ')'; 
			Ti.API.info(errorMsg);
			alert(errorMsg);
		}
	});
	
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

//////////////////////////////////////////////////	

	var loading = Ti.UI.createActivityIndicator({
		bottom:10, height:50, width:50,
		backgroundColor:'black', borderRadius:10,
		style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG
	});
	var loadingCount = 0;
	function showLoading()
	{
		loadingCount += 1;
		if (loadingCount == 1) {
			loading.show();
		}
	}
	function hideLoading()
	{
		if (loadingCount > 0) {
			loadingCount -= 1;
			if (loadingCount == 0) {
				loading.hide();
			}
		}
	}
	
	/**
	 * Keeps track (internally) of purchased products.
	 * @param identifier The identifier of the Ti.Storekit.Product that was purchased.
	 */
	function markProductAsPurchased(identifier)
	{
		Ti.API.info('Marking as purchased: ' + identifier);
		// And in to Ti.App.Properties for persistent storage.
		Ti.App.Properties.setBool('Purchased-' + identifier, true);
		
		alert(L("Thanks") + '\n' + purchaseTitle + ' ' + L("purchased_message"));
		label_pro.opacity=0.5;
		buySingleItem00.title = purchaseTitle + L('purchased_message');
        restoreCompletedTransactions.title=L("no_restore_item");
	}

	function unCheckProductAsPurchased(identifier)
	{
		Ti.API.info('unChecking as purchased: ' + identifier);
		// And in to Ti.App.Properties for persistent storage.
		Ti.App.Properties.setBool('Purchased-' + identifier, false);
		
		alert(purchaseTitle + L("Canceled"));
		label_pro.opacity=0;
		win.remove(self);
		setTimeout(function(){
			var Inappproducts = require('ui/common/Inappproducts');
			//construct UI
			var inappproducts = new Inappproducts(win, purchase, label_pro);
			win.add(inappproducts);
		}, 100);
	}
	
	/*
	 1) Can the user make payments? Their device may be locked down, or this may be a simulator.
	 */
	
    var self = Ti.UI.createView({
		backgroundColor:'#fff',
	});
	self.add(loading);
	
	if(Titanium.Network.online == false){
	    // エラー表示
	    alert(L('Can_not_communicate_'));
	    self.backgroundColor = 'red';
	    setTimeout(function(){
		    win.remove(self);
	    }, 3000);
	}else {
		showLoading();
	    //追記するコード（UI）
		var height = Ti.Platform.displayCaps.platformHeight;
		var width = Ti.Platform.displayCaps.platformWidth;
	    var zoom = Titanium.App.Properties.getDouble('zoom');
		var zoomTableview = Titanium.App.Properties.getDouble('zoomTableview');
	    Ti.API.info(zoom);
	
		var rows = [];
	    
		var row = Ti.UI.createTableViewRow();
		
		var label = Titanium.UI.createLabel({
			color:'#fff',
			text:L('In_App_Purchase'),
			font:{fontSize:25*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign:'center',
			width:Ti.UI.FILL,
		    height:60*zoomTableview,
		    backgroundGradient:{
			    type:'linear',
			    colors:[
			        {position:0.00,color:'#bfd255'},
			        {position:0.50,color:'#8eb92a'},
			        {position:0.51,color:'#72aa00'},
			        {position:1.00,color:'#9ecb2d'}
			    ]
			}
			//opacity:0.7,
		});
		row.add(label);
	
		//label using localization-ready strings from <app dir>/i18n/en/strings.xml
		var back = Ti.UI.createButton({
			color:'#fff',
			title: L('Back'),
			font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign : 'center',
			height:50*zoomTableview,
			width:100*zoomTableview,
			top:5*zoomTableview,
			bottom:5*zoomTableview,
			left:10*zoomTableview,
			radius:10*zoomTableview,
			borderRadius : 10*zoomTableview,
			borderColor:'#002400',
			borderWidth:1*zoomTableview,
			backgroundGradient:{
			    type:'linear',
			    colors:[
			        {position:0.00,color:'#bfd255'},
			        {position:0.50,color:'#8eb92a'},
			        {position:0.51,color:'#72aa00'},
			        {position:1.00,color:'#9ecb2d'}
			    ]
			},
			style:''
		});
		row.add(back);
	
		//Add behavior for UI
		back.addEventListener('click', function(e) {
			win.remove(self);
		});
		
		var checkModule = Ti.UI.createButton({
			color:'#fff',
			title: L('Check'),
			font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign : 'center',
			height:50*zoomTableview,
			width:150*zoomTableview,
			top:5*zoomTableview,
			bottom:5*zoomTableview,
			right:10*zoomTableview,
			radius:10*zoomTableview,
			borderRadius : 10*zoomTableview,
			borderColor:'#002400',
			borderWidth:1*zoomTableview,
			backgroundGradient:{
			    type:'linear',
			    colors:[
			        {position:0.00,color:'#bfd255'},
			        {position:0.50,color:'#8eb92a'},
			        {position:0.51,color:'#72aa00'},
			        {position:1.00,color:'#9ecb2d'}
			    ]
			},
			style:''
		});
		row.add(checkModule);
		
		//Add behavior for UI
		checkModule.addEventListener('click', function(e) {
			var message;
			switch(InAppProducts.getSupportStatus()) {
				case InAppProducts.SUPPORT_STATUS_NONE:
					message = L("Billing_not_supported");
					break;
				case InAppProducts.SUPPORT_STATUS_ONE_TIME:
					message = L("Billing_one_supported");
					break;
				case InAppProducts.SUPPORT_STATUS_SUBSCRIPTION:
					message = L("Billing_subscription_supported");
					break;
				case InAppProducts.SUPPORT_STATUS_ALL:
					message = L("Billing_all item_supported");
					break;
				case InAppProducts.SUPPORT_STATUS_ERROR:
					message = L("An_error_support_status");
					break;
			}
			alert(message);
		});
		
		rows.push(row);
    		
        var row1 = Ti.UI.createTableViewRow({
            leftImage : '/assets/images/shopping_basket.png',
            height : 'auto'
        });
    
        var label1 = Titanium.UI.createLabel({
            color : '#999',
            backgroundColor : '#fff',
            text : L("Welcome_to_kokucy_store_"),
            font : {
                fontSize : 20*zoomTableview,
                fontFamily : 'Helvetica Neue'
            },
            height : 'auto',
            top : 16,
            bottom : 16,
            width :width-100,
            left : 70,
        });
        row1.add(label1);
        rows.push(row1);
        
	    // ヘッダ部
	    var headerRow = Ti.UI.createTableViewRow();
	    headerRow.backgroundColor = '#576996';
	    headerRow.selectedBackgroundColor = '#385292';
	    headerRow.height = 'auto';
	    var clickLabel = Titanium.UI.createLabel({
	        text : L("Sales_Page"),
	        color : '#fff',
	        textAlign : 'center',
	        font : {
	            fontSize : 25*zoomTableview
	        },
	        width : 'auto',
	        height : 'auto',
	        top : 10,
	        bottom : 10,
	    });
	    headerRow.add(clickLabel);
	    //  rowData.push(headerRow);
	    rows.push(headerRow);
	    
	    /*
	     3) hide_ad の購入
	     */
	    var rowBuy00 = Ti.UI.createTableViewRow();
	    rows.push(rowBuy00);
	    
		//alert(Ti.App.Properties.getString("ad"));
		var buySingleItem00 = Ti.UI.createButton({
			//backgroundImage : './image/blue_button.png',
			//backgroundSelectedImage : './image/blue_button_r.png',
			//title:L('purchased_message'),
			font : {
				fontWeight: "bold",
				fontSize : 18*zoomTableview,
				fontFamily : 'Helvetica Neue'
			},
			color : '#fff',
			textAlign : 'center',
			top : 16,
			bottom: 16,
			width : width/2,
			height:50*zoomTableview,
			borderRadius : 10,
			backgroundImage:'non',
			backgroundGradient:{
				type:'linear',
				colors:[
					{position:0.00,color:'#9dd53a'},
					{position:0.50,color:'#a1d54f'},
					{position:0.51,color:'#80c217'},
					{position:1.00,color:'#7cbc0a'}
				]
			},
			backgroundSelectedImage:'/assets/images/shadow.png'
		});
		rowBuy00.add(buySingleItem00);
		
		InAppProducts.addEventListener('receivedProducts', function(e) {
			if (Ti.App.Properties.getBool('Purchased-'+purchase)==true){
				buySingleItem00.title = purchaseTitle + L('purchased_message');
	            buySingleItem00.addEventListener('click', function () {
	                alert(L('Thanks'));
	            });
		    } else if (e.errorCode) {
				buySingleItem00.title = L('no_product');
	            buySingleItem00.addEventListener('click', function () {
	                alert('Error: getProducts call failed! Message: ' + e.errorMessage);
	            });
				alert('Error: getProducts call failed! Message: ' + e.errorMessage);
			} else {
				Ti.API.info('getProducts succeeded!');
				
				productObjects = e.products;
				Ti.API.info('Product count: ' + productObjects.length);
	
	            buySingleItem00.title = L('Buy_') + productObjects[0].title + '/' + productObjects[0].priceAsString;
	            buySingleItem00.product = productObjects[0];
	            buySingleItem00.addEventListener('click', function(e) {
					var appPayload;
					appPayload = 'AppPayloadRandom#' + Math.round(Math.random() * 1000);
					Ti.API.info('Purchasing product ' +
						e.source.product.SKU + ' with app payload ' + appPayload);		
					e.source.product.purchase({
						quantity : 1,
						applicationPayload: appPayload
					});
				});
	        }
	        hideLoading();
	    });
	    
	    var row2 = Ti.UI.createTableViewRow();
	
	    var label2 = Titanium.UI.createLabel({
	        color : '#999',
	        backgroundColor : '#fff',
	        text : L("desc_store"),
	        font : {
	            fontSize : 20*zoomTableview,
	            fontFamily : 'Helvetica Neue'
	        },
	        height : 'auto',
	        top : 16,
	        bottom : 16,
	        width : width-100,
	        left : 40,
	    });
	    row2.add(label2);
	    rows.push(row2);
	
	    var rowRestore = Ti.UI.createTableViewRow();
	    rows.push(rowRestore);
	    
	    var restoreCompletedTransactions =Ti.UI.createButton({
	        //title : L("Restore_Lost_Purchases"),
	        font : {
				fontWeight: "bold",
				fontSize : 18*zoomTableview,
				fontFamily : 'Helvetica Neue'
			},
			color : '#fff',
			textAlign : 'center',
			top : 16,
			bottom: 16,
			width : width/2,
			height:50*zoomTableview,
			borderRadius : 10,
			backgroundImage:'non',
			backgroundGradient:{
				type:'linear',
				colors:[
					{position:0.00,color:'#feccb1'},
					{position:0.50,color:'#f17432'},
					{position:0.51,color:'#ea5507'},
					{position:1.00,color:'#fb955e'}
				]
			},
			backgroundSelectedImage:'/assets/images/shadow.png'
		});
		
		if(Ti.App.Properties.getBool('Purchased-'+purchase)==true){
            restoreCompletedTransactions.title=L("no_restore_item");
            restoreCompletedTransactions.addEventListener('click', function () {
                alert(L('Thanks'));
            });
	    } else {
            restoreCompletedTransactions.title=L("Restore_Lost_Purchases");
		    restoreCompletedTransactions.addEventListener('click', function () {
				if (false === InAppProducts.getPurchases()) {
					alert('getPurchases operation failed to start!');
				}
		    });
        }
	    rowRestore.add(restoreCompletedTransactions);
	    
	    var row3 = Ti.UI.createTableViewRow();
	
	    var label3 = Titanium.UI.createLabel({
	        color : '#999',
	        backgroundColor : '#fff',
	        text : L("Restore_store"),
	        font : {
	            fontSize : 20*zoomTableview,
	            fontFamily : 'Helvetica Neue'
	        },
	        height : 'auto',
	        top : 16,
	        bottom : 16,
	        width : width-100,
	        left : 40,
	    });
	    row3.add(label3);
	    rows.push(row3);

		var tableview = Titanium.UI.createTableView({top: 0});
		
	    tableview.startLayout();
	    tableview.setData(rows);
	    tableview.finishLayout();
	    
	    self.add(tableview);
	    //追記するコード（UI）おわり
	    
	    Ti.API.info('... initialization complete!');
	}	
	return self;
}

module.exports = Inappproducts;
