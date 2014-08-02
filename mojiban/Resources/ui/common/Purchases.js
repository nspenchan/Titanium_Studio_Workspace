function Purchases(win, title, bgColor, e, InAppProducts) {
	var ANDROID = Ti.Platform.osname === "android";
	
	var purchaseObjects = e.purchases;
	
	Ti.API.info('Purchases.js/Received ' + e.purchases.length + ' purchase records.');
	
	//UI
	var top = 0;
	var ampm, back, buttonWidth, contentName, label, Purchase, purchase, 
		row, rows, self, SKU, tableview, view;
	
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
		return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.Platform.displayCaps.platformWidth / 320);
	}
	/*
	function scale(dimension) {
		return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.App.Properties.getDouble('selfZoom') * Ti.Platform.displayCaps.platformWidth / 320);
	}
	*/
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
	
	function orderByTime(a, b) {
		var result = 0, timeA, timeB;
		
		if (a.originalPurchase) {
			timeA = a.originalPurchase.time;
		} else {
			timeA = a.time;
		}
		if (b.originalPurchase) {
			timeB = b.originalPurchase.time;
		} else {
			timeB = b.time;
		}
		if (timeA < timeB) {
			result = 1;
		} else if (timeA > timeB) {
			result = -1;
		}
		return result;
	}
	
	rows = [];

	if(purchaseObjects.length==0){
		row = Ti.UI.createTableViewRow({
			height:'auto',
			backgroundColor:'#fff',
		});
		
		label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L('purchase_non'),
			font:{fontSize:scale(18),fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:Ti.UI.FILL,
			height:'auto',
			top:scale(10),
			bottom:scale(10),
			//opacity:0.7,
		});
		row.add(label);
		
		rows.push(row);
	}else{
		purchaseObjects.sort(orderByTime).forEach(function(purchase) {
			SKU = purchase.SKU;
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
				contentName = L(SKU);
			}
			row = Ti.UI.createTableViewRow({
				height:'auto',
				backgroundColor:'#fff',
				hasChild:true,
			});
			
			label = Titanium.UI.createLabel({
				color:'#000',
				backgroundColor:'transparent',
				text:L('title_') + contentName + '\n' + L('restoreTime_') + purchase.time,
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
		});
	}
	
	tableview = Titanium.UI.createTableView({top:top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
			
		Purchase = require('ui/common/Purchase');
		//construct UI
		purchase = new Purchase(win, 'Purchase', bgColor, purchaseObjects[e.index], contentName, InAppProducts);
		win.add(purchase);
	});
	
	tableview.startLayout();
	tableview.setData(rows);
	tableview.finishLayout();
	
	self.add(tableview);
	
	return self;
}

module.exports = Purchases;