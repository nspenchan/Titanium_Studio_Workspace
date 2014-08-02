function Products(win, title, bgColor, e) {
	/*
	buildProductsTable = function(table, products) {
		var i, data;
		
		data = [];
	
		products.forEach(function(product) {
			var row = Ti.UI.createTableViewRow(cfg.tablerows);
			row.title = product.SKU + '/' + product.title + '/' + product.description;
			data.push(row);
		});
		table.setData(data);
	};
	*/
	
	var ANDROID = Ti.Platform.osname === "android";
	
	var productObjects = e.products;
	
	Ti.API.info('Product count: ' + productObjects.length);
	
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
	
	var rows = [];
	
	productObjects.forEach(function(product) {
		var row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'#fff',
		    hasChild:true,
		    val:product.title
		});
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L('ContentName_') + product.title + '\n' + L('Description_') + product.description,
			font:{fontSize:scale(22),fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign:'left',
			width:width-scale(80),
			height:'auto',
			left:scale(40),
			top:scale(10),
			bottom:scale(10),
			//opacity:0.7,
		});
		row.add(label);
	
		if(Titanium.App.Properties.getBool('Purchased-' + product.SKU)){
			row.backgroundColor = 'red';
			row.hasChild = false;
			label.color = '#fff';
			label.text = L('Purchsed_1') + label.text;
		}
		
		rows.push(row);
	});
	
	
	var tableview = Titanium.UI.createTableView({top:top+scale(60)});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
	
	//buildProductsTable(tableview, productObjects);
	if (!ANDROID) {
		Ti.API.info("Invalid IDs: " + JSON.stringify(e.invalid));
	}
	
	tableview.addEventListener('click', function(e){
			
		if(e.row.hasChild == false){
			alert(L('Purchased_') + e.row.val);
		}else{
			var Product = require('ui/common/Product');
			//construct UI
			var product = new Product(win, 'Product', bgColor, productObjects[e.index], tableview, e.index);
			win.add(product);
			
			setTimeout(function(){
				win.remove(self);
			}, 100);
		}
		/*
		if(e.row.hasChild){
			Ti.API.info(JSON.stringify(e));
			currentProduct = productObjects[e.index];
			index = e.index;
			
			var appPayload;
			
			appPayload = 'AppPayloadRandom#' + Math.round(Math.random() * 1000);
			Ti.API.info('Purchasing product ' +
				currentProduct.SKU + ' with app payload ' + appPayload);		
			currentProduct.purchase({
				quantity : 1,
				applicationPayload: appPayload
			});
		}else{
			alert(L('Purchased_product'));
		}
		*/
	});
    
    self.add(tableview);
	
	return self;

}

module.exports = Products;