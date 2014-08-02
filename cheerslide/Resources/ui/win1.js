function ApplicationWindow(title, tabGroup, parentwindow, wRatio, bgm00, label00, label_pro, themesong, purchase) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	//if(Ti.Platform.osname!='andriod'){self.hideNavBar();}
	//if(Ti.Platform.osname!='andriod'){self.hideTabBar();}
	
	//Thema Song
	Ti.API.info('bgm00.playing:' + bgm00.playing);
	if(bgm00.playing==false && Ti.App.Properties.getBool('bgm')==true){
		bgm00.play();
	}
	
	var view = Titanium.UI.createImageView({
	    width:320,
	    height:568,
	    top:0,
	    left:0,
	});
	//画像の位置調整
	if(wRatio<1.6){
		var top = -30;
	}else{
		var top = 0;
	}
	
	var imageView = Titanium.UI.createImageView({
	    image: '/assets/images/splash.png',
	    width: 320,
	    height :568,
	    top:top,
	    left:0,
	});
	view.add(imageView);
	
	view.add(label_pro);
    /*
	var label = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'#fff',
		text:L('Initialization'),
		font:{fontSize:30,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto',
		height:'auto',
		top:50,
		right:10,
		opacity:0.7	
	});
	*/
	label00.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		if(bgm00.playing==true){
			bgm00.stop();
		}
		if(Ti.App.Properties.getInt("intialization")<3){
			var Window10 = require('ui/win10');
			var win10 = new Window10(L('Three_STEP'), self, wRatio, bgm00, label00, label1, label2, purchase, themesong);
			self.containingTab.open(win10);
		}else if(Ti.App.Properties.getInt("intialization")==3 || Ti.App.Properties.getBool('Purchased-'+purchase)==true){
			var Window12 = require('ui/win12');
			var win12 = new Window12(L('Manege_Project'), tabGroup, parentwindow, wRatio, bgm00, label00, label1, label2, purchase, themesong);
			self.containingTab.open(win12);
		}
	});
	//if(Ti.App.Properties.getInt("intialization")<3 || Ti.App.Properties.getBool('Purchased-'+purchase)==true){
		view.add(label00);
	//}
	
	var label1 = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'#fff',
		text:L('Start'),
		font:{fontSize:30,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto',
		height:'auto',
		top:180,
		right:10,
		opacity:0,
	});
	label1.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		if(bgm00.playing==true){
			bgm00.stop();
		}
		if(Ti.App.Properties.getInt("intialization")>=3){
			var Window11 = require('ui/win11');
			var win11 = new Window11(L('Start'), wRatio, purchase, tabGroup, bgm00, themesong);
			win11.open();
		}
	});
	view.add(label1);

	var label2 = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'#fff',
		text:L('Setting'),
		font:{fontSize:30,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto',
		height:'auto',
		top:280,
		right:10,
		opacity:0,
	});
	label2.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		if(bgm00.playing==true){
			bgm00.stop();
		}
		if(Ti.App.Properties.getInt("intialization")>=3){
			tabGroup.activeTab = tabGroup.tabs[1];
		}
	});
	view.add(label2);
	if(Ti.App.Properties.getInt("intialization")==3){
		label1.opacity = 0.7;
		label2.opacity = 0.7;
	}

	var label3 = Titanium.UI.createLabel({
		color:'#000',
		backgroundColor:'#fff',
		text:L('Info'),
		font:{fontSize:30,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto',
		height:'auto',
		top:380,
		right:10,
		opacity:0.7,
	});
	label3.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		if(bgm00.playing==true){
			bgm00.stop();
		}
		tabGroup.activeTab = tabGroup.tabs[2];
	});
	view.add(label3);
	
	self.add(view);
	
	//secret mode
	var tf1 = Titanium.UI.createTextField({
        color:'#336699',
        top:10,
        left:10,
        width:150,
        height:40,
        hintText:'secret commad',
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	tf1.addEventListener('return',function(e){
		if(e.value=='999'){
			//alert('secret mode');
			Titanium.App.Properties.setBool('Purchased-'+purchase, true);
			label00.opacity = 0.7;
			label_pro.opacity = 0.7;
		}
		if(e.value=='1000'){
			//alert('secret mode');
			Titanium.App.Properties.setBool('Purchased-'+purchase, false);
			label00.opacity = 0;
			label_pro.opacity = 0;
		}
		if(e.value=='1001'){
			//alert('secret mode');
			bgm00.play();
			Ti.App.Properties.setBool('bgm', true);
			themesong.backgroundImage = 'assets/images/themesong_x.png';
		}
		e.source.value='';
	});
	var secret_button = Titanium.UI.createLabel({
		//backgroundColor:'#fff',
		width:20,
		height:20,
		top:0,
		left:0,
	});
	secret_button.addEventListener('click', function(e) {
		//alert('secretMode');
		self.add(tf1);
		setTimeout(function(){
			self.remove(tf1);
		}, 8000);
	});
	self.add(secret_button);
	
	//theme song
	setTimeout(function(){
		if(bgm00.playing==false){
			themesong.backgroundImage = 'assets/images/no_sound.png';
		}
	}, 500);
	setInterval(function(){
		if(bgm00.playing==false){
			themesong.backgroundImage = 'assets/images/no_sound.png';
		}else{
			themesong.backgroundImage = 'assets/images/no_sound_x.png';
		}
	}, 10000);
		
	themesong.addEventListener('click', function(e) {
		if(bgm00.playing==true && Ti.App.Properties.getBool('bgm')==true){
			bgm00.stop();
			Ti.App.Properties.setBool('bgm', false);
			themesong.backgroundImage = 'assets/images/no_sound.png';
		}else if(bgm00.playing==true && Ti.App.Properties.getBool('bgm')==false){
			bgm00.stop();
			//Ti.App.Properties.setBool('bgm', false);
			themesong.backgroundImage = 'assets/images/no_sound.png';
		}else if(bgm00.playing==false && Ti.App.Properties.getBool('bgm')==false){
			bgm00.play();
			Ti.App.Properties.setBool('bgm', true);
			themesong.backgroundImage = 'assets/images/no_sound_x.png';
		}else if(bgm00.playing==false && Ti.App.Properties.getBool('bgm')==true){
			bgm00.play();
			//Ti.App.Properties.setBool('bgm', true);
			themesong.backgroundImage = 'assets/images/no_sound_x.png';
		}
	});
	if(Ti.App.Properties.getBool('themesong')==true){
		self.add(themesong);
	}
	
	return self;
};

module.exports = ApplicationWindow;