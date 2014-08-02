function Store(win, title, bgColor, arrayPurchase, label_pro) {
	//test
	//Titanium.App.Properties.setBool('Purchased-hidead', false);
	//Titanium.App.Properties.setBool('Purchased-hideAd_kango', false);
	//Titanium.App.Properties.setBool('Purchased-kang100a', false);
	
	// Note: These product IDs must match the product IDs you configure on
	// iTunes Connect and Android Developer Console!
	var productIDs = arrayPurchase;
	Ti.API.info(productIDs);
	var productObjects;

	/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false*/	
	var InAppProducts = require('com.logicallabs.inappproducts');
	
	// This call (or any other) may fail on Android if the module hasn't finished
	// its initialization routine yet -- always wait for the stateChange event!!!
	Ti.API.info('Module ready? ' + 
		(InAppProducts.getSupportStatus() !== InAppProducts.SUPPORT_STATUS_ERROR));
	
	var ANDROID = Ti.Platform.osname === "android";
	// Store.js/'Check'Button
	InAppProducts.addEventListener('stateChange', function(e) {
		Ti.API.info('Received stateChange event with state ' + e.state);
		switch(InAppProducts.state) {
			case InAppProducts.STATE_NOT_READY:
				alert(L('InAppProducts_module_is_not_ready'));
				if (e.errorCode) {
					Ti.API.info('Initialization error code: ' + e.errorCode);
				}
				if (e.errorMessage) {
					Ti.API.info('Initialization error msg: ' + e.errorMessage);
				}
				break;
			case InAppProducts.STATE_READY:
				alert(L('InAppProducts_module_is_ready'));
				break;
			case InAppProducts.STATE_NOT_SUPPORTED:
				alert('Simulator not supported! ' + 
					'Please run this test on an actual device!');
				break;
			default:
				alert(L('InAppProducts_module_is_in_invalid_state'));
		}
	});
	//購入処理　Product.js の購入ボタン　Store.jsの復元アイテム一覧row
	InAppProducts.addEventListener('purchaseUpdate', function(e) {
		Ti.API.info('Received purchaseUpdate event');
		if (e.errorCode) {
			// This only happens on Android. On iOS, there is no error
			// condition associated with the purchaseUpdate event, although
			// the purchase itself may be in PURCHASE_STATE_FAILED state.
			alert(L('Purchase_attempt_failed_code_') + e.errorCode + ')');
		} else {
			/*
			var SKU = e.purchase.SKU;
			var contentName, ampm;
			if(SKU.substring(0, 4)=='hide'){
				contentName = L('hidead');
			}else if(SKU.length == 8){
				if(SKU.substring(0, 4) == 'care'){
					ampm = '';
				}else if(SKU.substring(7) == 'a'){
					ampm = '午前';
				}else if(SKU.substring(7) == 'b'){
					ampm = '午後';
				}
				contentName = '解説：' + L(SKU.substring(0, 4)) + SKU.substring(4, 7) + '回' + ampm;
			}else{
				contentName = '';
			}
			*/
			var contentName = L('pro_ver');
			Ti.API.info('Product: ' + e.purchase.SKU + ' state: ' +
							purchaseStateToString(e.purchase.state));
			switch (e.purchase.state) {
				case InAppProducts.PURCHASE_STATE_PURCHASED:
					// This is a possible state on both iOS and Android
					//updatePurchaseWindow(e.purchase);
					//ti.tab.open(ti.windows.purchase);
					Ti.API.error(JSON.stringify(e.purchase));
					alert(L('Purchased_') + contentName);
					Titanium.App.Properties.setBool('Purchased-' + e.purchase.SKU, true);
					label_pro.opacity=0.5;
					break;
				case InAppProducts.PURCHASE_STATE_CANCELED:
					// Android only
					alert(L('Purchase_canceled') + contentName);
					Titanium.App.Properties.setBool('Purchased-' + e.purchase.SKU, false);
					label_pro.opacity=0;
					break;
				case InAppProducts.PURCHASE_STATE_REFUNDED:
					// Android only
					alert(L('Purchase_refunded') + contentName);
					Titanium.App.Properties.setBool('Purchased-' + e.purchase.SKU, false);
					label_pro.opacity=0;
					break;
				case InAppProducts.PURCHASE_STATE_PURCHASING:
					// iOS only
					break;
				case InAppProducts.PURCHASE_STATE_FAILED:
					// iOS only
					alert(L('Purchase_failed') + contentName);
					break;
				case InAppProducts.PURCHASE_STATE_RESTORED:
					alert(L('Restored_') + contentName);
					Titanium.App.Properties.setBool('Purchased-' + e.purchase.SKU, true);
					label_pro.opacity=0.5;
					// iOS only
					break;
			}
			/*
			var Products = require('ui/common/Products');
			//construct UI
			var products = new Products(win, 'Products', bgColor, e);
			win.add(products);
			*/
			if (InAppProducts.autoCompletePurchases === false) {
				// This is for iOS only; autoCompletePurchases is constant
				// true on Android as there is no need/ability to separately
				// complete purchases; they are essentially always
				// auto-completed.
				switch (e.purchase.state) {
					case InAppProducts.PURCHASE_STATE_PURCHASED:
					case InAppProducts.PURCHASE_STATE_FAILED:
					case InAppProducts.PURCHASE_STATE_RESTORED:
						if (e.purchase.downloads.length) {
							// Hosted content must be downloaded before the
							// purchase is completed!
							Ti.API.info('Purchase has hosted content!');
							e.purchase.downloads.forEach(function(download) {
								printDownloadInfo(download);
							});
							InAppProducts.startDownloads(e.purchase.downloads);
						} else {
							Ti.API.info('Completing purchase...');
							e.purchase.complete();
						}
						break;
				}
			}
		}
	});
	
	var purchaseStateToString = function(state) {
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
	//Products.js/productsTable を作成
	InAppProducts.addEventListener('receivedProducts', function(e) {
		Ti.API.info('receivedProducts' + JSON.stringify(e));
		if (e.errorCode) {
			alert(L('Error_getProducts_call_failed_Message_') + e.errorMessage);
		} else {
			Ti.API.info('getProducts succeeded!');
			
			var Products = require('ui/common/Products');
			//construct UI
			var products = new Products(win, 'Products', bgColor, e);
			win.add(products);
		}
	});
	//Purchases.js/purchasesTable を作成
	InAppProducts.addEventListener('receivedPurchases', function(e) {
		/*
		if(ti.tables.hasOwnProperty("purchases")) {
			ti.windows.purchases.remove(ti.tables.purchases);
		}
		*/
		var errorMsg;
		
		Ti.API.info('Received receivedPurchases event');
		
		if (e.errorCode !== undefined) {
			errorMsg = L('An_error_occurred_code_') + e.errorCode +
							L('_message_') + e.errorMessage + ')'; 
			Ti.API.info(errorMsg);
			alert(errorMsg);
		}
		Ti.API.info('getPurchases succeeded!');
		Ti.API.info('Received ' + e.purchases.length + ' purchase records.');
		
		var Purchases = require('ui/common/Purchases');
		//construct UI
		var purchases = new Purchases(win, 'Purchases', bgColor, e, InAppProducts);
		win.add(purchases);
		/*
		// We may have received partial information even in case of an error...
		Ti.API.info('Received ' + e.purchases.length + ' purchase records.');
		purchaseObjects = e.purchases;
		ti.tables.purchases = Ti.UI.createTableView(cfg.table);
		buildPurchasesTable(ti.tables.purchases, purchaseObjects);
		ti.windows.purchases.add(ti.tables.purchases);
		ti.tab.open(ti.windows.purchases);
		ti.tables.purchases.addEventListener('click', function(e) {
			updatePurchaseWindow(purchaseObjects[e.index]);
			ti.tab.open(ti.windows.purchase);
		});
		*/
	});
	
	InAppProducts.addEventListener('purchaseConsumed', function(e) {
		if (e.errorCode) {
			alert('Consuming purchase failed with code: ' + e.errorCode);
		} else {
			alert('Purchase of ' + e.purchase.SKU + ' succeeded.'); 
		}
	});
	/*
	var buildMainWindow = function() {
	
		ti.buttons.supportStatus.title = "Check Billing Supported";
		ti.buttons.getProducts.title = "List Products";
		ti.buttons.cancelProductRequest.title = "Cancel Product Request";
		ti.buttons.getPurchases.title = "List Purchases";
	
		ti.windows.main.add(ti.buttons.supportStatus);
		ti.windows.main.add(ti.buttons.getProducts);
		ti.windows.main.add(ti.buttons.cancelProductRequest);
		ti.windows.main.add(ti.buttons.getPurchases);
		ti.windows.main.orientationModes = [Ti.UI.PORTRAIT];
	};
	*/
	//UI
	var top = 0;
	
	var height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	//create object instance, a parasitic subclass of Observable
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
	
	var check = Ti.UI.createButton({
		color:'#fff',
		backgroundColor:bgColor,
		backgroundImage: '/assets/images/gray300x300_0.4.png',
		title: L('Check'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(60),
		width:buttonWidth*1.2,
		right:scale(0),
		borderColor:'#002400',
		borderWidth:scale(1),
		opacity:1,
	});
	view.add(check);
		
	check.addEventListener('click', function(e){
		var message;
		switch(InAppProducts.getSupportStatus()) {
			case InAppProducts.SUPPORT_STATUS_NONE:
				message = "Billing_is_not_supported";
				break;
			case InAppProducts.SUPPORT_STATUS_ONE_TIME:
				message = "Billing_of_one_time_items_is_supported";
				break;
			case InAppProducts.SUPPORT_STATUS_SUBSCRIPTION:
				message = "Billing_of_subscription_items_is_supported";
				break;
			case InAppProducts.SUPPORT_STATUS_ALL:
				message = "Billing_of_all_item_types_is_supported";
				break;
			case InAppProducts.SUPPORT_STATUS_ERROR:
				message = "An_error_occurred_while_querying_support_status";
				break;
		}
		alert(L(message));
	});
	
	var rows = [];
	var arrayColor = ['#ff7f7f', '#ff7fbf', '#ff7fff', '#bf7fff', '#7f7fff', '#7fbfff', '#7fffff', '#7fffbf', '#7fff7f', '#bfff7f', '#ffff7f', '#ffbf7f'];
	var arrayTitle = ['Welcome_to_kokucy_store_', 'Sales_Page', 'store_message', 'List_Products', 'Restore_Lost_Purchases', 'restore_message', 'List_Purchases'];
	var arrayColor = ['#fff', '#ff7f7f', '#fff', '#ff7fbf', '#ff7fff', '#fff', '#bf7fff', '#7fbfff', '#7fffbf', '#7fff7f', '#bfff7f', '#ffff7f', '#ffbf7f'];
	//Ti.API.info('rowHeight: ' + rowHeight);
	
	for(i=0; i<arrayTitle.length; i++){
		var row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:arrayColor[i],
		    hasChild:false,
		});
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(arrayTitle[i]),
			font:{fontSize:scale(24),fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:width-scale(80),
			height:'auto',
			left:scale(40),
			top:scale(10),
			bottom:scale(10),
			//opacity:0.7,
		});
		row.add(label);
		
		switch(i){
			case 0:
			case 2:
			case 5:
				label.font.fontsize = scale(20);
			break;
			case 1:
			case 4:
				label.color = '#fff';
				label.font.fontWeight = 'bold';
				label.textAlign = 'center';
				var line = Ti.UI.createView({
				    height:scale(2),
				    backgroundColor:'#000',
				    top:0,
				});
				row.add(line);
			break;
			case 3:
			case 6:
				row.hasChild = 'true';
				label.font.fontWeight = 'bold';
			break;
		}
		
		rows.push(row);
	}
	//final Row
	var rowFinal = Ti.UI.createTableViewRow({
	    height:scale(60),
	    backgroundColor:bgColor,
	    bottom:0,
	    //hasChild:true,
	});
	rows.push(rowFinal);
	
	var line = Ti.UI.createView({
	    height:scale(2),
	    backgroundColor:'#000',
	    top:0,
	    //hasChild:true,
	});
	rowFinal.add(line);
		
	var leftImage = Titanium.UI.createImageView({
	    image: '/assets/images/nspenchan_logo_114.png',
	    width:scale(48),
	    height:scale(48),
	    left:scale(40),
	});
	rowFinal.add(leftImage);
	
	var label = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:'transparent',
		text:L('Developed_by_nspenchan'),
		font:{fontSize:scale(18),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'left',
		width:width-scale(88),
		height:'auto',
		left:scale(100),
		//opacity:0.7,
	});
	rowFinal.add(label);
	
	//secret mode
	var tf1 = Titanium.UI.createTextField({
        color:'#336699',
        top:scale(10),
        //right:scale(10),
        width:scale(150),
        height:scale(40),
        hintText:'secret commad',
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	tf1.addEventListener('return',function(e){
		if(e.value=='999'){
			alert('Purchased !');
			for(i=0; i<productIDs.length; i++){
				Titanium.App.Properties.setBool('Purchased-'+productIDs[i], true);
			}
			//label_pro.opacity = 0.5;
		}else if(e.value=='1000'){
			alert('Canceled !');
			for(i=0; i<productIDs.length; i++){
				Titanium.App.Properties.setBool('Purchased-'+productIDs[i], false);
			}
			//label_pro.opacity = 0;
		}else if(e.value=='1001'){
			//alert('secret mode');
			/*
			opening.play();
			Ti.App.Properties.setBool('bgm', true);
			themesong.backgroundImage = '/assets/images/themesong_x.png';
			*/
		}
		e.source.value='';
	});
	
	leftImage.addEventListener('click', function(e) {
		//alert('secretMode');
		self.add(tf1);
		setTimeout(function(){
			self.remove(tf1);
		}, 8000);
	});
	/*
	rowFinal.addEventListener('click', function(e) {
		alert('Thank you for using kokucy app!');
	});
	*/
	
	var tableview = Titanium.UI.createTableView({top: top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
		//eventオブジェクト
	    var index = e.index; 
	    switch(index){
	    		case 0:
	    		break;
	    		case 3:
				if (InAppProducts.getProducts({ SKUs: productIDs })) {
					Ti.API.info('getProducts request started successfully.');
				} else {
					alert(L('Error_could_not_start_getProducts_request'));
				}
	    		break;
	    		/*
	    		case 3:
				InAppProducts.cancelProductRequest();
				Ti.API.info('Canceled getProducts request.');
	    		break;
	    		*/
	    		case 6:
				if (false === InAppProducts.getPurchases()) {
					alert(L('getPurchases_operation_failed_to_start'));
				}
	    		break;
	    		
	    		default:
	    		break;
	    }
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
	
	return self;
}

module.exports = Store;