//FirstView Component Constructor
function Settings(win, purchase, userImage, label00, label01, label_pro, opening) {//create object instance, a parasitic subclass of Observable
	var width = Ti.Platform.displayCaps.platformWidth;
	var osname = Ti.Platform.osname;
	var zoomTableview = Titanium.App.Properties.getDouble('zoomTableview');
	var self = Ti.UI.createView({
		backgroundColor:'#000',
	});
	
	var rows = [];
	
	var row = Ti.UI.createTableViewRow();
	
	var label = Titanium.UI.createLabel({
		color:'#fff',
		text:L('Settings'),
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
		if(osname=='android'){
			var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, '/user/userFace.png');
			if(file.exists()){
				Ti.API.info('userFace.png');
				userImage.image = Titanium.Filesystem.applicationDataDirectory + '/user/userFace.png';
			}
		}else{
			var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'userFace.png');
			if(file.exists()){
				Ti.API.info('userFace.png');
				userImage.image = Titanium.Filesystem.applicationDataDirectory + 'userFace.png';
			}
		}
	});
	
	rows.push(row);
	
	var arrayTitle = ['Select_Language', 'User', 'Time', 'Visual_Effect', 'Music', 'Fontsize', 'Levelup_Minimum_Point', 'Hint_Counter', 'Mode_Select', 'Info', 'In_App_Purchase'];
	var arrayLeft = ['World.png', 'Person-white.png', 'Clock.png', 'Exclamation.png', 'Music.png', 'Search.png', 'Up.png', 'Tip.png', 'Refresh.png', 'info.png', 'shopping_basket.png'];

	for(i=0; i<arrayTitle.length; i++){
		var row = Ti.UI.createTableViewRow({
		    height:'auto',
		    backgroundColor:'white',
		    hasChild:true,
		});
		
		var leftImage = Titanium.UI.createImageView({
		    image: '/assets/images/' + arrayLeft[i],
		    left:0,
		});
		row.add(leftImage);
		
		var label = Titanium.UI.createLabel({
			color:'#000',
			backgroundColor:'transparent',
			text:L(arrayTitle[i]),
			font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:width-100,
			height:'auto',
			top:10,
			bottom:10,
			left:60,
			//opacity:0.7,
		});
		row.add(label);
		
		rows.push(row);
	}
	
	//final Row
	var rowFinal = Ti.UI.createTableViewRow({
	    height:'auto',
	    backgroundColor:'white',
	    //hasChild:true,
	});
		
	var leftImage = Titanium.UI.createImageView({
	    image: '/assets/images/nspenchan_logo_114.png',
	    width:48,
	    height:48,
	    top:0,
	    bottom:0,
	    left:0,
	});
	rowFinal.add(leftImage);
	
	var label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L('Developed_by_nspenchan'),
		font:{fontSize:18*zoomTableview,fontFamily:'Helvetica Neue'},
		textAlign:'left',
		width:width-60,
		height:'auto',
		left:60,
		//opacity:0.7,
	});
	rowFinal.add(label);
	
	rowFinal.addEventListener('click', function(e) {
		alert('Thank you for using kokucy app!');
	});
	rows.push(rowFinal);
	
	//Test Mode
	var rowTest = Ti.UI.createTableViewRow({
	    height:'auto',
	    backgroundColor:'white',
	    //hasChild:true,
	});
		
	var leftImage = Titanium.UI.createImageView({
	    image: '/assets/images/Alert.png',
	    left:0,
	});
	rowTest.add(leftImage);
	
	var label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L('Test_Mode'),
		font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue'},
		textAlign:'left',
		width:width-100,
		height:'auto',
		top:10,
		bottom:10,
		left:60,
		//opacity:0.7,
	});
	rowTest.add(label);
	//スイッチ状態の記憶
	if (Titanium.App.Properties.getBool('testMode') == true) {
		var state1 = true;
	} else {
		var state1 = false;
	}
	var s1 = Titanium.UI.createSwitch({
        value:state1,
        //top:10,
        //bottom:10,
        right:10,
	});
	rowTest.add(s1);

	// create a switch change listener
	s1.addEventListener('change', function(e) {
	    // e.valueにはスイッチの新しい値が true もしくは falseとして設定されます。
	    if(e.value==true){
	    		Ti.App.Properties.setBool('testMode', true);
	    }else{
	    		Ti.App.Properties.setBool('testMode', false);
	    }
	});
	
	//
	//test mode
	//rows.push(rowTest);

	/*
	//No Theme Song
	var rowSwitch = Ti.UI.createTableViewRow({
	    height:'auto',
	    backgroundColor:'white',
	    //hasChild:true,
	});
		
	var leftImage = Titanium.UI.createImageView({
	    image: '/assets/images/no_sound.png',
	    left:0,
	});
	rowSwitch.add(leftImage);
	
	var label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'transparent',
		text:L('Theme_Song'),
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'left',
		width:240,
		height:'auto',
		top:10,
		bottom:10,
		left:60,
		//opacity:0.7,
	});
	rowSwitch.add(label);
	//スイッチ状態の記憶
	if (Titanium.App.Properties.getBool('themesong') == true) {
		var state1 = true;
	} else {
		var state1 = false;
	}
	var s1 = Titanium.UI.createSwitch({
        value:state1,
        //top:10,
        //bottom:10,
        right:10,
	});
	rowSwitch.add(s1);

	// create a switch change listener
	s1.addEventListener('change', function(e) {
	    // e.valueにはスイッチの新しい値が true もしくは falseとして設定されます。
	    if(e.value==true){
	    		Ti.App.Properties.setBool('themesong', true);
	    		Ti.App.Properties.setBool('bgm', true);
			themesong.backgroundImage = '/assets/images/no_sound_x.png';
	    		win1.add(themesong);
	    }else{
	    		Ti.App.Properties.setBool('themesong', false);
	    		Ti.App.Properties.setBool('bgm', false);
	    		win1.remove(themesong);
	    }
	});
	
	rows.push(rowSwitch);
	*/
	var tableview = Titanium.UI.createTableView({top: 0});
	
	tableview.addEventListener('click', function(e){
		//eventオブジェクト
	    var index = e.index; 
	    switch(index){
	    		case 1:
				//win.remove(firstView);
				var Words = require('ui/common/Words');
				//construct UI
				var words = new Words(win, label00, purchase);
				win.add(words);
	    		break;
	    		case 2:
				//win.remove(firstView);
				var User = require('ui/common/User');
				//construct UI
				var user = new User(win, label01);
				win.add(user);
	    		break;
	    		case 3:
				//win.remove(firstView);
				var Time = require('ui/common/Time');
				//construct UI
				var time = new Time(win);
				win.add(time);
	    		break;
	    		case 4:
				//win.remove(firstView);
				var Effect = require('ui/common/Effect');
				//construct UI
				var effect = new Effect(win);
				win.add(effect);
	    		break;
	    		case 5:
				//win.remove(firstView);
				var Music = require('ui/common/Music');
				//construct UI
				var music = new Music(win, opening);
				win.add(music);
	    		break;
	    		case 6:
				//win.remove(firstView);
				var Fontsize = require('ui/common/Fontsize');
				//construct UI
				var fontsize = new Fontsize(win);
				win.add(fontsize);
	    		break;
	    		case 7:
				//win.remove(firstView);
				var Levelup = require('ui/common/Levelup');
				//construct UI
				var levelup = new Levelup(win);
				win.add(levelup);
	    		break;
	    		case 8:
				//win.remove(firstView);
				var Hint = require('ui/common/Hint');
				//construct UI
				var hint = new Hint(win);
				win.add(hint);
	    		break;
	    		case 9:
				//win.remove(firstView);
				var Mode = require('ui/common/Mode');
				//construct UI
				var mode = new Mode(win, purchase, label00);
				win.add(mode);
	    		break;
	    		case 10:
				//win.remove(firstView);
				var Info = require('ui/common/Info');
				//construct UI
				var info = new Info(win, purchase, opening);
				win.add(info);
	    		break;
	    		case 11:
	    			var arrayPurchase = [purchase];
				var Store = require('ui/common/Store');
				//construct UI
				var store = new Store(win, 'Shop', '#ff7f7f', arrayPurchase, label_pro);
				win.add(store);
				/*
				var Inappproducts = require('ui/common/Inappproducts');
				//construct UI
				var inappproducts = new Inappproducts(win, purchase, label_pro);
				win.add(inappproducts);
				
		    		if(osname =='android'){
					//win.remove(firstView);
					var Billing = require('ui/common/Billing');
					//construct UI
					var billing = new Billing(win, purchase, label_pro);
					win.add(billing);
		    		}else{
					//win.remove(firstView);
					var Store = require('ui/common/Store');
					//construct UI
					var store = new Store(win, purchase, label_pro);
					win.add(store);
		    		}
		    		*/
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

module.exports = Settings;
