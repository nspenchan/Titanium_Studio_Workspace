//FirstView Component Constructor
function Store(win, purchase, label_pro) {
    
    var purchaseTitle = L('pro_ver');
    
	var Storekit = require('ti.storekit');
	
	Storekit.receiptVerificationSandbox = true;
	Storekit.receiptVerificationSharedSecret = "<YOUR STOREKIT SHARED SECRET HERE>";
	
	/*
	 autoFinishTransactions must be disabled (false) in order to start Apple hosted downloads.
	 If autoFinishTransactions is disabled, it is up to you to finish the transactions.
	 Transactions must be finished! Failing to finish transactions will cause your app to run slowly.
	 Finishing a transaction at any time before its associated download is complete will cancel the download. 
	 */
	Storekit.autoFinishTransactions = true; //apple hosted downloads は使わないので、true にする？
	
	/*
	 bundleVersion and bundleIdentifier must be set before calling validateReceipt().
	 Do not pull these values from the app, they should be hard coded for security reasons.
	 */
	//verifyingReceipts しないので、ここは設定しなくてよい？
	Storekit.bundleVersion = "1.0.1"; // eg. "1.0.0"
	Storekit.bundleIdentifier = "com.kokucy.yontakuAnimal"; // eg. "com.appc.storekit"

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
	 * Tells us if the version of iOS we are running on is iOS 7 or later
	 */
	function isIOS7Plus()
	{
		if (Titanium.Platform.name == 'iPhone OS')
		{
			var version = Titanium.Platform.version.split(".");
			var major = parseInt(version[0],10);
	
			// can only test this support on a 3.2+ device
			if (major >= 7)
			{
				return true;
			}
		}
		return false;
	
	}
	var IOS7 = isIOS7Plus();
	
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
			case Storekit.TRANSACTION_STATE_FAILED:
				if (evt.cancelled) {
					alert(L('Purchase_cancelled'));
				} else {
					alert(L("ERROR_Buying_failed_") + evt.message);
				}
				evt.transaction && evt.transaction.finish();
				break;
			case Storekit.TRANSACTION_STATE_PURCHASED:
				if (verifyingReceipts) {
					if (IOS7) {
						// iOS 7 Plus receipt validation is just as secure as pre iOS 7 receipt verification, but is done entirely on the device.
						var msg = Storekit.validateReceipt() ? 'Receipt is Valid!' : 'Receipt is Invalid.'; 
						alert(msg);
					} else {
						// Pre iOS 7 receipt verification
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
					}
				} else {
					markProductAsPurchased(evt.productIdentifier);
					//購入後の処理を書く
					var proind = evt.productIdentifier;
					alert(L("Thanks") + '\n' + purchaseTitle + ' ' + L("purchased_message"));
					label_pro.opacity=0.5;
					buySingleItem00.title = purchaseTitle + L('purchased_message');
		            restoreCompletedTransactions.title=L("no_restore_item");
				}
				
				// If the transaction has hosted content, the downloads property will exist
				// Downloads that exist in a PURCHASED state should be downloaded immediately, because they were just purchased.
				if (evt.downloads) {
					Storekit.startDownloads({
						downloads: evt.downloads
					});
				} else {
					// Do not finish the transaction here if you wish to start the download associated with it.
					// The transaction should be finished when the download is complete.
					// Finishing a transaction before the download is finished will cancel the download.
					evt.transaction && evt.transaction.finish();
				}
				
				break;
			case Storekit.TRANSACTION_STATE_PURCHASING:
				Ti.API.info("Purchasing " + evt.productIdentifier);
				break;
			case Storekit.TRANSACTION_STATE_RESTORED:
				// The complete list of restored products is sent with the `restoredCompletedTransactions` event
				Ti.API.info("Restored " + evt.productIdentifier);
				// Downloads that exist in a RESTORED state should not necessarily be downloaded immediately. Leave it up to the user.
				if (evt.downloads) {
					Ti.API.info('Downloads available for restored product');
				}
				
				evt.transaction && evt.transaction.finish();
			    break;
		}
	});
	
	/**
	 * Notification of an Apple hosted product being downloaded.
	 * Only supported on iOS 6.0 and later, but it doesn't hurt to add the listener.
	 */
	Storekit.addEventListener('updatedDownloads', function (evt) {
		var download;
		for (var i = 0, j = evt.downloads.length; i < j; i++) {
			download = evt.downloads[i];
			Ti.API.info('Updated: ' + download.contentIdentifier + ' Progress: ' + download.progress);
			switch (download.downloadState) {
				case Storekit.DOWNLOAD_STATE_FINISHED:
				case Storekit.DOWNLOAD_STATE_FAILED:
				case Storekit.DOWNLOAD_STATE_CANCELLED:
					hideLoading();
					break;
			}
			
			switch (download.downloadState) {
				case Storekit.DOWNLOAD_STATE_FAILED:
				case Storekit.DOWNLOAD_STATE_CANCELLED:
					download.transaction && download.transaction.finish();
					break;
				case Storekit.DOWNLOAD_STATE_FINISHED:
					// Apple hosted content can be found in a 'Contents' folder at the location specified by the the 'contentURL'
					// The name of the content does not need to be the same as the contentIdentifier, 
					// it is the same in this example for simplicity.
					var file = Ti.Filesystem.getFile(download.contentURL, 'Contents', download.contentIdentifier + '.jpeg');
					if (file.exists()) {
						Ti.API.info('File exists. Displaying it...');
						var iv = Ti.UI.createImageView({
							bottom: 0,
							left: 0,
							image: file.read()
						});
						iv.addEventListener('click', function() {
							win.remove(iv);
							iv = null;
						});
						win.add(iv);
					} else {
						Ti.API.error('Downloaded File does not exist at: ' + file.nativePath);
					}
					
					// The transaction associated with the download that completed needs to be finished. 
					download.transaction && download.transaction.finish();
					break;
			}
		}
	});
	 
	function purchaseProduct(product)
	{
		if (product.downloadable) {
			Ti.API.info('Purchasing a product that is downloadable');
		}
		showLoading();
		Storekit.purchase({
			product: product
			// applicationUsername is a opaque identifier for the user’s account on your system. 
			// Used by Apple to detect irregular activity. Should hash the username before setting.
			// applicationUsername: '<HASHED APPLICATION USERNAME>'
		});
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
			if (IOS7 && verifyingReceipts) {
				if (Storekit.validateReceipt()) {
					Ti.API.info('Restored Receipt is Valid!');
				} else {
					Ti.API.error('Restored Receipt is Invalid.');
				} 
			}
			for (var i = 0; i < evt.transactions.length; i++) {
				Ti.API.info(i);
				if (!IOS7 && verifyingReceipts) {
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
					alert(L("Purchased_") + ' ' + purchaseTitle + ' ' + L("Restored"));
					label_pro.opacity=0.5;
					buySingleItem00.title = purchaseTitle + L('purchased_message');
		            restoreCompletedTransactions.title=L("no_restore_item");
				}
			}
		}
	});
	
	/**
	 * WARNING
	 * addTransactionObserver must be called after adding the Storekit event listeners.
	 * Failure to call addTransactionObserver will result in no Storekit events getting fired.
	 * Calling addTransactionObserver before event listeners are added can result in lost events.
	 */
	Storekit.addTransactionObserver();
	 
	/**
	 * Validating receipt at startup
	 * Useful for volume purchase programs.
	 */
	if (IOS7) {
		win.addEventListener('open', function() {
			function validate() {
				Ti.API.info('Validating receipt.');
				Ti.API.info('Receipt is Valid: ' + Storekit.validateReceipt());
			}
			
			/*
			 During development it is possible that the receipt does not exist.
			 This can be resolved by refreshing the receipt.
			 */
			if (!Storekit.receiptExists) {
				Ti.API.info('Receipt does not exist yet. Refreshing to get one.');
				Storekit.refreshReceipt(null, function(){
					validate();
				});
			} else {
				Ti.API.info('Receipt does exist.');
				validate();
			}
		});
	}
	
	/*
	 1) Can the user make payments? Their device may be locked down, or this may be a simulator.
	 */
	
    var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	self.add(loading);
	
	if(Titanium.Network.online == false){
	    // エラー表示
	    alert(L('Can_not_communicate_'));
	    self.backgroundColor = 'red';
	    setTimeout(function(){
		    win.remove(self);
	    }, 3000);
	}else if(!Storekit.canMakePayments){
		alert(L('This_device_cannot_make_purchases_'));
	    self.backgroundColor = 'red';
	    setTimeout(function(){
		    win.remove(self);
	    }, 3000);
	}else {
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
			backgroundSelectedImage:'/assets/images/shadow.png'
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
		        restorePurchases();
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
	}	
	return self;
}

module.exports = Store;
