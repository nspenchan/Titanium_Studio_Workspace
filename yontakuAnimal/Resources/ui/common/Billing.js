//FirstView Component Constructor
function Billing(win, purchase, label_pro) {
    
    var purchaseTitle = L('pro_ver');
    
	var InAppBilling = require('ti.inappbilling');
	
	InAppBilling.setPublicKey(Ti.App.Properties.getString('inAppBillingPublicKey'));
	
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
		Ti.API.error('Marking as purchased: ' + identifier);
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
		Ti.API.error('Checking if purchased: ' + identifier);
		if (tempPurchasedStore[identifier] === undefined)
			tempPurchasedStore[identifier] = Ti.App.Properties.getBool('Purchased-' + identifier, false);
		return tempPurchasedStore[identifier];
	}
	
	/*
	 1) Can the user make payments? Their device may be locked down, or this may be a simulator.
	 */
	var self = Ti.UI.createView({
		backgroundColor:'#fff',
	});
	
	if(Titanium.Network.online == false){
	    // エラー表示
	    alert(L('Can_not_communicate_'));
	    self.backgroundColor = 'red';
	    setTimeout(function(){
		    win.remove(self);
	    }, 3000);
	//}else if(!Storekit.canMakePayments){
		//alert(L('This_device_cannot_make_purchases_'));
	    //self.backgroundColor = 'red';
	    //setTimeout(function(){
		    //win.remove(self);
	    //}, 3000);
	}else {
	    //追記するコード（UI）
		var height = Ti.Platform.displayCaps.platformHeight;
		var width = Ti.Platform.displayCaps.platformWidth;
	    var zoom = Titanium.App.Properties.getDouble('zoom');
		var zoomTableview = Titanium.App.Properties.getDouble('zoomTableview');
	    Ti.API.error(zoom);
	
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
			self.remove(loading);
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
			backgroundSelectedImage:'/assets/images/shadow.png',
			enabled:false,
		});
		rowBuy00.add(buySingleItem00);
		
		if(Ti.App.Properties.getBool('Purchased-'+purchase)==true){
			buySingleItem00.title = purchaseTitle + L('purchased_message');
            buySingleItem00.addEventListener('click', function () {
                alert(L('Thanks'));
            });
	    } else {
			buySingleItem00.title = L('buy_') + ' ' + purchaseTitle;
			buySingleItem00.addEventListener('click', function () {
				NotifyMe(L('Request_Purchase'));
				var synchronousResponse = InAppBilling.requestPurchase({
					productId: purchase,
					//productType: '',/////////////////////////////////////////////////////////////////
					//developerPayload: devPayload
				});
				displaySynchronousResponseCodes(synchronousResponse);
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
			backgroundSelectedImage:'/assets/images/shadow.png',
			enabled:false,
		});
		
		if(Ti.App.Properties.getBool('Purchased-'+purchase)==true){
            restoreCompletedTransactions.title=L("no_restore_item");
            restoreCompletedTransactions.addEventListener('click', function () {
                alert(L('Thanks'));
            });
	    } else {
            restoreCompletedTransactions.title=L("Restore_Lost_Purchases");
		    restoreCompletedTransactions.addEventListener('click', function () {
			    	showLoading();
		    		NotifyMe(L('Restore_Transactions'));
				var synchronousResponse = InAppBilling.restoreTransactions();
				displaySynchronousResponseCodes(synchronousResponse);
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
	    	function NotifyMe(text){
		    Ti.API.error('< -- > '+text);
		    Ti.UI.createNotification({
		        message:text,
		        duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		    }).show();
		}
		
		//NotifyMe('Open DDMS to see the logs');
		
		/*
		 * Helper functions: translate InAppBilling response codes to Strings
		 *
		 *  InAppBilling response constants
		 *  
		 *  RESULT_OK
		 *  RESULT_USER_CANCELED
		 *  RESULT_SERVICE_UNAVAILABLE
		 *  RESULT_BILLING_UNAVAILABLE
		 *  RESULT_ITEM_UNAVAILABLE
		 *  RESULT_DEVELOPER_ERROR
		 *  RESULT_ERROR
		 *  
		 */
		function ResponseString(responseCode) {
		    switch (responseCode) {
		        case InAppBilling.RESULT_OK:
		            return 'OK';
		        case InAppBilling.RESULT_USER_CANCELED:
		            return 'USER_CANCELED';
		        case InAppBilling.RESULT_SERVICE_UNAVAILABLE:
		            return 'SERVICE_UNAVAILABLE';
		        case InAppBilling.RESULT_BILLING_UNAVAILABLE:
		            return 'BILLING_UNAVAILABLE';
		        case InAppBilling.RESULT_ITEM_UNAVAILABLE:
		            return 'ITEM_UNAVAILABLE';
		        case InAppBilling.RESULT_DEVELOPER_ERROR:
		            return 'DEVELOPER_ERROR';
		        case InAppBilling.RESULT_ERROR:
		            return 'RESULT_ERROR';
		    }
		    return '';
		}
		
		/*
		 *  InAppBilling verification constants
		 *  
		 *  SIGNATURE_VERIFIED
		 *  NULL_DATA
		 *  SIGNATURE_ERROR
		 *  UNKNOWN_NONCE
		 *  PUBLIC_KEY_NULL
		 *  
		 */
		function VerificationString(verificationCode) {
		    switch (verificationCode) {
		        case InAppBilling.SIGNATURE_VERIFIED:
		            return 'SIGNATURE VERIFIED';
		        case InAppBilling.NULL_DATA:
		            return 'NULL DATA';
		        case InAppBilling.SIGNATURE_ERROR:
		            return 'SIGNATURE ERROR';
		        case InAppBilling.UNKNOWN_NONCE:
		            return 'UNKNOWN NONCE';
		        case InAppBilling.PUBLIC_KEY_NULL:
		            return 'PUBLIC KEY NULL';
		    }
		    return '';
		}
		
		function displaySynchronousResponseCodes(e) {
			//showLoading();
		    var response = ResponseString(e.responseCode);
		
		    //NotifyMe('Request Id: ' + e.requestId + '\n' +'Response code: ' + e.responseCode);
		    NotifyMe(L('Response_code') + ' ' + L(e.responseCode));
		
		    Ti.API.error('function displaySynchronousResponseCodes \n' + 'Request Id: ' + e.requestId + '\n' + 'Response code: ' + e.responseCode);
		}
		/*
		addPayloadButton.addEventListener('click', function () {
		    var root = Ti.UI.createView({});
		    var view = Ti.UI.createView({
		        width: 300,
		        height: '100'
		    });
		    var textField = Ti.UI.createTextField({
		        width: 300,
		        height: 50,
		        value: devPayload
		    });
		    root.add(view);
		    view.add(textField);
		    var dialog = Ti.UI.createOptionDialog({
		        title: 'Add Developer Payload to Item',
		        options: null,
		        buttonNames: ['OK', 'CANCEL'],
		        androidView: root
		        
		    });
		    dialog.show();
		    dialog.addEventListener('click', function(e){
		        if (e.index == 0) {
		            devPayload = textField.value;
		        }
		    });
		});
		*/
		/*
		 * Button Event Listeners
		 * 
		 */
		/*
		checkBillingSupportedButton.addEventListener('click', function(e){
		    NotifyMe('Check Billing Supported');
		   
		    var synchronousResponse = InAppBilling.checkBillingSupported();
		    displaySynchronousResponseCodes(synchronousResponse);
		});
		
		checkSubscriptionsSupportedButton.addEventListener('click', function(e){
		    NotifyMe('Check Subscriptions Supported');
		    
		    var synchronousResponse = InAppBilling.checkBillingSupported(InAppBilling.ITEM_TYPE_SUBSCRIPTION);
		    displaySynchronousResponseCodes(synchronousResponse);
		});
		
		buyButton.addEventListener('click', function(e){
		    NotifyMe('Request Purchase');
		    
		    var synchronousResponse = InAppBilling.requestPurchase({
		        productId: picker.getSelectedRow(0).title,
		        productType: picker.getSelectedRow(0).productType,
		        developerPayload: devPayload
		    });
		    displaySynchronousResponseCodes(synchronousResponse);
		});
		
		restoreTransactionsButton.addEventListener('click', function(e){
		    NotifyMe('Restore Transactions');
		
		    var synchronousResponse = InAppBilling.restoreTransactions();
		    displaySynchronousResponseCodes(synchronousResponse);
		});
		*/
		/*
		 * Event listeners constants
		 *
		 *  ON_BIND_EVENT
		 *  ON_CONNECT_EVENT
		 *  RESPONSE_EVENT
		 *  PURCHASE_STATE_CHANGED_EVENT
		 *  NOTIFY_EVENT
		 *
		 *
		 */
		InAppBilling.addEventListener(InAppBilling.ON_BIND_EVENT, function(e){
		    if (e.result == InAppBilling.SUCCESS) {
		        NotifyMe(L('Billing_Service_Bound'));
		    } else {
		        NotifyMe(L('Billing_Service_Bind_Failed'));
		    }
		});
		
		InAppBilling.addEventListener(InAppBilling.ON_CONNECT_EVENT, function(e){
		    /* 
		     * Enable disabled buttons
		     * They were disabled because sending messages to the service before it is connected, will cause errors.
		     */
			Ti.API.error('Enable disabled buttons');
		    	//whatHaveIPurchased.enabled = true;
			buySingleItem00.enabled = true;
			/*
			for ( i = 0; i < arrayNE0.length; i++) {
				eval("if(arrayNE4[" + i + "]==1){buySingleItem" + i + ".enabled = true;}");
			}
			*/
			restoreCompletedTransactions.enabled = true;
		});
		
		InAppBilling.addEventListener(InAppBilling.RESPONSE_EVENT, function(e){
		    // Events with (e.sync == true) are deprecated and will be removed. Use the event object that the methods return.
		    if(!e.sync){
		        NotifyMe('RESPONSE CALLED ' + e.requestId + e.responseCode);
		        Ti.API.error('RESPONSE CALLED \n' + 'Request Id:\n' + e.requestId + ' ' + '\nResponse Code:' + ResponseString(e.responseCode));
		    }
		    hideLoading();
		});
		
		InAppBilling.addEventListener(InAppBilling.PURCHASE_STATE_CHANGED_EVENT, function(e){
		    //ターミナル　adb logcat > log.txt でログをテキストに出力して、挙動を調べることができる 
		    //NotifyMe('PURCHASE STATE CHANGED CALLED ' + e.signedData + ' ' + e.signature+'\n'+ 'SECURITY RESULT ' + e.result);
		    
		    Ti.API.error('PURCHASE STATE CHANGED CALLED');
		    Ti.API.error('Signature Verification Result:\n' + VerificationString(e.result));
		    Ti.API.error('Signed Data:\n' + e.signedData);
		
			if (e.signedData != null) {
				var response = JSON.parse(e.signedData);
		
				//購入処理（追記）
				for (var key in response.orders){//orders が複数あるときのために、for in でオブジェクトを走査する
		            Ti.API.error('Id: ' + response.orders[key].productId + ' State: ' + response.orders[key].purchaseState + 'notificationId: '+response.orders[key].notificationId);
		            content = purchaseTitle;
		            /*
		            var indexOf= arrayNE0.indexOf(response.orders[key].productId);
		            if(indexOf==-1){
		                content = '広告を非表示';
		            }else {
		                content = arrayNE1[indexOf];
		            }
		            */
		           
		           
		            var purchased = 'Purchased-'+ response.orders[key].productId;
		            
		                switch (response.orders[key].purchaseState) 
		            {
		                case 0:
		                    // 購入完了
		                    if(Titanium.App.Properties.getBool(purchased)==false){
								alert(L('result0') + ' ' + content);
		                        	//Titanium.App.Properties.setBool(purchased, true);
		                        	markProductAsPurchased(response.orders[key].productId);
								label_pro.opacity=0.5;
								buySingleItem00.title = purchaseTitle + L('purchased_message');
					            restoreCompletedTransactions.title=L("no_restore_item");
		                    }
		                break;
		
		                case 1:
		                    // キャンセル処理
							if(Titanium.App.Properties.getBool(purchased)==true){
								alert(L('result1') + ' ' + content);
								Titanium.App.Properties.setBool(purchased, false);
								label_pro.opacity=0;
								buySingleItem00.title = L('buy_') + ' ' + purchaseTitle;
								restoreCompletedTransactions.title=L("Restore_Lost_Purchases");
		                    }
		                break;
		
		                case 2:
		                    // 払い戻し完了
		                    if(Titanium.App.Properties.getBool(purchased)==true){
		                        alert(L('result2') + ' ' + content);
		                        Titanium.App.Properties.setBool(purchased, false);
		                        label_pro.opacity=0;
		                        buySingleItem00.title = L('buy_') + ' ' + purchaseTitle;
								restoreCompletedTransactions.title=L("Restore_Lost_Purchases");
		                    }
		                break;
		
		                case 3:
		                    if(Titanium.App.Properties.getBool(purchased)==true){
		                        // 期限切れ
		                        alert(L('result3') + ' ' + content);
		                        Titanium.App.Properties.setBool(purchased, false);
		                        label_pro.opacity=0;
		                        buySingleItem00.title = L('buy_') + ' ' + purchaseTitle;
								restoreCompletedTransactions.title=L("Restore_Lost_Purchases");
		                    }
		                break;
		
		                default:
		                    // 例外処理
		                    alert(L('result4') + ' ' + content);
		                break;
		            }
		            hideLoading();
		        }
				//購入処理終わり（追記）
		
				//データを受信したことをストアに伝える処理notificationid
				if (response.orders[0] && response.orders[0].notificationId) {
		            var synchronousResponse = InAppBilling.confirmNotifications({
		                notificationIds: [response.orders[0].notificationId]
		            });
		            displaySynchronousResponseCodes(synchronousResponse);
		        }
			}
		});
		
		
		InAppBilling.addEventListener(InAppBilling.NOTIFY_EVENT, function(e){
		    
		    Ti.API.error('NOTIFY CALLED \n' + 'Notify Id:\n' + e.notifyId);
		    
		    var synchronousResponse = InAppBilling.getPurchaseInformation({
		        notificationIds: [e.notifyId]
		    });
		    displaySynchronousResponseCodes(synchronousResponse);
		});
		
		/*
		 * Start the billing service after the event listeners are added
		 */
		InAppBilling.startBillingService();
		
		NotifyMe(L('Starting_Billing_Service'));
		
		if (Ti.Platform.model === 'Simulator' || Ti.Platform.model.indexOf('sdk') !== -1 ){
		    Ti.API.error('InAppBilling Module will not work on an Emulator, it must be run on a Device.');
		    alert('InAppBilling Module will not work on an Emulator, it must be run on a Device.');
		}
	}
	
	self.add(loading);
	
	return self;
}

module.exports = Billing;
