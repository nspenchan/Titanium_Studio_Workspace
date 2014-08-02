//FirstView Component Constructor
function Cards(win, questionArray, label02, opening) {
	var utterance = require('bencoding.utterance');
	var speech = utterance.createSpeech();
	if(Ti.Platform.locale=='ja'){
		var speechLang = 'ja-JP';
	}else{
		var speechLang = 'en-US';
	}
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var zoomTableview = Titanium.App.Properties.getDouble('zoomTableview');
	var zoomByOsname = Titanium.App.Properties.getDouble('zoomByOsname');
	var arrayColor = ['#ff7f7f', '#ff7fbf', '#ff7fff', '#bf7fff', '#7f7fff', '#7fbfff', '#7fffff', '#7fffbf', '#7fff7f', '#bfff7f', '#ffff7f', '#ffbf7f'];
	
	var i18n = Titanium.App.Properties.getString('answerName');
	switch(i18n){
		case 'ja':
		case 'ji':
		case 'j2':
		case 'j3':
		case 'zh':
		case 'ko':
			var fontsize = 30*zoomByOsname;
		break;
		case 'ar':
		case 'el':
		case 'vi':
		case 'th':
		case 'fa':
			var fontsize = 15*zoomByOsname;
		break;
		default:
			var fontsize = 24*zoomByOsname;
		break;
	}
	
	var answerName = Titanium.App.Properties.getString('answerName');
	var db1 = Ti.Database.open(Titanium.App.Properties.getString('databaseName'));
    var answerArray = [];
    var select = 'SELECT ' + answerName + ' FROM DATA';
    //alert(select);
    var rows = db1.execute(select);
    
    while(rows.isValidRow()){
        answerArray.push(rows.field(0));
        rows.next();
    }
    rows.close();
    db1.close();
    
    var db2 = Titanium.Database.open('user');
    var levelArray = [];
    var select2 = 'SELECT level FROM USER1';
    //alert(select);
    var rows2 = db2.execute(select2);
    
    while(rows2.isValidRow()){
        levelArray.push(rows2.field(0));
        rows2.next();
    }
    rows2.close();
    db2.close();
    Ti.API.info(levelArray);
    
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	var scrollView = Titanium.UI.createScrollView({
	    contentWidth:'auto',
	    contentHeight:'auto',
	    top:0,
	    bottom: 0,
	    showVerticalScrollIndicator:true,
	    showHorizontalScrollIndicator:true
	});
	var imageView = Ti.UI.createImageView({
	    // http://ja.wikipedia.org/wiki/ %E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Tokyo_metro_map.png
	    //image: 'Tokyo_metro_map.png',
	    backgroundColor:'#000',
	    width:height/1.414*16,
	    height:height,
	});
	scrollView.add(imageView);
	scrollView.scrollTo(0, 0);
	self.add(scrollView);
	
	var cardImage, random2;
	var cardArray = [];
	for(i=0; i<16; i++){
		random2 = Math.floor(Math.random()*5+1);
		cardImage = Ti.UI.createImageView({
		    // http://ja.wikipedia.org/wiki/ %E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Tokyo_metro_map.png
		    //image: 'Tokyo_metro_map.png',
		    backgroundColor:'white',
		    top:height*0.05,
		    left:height/1.414*(0.05+i),
		    width:height/1.414*0.9,
		    height:height*0.9,
		    borderColor:'#000',
			borderRadius	:10*zoomByOsname,
			borderWidth:1*zoomByOsname,
		});
		imageView.add(cardImage);
		
		cardImage2 = Ti.UI.createImageView({
		    // http://ja.wikipedia.org/wiki/ %E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Tokyo_metro_map.png
		    //image: '/assets/images/flowers-leaves001.jpg',
		    backgroundColor:arrayColor[i%12],
		    top:height*0.05,
		    left:height/1.414*0.05,
		    width:height/1.414*0.8,
		    height:height*0.8,
		    borderColor:'#000',
			borderRadius	:10*zoomByOsname,
			borderWidth:1*zoomByOsname,
		});
		cardImage.add(cardImage2);
		
		if(levelArray[i+1]==''){
			cardImage2.image = '/assets/images/flowers-leaves001.jpg';
		}else{
			cardArray.push(answerArray[i]);
			cardImage3  = Ti.UI.createImageView({
			    image:'/assets/images/' + Titanium.App.Properties.getString('folder') + '/' + questionArray[i] + '/l_0' + random2 +'.png',
			    width:height/1.414*0.9,
			    height:height/1.414*0.9*2/3,
			    top:height*0.2,
			    left:0,
			});
			cardImage.add(cardImage3);
			
			cardLabel  = Ti.UI.createLabel({
				color:'#fff',
				backgroundColor:'red',
				text:'NEW',
				font:{fontSize:14*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold'},
			    width:height/6,
			    height:height/9,
			    top:0,
			    right:0,
				textAlign:'center',
			    borderColor:'#000',
				borderRadius	:height/18,
				borderWidth:1*zoomByOsname,
			});
			cardImage.add(cardLabel);
			
			if(levelArray[i+1]!=1){
				cardLabel.text = levelArray[i+1];
				cardLabel.color = 'red';
				cardLabel.backgroundColor = 'transparent';
				cardLabel.borderColor = 'transparent';
			}
				
			cardLabel2 = Titanium.UI.createLabel({
				color:'#000',
				text:answerArray[i],
				font:{fontSize:fontsize,fontFamily:'Helvetica Neue',fontWeight:'bold'},
				textAlign:'center',
				width:Ti.UI.FILL,
			    height:'auto',
			    bottom:height*0.1,
			});
			cardImage.add(cardLabel2);
		}
	}
	if(cardArray.length==0){
		if(Ti.Platform.osname!='android'){
			speech.startSpeaking({
			    text:L('There_is_no_card'),
			    voice:speechLang,
			    rate:0.2
			});
		}else{
			speech.startSpeaking({
			    text:L('There_is_no_card'),
			    rate:1
			});
		}
	}else{
		var card0 = cardArray.length + '';
		var text0 = '';
		for(i=0; i<cardArray.length; i++){
			if(Ti.Platform.locale=='ja'){
				text0 = text0 + '。' + cardArray[i];
			}else{
				text0 = text0 + '.' + cardArray[i];
			}
		}
		if(Ti.Platform.osname!='android'){
			speech.startSpeaking({
			    text:String.format(L('There_are_cards'), card0) + text0,
			    voice:speechLang,
			    rate:0.2
			});
		}else{
			speech.startSpeaking({
			    text:String.format(L('There_are_cards'), card0) + text0,
			    rate:1
			});
		}
	}
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var back = Ti.UI.createButton({
		color:'#fff',
		title: L('Back'),
		font:{fontSize:20*zoomByOsname,fontFamily:'Helvetica Neue',fontWeight:'bold'},
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
	self.add(back);
	//Add behavior for UI
	back.addEventListener('click', function(e) {
		win.remove(self);
	});
	
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

module.exports = Cards;
