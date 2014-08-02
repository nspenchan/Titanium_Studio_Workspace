function ApplicationWindow(title, label00, label_pro, purchase, parentWindow) {
    
    var purchaseTitle = L('pro_ver');
    
	var Storekit = require('ti.storekit');
	
	Storekit.receiptVerificationSandbox = true;
	Storekit.receiptVerificationSharedSecret = "<YOUR STOREKIT SHARED SECRET HERE>";
	
	var verifyingReceipts = false;
	
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
	//win.add(loading);
	
	/*
	 Now let's define a couple utility functions. We'll use these throughout the app.
	 */
	var tempPurchasedStore = {};
	
	/**
	 * Keeps track (internally) of purchased products.
	 * @param identifier The identifier of the Ti.Storekit.Product that was purchased.
	 */
	function markProductAsPurchased(identifier)
	{
		Ti.API.info('Marking as purchased: ' + identifier);
		// Store it in an object for immediate retrieval.
		tempPurchasedStore[identifier] = true;
		// And in to Ti.App.Properties for persistent storage.
		Ti.App.Properties.setBool('Purchased-' + identifier, true);
	}
	
	/**
	 * Checks if a product has been purchased in the past, based on our internal memory.
	 * @param identifier The identifier of the Ti.Storekit.Product that was purchased.
	 */
	function checkIfProductPurchased(identifier)
	{
		Ti.API.info('Checking if purchased: ' + identifier);
		if (tempPurchasedStore[identifier] === undefined)
			tempPurchasedStore[identifier] = Ti.App.Properties.getBool('Purchased-' + identifier, false);
		return tempPurchasedStore[identifier];
	}
	
	/**
	 * Requests a product. Use this to get the information you have set up in iTunesConnect, like the localized name and
	 * price for the current user.
	 * @param identifier The identifier of the product, as specified in iTunesConnect.
	 * @param success A callback function.
	 * @return A Ti.Storekit.Product.
	 */
	function requestProduct(identifier, success)
	{
		showLoading();
		Storekit.requestProducts([identifier], function (evt) {
			hideLoading();
			if (!evt.success) {
				alert(L("ERROR_We_failed_to_talk_to_Apple_"));
			}
			else if (evt.invalid) {
				alert(L("ERROR_We_requested_an_invalid_product_"));
			}
			else {
				success(evt.products[0]);
			}
		});
	}
	
	/**
	 * Purchases a product.
	 * @param product A Ti.Storekit.Product (hint: use Storekit.requestProducts to get one of these!).
	 */
	Storekit.addEventListener('transactionState', function (evt) {
		hideLoading();
		switch (evt.state) {
			case Storekit.FAILED:
				if (evt.cancelled) {
					alert(L('Purchase_cancelled'));
				} else {
					alert(L("ERROR_Buying_failed_") + evt.message);
				}
				break;
			case Storekit.PURCHASED:
				if (verifyingReceipts) {
					Storekit.verifyReceipt(evt, function (e) {
						if (e.success) {
							if (e.valid) {
								alert(L("Thanks_Receipt_Verified"));
								markProductAsPurchased(evt.productIdentifier);
							} else {
								alert(L("Sorry_Receipt_is_invalid"));
							}
						} else {
							alert(e.message);
						}
					});
				} else {
					markProductAsPurchased(evt.productIdentifier);
					//購入後の処理を書く
					var proind = evt.productIdentifier;
					alert(L("Thanks") + '\n' + purchaseTitle + ' ' + L("purchased_message"));
					label00.opacity=0.7;
					label_pro.opacity=0.7;
				}
				break;
			case Storekit.PURCHASING:
				Ti.API.info("Purchasing " + evt.productIdentifier);
				break;
			case Storekit.RESTORED:
				// The complete list of restored products is sent with the `restoredCompletedTransactions` event
				Ti.API.info("Restored " + evt.productIdentifier);
			    break;
		}
	});
	
	function purchaseProduct(product)
	{
		showLoading();
		Storekit.purchase(product);
	}
	
	/**
	 * Restores any purchases that the current user has made in the past, but we have lost memory of.
	 */
	function restorePurchases()
	{
		showLoading();
		Storekit.restoreCompletedTransactions();
	}
	Storekit.addEventListener('restoredCompletedTransactions', function (evt) {
		Ti.API.info('restore start');
		hideLoading();
		if (evt.error) {
			alert(evt.error);
		}
		else if (evt.transactions == null || evt.transactions.length == 0) {
			alert(L("There_were_no_purchases_to_restore"));
		}
		else {
			Ti.API.info('restore start2');
			for (var i = 0; i < evt.transactions.length; i++) {
				Ti.API.info(i);
				if (verifyingReceipts) {
					Storekit.verifyReceipt(evt.transactions[i], function (e) {
						if (e.valid) {
							markProductAsPurchased(e.productIdentifier);
						} else {
							Ti.API.error("Restored transaction is not valid");
						}
					});
				} else {
					Ti.API.info('restore:' + evt.transactions[i].productIdentifier);
					markProductAsPurchased(evt.transactions[i].productIdentifier);
					//リストア後の処理を書く
					alert(L("Restored_") + purchaseTitle + L("Restored"));
					label00.opacity=0.7;
					label_pro.opacity=0.7;
				}
			}
		}
	});
	
	/*
	 1) Can the user make payments? Their device may be locked down, or this may be a simulator.
	 */
	if(Titanium.Network.online == false){
	    // エラー表示
	    alert(L('Can_not_communicate_'));
	}else if(!Storekit.canMakePayments){
		alert(L('This_device_cannot_make_purchases_'));
	}else {
	    //追記するコード（UI）
	    var zoom = Titanium.App.Properties.getDouble('zoom');
	    Ti.API.info(zoom);
	    
	    var self = Ti.UI.createWindow({
			title:title,
			backgroundColor:'blue'
		});
		//3.1.2
		self.showNavBar();
		//if(Ti.Platform.osname!='andriod'){self.hideTabBar();}
        self.barColor = '#33ff66';
        
        var tableview = Ti.UI.createTableView({top:-70});
        self.add(tableview);
	    self.add(loading);
	    
	    //Fontsize
		
		var array1 = [205, 265];
		var array2 = [10, 30];
		var array3 = ['#fff', '#fff'];
		var array4 = ['#000', '#000'];
		var array5 = [5, 5];
		var array6 = [0.9, 1.1];
		var array7 = ['', ''];
		var array8 = ['', ''];
		
		var b2 = Titanium.UI.createButton({title:L('A')});
		self.RightNavButton = b2;
		b2.addEventListener('click', function(e){
			if(tableview.top==-70){
				tableview.top=0;
			}else{
				tableview.top=-70;
			}
		});
		
		var button_view = Ti.UI.createTableViewRow({
            height : 70
        });
        tableview.appendRow(button_view);
		
		for(i=0; i<array1.length; i++){
			var button = Ti.UI.createButton({
				title:L('A'),
				font : {
					fontWeight: "bold",
					fontSize : array2[i],
					fontFamily : 'Helvetica Neue'
				},
				color : array3[i],
				backgroundColor: array4[i],
				textAlign : 'center',
				left: array1[i],
				top: 10,
				width : 50,
				height : 50,
				borderColor: '#808080',
				borderWidth: 3,
				borderRadius : array5[i],
				backgroundImage:'non',
				backgroundSelectedImage:'assets/images/shadow.png',
				_zoom: array6[i],
				_color: array7[i],
				_bgColor: array8[i],
			});
			
			button.addEventListener('click', function(e){
		    		zoom1 = zoom*e.source._zoom;
				Ti.API.info(zoom1);
				Titanium.App.Properties.setDouble('zoom', zoom1);
				zoom = Titanium.App.Properties.getDouble('zoom');
		        
				self.close();
		        setTimeout(function() {
					var Window27 = require('ui/win27');
					var win27 = new Window27(L('In_App_Purchase'), label00, label_pro, purchase, parentWindow);
			    		parentWindow.containingTab.open(win27);
		    		},10);
			});
	
			button_view.add(button);
		}
    		
        var row1 = Ti.UI.createTableViewRow({
            leftImage : 'assets/images/shopping_basket.png',
            height : 'auto'
        });
    
        var label1 = Titanium.UI.createLabel({
            color : '#999',
            backgroundColor : '#fff',
            text : L("Welcome_to_kokucy_store_"),
            font : {
                fontSize : 16*zoom,
                fontFamily : 'Helvetica Neue'
            },
            height : 'auto',
            //top : 16,
            //bottom : 16,
            width : 240,
            left : 70,
        });
        row1.add(label1);
        tableview.appendRow(row1);
		/*
	    // ヘッダ部
	    var headerRow = Ti.UI.createTableViewRow();
	    headerRow.backgroundColor = '#576996';
	    headerRow.selectedBackgroundColor = '#385292';
	    headerRow.height = 'auto';
	    var clickLabel = Titanium.UI.createLabel({
	        text : L("Purchase_history"),
	        color : '#fff',
	        textAlign : 'center',
	        font : {
	            fontSize : 20
	        },
	        width : 'auto',
	        height : 'auto',
	        top : 10,
	        bottom : 10,
	    });
	    headerRow.add(clickLabel);
	    //  rowData.push(headerRow);
	    tableview.appendRow(headerRow);
	        
	    var row1 = Ti.UI.createTableViewRow({
	    		height:'auto',
	    	});
	   
		var whatHaveIPurchased = Ti.UI.createButton({
	        title : L("What_Have_I_Purchased"),
	        color : '#fff',
	        textAlign : 'center',
			top : 5,
			bottom: 5,
			width : 260,
			height : 50,
			borderRadius : 10,
			backgroundImage:'non',
			backgroundGradient:{
				type:'linear',
				colors:[
			        {position:0.00,color:'#1e5799'},
			        {position:0.50,color:'#2989d8'},
			        {position:0.51,color:'#207cca'},
			        {position:1.00,color:'#7db9e8'}
				]
			},
			backgroundSelectedImage:'assets/images/shadow.png'
		});
		
	    whatHaveIPurchased.addEventListener('click', function () {
	        checkTxt = L('Purchase_history');
	        
	        if(Ti.App.Properties.getString("ad")!='nend' && Ti.App.Properties.getString("ad")!='admob'){
	            checkTxt += "\n広告を非表示　購入済み";
	        }else{
	            checkTxt += "\n広告を非表示　未購入";
	        }
	        if(!checkTxt){
	            checkTxt += L('no_history');
	            alert(checkTxt);
	        }else{
	            alert(checkTxt);
	        }
	    });
	
	    row1.add(whatHaveIPurchased);
	    tableview.appendRow(row1);
	    */
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
	            fontSize : 20
	        },
	        width : 'auto',
	        height : 'auto',
	        top : 10,
	        bottom : 10,
	    });
	    headerRow.add(clickLabel);
	    //  rowData.push(headerRow);
	    tableview.appendRow(headerRow);
	    
	    /*
	     3) hide_ad の購入
	     */
	    var rowBuy00 = Ti.UI.createTableViewRow({ height:'auto',});
	    tableview.appendRow(rowBuy00);
	    
		//alert(Ti.App.Properties.getString("ad"));
		var buySingleItem00 = Ti.UI.createButton({
			//backgroundImage : './image/blue_button.png',
			//backgroundSelectedImage : './image/blue_button_r.png',
			//title:L('purchased_message'),
			font : {
			fontWeight: "bold",
			fontSize : 18,
			fontFamily : 'Helvetica Neue'
			},
			color : '#fff',
			textAlign : 'center',
			top : 16,
			bottom: 16,
			width : 260,
			height : 50,
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
			backgroundSelectedImage:'assets/images/shadow.png'
		});
		rowBuy00.add(buySingleItem00);
		
		if(Ti.App.Properties.getBool('Purchased-'+purchase)==true){
			buySingleItem00.title = purchaseTitle + L('purchased_message');
            buySingleItem00.addEventListener('click', function () {
                alert(L('Thanks'));
            });
	    } else {
            requestProduct(purchase, function (product) {
                buySingleItem00.title = product.title + ', ' + product.formattedPrice;
	            buySingleItem00.addEventListener('click', function () {
	                purchaseProduct(product);
	            });
            });
        }
	    
	    var row2 = Ti.UI.createTableViewRow({
	        //leftImage : './image/cart_32.png',
	        height : 'auto'
	    });
	
	    var label2 = Titanium.UI.createLabel({
	        color : '#999',
	        backgroundColor : '#fff',
	        text : L("desc_store"),
	        font : {
	            fontSize : 16*zoom,
	            fontFamily : 'Helvetica Neue'
	        },
	        height : 'auto',
	        top : 16,
	        bottom : 16,
	        width : 240,
	        left : 40,
	    });
	    row2.add(label2);
	    tableview.appendRow(row2);
	
	    var rowRestore = Ti.UI.createTableViewRow({ height:'auto',});
	    tableview.appendRow(rowRestore);
	    /*
	    var restoreCompletedTransactions = Ti.UI.createButton({
	        //backgroundImage : './image/red_button.png',
	        //backgroundSelectedImage : './image/red_button_r.png',
	        title : L("Restore_Lost_Purchases"),
	        font : {
	            fontWeight: "bold",
	            fontSize : 18,
	            fontFamily : 'Helvetica Neue'
	        },
	        color : '#000',
	        width : 280,
	        height : 50,
	        top : 10,
	        bottom : 10
	    });
	    */
	    var restoreCompletedTransactions =Ti.UI.createButton({
	        //title : L("Restore_Lost_Purchases"),
	        color : '#fff',
	        textAlign : 'center',
			top : 5,
			bottom: 5,
			width : 260,
			height : 50,
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
			backgroundSelectedImage:'assets/images/shadow.png'
		});
		
		if(Ti.App.Properties.getBool('Purchased-'+purchase)==true){
            restoreCompletedTransactions.title=L("no_restore_item");
            restoreCompletedTransactions.addEventListener('click', function () {
                alert(L('Thanks'));
            });
	    } else {
            restoreCompletedTransactions.title=L("Restore_Lost_Purchases");
		    restoreCompletedTransactions.addEventListener('click', function () {
		        restorePurchases();
		    });
        }
	    rowRestore.add(restoreCompletedTransactions);
	    
	    var row3 = Ti.UI.createTableViewRow({
	        //leftImage : 'assets/images/Lifesaver.png',
	        height : 'auto'
	    });
	
	    var label3 = Titanium.UI.createLabel({
	        color : '#999',
	        backgroundColor : '#fff',
	        text : L("Restore_store"),
	        font : {
	            fontSize : 16*zoom,
	            fontFamily : 'Helvetica Neue'
	        },
	        height : 'auto',
	        top : 16,
	        bottom : 16,
	        width : 240,
	        left : 40,
	    });
	    row3.add(label3);
	    tableview.appendRow(row3);
	    //追記するコード（UI）おわり
	}	
	return self;
};

module.exports = ApplicationWindow;