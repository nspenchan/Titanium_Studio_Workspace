//FirstView Component Constructor
function Coins(win, questionArray, label02, opening) {
	var utterance = require('bencoding.utterance');
	var speech = utterance.createSpeech();
	if(Ti.Platform.locale=='ja'){
		var speechLang = 'ja-JP';
	}else{
		var speechLang = 'en-US';
	}
	var width = Ti.Platform.displayCaps.platformWidth;
	var zoomTableview = Titanium.App.Properties.getDouble('zoomTableview');
	var zoomByOsname = Titanium.App.Properties.getDouble('zoomByOsname');
	var coins = Ti.App.Properties.getInt('coins');
	if(coins==0){
		if(Ti.Platform.osname!='android'){
			speech.startSpeaking({
			    text:L('There_is_no_coin'),
			    voice:speechLang,
			    rate:0.2
			});
		}else{
			speech.startSpeaking({
			    text:L('There_is_no_coin'),
			    rate:1
			});
		}
	}else{
		var coin0 = coins + '';
		if(Ti.Platform.osname!='android'){
			speech.startSpeaking({
			    text:String.format(L('There_are_coins'), coin0),
			    voice:speechLang,
			    rate:0.2
			});
		}else{
			speech.startSpeaking({
			    text:String.format(L('There_are_coins'), coin0),
			    rate:1
			});
		}
	}
	
    var i, j, row, row1, coinImage, rows, label, back, self, tableview;
	//create object instance, a parasitic subclass of Observable
	self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	rows = [];
	
	row = Ti.UI.createTableViewRow();
	
	label = Titanium.UI.createLabel({
		color:'#fff',
		text:L('Coins'),
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
	});
	row.add(label);
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	back = Ti.UI.createButton({
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
		setTimeout(function(){
			win.remove(self);
		}, 100);
	});
	
	rows.push(row);
	
    for(i=0; i<coins; i++){
    		j = i+1;
		i10 = i%10;
		if(i10==0){
	    		row = Ti.UI.createTableViewRow({
			    height:'auto',
			    backgroundColor:'white',
			});
		}
		
		coinImage= Ti.UI.createLabel({
			color:'red',
			text: j,
			font:{fontSize:25*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold'},
			textAlign : 'center',
			height:width/10,
			width:width/10,
			left:width/10*i10,
			backgroundImage:'/assets/images/super_mario_coin.png'
		});
		row.add(coinImage);
		
		if(i10==9 || j==coins){
			rows.push(row);
		}
		/*
		if(j==coins){
			rows.push(row1);
		}else if((i!=0 && i10==0)){
			rows.push(row1);
	    		row1 = Ti.UI.createTableViewRow({
			    height:'auto',
			    backgroundColor:'white',
			});
		}
		*/
	}
	
	tableview = Titanium.UI.createTableView({top: 0});
	
	tableview.addEventListener('click', function(e){
		//Ti.API.info(JSON.stringify(e));
	});
	
    tableview.startLayout();
    tableview.setData(rows);
    tableview.finishLayout();
    
    self.add(tableview);
	
	var cardShopButton = Titanium.UI.createLabel({
		color:'#fff',
		backgroundColor:'red',
		//text:L('Cards'),
		font:{fontSize:25*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
	    width:180*zoomTableview,
	    height:180*zoomTableview,
		borderRadius:90*zoomTableview,
	    top:-90*zoomTableview,
	    right:-90*zoomTableview,
	});
	self.add(cardShopButton);
	cardShopImage = Ti.UI.createImageView({
	    // http://ja.wikipedia.org/wiki/ %E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Tokyo_metro_map.png
	    image: '/assets/images/Home.png',
	    top:0,
	    right:0,
	    width:60*zoomByOsname,
	    height:60*zoomByOsname,
	});
	self.add(cardShopImage);
	//Add behavior for UI
	cardShopButton.addEventListener('click', function(e) {
		var CardShop = require('ui/common/CardShop');
		//construct UI
		var cardShop = new CardShop(win, questionArray, label02, opening);
		win.add(cardShop);
		setTimeout(function(){
			win.remove(self);
		}, 500);
	});
	cardShopImage.addEventListener('click', function(e) {
		var CardShop = require('ui/common/CardShop');
		//construct UI
		var cardShop = new CardShop(win, questionArray, label02, opening);
		win.add(cardShop);
		setTimeout(function(){
			win.remove(self);
		}, 500);
	});
	
	return self;
}

module.exports = Coins;
