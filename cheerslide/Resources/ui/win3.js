function ApplicationWindow(title, tabGroup, bgm00, themesong) {
	//language setting
	if(Ti.Platform.locale=='ja'){
		var lang ='ja';
	}else{
		var lang = 'en';
	}
	
	if(!Ti.App.Properties.hasProperty('bgColor')){
		Titanium.App.Properties.setString('bgColor', '#000');
	}
	var bgColor = Titanium.App.Properties.getString("bgColor");
	
	if(!Ti.App.Properties.hasProperty('color')){
		Titanium.App.Properties.setString('color', '#fff');
	}
	var color = Titanium.App.Properties.getString("color");
	
	var array1 = [5, 65, 125, 205, 265];
	var array2 = [18, 18, 18, 10, 30];
	var array3 = ['#fff', '#8b0000', '#000', '#fff', '#fff'];
	var array4 = ['#000', '#ffffe0', '#fff', '#000', '#000'];
	var array5 = [25, 25, 25, 5, 5];
	var array6 = [1, 1, 1, 0.9, 1.1];
	var array7 = ['#fff', '#8b0000', '#000', '', ''];
	var array8 = ['#000', '#ffffe0', '#fff', '', ''];
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'red'
	});
	
	//Titanium.UI.iPhone.hideStatusBar();
	//if(Ti.Platform.osname!='andriod'){self.hideTabBar();}
	
	var b1 = Titanium.UI.createButton({title:L('Back')});
	var b2 = Titanium.UI.createButton({title:L('A')});
	self.LeftNavButton = b1;
	self.RightNavButton = b2;
		
	b1.addEventListener('click', function(){
		//Thema Song
		Ti.API.info(bgm00.playing);
		if(bgm00.playing==false && Ti.App.Properties.getBool('bgm')==true){
			themesong.backgroundImage = 'assets/images/no_sound_x.png';
			bgm00.play();
		}
		tabGroup.activeTab = tabGroup.tabs[0];
	});
	
	b2.addEventListener('click', function(e){
		if(webview.top==0){
			webview.top=70;
		}else{
			webview.top=0;
		}
	});
	
	var button_view = Titanium.UI.createImageView({
		backgroundColor:'white',
	    width: 320,
	    height: 70,
	    top:0
	});
	
	for(i=0; i<array1.length; i++){
		var button = Ti.UI.createButton({
			title:L('A'),
			font : {
				fontWeight: "bold",
				fontSize : array2[i],
				fontFamily : 'Helvetica Neue'
			},
			color : array3[i],
			backgroundColor: array4[i],
			textAlign : 'center',
			left: array1[i],
			top: 10,
			width : 50,
			height : 50,
			borderColor: '#808080',
			borderWidth: 3,
			borderRadius : array5[i],
			backgroundImage:'non',
			backgroundSelectedImage:'assets/images/shadow.png',
			_zoom: array6[i],
			_color: array7[i],
			_bgColor: array8[i],
		});
		
		button.addEventListener('click', function(e){
			//Ti.API.info(JSON.stringify(e));
			zoom = Titanium.App.Properties.getDouble('zoom');
			zoom = zoom*e.source._zoom;
			Ti.API.info(zoom);
			Titanium.App.Properties.setDouble('zoom', zoom);
			if(e.source._bgColor!=''){
				bgColor = e.source._bgColor;
				color = e.source._color;
				Titanium.App.Properties.setString('bgColor', bgColor);
				Titanium.App.Properties.setString('color', color);
			}			
			//alert(zoom);
			zoom1 = zoom*1.1;
			zoom2 = zoom*1.2;
			zoom3 = zoom*1.3;
			css = 'body {background-color: ' + bgColor + '; color: ' + color + '; font-size: ' + zoom + 'em}';
			css = css + 'p {color: red; font-size: ' + zoom1 + 'em}';
			css = css + 'h1 {color: blue; font-size: ' + zoom3 + 'em}';
			css = css + 'h2 {color: green; font-size: ' + zoom2 + 'em}';
			Ti.API.info(css);

			html = '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8" /><title>Cheer-Slide</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>';
			html = html + css;
			html = html + '</style></head><body>';
			html = html + body;
			html = html + '</body></html>';
			webview.html = html;
			
			var html2 = '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8" /><title>Cheer-Slide</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>';
			html2 = html2 + css;
			html2 = html2 + '</style></head><body>';
			html2 = html2 + body2;
			html2 = html2 + '</body></html>';
			webview2.html = html2;
		});

		button_view.add(button);
	}
	
	//zoom =2;
	var zoom = Titanium.App.Properties.getDouble('zoom');
	var zoom1 = zoom*1.1;
	var zoom2 = zoom*1.2;
	var zoom3 = zoom*1.3;
	css = 'body {background-color: ' + bgColor + '; color: ' + color + '; font-size: ' + zoom + 'em}';
	css = css + 'p {color: red; font-size: ' + zoom1 + 'em}';
	css = css + 'h1 {color: blue; font-size: ' + zoom3 + 'em}';
	css = css + 'h2 {color: green; font-size: ' + zoom2 + 'em}';
	Ti.API.info(css);
	//alert(css);	
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'assets/html/' + lang + '/index.html');
	var body = file.read();
	
	var html = '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8" /><title>Cheer-Slide</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>';
	html = html + css;
	html = html + '</style></head><body>';
	html = html + body;
	html = html + '</body></html>';
	
	var file2 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'assets/html/' + lang + '/howto.html');
	var body2 = file2.read();
	
	var html2 = '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8" /><title>Cheer-Slide</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>';
	html2 = html2 + css;
	html2 = html2 + '</style></head><body>';
	html2 = html2 + body2;
	html2 = html2 + '</body></html>';
	
	var webview = Ti.UI.createWebView({
		top:0,
	    html: html
	});
	
	var webview2 = Ti.UI.createWebView({
	    html:html2
	});
	//webview.add(button_view);
	//webview.html = html;
	//self.add(webview);
	
	var button1 = Ti.UI.createButton({
		//backgroundImage : './image/blue_button.png',
		//backgroundSelectedImage : './image/blue_button_r.png',
		title:L('Email'),
		font : {
			fontWeight: "bold",
			fontSize : 18,
			fontFamily : 'Helvetica Neue'
		},
		color : '#fff',
		textAlign : 'center',
		left: 10,
		bottom: 10,
		width : 145,
		height : 50,
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
		backgroundSelectedImage:'assets/images/shadow.png'
	});
	
	button1.addEventListener('click', function() {
		var emailDialog = Titanium.UI.createEmailDialog();

		// 1桁の数字を0埋めで2桁にする
		var toDoubleDigits = function(num) {
			num += "";
			if (num.length === 1) {
				num = "0" + num;
			}
			return num;
		};

		// 日付をYYYY/MM/DD HH:DD:MI:SS形式で取得
		var yyyymmddhhmiss = function() {
			var date = new Date();
			var yyyy = date.getFullYear();
			var mm = toDoubleDigits(date.getMonth() + 1);
			var dd = toDoubleDigits(date.getDate());
			var hh = toDoubleDigits(date.getHours());
			var mi = toDoubleDigits(date.getMinutes());
			var ss = toDoubleDigits(date.getSeconds());
			return yyyy + mm + dd + '_' + hh + mi + ss;
		}();

		//　メールの題名
		emailDialog.setSubject(L('CheerSlide') + ': ' + yyyymmddhhmiss);
		// メールの宛先（宛先、Cc、Bcc）
		emailDialog.setToRecipients([Titanium.App.Properties.getString('mail')]);
		//	emailDialog.setCcRecipients(['bar@xxxxx.com']);
		//	emailDialog.setBccRecipients(['hoge@xxxxx.com']);
		// メール本文
		var text0 = L('Thank_you_for_your_use');
		
		emailDialog.setMessageBody(text0);
		// 添付がある場合
		// var f = Ti.Filesystem.getFile('cricket.mp3');
		// emailDialog.addAttachment(f);

		// メール送信画面を起動
		emailDialog.open();
	});
	
	var button2 = Ti.UI.createButton({
		//backgroundImage : './image/blue_button.png',
		//backgroundSelectedImage : './image/blue_button_r.png',
		title:L('How_to'),
		font : {
			fontWeight: "bold",
			fontSize : 18,
			fontFamily : 'Helvetica Neue'
		},
		color : '#fff',
		textAlign : 'center',
		right: 10,
		bottom: 10,
		width : 145,
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
		backgroundSelectedImage:'assets/images/shadow.png'
	});
	
	button2.addEventListener('click', function(e){
		var win31 = Ti.UI.createWindow({
			title: L('How_to'),
			backgroundColor: 'red'
		});
		
		win31.add(webview2);
		self.containingTab.open(win31);
	});
	
	self.add(button_view);
	self.add(webview);
	self.add(button1);
	self.add(button2);

	return self;
};

module.exports = ApplicationWindow;