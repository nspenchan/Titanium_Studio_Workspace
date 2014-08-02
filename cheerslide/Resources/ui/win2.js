function ApplicationWindow(title, tabGroup, wRatio, bgm00, label00, label_pro, themesong, win1, purchase) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'blue'
	});
	
	//if(Ti.Platform.osname!='andriod'){self.hideTabBar();}
	
	//Titanium.UI.iPhone.hideStatusBar();
	/*
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'blue'
		}));
	});
	*/
	
	var b1 = Titanium.UI.createButton({title:L('Back')});
	//var b2 = Titanium.UI.createButton({title:L('Next')});
	self.LeftNavButton = b1;
	//self.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		//Thema Song
		Ti.API.info(bgm00.playing);
		if(bgm00.playing==false && Ti.App.Properties.getBool('bgm')==true){
			themesong.backgroundImage = 'assets/images/no_sound_x.png';
			bgm00.play();
		}
		tabGroup.activeTab = tabGroup.tabs[0];
	});
	/*
	b2.addEventListener('click', function(e){
	   tabGroup.activeTab = tabGroup.tabs[2];
	});
	*/
	var rows = [];
	/*
	    {title:L('Photo'), hasChild:true},
	    {title:L('Photo2'), hasChild:true},
	    {title:L('Word'), hasChild:true},
	    {title:L('Word2'), hasChild:true},
	    {title:L('Music'), hasChild:true},
	    {title:L('In_App_Purchase'), hasChild:true},
	];
	*/
	var arrayTitle = ['Photo', 'Photo2', 'Word', 'Word2', 'Music', 'Time', 'Fontsize', 'In_App_Purchase'];
	
	var arrayLeft = ['Photo_+.png', 'Photo_x.png', 'Speech-Bubble_+.png', 'Speech-Bubble_x.png', 'Music_+.png', 'Clock.png', 'Search.png', 'shopping_basket.png'];
	
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
			font:{fontSize:20,fontFamily:'Helvetica Neue'},
			textAlign:'left',
			width:240,
			height:'auto',
			top:10,
			bottom:10,
			left:60,
			//opacity:0.7,
		});
		row.add(label);
		
		rows.push(row);
	}
	//No Theme Song
	var row = Ti.UI.createTableViewRow({
	    height:'auto',
	    backgroundColor:'white',
	    //hasChild:true,
	});
		
	var leftImage = Titanium.UI.createImageView({
	    image: '/assets/images/no_sound.png',
	    left:0,
	});
	row.add(leftImage);
	
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
	row.add(label);
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
	row.add(s1);

	// create a switch change listener
	s1.addEventListener('change', function(e) {
	    // e.valueにはスイッチの新しい値が true もしくは falseとして設定されます。
	    if(e.value==true){
	    		Ti.App.Properties.setBool('themesong', true);
	    		Ti.App.Properties.setBool('bgm', true);
			themesong.backgroundImage = 'assets/images/no_sound_x.png';
	    		win1.add(themesong);
	    }else{
	    		Ti.App.Properties.setBool('themesong', false);
	    		Ti.App.Properties.setBool('bgm', false);
	    		win1.remove(themesong);
	    }
	});
	
	rows.push(row);
		
	var tableview = Titanium.UI.createTableView({top: 0});
	
	tableview.addEventListener('click', function(e){
		//eventオブジェクト
	    var index = e.index; 
	    switch(index){
	    		case 0:
	    		var count1 = 0;
	    		var turn = '';
	    		var Window20 = require('ui/win20');
			var win20 = new Window20(L('Photo'), count1, turn);
	    		win20.open();
	    		break;
	    		
	    		case 1:
	    		var Window21 = require('ui/win21');
			var win21 = new Window21(L('Photo2'));
	    		self.containingTab.open(win21);
	    		break;
	    		
	    		case 2:
	    		var Window22 = require('ui/win22');
			var win22 = new Window22(L('Word'), wRatio);
	    		self.containingTab.open(win22);
	    		break;
	    		
	    		case 3:
	    		var Window23 = require('ui/win23');
			var win23 = new Window23(L('Word2'));
	    		self.containingTab.open(win23);
	    		break;
	    		
	    		case 4:
	    		var count1 = 0;
	    		var Window24 = require('ui/win24');
			var win24 = new Window24(L('Music'), purchase);
	    		win24.open();
	    		break;
	    		
	    		case 5:
	    		var Window25 = require('ui/win25');
			var win25 = new Window25(L('Time'), wRatio);
	    		self.containingTab.open(win25);
	    		break;
	    		
	    		case 6:
	    		var Window26 = require('ui/win26');
			var win26 = new Window26(L('Fontsize'), wRatio);
	    		self.containingTab.open(win26);
	    		break;
	    		
	    		case 7:
	    		var Window27 = require('ui/win27');
			var win27 = new Window27(L('In_App_Purchase'), label00, label_pro, purchase, self);
	    		self.containingTab.open(win27);
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
};

module.exports = ApplicationWindow;