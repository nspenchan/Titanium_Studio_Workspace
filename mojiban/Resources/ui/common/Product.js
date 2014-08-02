function Product(win, title, bgColor, currentProduct, table, index) {
	//UI
	var top = 0;
	var appPayload, back, buttonWidth, label, labelText, row, rowPurchase, 
		rows, self, tableview, view, productImage;
	
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
	
	rows = [];
	
	labelText = L('title_') + currentProduct.title + '\n\n' +  L('description_') + currentProduct.description + '\n' 
		+  L('price_') + currentProduct.priceAsString;
	
	row = Ti.UI.createTableViewRow({
		height:'auto',
		backgroundColor:'#fff',
		hasChild:false,
	});
		
	productImage = Ti.UI.createImageView({
		image:'/assets/images/' + osname + '/' + currentProduct.SKU + '.png',
		width:scale(200),
		//top:20,
		left:scale(10),
	});
	if(osname=='ipad'){
		productImage.height = scale(150);
	}else{
		productImage.height = scale(112);
	}
	row.add(productImage);
	
	label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:labelText,
		font:{fontSize:scale(24),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'left',
		width:width-scale(230),
		height:'auto',
		left:scale(220),
		top:scale(10),
		bottom:scale(10),
		//opacity:0.7,
	});
	row.add(label);
	
	rows.push(row);

	rowPurchase = Ti.UI.createTableViewRow({
		height:scale(60),
		backgroundColor:'red',
		hasChild:true,
	});
	
	label = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:'transparent',
		text:L('Purchase_Product'),
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
		appPayload;
		
		appPayload = 'AppPayloadRandom#' + Math.round(Math.random() * 1000);
		Ti.API.info('Purchasing product ' +
			currentProduct.SKU + ' with app payload ' + appPayload);		
		currentProduct.purchase({
			quantity : 1,
			applicationPayload: appPayload
		});
	});
	
	rows.push(rowPurchase);
	
	
	tableview = Titanium.UI.createTableView({top:top+scale(60)});
	
	tableview.addEventListener('click', function(e){
		Ti.API.info(JSON.stringify(e));
	});
	
	tableview.startLayout();
	tableview.setData(rows);
	tableview.finishLayout();
	
	self.add(tableview);
	
	Ti.API.info('... initialization complete!');
	
	return self;
}

module.exports = Product;