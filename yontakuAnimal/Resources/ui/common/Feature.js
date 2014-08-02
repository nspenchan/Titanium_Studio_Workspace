//FirstView Component Constructor
function Feature(win, purchase) {
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var zoomTableview = Titanium.App.Properties.getDouble('zoomTableview');
	var osname = Ti.Platform.osname;
	if(osname=='iphone' && width==480){
		var side = 44;
	}else{
		var side = 0;
	}
	var left = (height*16/9-width)/2;
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
	
	var zoom = Titanium.App.Properties.getDouble("zoom");
	
	var array1 = [389, 329, 269, 189, 129];
	var array2 = [18, 18, 18, 10, 30];
	var array3 = ['#fff', '#8b0000', '#000', '#fff', '#fff'];
	var array4 = ['#000', '#ffffe0', '#fff', '#000', '#000'];
	var array5 = [25, 25, 25, 5, 5];
	var array6 = [1, 1, 1, 0.9, 1.1];
	var array7 = ['#fff', '#8b0000', '#000', '', ''];
	var array8 = ['#000', '#ffffe0', '#fff', '', ''];
	
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:bgColor,
	});
	
	for(i=0; i<array1.length; i++){
		var button = Ti.UI.createButton({
			title:L('A'),
			font : {
				fontWeight: "bold",
				fontSize : array2[i]*zoomTableview,
				fontFamily : 'Helvetica Neue'
			},
			color : array3[i],
			backgroundColor: array4[i],
			textAlign : 'center',
			right: array1[i]*zoomTableview-side,
			top: 70*zoomTableview,
			width : 50*zoomTableview,
			height : 50*zoomTableview,
			borderColor: '#808080',
			borderWidth: 3*zoomTableview,
			borderRadius : array5[i]*zoomTableview,
			backgroundImage:'non',
			backgroundSelectedImage:'/assets/images/shadow.png',
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

			html = '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8" /><title>Cheer-Slide</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>';
			html = html + css;
			html = html + '</style></head><body>';
			html = html + body;
			html = html + '</body></html>';
			webview.html = html;
		});

		self.add(button);
	}

	var label = Titanium.UI.createLabel({
		color:'#fff',
		text:L('Feature'),
		font:{fontSize:25*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign:'center',
		width:Ti.UI.FILL,
	    height:60*zoomTableview,
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
	self.add(back);
	//Add behavior for UI
	back.addEventListener('click', function(e) {
		win.remove(self);
	});
	
	var aA = Ti.UI.createButton({
		color:'#fff',
		title: L('aA'),
		font:{fontSize:20*zoomTableview,fontFamily:'Helvetica Neue',fontWeight:'bold'},
		textAlign : 'center',
		height:50*zoomTableview,
		width:150*zoomTableview,
		top:5*zoomTableview,
		bottom:5*zoomTableview,
		right:10*zoomTableview,
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
	self.add(aA);
	//Add behavior for UI
	aA.addEventListener('click', function(e) {
		//Ti.API.info(JSON.stringify(e));
		if(webview.top == 60*zoomTableview){
			webview.top = 60*zoomTableview+70*zoomTableview;
			aA.title = L('hide');
		}else{
			webview.top = 60*zoomTableview;
			aA.title = L('aA');
			
		}
	});
	
	zoom1 = zoom*1.1;
	zoom2 = zoom*1.2;
	zoom3 = zoom*1.3;
	
	css = 'body {background-color: ' + bgColor + '; color: ' + color + '; font-size: ' + zoom + 'em}';
	css = css + 'p {color: red; font-size: ' + zoom1 + 'em}';
	css = css + 'h1 {color: blue; font-size: ' + zoom3 + 'em}';
	css = css + 'h2 {color: green; font-size: ' + zoom2 + 'em}';
	Ti.API.info(css);
	
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, '/ui/common/' + purchase + '/index_' + lang + '.html');
	var body = file.read();
	
	var html = '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8" /><title>Cheer-Slide</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>';
	html = html + css;
	html = html + '</style></head><body>';
	html = html + body;
	html = html + '</body></html>';
	
	var webview = Ti.UI.createWebView({
		top:60*zoomTableview,
	    html: html
	});
	self.add(webview);
	
	return self;
}

module.exports = Feature;
