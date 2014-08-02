//FirstView Component Constructor
function WebView(win, labelTitle, filename, replicaSound) {
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var osname = Ti.Platform.osname;
	
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
	
	if(!Ti.App.Properties.hasProperty('zoom')){
		Titanium.App.Properties.setDouble('zoom', 1)/Titanium.App.Properties.getDouble("osZoom");
	}
	var zoom = Titanium.App.Properties.getDouble("zoom");
	
	var array1 = [scale(389), scale(329), scale(269), scale(189), scale(129)];
	var array2 = [scale(18), scale(18), scale(18), scale(10), scale(30)];
	var array3 = ['#fff', '#8b0000', '#000', '#fff', '#fff'];
	var array4 = ['#000', '#ffffe0', '#fff', '#000', '#000'];
	var array5 = [scale(25), scale(25), scale(25), scale(5), scale(5)];
	var array6 = [1, 1, 1, 0.9, 1.1];
	var array7 = ['#fff', '#8b0000', '#000', '', ''];
	var array8 = ['#000', '#ffffe0', '#fff', '', ''];
	
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:bgColor,
	});
	
	function scale(dimension) {
		return Math.round(dimension *  Ti.App.Properties.getDouble('osZoom') * Ti.Platform.displayCaps.platformWidth / 320);
	}
	
	for(i=0; i<array1.length; i++){
		var button = Ti.UI.createButton({
			title:L('A'),
			font : {
				fontWeight: "bold",
				fontSize :scale(array2[i]),
				fontFamily : 'Helvetica Neue'
			},
			color : array3[i],
			backgroundColor: array4[i],
			textAlign : 'center',
			right: array1[i],
			top:scale(70),
			width :scale(50),
			height :scale(50),
			borderColor: '#808080',
			borderWidth:scale(3),
			borderRadius : array5[i],
			backgroundImage:'non',
			backgroundSelectedImage:'/assets/images/shadow.png',
			_zoom:array6[i],
			_color:array7[i],
			_bgColor:array8[i],
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
				self.backgroundColor = bgColor;
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
			
			html2 = '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8" /><title>Cheer-Slide</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>';
			html2 = html2 + css;
			html2 = html2 + '</style></head><body>';
			html2 = html2 + body2;
			html2 = html2 + '</body></html>';
			webview.html = html2;
		});

		self.add(button);
	}
	
	var label = Titanium.UI.createLabel({
		color:'#fff',
		text:labelTitle,
		font:{fontSize:scale(25),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
		height:scale(60),
		top:0,
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
	self.add(label);
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var back = Ti.UI.createButton({
		color:'#fff',
		title: L('Back'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(50),
		width:scale(100),
		top:scale(5),
		bottom:scale(5),
		left:scale(10),
		radius:scale(10),
		borderRadius :scale(10),
		borderColor:'#002400',
		borderWidth:scale(1),
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
		replicaSound.play();
		win.remove(self);
	});
	
	var aA = Ti.UI.createButton({
		color:'#fff',
		title: L('aA'),
		font:{fontSize:scale(20),fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:scale(50),
		width:scale(150),
		top:scale(5),
		bottom:scale(5),
		right:scale(10),
		radius:scale(10),
		borderRadius :scale(10),
		borderColor:'#002400',
		borderWidth:scale(1),
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
	self.add(aA);
	//Add behavior for UI
	aA.addEventListener('click', function(e) {
		//Ti.API.info(JSON.stringify(e));
		if(webview.top == scale(60)){
			webview.top = scale(60+70);
			aA.title = L('hide');
		}else{
			webview.top = scale(60);
			aA.title = L('aA');
			
		}
	});
	
	zoom1 = zoom*1.1;
	zoom2 = zoom*1.2;
	zoom3 = zoom*1.3;
	
	css = 'body {background-color: ' + bgColor + '; color: ' + color + '; font-size: ' + zoom + 'em}';
	css = css + 'p {color: red; font-size: ' + zoom1 + 'em}';
	css = css + 'h1 {color: yellow; font-size: ' + zoom3 + 'em}';
	css = css + 'h2 {color: green; font-size: ' + zoom2 + 'em}';
	Ti.API.info(css);
	
	var file2 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, '/assets/html/' + filename + '.html');
	var body2 = file2.read();
	
	var html2 = '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8" /><title>Cheer-Slide</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>';
	html2 = html2 + css;
	html2 = html2 + '</style></head><body>';
	html2 = html2 + body2;
	html2 = html2 + '</body></html>';
	Ti.API.info('html: ' + html2);
	
	var webview = Ti.UI.createWebView({
		top:scale(60),
		html: html2
	});
	self.add(webview);
	
	return self;
}

module.exports = WebView;
